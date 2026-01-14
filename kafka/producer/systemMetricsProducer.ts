// producer/systemMetricsProducer.ts
import os from "os";
import { kafka } from "./kafka";

const producer = kafka.producer();

function getMetrics() {
  return {
    cpu_load: os.loadavg()[0],
    total_memory: os.totalmem(),
    free_memory: os.freemem(),
  };
}

setInterval(async () => {
  await producer.connect();

  await producer.send({
    topic: "system-metrics",
    messages: [
      {
        value: JSON.stringify({
          source: "system",
          event_type: "metrics",
          payload: getMetrics(),
          timestamp: Date.now(),
        }),
      },
    ],
  });
}, 5000);
