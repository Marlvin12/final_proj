import { NextResponse } from 'next/server';

let requestCount = 0;
let errorCount = 0;
let assessmentCount = 0;
let chatRequestCount = 0;
const requestDurations: number[] = [];

export function incrementRequestCount() {
  requestCount++;
}

export function incrementErrorCount() {
  errorCount++;
}

export function incrementAssessmentCount() {
  assessmentCount++;
}

export function incrementChatRequestCount() {
  chatRequestCount++;
}

export function recordRequestDuration(duration: number) {
  requestDurations.push(duration);
  if (requestDurations.length > 1000) {
    requestDurations.shift();
  }
}

function calculatePercentile(arr: number[], percentile: number): number {
  if (arr.length === 0) return 0;
  const sorted = [...arr].sort((a, b) => a - b);
  const index = Math.ceil((percentile / 100) * sorted.length) - 1;
  return sorted[index] || 0;
}

export async function GET() {
  incrementRequestCount();
  
  const avgDuration = requestDurations.length > 0
    ? requestDurations.reduce((a, b) => a + b, 0) / requestDurations.length
    : 0;

  const p95Duration = calculatePercentile(requestDurations, 95);
  const p99Duration = calculatePercentile(requestDurations, 99);

  const metrics = `
# HELP http_requests_total Total number of HTTP requests
# TYPE http_requests_total counter
http_requests_total ${requestCount}

# HELP http_errors_total Total number of HTTP errors
# TYPE http_errors_total counter
http_errors_total ${errorCount}

# HELP assessments_completed_total Total number of completed assessments
# TYPE assessments_completed_total counter
assessments_completed_total ${assessmentCount}

# HELP chat_requests_total Total number of chat requests
# TYPE chat_requests_total counter
chat_requests_total ${chatRequestCount}

# HELP http_request_duration_seconds HTTP request duration in seconds
# TYPE http_request_duration_seconds gauge
http_request_duration_seconds{quantile="0.5"} ${(avgDuration / 1000).toFixed(3)}
http_request_duration_seconds{quantile="0.95"} ${(p95Duration / 1000).toFixed(3)}
http_request_duration_seconds{quantile="0.99"} ${(p99Duration / 1000).toFixed(3)}

# HELP nodejs_memory_usage_bytes Node.js memory usage in bytes
# TYPE nodejs_memory_usage_bytes gauge
nodejs_memory_usage_bytes{type="rss"} ${process.memoryUsage().rss}
nodejs_memory_usage_bytes{type="heapTotal"} ${process.memoryUsage().heapTotal}
nodejs_memory_usage_bytes{type="heapUsed"} ${process.memoryUsage().heapUsed}
nodejs_memory_usage_bytes{type="external"} ${process.memoryUsage().external}

# HELP nodejs_uptime_seconds Node.js uptime in seconds
# TYPE nodejs_uptime_seconds gauge
nodejs_uptime_seconds ${process.uptime()}
`;

  return new NextResponse(metrics, {
    headers: {
      'Content-Type': 'text/plain; version=0.0.4',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
  });
}

