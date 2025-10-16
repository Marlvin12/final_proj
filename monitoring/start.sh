#!/bin/bash

echo "🚀 Starting Entrepreneurial Hub Monitoring Stack..."
echo ""

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Error: Docker is not running. Please start Docker Desktop."
    exit 1
fi

# Check if docker-compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Error: docker-compose is not installed."
    echo "Please install it from: https://docs.docker.com/compose/install/"
    exit 1
fi

echo "✅ Docker is running"
echo ""

# Start the monitoring stack
echo "📊 Starting Prometheus, Grafana, and Node Exporter..."
docker-compose up -d

# Wait for services to be ready
echo ""
echo "⏳ Waiting for services to start..."
sleep 10

# Check if services are running
if docker-compose ps | grep -q "Up"; then
    echo ""
    echo "✅ Monitoring stack is running!"
    echo ""
    echo "📊 Access the services:"
    echo "   - Grafana:   http://localhost:3001 (admin/admin)"
    echo "   - Prometheus: http://localhost:9090"
    echo "   - Metrics:    http://localhost:3000/api/metrics"
    echo ""
    echo "💡 Tips:"
    echo "   1. Make sure your Next.js app is running on port 3000"
    echo "   2. Generate some traffic to see metrics"
    echo "   3. Check the 'Entrepreneurial Hub' dashboard in Grafana"
    echo ""
    echo "🛑 To stop: docker-compose down"
    echo "📋 To view logs: docker-compose logs -f"
else
    echo ""
    echo "❌ Error: Services failed to start"
    echo "Run 'docker-compose logs' to see the error details"
    exit 1
fi

