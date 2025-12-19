# UNIVERSIDAD PRIVADA BOLIVIANA

<p align="center">
  <img width="800" alt="UPB Logo" src="https://github.com/user-attachments/assets/d604e201-58b7-4980-b293-68b865fdfbbd" />
</p>

<h1 align="center">Proyecto 3er Parcial - DevOps</h1>
<h3 align="center">Implementación de Ciclo DevOps y Observabilidad</h3>

<p align="center">
  <strong>Aplicación Fullstack con Docker, CI/CD y Stack de Observabilidad</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/AWS-EC2-orange?style=for-the-badge&logo=amazon-aws" />
  <img src="https://img.shields.io/badge/Docker-Compose-blue?style=for-the-badge&logo=docker" />
  <img src="https://img.shields.io/badge/Terraform-IaC-purple?style=for-the-badge&logo=terraform" />
  <img src="https://img.shields.io/badge/Grafana-Observability-orange?style=for-the-badge&logo=grafana" />
</p>

---

## Información Académica

| Campo | Detalle |
|-------|---------|
| **Universidad** | Universidad Privada Boliviana |
| **Materia** | Certificación DevOps |
| **Docente** | Ing. Rayner Villalba |
| **Gestión** | 2025 |
| **Parcial** | Tercer Parcial |

###  Equipo de Desarrollo

| Nombre |
|--------|
| **Ariana Cordero** | 
| **Melany Sonco** |
| **Patricia Quisbert** | 
| **Tatiana Aramayo** |

---

##  Objetivo del Proyecto

Diseñar, construir y desplegar una aplicación completa (Fullstack) utilizando contenedores Docker en una instancia EC2 de AWS, integrando:

- ✅ Pipeline de CI/CD robusto con notificaciones automáticas
- ✅ Stack completo de observabilidad para monitoreo en tiempo real
- ✅ Infraestructura como código con Terraform
- ✅ Gestión de logs centralizada

---

##  Enlaces de Acceso

| Servicio | URL | Estado |
|----------|-----|--------|
| **Aplicación Web** | http://3.236.143.170 | 🟢 Disponible |
| **Grafana Dashboard** | http://3.236.143.170:3000 | 🟢 Disponible |
| **Repositorio GitHub** | [proyecto-devops-observability](https://github.com/ArianaCordero/proyecto-devops-observability) | 🟢 Activo |
| **IP EC2** | `3.236.143.170` | 🟢 Online |

---

##  Estructura del Proyecto
```plaintext
proyecto-devops-observability/
│
├── 📂 frontend/                    # Single Page Application
│   ├── src/                        # Código fuente del frontend
│   ├── public/                     # Archivos estáticos
│   ├── Dockerfile                  # Imagen de frontend
│   └── nginx.conf                  # Configuración de Nginx
│
├── 📂 backend/                     # API REST
│   ├── src/                        # Código fuente del backend
│   ├── db/                         # Scripts de base de datos
│   ├── Dockerfile                  # Imagen de backend
│   └── requirements.txt / package.json
│
├── 📂 infra/
│   └── terraform/                  # Infraestructura como Código
│       ├── main.tf                 # Configuración principal
│       ├── variables.tf            # Variables de Terraform
│       ├── outputs.tf              # Outputs de Terraform
│       └── user_data.sh            # Script de inicialización EC2
│
├── 📂 observability/               # Stack de Monitoreo
│   ├── prometheus/                 # Configuración de Prometheus
│   ├── grafana/                    # Dashboards de Grafana
│   │   ├── provisioning/
│   │   │   ├── datasources/
│   │   │   └── dashboards/
│   │   └── dashboards/
│   ├── loki/                       # Configuración de Loki
│   └── promtail/                   # Configuración de Promtail
│
├── 📂 .github/
│   └── workflows/                  # CI/CD con GitHub Actions
│       └── deploy.yml              # Pipeline de despliegue
│
├── 📂 docs/                        # Documentación
│   ├── architecture/               # Diagramas de arquitectura
│   ├── screenshots/                # Evidencias
│   └── terraform-outputs.txt       # Outputs de infraestructura
│
├── 📄 docker-compose.yml           # Orquestación de servicios
├── 📄 .gitignore                   # Archivos ignorados
└── 📄 README.md                    # Este archivo
```

---

##  Stack Tecnológico

### Infraestructura y DevOps
- **Cloud Provider:** Amazon Web Services (AWS)
- **Compute:** EC2 t3.small (2 vCPU, 2GB RAM)
- **IaC:** Terraform v1.14.1
- **Contenedores:** Docker 29.1.3 + Docker Compose v5.0.0

### Aplicación (Por Definir)
- **Backend:** Node.js / Python / Go
- **Frontend:** React / Vue / Angular
- **Base de Datos:** PostgreSQL / MySQL / MongoDB

### Observabilidad (Grafana Stack)
- **Métricas:** Prometheus + Node Exporter
- **Logs:** Loki + Promtail
- **Visualización:** Grafana
- **Alertas:** Prometheus Alertmanager

### CI/CD
- **Pipeline:** GitHub Actions
- **Notificaciones:** Discord / Slack Webhook
- **Deploy:** SSH automatizado

---

##  Inicio Rápido

### 1️ Clonar el Repositorio
```bash
git clone https://github.com/ArianaCordero/proyecto-devops-observability.git
cd proyecto-devops-observability
```

### 2️ Conectarse a la Instancia EC2
```bash
ssh -i infra/terraform/devops-key ubuntu@3.236.143.170
```

**Nota:** La clave privada `devops-key` NO está en el repositorio por seguridad. Contactar al equipo para obtenerla.

### 3️ Desplegar la Aplicación (Manual)
```bash
# Desde la instancia EC2
cd /home/ubuntu/proyecto-devops
git pull origin main
docker compose up -d --build
```

### 4️ Verificar Servicios
```bash
# Ver contenedores en ejecución
docker compose ps

# Ver logs
docker compose logs -f

# Ver estado de salud
docker ps
```

---

##  Arquitectura del Sistema

### Diagrama de Componentes
```plaintext
┌─────────────────────────────────────────────────────────────┐
│                    GitHub Repository                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │   Frontend   │  │   Backend    │  │ Observability│       │
│  │   (React)    │  │   (Node.js)  │  │   (Grafana)  │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
└─────────────────────────────────────────────────────────────┘
                             │
                    ┌────────▼────────┐
                    │  GitHub Actions │
                    │    (CI/CD)      │
                    └────────┬────────┘
                             │ SSH Deploy
                    ┌────────▼────────────────────────────┐
                    │     AWS EC2 (Ubuntu 22.04)          │
                    │  ┌──────────────────────────────┐   │
                    │  │    Docker Compose            │   │
                    │  │  ┌────────┐  ┌────────┐      │   │
                    │  │  │Frontend│  │Backend │      │   │
                    │  │  │ :80    │  │ :5000  │      │   │
                    │  │  └───┬────┘  └───┬────┘      │   │
                    │  │      │           │           │   │
                    │  │  ┌───▼───────────▼───┐       │   │
                    │  │  │   PostgreSQL      │       │   │
                    │  │  │      :5432        │       │   │
                    │  │  └───────────────────┘       │   │
                    │  │                              │   │
                    │  │  ┌──────────────────────┐    │   │
                    │  │  │  Observability Stack │    │   │
                    │  │  │  - Prometheus :9090  │    │   │
                    │  │  │  - Grafana :3000     │    │   │
                    │  │  │  - Loki :3100        │    │   │
                    │  │  │  - Promtail          │    │   │
                    │  │  └──────────────────────┘    │   │
                    │  └──────────────────────────────┘   │
                    └─────────────────────────────────────┘
```

---

##  Especificaciones Técnicas

### Instancia AWS EC2

| Característica | Especificación |
|----------------|----------------|
| **Tipo de Instancia** | t3.small |
| **vCPUs** | 2 |
| **Memoria RAM** | 2 GB |
| **Sistema Operativo** | Ubuntu 22.04 LTS (Jammy) |
| **Almacenamiento** | 20 GB gp3 SSD |
| **Swap Memory** | 2 GB adicional |
| **Región** | us-east-1 (N. Virginia) |

### Software Instalado

| Software | Versión |
|----------|---------|
| Docker Engine | 29.1.3 |
| Docker Compose | v5.0.0 |
| Git | 2.34.1 |
| Terraform | 1.14.1 (local) |

### Security Groups (Firewall)

| Puerto | Protocolo | Origen | Servicio |
|--------|-----------|--------|----------|
| 22 | TCP | 181.115.130.227/32 | SSH (Restringido) |
| 80 | TCP | 0.0.0.0/0 | HTTP (Frontend) |
| 443 | TCP | 0.0.0.0/0 | HTTPS (Futuro) |
| 3000 | TCP | 0.0.0.0/0 | Grafana Dashboard |

---

##  CI/CD Pipeline

### Workflow de Despliegue
```yaml
Trigger: Push to main branch
  ↓
1. Checkout código
  ↓
2. Build Docker images
  ↓
3. Conectar a EC2 vía SSH
  ↓
4. Pull imágenes en EC2
  ↓
5. Docker Compose up -d
  ↓
6. Health Check
  ↓
7. ✅ Notificación a Discord
```

---

##  Testing y Validación

### Checklist de Pre-Despliegue

- [ ] Todas las imágenes Docker construyen sin errores
- [ ] Tests unitarios del backend pasan
- [ ] Frontend compila correctamente
- [ ] Variables de entorno configuradas
- [ ] Base de datos migrada

### Checklist de Post-Despliegue

- [ ] Todos los contenedores están running
- [ ] Frontend responde en puerto 80
- [ ] Backend responde en puerto 5000
- [ ] Base de datos acepta conexiones
- [ ] Grafana muestra métricas
- [ ] Logs se visualizan en Grafana

---

##  Licencia

Este proyecto es de uso académico para la Universidad Privada Boliviana.  
© 2025 - Certificación DevOps - 3er Parcial