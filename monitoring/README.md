# Monitoring Setup: Grafana + Prometheus

This guide will help you set up comprehensive monitoring for the Entrepreneurial Hub application using Prometheus for metrics collection and Grafana for visualization.

## Overview

The monitoring stack includes:
- **Prometheus**: Time-series database for metrics collection
- **Grafana**: Visualization and dashboarding platform
- **Node Exporter**: System-level metrics collector
- **Custom Metrics**: Application-specific metrics from Next.js

## Architecture

```
Next.js App (localhost:3000)
    ↓
/api/metrics endpoint (exposes Prometheus metrics)
    ↓
Prometheus (localhost:9090) - Scrapes metrics every 15s
    ↓
Grafana (localhost:3001) - Visualizes metrics
```

## Metrics Collected

### Application Metrics
- `http_requests_total` - Total HTTP requests
- `http_errors_total` - Total HTTP errors
- `assessments_completed_total` - Number of completed assessments
- `chat_requests_total` - Number of AI chat requests
- `http_request_duration_seconds` - Request latency (p50, p95, p99)

### System Metrics
- `nodejs_memory_usage_bytes` - Memory usage (heap, RSS, external)
- `nodejs_uptime_seconds` - Application uptime
- CPU, disk, network (via Node Exporter)

## Quick Start

### Prerequisites

- Docker and Docker Compose installed
- Next.js app running on localhost:3000

### Step 1: Start the Monitoring Stack

```bash
cd monitoring
docker-compose up -d
```

This will start:
- Prometheus on http://localhost:9090
- Grafana on http://localhost:3001
- Node Exporter on http://localhost:9100

### Step 2: Start Your Next.js App

```bash
cd ../bugbusters-frontend
npm run dev
```

### Step 3: Access Grafana

1. Open http://localhost:3001
2. Login with:
   - Username: `admin`
   - Password: `admin`
3. (Optional) Change password when prompted

### Step 4: View the Dashboard

The "Entrepreneurial Hub - Application Metrics" dashboard should be automatically loaded.

Navigate to:
**Dashboards → Browse → Entrepreneurial Hub - Application Metrics**

## Dashboard Panels

### 1. Overview Stats
- **Total Requests**: Lifetime HTTP requests
- **Total Errors**: Lifetime HTTP errors
- **Assessments Completed**: Number of business assessments
- **Chat Requests**: AI chat interactions

### 2. Request Rate
- Real-time requests per second
- Trends over time
- Helps identify traffic spikes

### 3. Response Time
- p50 (median) - typical response time
- p95 - 95th percentile
- p99 - 99th percentile
- Helps identify performance issues

### 4. Memory Usage
- Heap Used: Active memory
- Heap Total: Allocated heap
- RSS: Resident Set Size
- Helps identify memory leaks

## Accessing Prometheus

Visit http://localhost:9090 to:
- Query metrics directly
- View targets status
- Check alerting rules

Example queries:
```promql
# Request rate per minute
rate(http_requests_total[1m])

# Average response time
avg(http_request_duration_seconds{quantile="0.5"})

# Error rate
rate(http_errors_total[5m])
```

## Production Deployment

### Option 1: Self-Hosted (VPS/EC2)

1. **Deploy on Server**:
```bash
# Copy monitoring directory to server
scp -r monitoring/ user@your-server:/opt/monitoring/
ssh user@your-server
cd /opt/monitoring
docker-compose up -d
```

2. **Update Prometheus Config**:
Edit `prometheus/prometheus.yml`:
```yaml
scrape_configs:
  - job_name: 'nextjs-production'
    scheme: https
    metrics_path: '/api/metrics'
    static_configs:
      - targets: ['your-domain.com']
```

3. **Secure Grafana**:
```bash
# Update docker-compose.yml
environment:
  - GF_SECURITY_ADMIN_PASSWORD=your-secure-password
  - GF_SERVER_DOMAIN=monitoring.your-domain.com
  - GF_SERVER_ROOT_URL=https://monitoring.your-domain.com
```

### Option 2: Cloud-Managed Services

#### Grafana Cloud (Recommended for Vercel)

1. **Sign up**: https://grafana.com/auth/sign-up/create-user
2. **Get Prometheus endpoint** from Grafana Cloud
3. **Update your app** to push metrics to Grafana Cloud
4. **Configure remote write** in Prometheus

#### Amazon Managed Prometheus & Grafana

1. Set up Amazon Managed Service for Prometheus (AMP)
2. Set up Amazon Managed Grafana (AMG)
3. Connect AMG to AMP as data source
4. Import the dashboard JSON

## For Vercel Deployment

Since Vercel is serverless, you have these options:

### Option 1: External Prometheus (Recommended)

1. **Deploy Prometheus on a VPS** (DigitalOcean, AWS EC2, etc.)
2. **Configure Prometheus** to scrape your Vercel domain:
```yaml
scrape_configs:
  - job_name: 'vercel-app'
    scheme: https
    metrics_path: '/api/metrics'
    static_configs:
      - targets: ['your-app.vercel.app']
```

### Option 2: Use Vercel Analytics

Vercel provides built-in analytics:
1. Go to your Vercel project
2. Enable Analytics tab
3. Upgrade to Pro plan if needed

### Option 3: Third-Party Services

Consider these monitoring services:
- **Datadog** - Full observability platform
- **New Relic** - APM and monitoring
- **Grafana Cloud** - Managed Grafana + Prometheus
- **Sentry** - Error tracking and performance monitoring

## Alerting (Optional)

### Create Alert Rules

Create `monitoring/prometheus/alerts.yml`:
```yaml
groups:
  - name: application_alerts
    interval: 30s
    rules:
      - alert: HighErrorRate
        expr: rate(http_errors_total[5m]) > 0.05
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High error rate detected"
          description: "Error rate is {{ $value }} errors/sec"

      - alert: HighResponseTime
        expr: http_request_duration_seconds{quantile="0.95"} > 2
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High response time"
          description: "95th percentile is {{ $value }}s"

      - alert: HighMemoryUsage
        expr: nodejs_memory_usage_bytes{type="heapUsed"} > 500000000
        for: 10m
        labels:
          severity: warning
        annotations:
          summary: "High memory usage"
          description: "Memory usage is {{ $value }} bytes"
```

## Troubleshooting

### Prometheus Not Scraping Metrics

**Problem**: No data in Grafana
**Solution**:
1. Check if Next.js app is running: http://localhost:3000
2. Test metrics endpoint: http://localhost:3000/api/metrics
3. Check Prometheus targets: http://localhost:9090/targets
4. Verify Docker network connectivity

### Cannot Access Grafana

**Problem**: localhost:3001 not loading
**Solution**:
```bash
# Check if container is running
docker ps

# Check logs
docker logs grafana

# Restart containers
cd monitoring
docker-compose restart
```

### Metrics Show Zero

**Problem**: All metrics show 0
**Solution**:
- Use the app to generate metrics (click around, complete assessment)
- Check that /api/metrics endpoint returns data
- Wait 15-30 seconds for Prometheus to scrape

### Docker Networking Issues (Linux)

If you're on Linux and can't reach the app:
```yaml
# In prometheus.yml, change:
- targets: ['host.docker.internal:3000']
# To:
- targets: ['172.17.0.1:3000']
```

## Commands Reference

```bash
# Start monitoring stack
cd monitoring
docker-compose up -d

# View logs
docker-compose logs -f

# Stop monitoring stack
docker-compose down

# Stop and remove volumes (clean slate)
docker-compose down -v

# Restart services
docker-compose restart

# Check status
docker-compose ps

# Access Prometheus config
docker exec -it prometheus cat /etc/prometheus/prometheus.yml

# Reload Prometheus config (without restart)
curl -X POST http://localhost:9090/-/reload
```

## Custom Metrics

To add your own metrics in the Next.js app:

```typescript
// In any API route or page
import { 
  incrementRequestCount, 
  incrementErrorCount,
  recordRequestDuration 
} from '@/app/api/metrics/route';

// Track a request
incrementRequestCount();

// Track an error
try {
  // your code
} catch (error) {
  incrementErrorCount();
}

// Track duration
const start = Date.now();
// ... do work ...
const duration = Date.now() - start;
recordRequestDuration(duration);
```

## Security Considerations

1. **Change Grafana password** in production
2. **Restrict access** using firewall rules
3. **Use HTTPS** with reverse proxy (Nginx/Caddy)
4. **Enable authentication** on Prometheus (basic auth)
5. **Secure metrics endpoint** (optional API key)

## Resources

- [Prometheus Documentation](https://prometheus.io/docs/)
- [Grafana Documentation](https://grafana.com/docs/)
- [Prometheus Best Practices](https://prometheus.io/docs/practices/)
- [Grafana Dashboards](https://grafana.com/grafana/dashboards/)

## Support

For issues or questions:
1. Check logs: `docker-compose logs`
2. Verify configuration files
3. Test endpoints manually
4. Review this documentation

---

**Happy Monitoring! 📊**

