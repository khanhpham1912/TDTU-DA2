#!/bin/bash

current_branch=$(git branch --show-current)

echo "Enter commit message:"
read message

echo Current branch: $current_branch
echo Commit message: $message

git add .
git commit -m "$message"
git checkout main
git pull origin main
git checkout $current_branch
git merge main

echo Merge main to $current_branch success! 