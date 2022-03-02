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


#Bot for testing
// Done! Congratulations on your new bot. You will find it at t.me/volunteer_dev_bot. You can now add a description, about section and profile picture for your bot, see /help for a list of commands. By the way, when you've finished creating your cool bot, ping our Bot Support if you want a better username for it. Just make sure the bot is fully operational before you do this.
//
// Use this token to access the HTTP API:
//     5106440159:AAHpYkNKTzf48MXtu3q0Dnw46ts2NHhUJIE
// Keep your token secure and store it safely, it can be used by anyone to control your bot.
//
//     For a description of the Bot API, see this page: https://core.telegram.org/bots/api
