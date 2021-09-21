#!/bin/bash

GREEN="\033[0;32m"
RESET="\033[0m"

echo -e "${GREEN}Remove api stack${RESET}"
aws cloudformation delete-stack --stack-name api
aws cloudformation wait stack-delete-complete --stack-name api

echo -e "${GREEN}Remove app-cluster stack${RESET}"
aws cloudformation delete-stack --stack-name app-cluster
aws cloudformation wait stack-delete-complete --stack-name app-cluster

echo -e "${GREEN}Remove iam stack${RESET}"
aws cloudformation delete-stack --stack-name iam
aws cloudformation wait stack-delete-complete --stack-name iam

echo -e "${GREEN}Remove vpc stack${RESET}"
aws cloudformation delete-stack --stack-name vpc
aws cloudformation wait stack-delete-complete --stack-name vpc

echo -e "${GREEN}Remove github-repos-api-repo stack${RESET}"
aws ecr batch-delete-image --repository-name github-repos-api-demo --image-ids imageTag=latest
aws cloudformation delete-stack --stack-name github-repos-api-repo
aws cloudformation wait stack-delete-complete --stack-name github-repos-api-repo