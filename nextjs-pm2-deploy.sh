# Exit when any command fails
set -e

echo "Deploy starting..."

yarn install --frozen-lockfile || exit

git pull
mkdir -p temp

# Build source code to temp folder
BUILD_DIR=temp ./node_modules/next/dist/bin/next build || exit
echo "Checking build folder..."
if [ ! -d "temp" ]; then
  echo '\033[31m temp Directory not exists!\033[0m'  
  exit 1;
fi

rm -rf .next

mv temp .next

pm2 reload pm2.config.js --env prod
echo "\nDeploy done."
exit 0