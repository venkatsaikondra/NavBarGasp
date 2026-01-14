// producer/apiLogsProducer.ts
import { kafka } from "./kafka";

const producer = kafka.producer();

export async function sendApiLog(log: any) {
  await producer.connect();

  await producer.send({
    topic: "api-logs",
    messages: [
      {
        value: JSON.stringify({
          source: "api",
          event_type: "request",
          payload: log,
          timestamp: Date.now(),
        }),
      },
    ],
  });
}
