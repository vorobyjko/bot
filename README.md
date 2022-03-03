#Install the Serverless Framework globally
npm install -g serverless

#Configure Serverless Framework to include AWS Access Key
serverless config credentials --provider aws --key <AWS_ACCESS_KEY> --secret <AWS_ACCESS_SECRET>

#Create template
serverless create --template aws-nodejs --path serverless-telegram-bot

#Deploy
serverless deploy

#Health check
serverless invoke -f hello -l

#Set webhook for telegram bot
curl -F "url=https://<AWS_ENDPOINT>/dev/api/hello" https://api.telegram.org/bot<TELEGRAM_BOT_TOKEN>/setWebhook

#Delete webhook for telegram bot
curl -F "url=https://<AWS_ENDPOINT>/dev/api/hello" https://api.telegram.org/bot<TELEGRAM_BOT_TOKEN>/deleteWebhook

#Install the Serverless offline globally for local debug
npm i -g serverless-offline

#Install Serverless offline for project
npm install serverless-offline --save-dev

#Setting Up VS Code Debugger
"start": "./node_modules/.bin/serverless offline -s dev"
