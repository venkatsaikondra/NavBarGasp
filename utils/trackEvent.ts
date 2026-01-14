// utils/trackEvent.ts
export function trackEvent(event: any) {
  fetch("/api/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(event),
  });
}
/* Usage
<button
  onClick={() =>
    trackEvent({
      event_type: "click",
      element: "submit_button",
      page: "/checkout",
      user_id: "u123",
      timestamp: Date.now(),
    })
  }
>
Submit
</button>
*/
/*{
  "source": "frontend",
  "event_type": "click",
  "element": "submit_button",
  "page": "/checkout",
  "user_id": "u123",
  "session_id": "s456",
  "timestamp": 1737000000
}
*/