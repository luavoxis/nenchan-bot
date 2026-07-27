# nenchan

Discord bot with an embedded admin panel hosted on Vercel. Bot commands, server management, DMs, message deletion, ban/kick/timeout — all in a single serverless function.

## Features

### Bot Commands
- `/ping` — pong
- `/chat <prompt>` — Chat with Google Gemini AI
- `/banner [user]` — Show user banner
- `/profile [user]` — User profile (avatar, banner, accent color)
- `/userinfo [user]` — User info

### Admin Panel (web)
Accessible at `https://nenchan.vercel.app/api`. Login via Discord OAuth2.

- **Dashboard** — Server stats, role list
- **Members** — Member list, search/filter, role badges, ban/kick/timeout actions
- **Sanctions** — Active timeouts and bans, removal buttons
- **Messages** — Channel selection, message history (bot messages only), file attachments, delete
- **Whispers** — Send/receive DMs (by user ID)

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Vercel Serverless (Node.js) |
| Bot Framework | [Discraft](https://github.com/The-Best-Codes/discraft-js) |
| Language | TypeScript |
| AI | Google Gemini |
| Auth | HMAC-SHA256 signed token + HttpOnly cookie |
| API | Discord REST API v10 |

## Setup

### 1. Discord Developer Portal

1. Go to [discord.com/developers/applications](https://discord.com/developers/applications)
2. Create a new application
3. Get the **Bot** token from the Bot tab
4. Get the **App ID** and **Public Key** from General Information
5. Get the **Client Secret** from OAuth2
6. Generate an invite link with `applications.commands` scope via OAuth2 > URL Generator
7. Set Interactions Endpoint URL to `https://nenchan.vercel.app/api`

### 2. Environment Variables

Create a `.env` file:

```env
DISCORD_PUBLIC_KEY='...'
DISCORD_APP_ID='...'
DISCORD_TOKEN='...'
DISCORD_CLIENT_SECRET='...'
DISCORD_OWNER_ID='...'          # Your Discord user ID (only you can access the panel)
GUILD_ID='...'                  # Server ID where the bot operates
GOOGLE_AI_API_KEY='...'
GOOGLE_AI_MODEL='gemini-2.0-flash'
```

### 3. Deploy to Vercel

```bash
npm install
npm run build
vercel deploy --prod
```

Also set the environment variables in the Vercel dashboard.

### 4. Git Push = Auto Deploy

The repo is connected to `luavoxis/nenchan-bot` on GitHub. Pushing to `main` triggers automatic Vercel deployment.

## Project Structure

```
nenchan/
├── index.ts              # Main handler: Discord interactions + admin panel HTML/JS
├── commands/
│   ├── chat.ts           # /chat — Gemini AI chat
│   ├── ping.ts           # /ping
│   ├── banner.ts         # /banner
│   ├── profile.ts        # /profile
│   └── userinfo.ts       # /userinfo
├── public/icons/         # Dashboard icons
├── api/index.js          # Build output (esbuild, deployed file)
├── vercel.json           # Route rewrite + security headers
├── package.json
└── .env.example
```

## Security

- Auth token: HMAC-SHA256 signed with `DISCORD_CLIENT_SECRET`
- Cookie: `HttpOnly`, `Secure`, `SameSite=Strict`
- All user/channel IDs validated with snowflake regex
- Stack traces never exposed to client
- CSP, X-Frame-Options, HSTS, nosniff headers enabled
- Request body limited to 1MB
