// producer/userEventsProducer.ts
import { kafka } from "./kafka";

const producer = kafka.producer();

export async function sendUserEvent(event: any) {
  await producer.connect();

  await producer.send({
    topic: "user-events",
    messages: [
      {
        key: event.user_id,
        value: JSON.stringify({
          source: "frontend",
          event_type: "click",
          payload: event,
          timestamp: Date.now(),
        }),
      },
    ],
  });
}
