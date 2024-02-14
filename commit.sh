#!/bin/bash

current_branch=$(git branch --show-current)

echo "Enter commit message:"
read message

echo Current branch: $current_branch
echo Commit message: $message

git add .
git commit -m "$message"
git checkout dev
git pull origin dev
git checkout $current_branch
git merge dev

echo Merge dev to $current_branch success!