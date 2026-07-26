#!/bin/bash

set -e

ROOT="$(pwd)"

if [ -d "apps/web" ]; then
  WEB="apps/web"
elif [ -d "app" ] && [ -f "package.json" ]; then
  WEB="."
else
  echo "Run from EngineeringOS root or apps/web"
  exit 1
fi

echo "Running cleanup audit in: $WEB"
echo ""

cd "$ROOT/$WEB"

echo "=============================="
echo "1. Duplicate filenames"
echo "=============================="

find . \
  -type f \
  \( -name "*.tsx" -o -name "*.ts" -o -name "*.css" \) \
  ! -path "./node_modules/*" \
  ! -path "./.next/*" \
  | sed 's#.*/##' \
  | sort \
  | uniq -d


echo ""
echo "=============================="
echo "2. Backup files"
echo "=============================="

find . \
  -type f \
  \( -name "*.backup*" -o -name "*.bak" -o -name "*.old" \) \
  ! -path "./node_modules/*"


echo ""
echo "=============================="
echo "3. Files with zero imports"
echo "=============================="

for file in $(find . \
  -type f \
  \( -name "*.tsx" -o -name "*.ts" \) \
  ! -path "./node_modules/*" \
  ! -path "./.next/*"); do


  name=$(basename "$file" | sed 's/\..*//')

  count=$(grep -R "$name" \
    --include="*.ts" \
    --include="*.tsx" \
    . \
    | grep -v "$file" \
    | grep -v node_modules \
    | wc -l)


  if [ "$count" -eq 0 ]; then
    echo "$file"
  fi

done


echo ""
echo "=============================="
echo "4. Empty folders"
echo "=============================="

find . -type d -empty \
! -path "./node_modules/*" \
! -path "./.next/*"


echo ""
echo "=============================="
echo "5. Large unused assets"
echo "=============================="

find public \
-type f \
-size +5M \
2>/dev/null


echo ""
echo "Audit complete."
echo "Review before deleting anything."
