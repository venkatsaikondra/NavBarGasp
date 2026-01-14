// /api/events/route.ts (Next.js App Router)
import { Kafka } from "kafkajs";

const kafka = new Kafka({ brokers: ["localhost:9092"] });
const producer = kafka.producer();

export async function POST(req: Request) {
  const body = await req.json();
  await producer.connect();

  await producer.send({
    topic: "user-events",
    messages: [{ value: JSON.stringify(body) }],
  });

  return Response.json({ status: "ok" });
}
