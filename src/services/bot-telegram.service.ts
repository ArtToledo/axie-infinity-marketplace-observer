const TelegramBot = require('node-telegram-bot-api')

export class BotTelegramService {

  private bot
  
  constructor() {
    this.bot = new TelegramBot(process.env.TOKEN_TELEGRAM_BOT, { polling: true } )
  }

  watchMessages() {
    this.bot.on('message', (msg) => {
      const chatId = msg.chat.id
      let message: string = null
      
      if (msg.text === 'What is my chatId?') {
        message = `Your chatId is: ${chatId}`
      }
      
      if (message !== null) {
        this.bot.sendMessage(chatId, message)
      }
    })
  }

  sendMessage(message: string) {
    this.bot.sendMessage(process.env.CHATID_TELEGRAM, message)
  }
}
