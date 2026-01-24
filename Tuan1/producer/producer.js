const express = require("express");
const amqp = require("amqplib");

const RABBITMQ_URL = "amqp://truong:123456@rabbitmq:5672";
const MAIN_QUEUE = "order_queue";
const DLQ_QUEUE = "order_queue_dlq";

const app = express();
app.use(express.json());

let channel;

async function connect() {
    while (true) {
        try {
            const conn = await amqp.connect(RABBITMQ_URL);
            channel = await conn.createChannel();

            await channel.assertQueue(MAIN_QUEUE, { durable: true });
            await channel.assertQueue(DLQ_QUEUE, { durable: true });

            console.log("Producer connected");
            break;
        } catch (err) {
            console.log("Waiting for RabbitMQ...");
            await new Promise(r => setTimeout(r, 3000));
        }
    }
}

/**
 * Gửi vào MAIN QUEUE
 */
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
        MAIN_QUEUE,
        Buffer.from(JSON.stringify(payload)),
        { persistent: true }
    );

    console.log("Published to MAIN:", payload);

    return res.json({ status: "ok", queue: MAIN_QUEUE, payload });
});

/**
 * Gửi thẳng vào DLQ -> dùng để mô phỏng lỗi
 */
app.post("/publish-error", async (req, res) => {
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
