variable "aws_region" {
  description = "Region de AWS donde se desplegara la infraestructura"
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  description = "Nombre del proyecto"
  type        = string
  default     = "devops-observability"
}

variable "instance_type" {
  description = "Tipo de instancia EC2"
  type        = string
  default     = "t3.small"
}

variable "allowed_ssh_cidr" {
  description = "CIDR permitido para SSH"
  type        = string
  default     = "181.115.171.5/32"
}

variable "allowed_http_cidr" {
  description = "CIDR permitido para acceso web"
  type        = string
  default     = "0.0.0.0/0"
}

variable "key_name" {
  description = "Nombre del Key Pair para SSH"
  type        = string
  default     = "devops-key"
}

variable "ami_id" {
  description = "AMI de Ubuntu 22.04 LTS en us-east-1"
  type        = string
  default     = "ami-0c7217cdde317cfec"
}