# TexnoAI - Docker Setup Guide

## 🐳 Docker Configuration

### Architecture:
```
┌─────────────────────────────────────┐
│         Docker Network              │
│                                     │
│  ┌──────────────┐  ┌─────────────┐ │
│  │   Frontend   │  │ Telegram Bot│ │
│  │  (Nginx)     │  │  (Node.js)  │ │
│  │  Port: 80    │  │ Port: 3001  │ │
│  └──────────────┘  └─────────────┘ │
│         │                 │         │
│         └────────┬────────┘         │
│                  │                  │
└──────────────────┼──────────────────┘
                   │
              User Access
```

## 📋 Prerequisites

1. **Docker Desktop** installed
   - Windows: https://docs.docker.com/desktop/install/windows-install/
   - Minimum: 4GB RAM, 20GB disk space

2. **Environment Configuration**
   - `telegram-bot/.env` file configured

## 🚀 Quick Start

### 1. Verify .env file exists:
```bash
cd telegram-bot
ls .env
```

**Required variables:**
```env
TELEGRAM_BOT_TOKEN=your_token
TELEGRAM_CHANNEL_ID=@your_channel
ADMIN_TELEGRAM_ID=your_id
PORT=3001
```

### 2. Build and start containers:
```bash
cd texnoai
docker-compose up --build
```

### 3. Access the application:
- **Frontend:** http://localhost
- **Bot API:** http://localhost:3001/api/health
- **Admin Panel:** http://localhost/admin

## 🛠️ Docker Commands

### Start services:
```bash
docker-compose up -d
```

### Stop services:
```bash
docker-compose down
```

### View logs:
```bash
# All services
docker-compose logs -f

# Frontend only
docker-compose logs -f frontend

# Bot only
docker-compose logs -f telegram-bot
```

### Rebuild after code changes:
```bash
docker-compose up --build -d
```

### Restart specific service:
```bash
docker-compose restart frontend
docker-compose restart telegram-bot
```

### Check service status:
```bash
docker-compose ps
```

### Execute commands inside container:
```bash
# Frontend
docker exec -it texnoai-frontend sh

# Bot
docker exec -it texnoai-telegram-bot sh
```

## 🔍 Health Checks

### Frontend Health:
```bash
curl http://localhost/
```

### Bot Health:
```bash
curl http://localhost:3001/api/health
```

### Check bot info:
```bash
curl http://localhost:3001/api/bot-info
```

## 📊 Monitoring

### Container stats:
```bash
docker stats
```

### Disk usage:
```bash
docker system df
```

### Network info:
```bash
docker network ls
docker network inspect texnoai-network
```

## 🐛 Troubleshooting

### Container won't start:
```bash
# Check logs
docker-compose logs

# Remove and rebuild
docker-compose down
docker-compose up --build
```

### Port already in use:
```bash
# Check what's using the port
netstat -ano | findstr :80
netstat -ano | findstr :3001

# Kill the process or change port in docker-compose.yml
```

### Environment variables not working:
```bash
# Verify .env file
cat telegram-bot/.env

# Rebuild containers
docker-compose down
docker-compose up --build
```

### Clean slate (remove everything):
```bash
docker-compose down -v
docker system prune -a
docker-compose up --build
```

## 📦 Production Deployment

### 1. Update environment:
```env
NODE_ENV=production
```

### 2. Use production compose:
```bash
docker-compose -f docker-compose.prod.yml up -d
```

### 3. Enable SSL (optional):
Add volumes for SSL certificates in docker-compose.yml

### 4. Setup backup:
```bash
# Backup .env
cp telegram-bot/.env telegram-bot/.env.backup

# Export containers
docker save texnoai-frontend > frontend.tar
docker save texnoai-telegram-bot > bot.tar
```

## 🔐 Security

### 1. Never commit .env files
Already in `.gitignore`

### 2. Use secrets for production
Consider Docker secrets or external secret management

### 3. Limit exposed ports
Only expose necessary ports to the host

### 4. Regular updates
```bash
docker-compose pull
docker-compose up -d
```

## 📈 Performance Optimization

### 1. Resource limits (docker-compose.yml):
```yaml
services:
  frontend:
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
```

### 2. Multi-stage builds
Already implemented for smaller image sizes

### 3. Health checks
Already configured for auto-restart

## 🎯 Testing

### Run all tests:
```bash
# Start services
docker-compose up -d

# Test frontend
curl http://localhost

# Test bot
cd telegram-bot
node test-contact.js
node test-post.js

# Check logs
docker-compose logs -f
```

## 📱 VPS Deployment (Next Step)

### Requirements:
- Ubuntu 20.04+ or CentOS 7+
- 2GB RAM minimum
- 20GB disk space
- Docker & Docker Compose installed

### Steps:
1. Copy files to VPS
2. Update .env with production values
3. Run docker-compose up -d
4. Configure domain & SSL
5. Setup monitoring

## 🆘 Support

### Container Issues:
```bash
docker-compose logs telegram-bot
```

### Network Issues:
```bash
docker network inspect texnoai-network
```

### Telegram Bot Issues:
Check bot logs and verify token in .env

---

## 📞 Contact

**Developer:** TexnoAI Team  
**Telegram:** @texnoaikanal  
**Email:** info@texnoai.uz
