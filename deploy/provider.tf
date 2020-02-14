provider "aws" {
  version = ">= 2.49.0"
  region  = var.region
}

variable "region" {
  type = string
}