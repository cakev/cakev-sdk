#!/usr/bin/env sh
set -e
npm run docs:build
cd docs/.vuepress/dist
git config --global user.name "fish-uncle"
git config --global user.email "fishuncle@126.com"
git init
git add -A
git commit -m 'deploy'
git push -f https://${GITHUB_TOKEN}@github.com/cakev/cakev-sdk-doc.git master:gh-pages
cd -
