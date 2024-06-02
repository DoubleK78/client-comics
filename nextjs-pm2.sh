# Exit when any command fails
set -e

echo "Deploy starting..."

echo "Checking environment file..."
if [ ! -e "temp.env" ]; then
  echo '\033[31m temp.env file not exists!\033[0m'  
  exit 1;
fi

echo "Checking build folder..."
if [ ! -d ".temp" ]; then
  echo '\033[31m .temp Directory not exists!\033[0m'  
  exit 1;
fi

# Rename env file
rm -rf .env
mv temp.env .env
          
# Rename build folder
rm -rf .next/cache
rm -rf .next 
mv .temp .next

# Zero Downtime PM2
pm2 reload pm2.config.js --env prod
echo "Done..."

exit 0