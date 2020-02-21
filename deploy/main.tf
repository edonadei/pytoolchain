resource "aws_s3_bucket" "bucket" {
  bucket = "${var.env}-${var.s3_bucket_name_for_lambdas}"
  acl    = "private"

  tags = {
    Name        = "My bucket"
    Environment = var.env
  }
}

# 
resource "aws_lambda_function" "webhook_to_sqs" {
  function_name = "${var.env}-webhook-to-sqs"

  s3_bucket = aws_s3_bucket.bucket.id
  s3_key    = file("./build/webhook_to_sqs.zip")

  handler = "main.handler"
  runtime = "nodejs10.x"

  role = aws_iam_role.lambda_exec.arn
}

# IAM role which dictates what other AWS services the Lambda function
# may access.
resource "aws_iam_role" "lambda_exec" {
  name = "serverless_example_lambda"
  assume_role_policy = file("./lambda_role_policies/default.json")
}

variable "env" {
  type = string
}

variable "s3_bucket_name_for_lambdas" {
  type = string
}