resource "aws_security_group" "rds_instance_sg" {
  name        = "${var.project}-rds-sg"
  description = "Allow traffic to DB from default security group"
  vpc_id      = var.vpc_id
  ingress {
    description     = "Connection to DB"
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = [var.default_security_group_id]
  }
}

resource "aws_db_subnet_group" "default_sn" {
  name       = "${var.project}-rds_subnet_group"
  subnet_ids = var.subnet_ids
}

resource "aws_rds_cluster" "cluster" {
  engine                  = "aurora-postgresql"
  engine_mode             = "provisioned"
  engine_version          = "16.1"
  cluster_identifier      = var.project
  master_username         = var.username
  master_password         = var.password
  backup_retention_period = 15
  deletion_protection     = false
  skip_final_snapshot     = true
  db_subnet_group_name    = aws_db_subnet_group.default_sn.name
  vpc_security_group_ids  = [aws_security_group.rds_instance_sg.id]
}

resource "aws_rds_cluster_instance" "cluster_instances" {
  identifier         = "${var.project}-${count.index}"
  count              = 1
  cluster_identifier = aws_rds_cluster.cluster.id
  instance_class     = "db.t3.medium"
  engine             = aws_rds_cluster.cluster.engine
  engine_version     = aws_rds_cluster.cluster.engine_version

  publicly_accessible = false
}
