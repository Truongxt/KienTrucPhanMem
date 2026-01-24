const amqp = require("amqplib");

const RABBITMQ_URL = "amqp://truong:123456@rabbitmq:5672";
const MAIN_QUEUE = "order_queue";
const DLQ_QUEUE = "order_queue_dlq";

let channel;

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

            console.log("Consumer ready, waiting for messages...");

            channel.consume(
                MAIN_QUEUE,
                async (msg) => {
                    if (!msg) return;

                    const data = JSON.parse(msg.content.toString());
                    console.log("Processing:", data);

                    try {
                        // Ví dụ: fail nếu thiếu product
                        if (!data.product) {
                            throw new Error("Missing product");
                        }

                        await new Promise(r => setTimeout(r, 1000));

                        console.log("Process success:", data.orderId);
                        channel.ack(msg);
                    } catch (err) {
                        console.log("Error:", err.message);
                        console.log("Send to DLQ");
                        channel.nack(msg, false, false); // false,false => gửi DLQ
                    }
                },
                { noAck: false }
            );

            break;
        } catch (err) {
            console.log("Consumer failed, retrying in 3s...");
            await new Promise(r => setTimeout(r, 3000));
        }
    }
}

connect();
