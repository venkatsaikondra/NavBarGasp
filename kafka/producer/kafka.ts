// producer/kafka.ts  & consumer/kafka.ts
import { Kafka } from "kafkajs";

export const kafka = new Kafka({
  clientId: "anomaly-detector",
  brokers: ["localhost:9092"],
});
