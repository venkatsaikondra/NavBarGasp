// middleware/logger.ts
export function logApi(req: any, res: any, next: any) {
  const start = Date.now();

  res.on("finish", async () => {
    const log = {
      source: "api",
      method: req.method,
      path: req.url,
      status: res.statusCode,
      duration_ms: Date.now() - start,
      timestamp: Date.now(),
    };

    // Send to Kafka
    await sendToKafka("api-logs", log);
  });

  next();
}
