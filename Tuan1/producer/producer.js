const express = require("express");
const amqp = require("amqplib");
const jwt = require("jsonwebtoken");

const RABBITMQ_URL = "amqp://truong:123456@rabbitmq:5672";
const MAIN_QUEUE = "order_queue";
const DLQ_QUEUE = "order_queue_dlq";
const JWT_SECRET = "my-super-secret-key-123"; 
const JWT_EXPIRES_IN = "1h";

const users = [
    { id: 1, username: "admin", password: "admin123", role: "admin" },
    { id: 2, username: "user", password: "user123", role: "user" }
];

const app = express();
app.use(express.json());

let channel;

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; 

    if (!token) {
        return res.status(401).json({ error: "Access token required" });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: "Invalid or expired token" });
        }
        req.user = user;
        next();
    });
};

async function connect() {
    while (true) {
        try {
            const conn = await amqp.connect(RABBITMQ_URL);
            channel = await conn.createChannel();

            await channel.assertQueue(DLQ_QUEUE, { durable: true });

            await channel.assertQueue(MAIN_QUEUE, {
                durable: true,
                deadLetterExchange: "",
                deadLetterRoutingKey: DLQ_QUEUE
            });

            console.log("Producer connected");
            break;
        } catch (err) {
            console.log("Waiting for RabbitMQ...");
            await new Promise(r => setTimeout(r, 3000));
        }
    }
}

app.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required" });
    }

    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
        return res.status(401).json({ error: "Invalid username or password" });
    }

    // Tạo JWT token
    const token = jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
    );

    console.log(`User ${username} logged in`);

    return res.json({
        message: "Login successful",
        token,
        expiresIn: JWT_EXPIRES_IN,
        user: { id: user.id, username: user.username, role: user.role }
    });
});

app.get("/me", authenticateToken, (req, res) => {
    return res.json({ user: req.user });
});

app.post("/publish", authenticateToken, async (req, res) => {
    const { orderId, product } = req.body;

    if (!orderId) {
        return res.status(400).json({ error: "orderId is required" });
    }

    const payload = {
        orderId,
        product: product || null,
        timestamp: new Date().toISOString(),
        createdBy: req.user.username 
    };

    channel.sendToQueue(
        MAIN_QUEUE,
        Buffer.from(JSON.stringify(payload)),
        { persistent: true }
    );

    console.log(`Published by ${req.user.username}:`, payload);

    return res.json({ status: "ok", queue: MAIN_QUEUE, payload });
});

app.post("/publish-error", authenticateToken, async (req, res) => {
    const { orderId, reason } = req.body;

    if (!orderId || !reason) {
        return res.status(400).json({ error: "orderId & reason are required" });
    }

    const payload = {
        orderId,
        reason,
        timestamp: new Date().toISOString()
    };

    channel.sendToQueue(
        DLQ_QUEUE,
        Buffer.from(JSON.stringify(payload)),
        {
            persistent: true,
            headers: {
                "x-first-death-reason": reason,
                "x-first-death-queue": DLQ_QUEUE,
                "x-first-death-exchange": "", // direct exchange
            }
        }
    );

    console.log("Simulated DLQ message:", payload);

    return res.json({ status: "ok", queue: DLQ_QUEUE, payload });
});


connect();

app.listen(3000, () => {
    console.log("Producer running at :3000");
});
