# Post Office 📬

A mini-blogging platform built with Nuxt 4, similar to Twitter, featuring Telegram authentication as a learning project to explore NuxtJS. 🚀

![Post Office Screenshot](/Screenshot.png)

[**Demo**](https://post-office.liara.run/)

## Features ✨
- 🔐 Telegram authentication
- ✍️ Create posts
- 💬 Reply to posts
- 😍 React to posts (maybe in the future)
- 🗑️ Delete own posts
- 📱 Responsive design

## Tech Stack 🛠️
- **Frontend**: Nuxt 4, Vue 3
- **Authentication**: Telegram Login Widget
- **UI**: Nuxt Paper UI
- **ORM**: Drizzle ORM (PostgreSQL)

## Getting Started 🚀

### Prerequisites
- Node.js (v18+)
- npm/pnpm/bun
- Telegram Bot Token

### Installation
```bash
git clone https://github.com/gnkalk/post-office.git
cd post-office
npm install
```

### Environment Setup
Create `.env` file:
```
DATABASE_URL=<your_database_url>
NUXT_TELEGRAM_BOT_TOKEN=<your_bot_token>
NUXT_PUBLIC_TELEGRAM_BOT_ID=<your_bot_id>
```

### Telegram Setup
1. Create bot via [@BotFather](https://t.me/botfather)
2. Configure domain in bot settings

### Database Setup
Keep in mind that you need to push schema to database before running the app.

## Development 🛠️
```bash
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000)

## Learning Resources 📚
- [Nuxt 4 Docs](https://nuxt.com/docs)
- [Vue 3 Docs](https://vuejs.org/)
- [Paper UI](https://paper-docs.nuxt.space/)

## Contributing 🤝
Got ideas? Spotted a bug? We'd love your help! Jump in with PRs, issues, or just feedback. Every contribution helps make Post Office better for everyone. Let's build something awesome together! 💪

## License 📄
Distributed under the Apache License 2.0 - feel free to use, modify, and share. See [LICENSE](LICENSE) for details.