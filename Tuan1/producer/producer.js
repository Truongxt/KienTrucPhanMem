const express = require("express");
const amqp = require("amqplib");

const RABBITMQ_URL = "amqp://truong:123456@rabbitmq:5672";
const QUEUE = "order_queue";

const app = express();
app.use(express.json());

let channel;

async function connect() {
    while (true) {
        try {
            const conn = await amqp.connect(RABBITMQ_URL);
            channel = await conn.createChannel();

            await channel.assertQueue(QUEUE, { durable: true });

            console.log("Producer connected");
            break;
        } catch (err) {
            console.log("Waiting for RabbitMQ...");
            await new Promise(r => setTimeout(r, 3000));
        }
    }
}

app.post("/publish", async (req, res) => {
    const { orderId, product } = req.body;

    if (!orderId || !product) {
        return res.status(400).json({ error: "orderId & product are required" });
    }

    const payload = {
        orderId,
        product,
        timestamp: new Date().toISOString()
    };

    channel.sendToQueue(
        QUEUE,
        Buffer.from(JSON.stringify(payload)),
        { persistent: true }
    );

    console.log("Published:", payload);

    return res.json({ status: "ok", payload });
});

connect();

app.listen(3000, () => {
    console.log("Producer running at :3000");
});
