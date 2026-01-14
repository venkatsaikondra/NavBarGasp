// consumer/eventConsumer.ts
import { kafka } from "./kafka";
import axios from "axios";

const consumer = kafka.consumer({ groupId: "ml-consumer-group" });

async function sendToML(data: any) {
  await axios.post("http://localhost:8000/predict", data);
}

async function run() {
  await consumer.connect();
  await consumer.subscribe({
    topics: ["user-events", "api-logs", "system-metrics"],
    fromBeginning: false,
  });

  await consumer.run({
    eachMessage: async ({ topic, message }) => {
      const event = JSON.parse(message.value!.toString());

      console.log(`📥 Received from ${topic}`, event);

      // Send to neural network
      await sendToML(event);
    },
  });
}

run();
