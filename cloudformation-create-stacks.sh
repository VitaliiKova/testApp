#!/bin/bash

GREEN="\033[0;32m"
RESET="\033[0m"

source .env

echo -e "${GREEN}Docker login${RESET}"
aws ecr get-login-password --region "${AWS_REGION}" | docker login --username AWS --password-stdin "${AWS_ECR_REPOSITORY_DOMAIN_URI}"

echo -e "${GREEN}Create github-repos-api-repo stack${RESET}"
aws ecr create-repository --repository-name github-repos-api-demo

echo -e "${GREEN}Build image and push${RESET}"
docker build -t github-repos-api-demo .
docker tag github-repos-api-demo:latest "${AWS_ECR_REPOSITORY_DOMAIN_URI}/github-repos-api-demo:latest"
docker push "${AWS_ECR_REPOSITORY_DOMAIN_URI}/github-repos-api-demo:latest"

echo -e "${GREEN}Create CloudFormation Stacks${RESET}"
aws cloudformation create-stack \
  --stack-name vpc \
  --template-body file://cloudformation/vpc.yml
aws cloudformation wait stack-create-complete --stack-name vpc

aws cloudformation create-stack \
  --stack-name iam \
  --template-body file://cloudformation/iam.yml  \
  --capabilities CAPABILITY_IAM
aws cloudformation wait stack-create-complete --stack-name iam

aws cloudformation create-stack \
  --stack-name app-cluster \
  --template-body file://cloudformation/app-cluster.yml
aws cloudformation wait stack-create-complete --stack-name app-cluster

aws cloudformation create-stack \
  --stack-name api \
  --template-body file://cloudformation/api.yml
aws cloudformation wait stack-create-complete --stack-name api

echo -e "${GREEN}Public URL:${RESET}"
aws cloudformation list-exports | grep 'elb.amazonaws.com' | cut -d '"' -f4