# Toolchain deployment

## Init
### AWS CLI
> https://docs.aws.amazon.com/cli/latest/userguide/

See online documentation to configure AWS CLI

### Terraform
`terraform init` Initialize a Terraform working directory

#### Output
```bash

C:\WORK\pytoolchain\deploy (terraform-lambda)
λ cterraform init

Initializing the backend...

Initializing provider plugins...

Terraform has been successfully initialized!

You may now begin working with Terraform. Try running "terraform plan" to see
any changes that are required for your infrastructure. All Terraform commands
should now work.

If you ever set or change modules or backend configuration for Terraform,
rerun this command to reinitialize your working directory. If you forget, other
commands will detect it and remind you to do so if necessary.

```

## Plan
`terraform plan` Generate and show an execution plan


## Apply
`terraform apply` Builds or changes infrastructure


## Destroy
`terraform destroy` Destroy Terraform-managed infrastructure