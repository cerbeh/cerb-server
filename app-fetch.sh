#!/bin/bash

repos=(
  "https://github.com/cerbeh/WDI-Project-One.git"
)

echo ""
echo "Getting latest for" ${#repos[@]} "repositories using pull --rebase"

for repo in "${repos[@]}"
do
  echo ""
  echo "****** Getting latest for" ${repo} "******"
  cd "${repo}"
  git pull --rebase
  echo "******************************************"
done
