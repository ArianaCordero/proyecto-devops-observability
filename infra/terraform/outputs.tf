output "instance_id" {
  description = "ID de la instancia EC2"
  value       = aws_instance.devops_server.id
}

output "instance_public_ip" {
  description = "IP Publica de la instancia EC2"
  value       = aws_instance.devops_server.public_ip
}

output "ssh_connection" {
  description = "Comando para conectarse via SSH"
  value       = "ssh -i devops-key ubuntu@${aws_instance.devops_server.public_ip}"
}

output "app_url" {
  description = "URL de la aplicacion web"
  value       = "http://${aws_instance.devops_server.public_ip}"
}

output "grafana_url" {
  description = "URL de Grafana Dashboard"
  value       = "http://${aws_instance.devops_server.public_ip}:3000"
}

output "security_group_id" {
  description = "ID del Security Group"
  value       = aws_security_group.devops_sg.id
}