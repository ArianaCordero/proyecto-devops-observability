# Proyecto DevOps - Observabilidad y CI/CD

Aplicación Fullstack con Docker, CI/CD y stack completo de observabilidad (Prometheus + Grafana + Loki).

## Información del Proyecto

**Curso:** DevOps 3er Parcial  
**Equipo:** [Nombres del equipo]  
**Repositorio:** https://github.com/ArianaCordero/proyecto-devops-observability

## URLs de Acceso

- **Aplicación Web:** http://3.236.143.170
- **Grafana Dashboard:** http://3.236.143.170:3000
- **IP EC2:** 3.236.143.170

## Estructura del Proyecto
```
proyecto-devops/
├── frontend/          # SPA (React/Vue/Angular)
├── backend/           # API REST
├── infra/
│   └── terraform/     # Infraestructura como código
├── observability/     # Configuración de monitoreo
│   ├── prometheus/
│   ├── grafana/
│   ├── loki/
│   └── promtail/
├── .github/
│   └── workflows/     # CI/CD con GitHub Actions
└── docs/              # Documentación y evidencias
```

## Stack Tecnológico

- **Infraestructura:** AWS EC2 (t3.small), Terraform
- **Contenedores:** Docker, Docker Compose
- **Backend:** [Node.js/Python/Go - por definir]
- **Frontend:** [React/Vue/Angular - por definir]
- **Base de Datos:** [PostgreSQL/MySQL/MongoDB - por definir]
- **Observabilidad:** Prometheus, Grafana, Loki, Promtail, Node Exporter
- **CI/CD:** GitHub Actions
- **Notificaciones:** Discord/Slack Webhook

## Conectarse a la Instancia EC2
```bash
ssh -i infra/terraform/devops-key ubuntu@3.236.143.170
```

## Desarrollo Local

### Clonar el repositorio
```bash
git clone https://github.com/ArianaCordero/proyecto-devops-observability.git
cd proyecto-devops-observability
```

### Backend
```bash
cd backend
# Instrucciones pendientes por Persona 2
```

### Frontend
```bash
cd frontend
# Instrucciones pendientes por Persona 3
```

## Despliegue

El despliegue completo se realiza automáticamente mediante GitHub Actions al hacer push a `main`.

Para desplegar manualmente en EC2:
```bash
ssh -i infra/terraform/devops-key ubuntu@3.236.143.170
cd /home/ubuntu/proyecto-devops
git pull
docker compose up -d --build
```
## Información Técnica

**Instancia EC2:**
- Tipo: t3.small (2 vCPU, 2GB RAM)
- OS: Ubuntu 22.04 LTS
- Disco: 20GB gp3
- Swap: 2GB adicional
- Docker: 29.1.3
- Docker Compose: v5.0.0

**Security Groups:**
- SSH (22): 181.115.130.227/32
- HTTP (80): 0.0.0.0/0
- HTTPS (443): 0.0.0.0/0
- Grafana (3000): 0.0.0.0/0