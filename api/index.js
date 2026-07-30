// index.ts
import { InteractionResponseType, MessageFlags as MessageFlags5 } from "discord-api-types/v10";
import { InteractionType as InteractionType2, verifyKey } from "discord-interactions";
import crypto from "crypto";

// commands/userinfo.ts
import {
  ApplicationCommandOptionType
} from "discord-api-types/v10";
async function discordFetch(url, opts = {}) {
  const u = new URL(url);
  const mod = u.protocol === "https:" ? await import("https") : await import("http");
  return new Promise((resolve, reject) => {
    const req = mod.request(u, {
      method: opts.method || "GET",
      headers: { "Content-Type": "application/json", ...opts.headers }
    }, (res) => {
      let body = "";
      res.on("data", (chunk) => body += chunk);
      res.on("end", () => {
        if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
          try {
            resolve(JSON.parse(body));
          } catch {
            resolve(body);
          }
        } else {
          let msg = `HTTP ${res.statusCode}`;
          try {
            const d = JSON.parse(body);
            msg = d.message || msg;
          } catch {
          }
          reject(new Error(msg));
        }
      });
    });
    req.on("error", reject);
    if (opts.body) {
      if (typeof opts.body === "string") req.write(opts.body);
      else req.write(JSON.stringify(opts.body));
    }
    req.end();
  });
}
function snowflakeToDate(id) {
  const timestamp = Number(BigInt(id) >> 22n) + 14200704e5;
  return new Date(timestamp).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}
var userinfo_default = {
  data: {
    name: "userinfo",
    description: "Shows detailed information about a user",
    options: [
      {
        name: "user",
        description: "The user to inspect (defaults to you)",
        type: ApplicationCommandOptionType.User,
        required: false
      }
    ]
  },
  async execute(data) {
    const interaction = data.interaction;
    const targetId = interaction.data.options?.find((o) => o.name === "user")?.value || interaction.member.user.id;
    const headers = {
      Authorization: `Bot ${process.env.DISCORD_TOKEN}`
    };
    const user = await discordFetch(
      `https://discord.com/api/v10/users/${targetId}`,
      { headers }
    );
    const isAnimated = user.avatar?.startsWith("a_");
    const ext = isAnimated ? "gif" : "png";
    const avatarUrl = user.avatar ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${ext}?size=1024` : `https://cdn.discordapp.com/embed/avatars/${Number(user.discriminator) % 5}.png`;
    const fields = [
      { name: "Username", value: `@${user.username}`, inline: true },
      { name: "Display Name", value: user.global_name || user.username, inline: true },
      { name: "ID", value: `\`${user.id}\``, inline: false },
      { name: "Bot", value: user.bot ? "Yes" : "No", inline: true },
      { name: "Joined Discord", value: snowflakeToDate(user.id), inline: true }
    ];
    if (user.accent_color) {
      fields.push({
        name: "Accent Color",
        value: `\`#${user.accent_color.toString(16).padStart(6, "0")}\``,
        inline: true
      });
    }
    const badges = [];
    const flags = user.public_flags ?? 0;
    if (flags & 1 << 0) badges.push("Discord Staff");
    if (flags & 1 << 1) badges.push("Partner");
    if (flags & 1 << 2) badges.push("HypeSquad Events");
    if (flags & 1 << 3) badges.push("Bug Hunter Lv1");
    if (flags & 1 << 6) badges.push("HypeSquad Bravery");
    if (flags & 1 << 7) badges.push("HypeSquad Brilliance");
    if (flags & 1 << 8) badges.push("HypeSquad Balance");
    if (flags & 1 << 9) badges.push("Early Supporter");
    if (flags & 1 << 10) badges.push("Team User");
    if (flags & 1 << 14) badges.push("Bug Hunter Lv2");
    if (flags & 1 << 16) badges.push("Verified Bot Dev");
    if (flags & 1 << 17) badges.push("Certified Moderator");
    if (flags & 1 << 18) badges.push("Bot HTTP Interactions");
    if (flags & 1 << 19) badges.push("Active Developer");
    if (badges.length) {
      fields.push({ name: "Badges", value: badges.join(", "), inline: false });
    }
    try {
      const member = await discordFetch(
        `https://discord.com/api/v10/guilds/${interaction.guild_id}/members/${targetId}`,
        { headers }
      );
      fields.splice(2, 0, {
        name: "Nickname",
        value: member.nick || "None",
        inline: true
      });
      const joinedAt = new Date(member.joined_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
      fields.push({ name: "Joined Server", value: joinedAt, inline: true });
      try {
        const allRoles = await discordFetch(
          `https://discord.com/api/v10/guilds/${interaction.guild_id}/roles`,
          { headers }
        );
        const memberRoleIds = member.roles;
        const memberRoles = allRoles.filter((r) => memberRoleIds.includes(r.id)).sort(
          (a, b) => b.position - a.position
        );
        fields.push({
          name: "Top Role",
          value: memberRoles[0]?.name || "None",
          inline: true
        });
        const roleMentions = memberRoles.slice(0, 10).map((r) => `<@&${r.id}>`).join(" ");
        const roleSummary = memberRoles.length > 10 ? `${roleMentions} *+${memberRoles.length - 10} more*` : roleMentions || "None";
        fields.push({ name: "Roles", value: roleSummary, inline: false });
      } catch {
        fields.push({
          name: "Roles",
          value: "*Could not fetch roles*",
          inline: false
        });
      }
    } catch (err) {
      const status = err.message?.match(/HTTP (\d+)/)?.[1] || "?";
      fields.push({ name: "Note", value: `*Could not fetch member data (HTTP ${status}) - make sure the bot has Server Members Intent enabled and try re-inviting with \`guilds.members.read\` scope*`, inline: false });
    }
    return {
      embeds: [
        {
          color: user.accent_color || 13213916,
          thumbnail: { url: avatarUrl },
          fields
        }
      ]
    };
  }
};

// commands/profile.ts
import {
  ApplicationCommandOptionType as ApplicationCommandOptionType2,
  MessageFlags as MessageFlags2
} from "discord-api-types/v10";
var profile_default = {
  data: {
    name: "profile",
    description: "Shows a user's profile picture",
    options: [
      {
        name: "user",
        description: "The user you want to see the profile of",
        type: ApplicationCommandOptionType2.User,
        required: true
      }
    ]
  },
  async execute(data) {
    const interaction = data.interaction;
    const userId = interaction.data.options?.find(
      (o) => o.name === "user"
    )?.value;
    if (!userId) {
      return {
        content: "Bir kullan\u0131c\u0131 belirtmelisin.",
        flags: MessageFlags2.Ephemeral
      };
    }
    const user = interaction.data.resolved?.users?.[userId];
    if (!user) {
      return {
        content: "Kullan\u0131c\u0131 bulunamad\u0131.",
        flags: MessageFlags2.Ephemeral
      };
    }
    const isAnimated = user.avatar.startsWith("a_");
    const ext = isAnimated ? "gif" : "png";
    const avatarUrl = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${ext}?size=1024`;
    return {
      embeds: [
        {
          color: 13213916,
          fields: [
            { name: "Username", value: `@${user.username}`, inline: true },
            { name: "ID", value: `\`${user.id}\``, inline: true }
          ],
          image: { url: avatarUrl }
        }
      ]
    };
  }
};

// commands/ping.ts
var ping_default = {
  data: {
    name: "ping",
    // The name of the command
    description: "Check if the bot is online"
    // The description of the command
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(data) {
    return {
      content: "Pong from Vercel!"
      // The message content
    };
  }
};

// commands/chat.ts
import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  ApplicationCommandOptionType as ApplicationCommandOptionType3,
  ApplicationCommandType,
  MessageFlags as MessageFlags3
} from "discord-api-types/v10";
var chat_default = {
  data: {
    name: "chat",
    // The name of the command
    description: "Chat with Gemini AI",
    // The description of the command
    options: [
      {
        name: "prompt",
        // The name of the prompt option
        description: "The prompt for the AI",
        // The description of the prompt option
        type: ApplicationCommandOptionType3.String,
        required: true
      },
      {
        name: "image",
        // The name of the image option
        description: "Optional image to include in the prompt",
        // The description of the image option
        type: ApplicationCommandOptionType3.Attachment,
        required: false
      }
    ]
  },
  async execute(data) {
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || "");
    const model = genAI.getGenerativeModel({
      model: process.env.GOOGLE_AI_MODEL || "gemini-1.5-flash"
    });
    const interaction = data.interaction;
    if (interaction.data.type !== ApplicationCommandType.ChatInput) {
      return {
        content: "This command can only be used as a chat input (slash) command.",
        flags: MessageFlags3.Ephemeral
        // Make the response visible only to the user
      };
    }
    const chatInteraction = interaction;
    const promptOption = chatInteraction.data.options?.find(
      (option) => option.name === "prompt"
    );
    const imageOption = chatInteraction.data.options?.find(
      (option) => option.name === "image"
    );
    const prompt = promptOption?.value || "";
    const imageAttachment = chatInteraction.data.resolved?.attachments?.[imageOption?.value || ""];
    if (prompt.length > 2e3) {
      return {
        content: "Prompt must be less than 2000 characters.",
        flags: MessageFlags3.Ephemeral
      };
    }
    try {
      let parts = [prompt];
      if (imageAttachment) {
        const imageBuffer = await (await fetch(imageAttachment.url)).arrayBuffer();
        const imageBase64 = Buffer.from(imageBuffer).toString("base64");
        const image = {
          inlineData: {
            data: imageBase64,
            // The base64 encoded image data
            mimeType: imageAttachment.content_type
            // The MIME type of the image
          }
        };
        parts = [prompt, image];
      }
      const result = await model.generateContent(parts);
      const response = result.response.text();
      const truncatedResponse = response.length > 1900 ? response.slice(0, 1900) + "\n...[truncated to keep below 2000 characters]" : response;
      return {
        content: truncatedResponse
      };
    } catch (error) {
      console.error("Error during AI chat:", error);
      return {
        content: "An error occurred while processing your request.",
        flags: MessageFlags3.Ephemeral
      };
    }
  }
};

// commands/banner.ts
import {
  ApplicationCommandOptionType as ApplicationCommandOptionType4,
  MessageFlags as MessageFlags4
} from "discord-api-types/v10";
async function discordFetch2(url, opts = {}) {
  const u = new URL(url);
  const mod = u.protocol === "https:" ? await import("https") : await import("http");
  return new Promise((resolve, reject) => {
    const req = mod.request(u, {
      method: opts.method || "GET",
      headers: { "Content-Type": "application/json", ...opts.headers }
    }, (res) => {
      let body = "";
      res.on("data", (chunk) => body += chunk);
      res.on("end", () => {
        if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
          try {
            resolve(JSON.parse(body));
          } catch {
            resolve(body);
          }
        } else {
          let msg = `HTTP ${res.statusCode}`;
          try {
            const d = JSON.parse(body);
            msg = d.message || msg;
          } catch {
          }
          reject(new Error(msg));
        }
      });
    });
    req.on("error", reject);
    if (opts.body) {
      if (typeof opts.body === "string") req.write(opts.body);
      else req.write(JSON.stringify(opts.body));
    }
    req.end();
  });
}
var banner_default = {
  data: {
    name: "banner",
    description: "Shows a user's banner",
    options: [
      {
        name: "user",
        description: "The user you want to see the banner of",
        type: ApplicationCommandOptionType4.User,
        required: true
      }
    ]
  },
  async execute(data) {
    const userId = data.interaction.data.options?.find(
      (o) => o.name === "user"
    )?.value;
    if (!userId) {
      return {
        content: "You must specify a user.",
        flags: MessageFlags4.Ephemeral
      };
    }
    const user = await discordFetch2(
      `https://discord.com/api/v10/users/${userId}`,
      {
        headers: {
          Authorization: `Bot ${process.env.DISCORD_TOKEN}`
        }
      }
    );
    if (!user.banner) {
      return {
        content: "This user doesn't have a banner.",
        flags: MessageFlags4.Ephemeral
      };
    }
    const isAnimated = user.banner.startsWith("a_");
    const ext = isAnimated ? "gif" : "png";
    const bannerUrl = `https://cdn.discordapp.com/banners/${user.id}/${user.banner}.${ext}?size=1024`;
    return {
      embeds: [
        {
          color: 13213916,
          image: { url: bannerUrl }
        }
      ]
    };
  }
};

// .discraft/commands/index.ts
var commands_default = {
  userinfo: userinfo_default,
  profile: profile_default,
  ping: ping_default,
  chat: chat_default,
  banner: banner_default
};

// utils/types.ts
import "discord-interactions";

// index.ts
var DISCORD_OWNER_ID = process.env.DISCORD_OWNER_ID || "";
var DISCORD_APP_ID = process.env.DISCORD_APP_ID || "";
var DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET || "";
var HMAC_SECRET = process.env.DISCORD_CLIENT_SECRET || process.env.DISCORD_TOKEN || "";
var OAUTH_REDIRECT = "https://nenchan.vercel.app/api";
if (!HMAC_SECRET) {
  console.error("FATAL: HMAC_SECRET is empty \uFFFD set DISCORD_CLIENT_SECRET or DISCORD_TOKEN");
}
var rateLimitMap = /* @__PURE__ */ new Map();
var RATE_LIMIT_WINDOW = 6e4;
var RATE_LIMIT_MAX = 60;
function checkRateLimit(ip) {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW);
  if (recent.length >= RATE_LIMIT_MAX) return false;
  recent.push(now);
  rateLimitMap.set(ip, recent);
  if (rateLimitMap.size > 1e4) {
    const cutoff = now - RATE_LIMIT_WINDOW;
    for (const [key, vals] of rateLimitMap) {
      const filtered = vals.filter((t) => t > cutoff);
      if (filtered.length === 0) rateLimitMap.delete(key);
      else rateLimitMap.set(key, filtered);
    }
  }
  return true;
}
function parseLimit(val, fallback, max) {
  const n = parseInt(String(val), 10);
  if (isNaN(n) || n < 1) return fallback;
  return Math.min(n, max);
}
function clampMinutes(val) {
  const n = parseInt(String(val), 10);
  if (isNaN(n) || n < 0) return 0;
  return Math.min(n, 40320);
}
var MAX_CONTENT_LENGTH = 2e3;
var MAX_FILE_SIZE = 8 * 1024 * 1024;
var ALLOWED_FILE_TYPES = /^(image|video|audio|text)\//;
function validateContent(content) {
  if (content === void 0 || content === null) return "";
  if (typeof content !== "string") return null;
  if (content.length > MAX_CONTENT_LENGTH) return null;
  return content;
}
function validateFileUpload(fileData, fileName, fileType) {
  if (!fileData || !fileName) return null;
  if (typeof fileData !== "string" || typeof fileName !== "string") return null;
  let buf;
  try {
    buf = Buffer.from(fileData, "base64");
  } catch {
    return null;
  }
  if (buf.length > MAX_FILE_SIZE) return null;
  const safeName = fileName.replace(/[^\w.\-]/g, "_").slice(0, 100);
  const type = typeof fileType === "string" && ALLOWED_FILE_TYPES.test(fileType) ? fileType : "application/octet-stream";
  return { buf, blob: new Blob([buf], { type }), name: safeName };
}
function signState(state) {
  const sig = crypto.createHmac("sha256", HMAC_SECRET).update(state).digest("hex");
  return state + "." + sig;
}
function verifyState(signed) {
  try {
    const idx = signed.lastIndexOf(".");
    if (idx === -1) return false;
    const state = signed.slice(0, idx);
    const sig = signed.slice(idx + 1);
    const expected = crypto.createHmac("sha256", HMAC_SECRET).update(state).digest("hex");
    return crypto.timingSafeEqual(Buffer.from(sig, "hex"), Buffer.from(expected, "hex"));
  } catch {
    return false;
  }
}
function logRequest(method, path, action, ip, status) {
  console.log(JSON.stringify({ ts: (/* @__PURE__ */ new Date()).toISOString(), method, path, action: action || "-", ip, status }));
}
async function discordFetch3(url, opts = {}) {
  const u = new URL(url);
  const http = await (u.protocol === "https:" ? import("https") : import("http"));
  const options = {
    hostname: u.hostname,
    port: u.port || (u.protocol === "https:" ? 443 : 80),
    path: u.pathname + u.search,
    method: opts.method || "GET",
    headers: { ...opts.headers }
  };
  if (opts.body && !options.headers["Content-Type"]) {
    options.headers["Content-Type"] = "application/json";
  }
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let body = "";
      res.on("data", (chunk) => body += chunk);
      res.on("end", () => {
        if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
          try {
            resolve(JSON.parse(body));
          } catch {
            resolve(body);
          }
        } else {
          let msg = `HTTP ${res.statusCode}`;
          try {
            const d = JSON.parse(body);
            msg = d.message || msg;
          } catch {
          }
          reject(new Error(msg));
        }
      });
    });
    req.on("error", reject);
    if (opts.body) {
      if (typeof opts.body === "string") req.write(opts.body);
      else req.write(JSON.stringify(opts.body));
    }
    req.end();
  });
}
function signToken(userId) {
  const sig = crypto.createHmac("sha256", HMAC_SECRET).update(userId).digest("hex");
  return Buffer.from(userId).toString("base64") + "." + sig;
}
function verifyToken(token) {
  try {
    const parts = token.split(".");
    if (parts.length !== 2) return false;
    const userId = Buffer.from(parts[0], "base64").toString();
    const expectedSig = crypto.createHmac("sha256", HMAC_SECRET).update(userId).digest("hex");
    return crypto.timingSafeEqual(Buffer.from(parts[1], "hex"), Buffer.from(expectedSig, "hex"));
  } catch {
    return false;
  }
}
function getTokenFromRequest(req) {
  const cookie = req.headers.cookie;
  if (cookie) {
    const match = cookie.match(/token=([^;]+)/);
    if (match) return match[1];
  }
  const auth = req.headers.authorization;
  if (auth?.startsWith("Bearer ")) return auth.slice(7);
  return null;
}
var SNOWFLAKE_RE = /^\d{17,20}$/;
function isValidSnowflake(id) {
  return typeof id === "string" && SNOWFLAKE_RE.test(id);
}
function htmlEscape(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
function html() {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<title>nenchan v1.0</title>
<link rel="icon" href="/favicon.ico" type="image/x-icon"/>
<style>
@font-face{font-family:'Space Grotesk';font-style:normal;font-weight:300 700;src:url('/fonts/space-grotesk-latin.woff2') format('woff2')}
*{box-sizing:border-box;margin:0;padding:0}
body{font:12px/1.4 'Space Grotesk',monospace;background:#13161b;color:#c0bcc4;height:100vh;overflow:hidden}
*::-webkit-scrollbar{width:0;height:0}
*{scrollbar-width:none;-ms-overflow-style:none}
.sidebar{width:160px;background:#191d23;border-right:1px solid #222;padding:12px;display:flex;flex-direction:column;gap:1px;height:100vh;overflow:hidden;position:fixed;top:0;left:0;z-index:10}
.sidebar-nav{flex:1;overflow-y:auto;display:flex;flex-direction:column;gap:1px}
.sidebar h1{font-size:11px;color:#6d6572;text-transform:uppercase;letter-spacing:1px;margin-bottom:12px;padding:0;text-align:center}
.sidebar button{background:none;border:none;color:#6d6572;font:11px 'Space Grotesk',monospace;padding:7px 10px;text-align:left;cursor:pointer;border-radius:4px;transition:all .15s;display:flex;align-items:center;gap:8px}
.sidebar button:hover{color:#c0bcc4;background:#1e2228}
.sidebar button.active{color:#e0dce4;background:#232830;border-left:2px solid #b48899;padding-left:8px}
.sidebar button img{width:14px;height:14px;opacity:.4;filter:grayscale(1)}
.sidebar button:hover img{opacity:.7}
.sidebar button.active img{opacity:1;filter:none}
#logoutBtn{margin-top:auto;padding:7px 10px;border-radius:4px;flex-shrink:0}
#logoutBtn img{opacity:1;filter:none}
.bocchi-wrap{text-align:center;padding:12px 0 8px}
.bocchi-wrap img{width:90px;height:auto;opacity:.85}
.main{flex:1;padding:16px;margin-left:160px;height:100vh;overflow-y:auto}
.panel{display:none}
.panel.show{display:block}
#panel-messages.show{display:flex;flex-direction:column;height:calc(100vh - 32px);overflow:hidden}
h2{font-size:12px;color:#6d6572;text-transform:uppercase;letter-spacing:1px;margin-bottom:12px;font-weight:400}
label{display:block;color:#6d6572;font-size:10px;text-transform:uppercase;margin-bottom:2px;margin-top:6px;font-weight:600}
input,textarea,select{width:100%;padding:4px 6px;border:1px solid #2e343c;border-radius:6px;background:#191d23;color:#c0bcc4;font:12px 'Space Grotesk',monospace;margin-bottom:6px;outline:none}
input:focus,textarea:focus,select:focus{border-color:#b48899}
button{padding:4px 10px;background:#252a32;color:#c0bcc4;border:1px solid #2e343c;border-radius:6px;font:11px 'Space Grotesk',monospace;cursor:pointer;transition:all .15s}
button:hover{background:#2e343c;color:#e0dce4}
button:disabled{opacity:0.4;cursor:not-allowed}
.flex{display:flex;gap:4px;margin-bottom:4px}
.flex button{flex:1}
.error{color:#d45555;font-size:11px;margin-bottom:4px}
.success{color:#55b488;font-size:11px;margin-bottom:4px}
textarea{resize:vertical;min-height:50px;font:12px 'Space Grotesk',monospace}
select option{background:#13161b;color:#c0bcc4}
.stat{background:#191d23;border:1px solid #252a32;padding:10px;margin-bottom:4px;border-radius:8px;transition:border-color .15s}
.stat:hover{border-color:#3a3340}
.stat span{color:#6d6572;font-size:10px;text-transform:uppercase;letter-spacing:.5px;font-weight:600}
.stat p{color:#e0dce4;font-size:13px;margin-top:2px}
.dash-banner{height:120px;background:#191d23;border:1px solid #252a32;border-radius:8px;margin-bottom:8px;overflow:hidden;background-size:cover;background-position:center}
.dash-header{display:flex;align-items:center;gap:14px;padding:16px;background:#191d23;border:1px solid #252a32;margin-bottom:8px;border-radius:8px;transition:border-color .15s}
.dash-header:hover{border-color:#3a3340}
.dash-icon{width:64px;height:64px;border-radius:18px;flex-shrink:0;background:#1e2228;border:1px solid #2e343c;overflow:hidden}
.dash-icon img{width:100%;height:100%;object-fit:cover}
.dash-info{flex:1;min-width:0}
.dash-name{color:#e0dce4;font-size:16px;font-weight:600;margin:0}
.dash-id{color:#5a5260;font-size:10px;margin-top:2px;font-weight:600}
.dash-grid{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:8px}
.dash-card{background:#191d23;border:1px solid #252a32;padding:8px 10px;display:flex;align-items:center;gap:10px;border-radius:8px;transition:border-color .15s;min-width:0}
.dash-card:hover{border-color:#3a3340}
.dash-card-icon{width:32px;height:32px;background:#fff;display:flex;align-items:center;justify-content:center;flex-shrink:0;border-radius:8px}
.dash-card-icon img{width:16px;height:16px}
.dash-card-label{color:#6d6572;font-size:9px;text-transform:uppercase;letter-spacing:.5px;font-weight:600}
.dash-card-val{color:#e0dce4;font-size:14px;margin-top:1px}
.dash-card-sub{color:#5a5260;font-size:9px;margin-top:1px;font-weight:600}
.dash-roles-wrap{background:#191d23;border:1px solid #252a32;border-radius:8px;overflow:hidden;margin-bottom:8px}
.dash-roles-header{display:flex;justify-content:space-between;align-items:center;padding:10px 12px;cursor:pointer}
.dash-roles-header span{color:#6d6572;font-size:10px;text-transform:uppercase;letter-spacing:.5px;font-weight:600}
.dash-roles-header .role-arrow{color:#5a5260;font-size:9px;transition:transform .2s}
.dash-roles-list{display:none;border-top:1px solid #252a32;padding:6px 8px}
.dash-roles-list.show{display:block}
.dash-roles-list::-webkit-scrollbar{width:4px}
.dash-roles-list::-webkit-scrollbar-thumb{background:#3a424c;border-radius:2px}
table{width:100%;border-collapse:collapse;font-size:11px;margin-top:4px}
td,th{padding:4px 6px;text-align:left;border-bottom:1px solid #2e343c;color:#9a929e}
th{color:#6d6572;font-size:10px;text-transform:uppercase;font-weight:600}
.member-row{cursor:pointer}
.member-row:hover{background:#1e2228}
.modal{position:fixed;inset:0;background:rgba(19,22,27,.88);display:none;justify-content:center;align-items:center;z-index:100}
.modal.show{display:flex}
.modal-box{background:#1e2228;border:1px solid #3a424c;padding:16px;width:90%;max-width:400px}
.modal-box h3{font-size:12px;color:#e0dce4;margin-bottom:8px}
.modal-box p{font-size:11px;color:#7d7582;margin-bottom:6px}
.stat[onclick]{cursor:pointer}
.stat[onclick]:hover{background:#0e0e0e}
.role-toggle{cursor:pointer;user-select:none}
.role-toggle:hover{color:#e0dce4}
.role-list{display:none;max-height:200px;overflow-y:auto;margin-top:4px;padding:4px 0;border-top:1px solid #2e343c}
.role-list.show{display:block}
.role-item{display:flex;align-items:center;gap:6px;padding:4px 6px;font-size:10px;color:#9a929e;border-radius:4px}
.role-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0;border:1px solid rgba(255,255,255,.05)}
#msgHistory{scrollbar-width:none;-ms-overflow-style:none}
#msgHistory::-webkit-scrollbar{display:none}
.msg-row{display:grid;grid-template-columns:40px 1fr;gap:8px;padding:2px 14px;position:relative;align-items:start}
.msg-row:hover{background:#191d23}
.msg-row:hover .msg-act{display:inline}
.msg-avatar{width:40px;height:40px;border-radius:50%;flex-shrink:0;cursor:pointer;justify-self:center}
.msg-body{min-width:0}
.msg-author{font-weight:600;color:#e0dce4;font-size:15px;cursor:pointer}
.msg-author:hover{text-decoration:underline}
.msg-time{color:#5a5260;font-size:11px;margin-left:6px}
.msg-time-inline{color:#5a5260;font-size:10px;margin-left:8px}
.msg-edited{color:#5a5260;font-size:10px;margin-left:4px}
.msg-content{color:#c0bcc4;margin:0;word-wrap:break-word;white-space:pre-wrap;line-height:1.45;font-size:14px}
.msg-content .mention{color:#b48899;background:rgba(180,136,153,0.12);padding:0 4px;border-radius:3px;cursor:pointer;font-weight:500}
.msg-content .mention:hover{background:rgba(180,136,153,0.25)}
.msg-content code{background:#252a32;padding:1px 5px;border-radius:4px;font-size:12px;color:#e0dce4}
.msg-content pre{background:#191d23;border:1px solid #252a32;border-radius:8px;padding:10px;margin:4px 0;overflow-x:auto;font-size:12px;color:#e0dce4}
.msg-content pre code{background:none;padding:0}
.msg-content a{color:#b48899;text-decoration:none}
.msg-content a:hover{text-decoration:underline}
.msg-content blockquote{border-left:3px solid #b48899;padding-left:10px;color:#6d6572;margin:4px 0}
.msg-content .spoiler{background:#252a32;color:transparent;border-radius:3px;padding:0 4px;cursor:pointer}
.msg-content .spoiler:hover,.msg-content .spoiler.revealed{color:#c0bcc4;background:rgba(180,136,153,0.15)}
.msg-ref{color:#5a5260;font-size:12px;padding:2px 0;border-left:2px solid #252a32;padding-left:10px;margin:2px 0 4px;display:flex;align-items:center;gap:6px}
.msg-ref:hover{color:#6d6572}
.msg-sticker{max-height:120px;border-radius:8px;margin:4px 0}
.msg-img{max-width:340px;max-height:240px;border-radius:8px;margin:4px 0;cursor:pointer;display:block}
.msg-video{max-width:380px;max-height:260px;border-radius:8px;margin:4px 0;display:block}
.msg-audio{max-width:340px;margin:4px 0}
.msg-file-link{color:#b48899;text-decoration:none;font-size:12px;padding:6px 10px;border:1px solid #252a32;border-radius:8px;display:inline-block;background:#191d23;transition:all .15s}
.msg-file-link:hover{border-color:#b48899;background:#1e2228}
.msg-embed{background:#1e2228;border-left:4px solid #b48899;border-radius:0 8px 8px 0;padding:10px 14px;margin:6px 0;max-width:450px;transition:background .15s;font-size:13px}
.msg-embed:hover{background:#22262e}
.msg-embed-author{color:#b48899;font-size:11px;font-weight:700;margin-bottom:4px;text-transform:uppercase;letter-spacing:.3px}
.msg-embed-title{color:#e0dce4;font-size:14px;font-weight:700;margin-bottom:4px;line-height:1.3}
.msg-embed-title:hover{text-decoration:underline;cursor:pointer}
.msg-embed-desc{color:#b5b0bc;font-size:13px;line-height:1.5;margin-bottom:4px}
.msg-embed-field-name{color:#e0dce4;font-size:12px;font-weight:700;margin-top:8px;margin-bottom:2px}
.msg-embed-field-val{color:#b5b0bc;font-size:12px;line-height:1.4;margin-bottom:2px}
.msg-reactions{display:flex;flex-wrap:wrap;gap:4px;margin-top:4px}
.msg-reaction{display:inline-flex;align-items:center;gap:4px;padding:3px 8px;border:1px solid #252a32;border-radius:6px;background:#191d23;font-size:12px;color:#c0bcc4;cursor:pointer;transition:all .15s}
.msg-reaction:hover{border-color:#b48899;background:#1e2228}
.msg-reaction-count{font-weight:600;color:#e0dce4}
.msg-act{font-size:10px;color:#5a5260;cursor:pointer;transition:color .15s;user-select:none}
.msg-actions{position:absolute;top:2px;right:14px;z-index:5;display:none;gap:8px}
.msg-row:hover .msg-actions{display:flex}
.msg-act:hover{color:#b48899}
.msg-act-del:hover{color:#d45555}
.msg-day-divider{text-align:center;margin:10px 0 6px;position:relative}
.msg-day-divider span{background:#13161b;padding:0 12px;color:#5a5260;font-size:11px;position:relative;z-index:1}
.msg-day-divider::before{content:'';position:absolute;top:50%;left:0;right:0;height:1px;background:#1e2228}
.msg-group-start{margin-top:0;padding-top:0}
.msg-compose{flex-shrink:0;margin-top:4px}
.msg-compose textarea{width:100%;border:1px solid #2e343c;border-radius:8px;background:#13161b;color:#c0bcc4;padding:6px 10px;font:13px/1.4 'Space Grotesk',sans-serif;resize:none;max-height:80px;outline:none;margin:0;transition:border-color .15s;display:block;box-sizing:border-box}
.msg-compose textarea:focus{border-color:#b48899}
.msg-compose textarea::placeholder{color:#5a5260}
.msg-input-row .inline-mention-wrap{flex:1}
.msg-input-row textarea{width:100%;border:1px solid #2e343c;border-radius:8px;background:#13161b;color:#c0bcc4;padding:6px 10px;font:13px/1.4 'Space Grotesk',sans-serif;resize:none;max-height:80px;outline:none;margin:0;display:block;box-sizing:border-box}
.msg-input-row textarea:focus{border-color:#b48899}
.inline-mention-wrap{position:relative}
.inline-mention-list{display:none;position:absolute;bottom:100%;left:0;right:0;background:#1e2228;border:1px solid #2e343c;border-bottom:none;border-radius:8px 8px 0 0;max-height:160px;overflow-y:auto;z-index:20}
.inline-mention-list.show{display:block}
.inline-mention-list .mention-item{display:flex;align-items:center;gap:8px;padding:6px 10px;cursor:pointer;font-size:12px;color:#c0bcc4;transition:background .1s}
.inline-mention-list .mention-item:hover,.inline-mention-list .mention-item.hl{background:#252a32}
.inline-mention-list .mention-item img{width:22px;height:22px;border-radius:50%;flex-shrink:0}
.mention-item .emoji-wrap img{width:16px;height:16px;border-radius:0;flex-shrink:0}
.msg-topbar{display:flex;gap:6px;margin-bottom:6px}
.msg-topbar .msg-channel-pick{max-width:180px;position:relative;flex-shrink:0}
.msg-topbar .msg-channel-pick input{width:100%;padding:6px 10px;border:1px solid #2e343c;border-radius:8px;background:#13161b;color:#c0bcc4;font:13px 'Space Grotesk',sans-serif;outline:none;margin:0;box-sizing:border-box}
.msg-topbar .msg-channel-pick input:focus{border-color:#b48899}
.msg-topbar .msg-search-input{flex:1;min-width:0}
.msg-topbar .msg-search-input input{width:100%;padding:6px 10px;border:1px solid #2e343c;border-radius:8px;background:#13161b;color:#c0bcc4;font:13px 'Space Grotesk',sans-serif;outline:none;margin:0;box-sizing:border-box}
.msg-topbar .msg-search-input input:focus{border-color:#b48899}
.msg-topbar .msg-search-input input::placeholder{color:#5a5260}
.msg-history-box{flex:1;min-height:0;overflow-y:auto;padding:6px 0;font-size:14px;line-height:1.4;scrollbar-width:thin;scrollbar-color:#252a32 transparent}
.msg-history-box::-webkit-scrollbar{width:6px}
.msg-history-box::-webkit-scrollbar-track{background:transparent}
.msg-history-box::-webkit-scrollbar-thumb{background:#252a32;border-radius:3px}
.msg-history-box::-webkit-scrollbar-thumb:hover{background:#363d47}
.member-grid{display:flex;flex-direction:column;gap:4px;max-height:calc(100vh - 155px);overflow-y:auto;scrollbar-width:none;-ms-overflow-style:none}
.member-grid::-webkit-scrollbar{display:none}
.member-card{display:flex;align-items:center;gap:8px;padding:6px 8px;background:#191d23;border:1px solid #252a32;border-radius:6px;cursor:pointer;transition:border-color .15s}
.member-card:hover{border-color:#3a3340}
.member-avatar{width:28px;height:28px;border-radius:50%;flex-shrink:0;border:2px solid #252a32}
.member-info{flex:1;min-width:0}
.member-name{color:#e0dce4;font-size:10px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.member-name span{color:#5a5260;font-size:9px;font-weight:400}
.member-username{color:#5a5260;font-size:9px}
.member-badges{display:flex;gap:2px;margin-top:1px}
.member-badge{font-size:7px;padding:1px 3px;border-radius:2px;font-weight:600;text-transform:uppercase;letter-spacing:.3px}
.badge-boost{background:rgba(180,136,153,.15);color:#b48899}
.member-roles{display:flex;gap:2px;flex-wrap:wrap;margin-top:2px}
.role-badge{font-size:8px;padding:1px 4px;border-radius:2px;background:#252a32;color:#7d7582;border:1px solid #2e343c;white-space:nowrap;font-weight:600}
.role-group-header{font-size:9px;color:#6d6572;text-transform:uppercase;letter-spacing:.5px;padding:8px 8px 4px;margin-top:8px;font-weight:600;display:flex;align-items:center;gap:6px}
.role-group-header:first-child{margin-top:0}
.role-group-count{color:#5a5260;font-weight:400;font-size:9px}
.member-joined{color:#5a5260;font-size:8px;flex-shrink:0;font-weight:600}
.member-search{width:100%;padding:6px 8px;border:1px solid #2e343c;border-radius:6px;background:#191d23;color:#c0bcc4;font:11px 'Space Grotesk',monospace;margin-bottom:6px;outline:none;transition:border-color .15s}
.member-search:focus{border-color:#b48899}
.member-search::placeholder{color:#5a5260}
.member-stats{display:grid;grid-template-columns:1fr 1fr 1fr;gap:4px;margin-bottom:6px}
.member-stat{text-align:center;padding:6px 4px;background:#191d23;border:1px solid #252a32;border-radius:6px;transition:border-color .15s}
.member-stat:hover{border-color:#3a3340}
.member-stat span{display:block;font-size:8px;color:#6d6572;text-transform:uppercase;letter-spacing:.5px;font-weight:600}
.member-stat p{font-size:12px;color:#e0dce4;margin-top:1px;font-weight:600}
.modal-box{background:#1e2228;border:1px solid #3a424c;padding:0;width:90%;max-width:400px;overflow:hidden;border-radius:12px}
.modal-banner{height:80px;background-size:cover;background-position:center}
.modal-banner-color{height:8px}
.modal-header{display:flex;align-items:center;gap:12px;padding:16px;border-bottom:1px solid #252a32;background:#1e2228}
.modal-header img{width:48px;height:48px;border-radius:50%;border:3px solid #252a32;flex-shrink:0}
.modal-header-info h3{font-size:13px;color:#e0dce4;margin:0;font-weight:600}
.modal-header-info p{font-size:10px;color:#5a5260;margin:2px 0 0}
.modal-body{padding:12px 16px}
.modal-section{margin-bottom:10px}
.modal-section-label{font-size:9px;color:#6d6572;text-transform:uppercase;letter-spacing:.5px;margin-bottom:4px;font-weight:600}
.modal-roles{display:flex;flex-wrap:wrap;gap:4px}
.modal-role{display:flex;align-items:center;gap:4px;font-size:10px;color:#9a929e;padding:3px 8px;background:#252a32;border:1px solid #2e343c;border-radius:4px}
.modal-role-dot{width:6px;height:6px;border-radius:50%;flex-shrink:0}
.role-edit-btn{display:block;width:100%;padding:5px;margin-top:6px;background:#252a32;color:#b48899;border:1px dashed #3a3340;border-radius:6px;font:10px 'Space Grotesk',monospace;cursor:pointer;text-align:center;transition:all .15s}
.role-edit-btn:hover{background:#2e343c;border-color:#b48899;color:#d4b0be}
.role-editor-item{display:flex;align-items:center;gap:6px;padding:4px 6px;border-radius:4px;cursor:pointer;transition:background .1s;font-size:10px;color:#9a929e}
.role-editor-item:hover{background:#252a32}
.role-editor-item .role-check{width:14px;height:14px;border:1px solid #3a424c;border-radius:3px;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:8px;transition:all .15s}
.role-editor-item.has-role .role-check{background:#b48899;border-color:#b48899;color:#13161b}
.role-editor-item.has-role{color:#e0dce4}
.file-picker{position:relative;display:flex;align-items:center;gap:4px}
.file-picker input[type=file]{position:absolute;inset:0;opacity:0;cursor:pointer;width:100%}
.file-label{flex:1;padding:5px 8px;background:#191d23;border:1px solid #2e343c;color:#5a5260;font:11px 'Space Grotesk',monospace;cursor:pointer;display:flex;align-items:center;gap:6px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}
.file-label:hover{border-color:#4a4350;color:#7d7582}
.file-label.has-file{color:#c0bcc4;border-color:#3a3340}
.modal-footer{padding:10px 16px;border-top:1px solid #252a32;text-align:right}
.modal-footer button{background:#252a32;color:#9a929e;border:1px solid #2e343c;padding:5px 16px;font:11px 'Space Grotesk',monospace;cursor:pointer;border-radius:6px;transition:all .15s}
.modal-footer button:hover{background:#2e343c;color:#e0dce4}
.modal-actions{display:flex;gap:4px;padding:10px 16px;border-top:1px solid #252a32;background:#1e2228}
.modal-actions button{flex:1;padding:6px 8px;font-size:10px;border:1px solid #3a424c;background:#252a32;color:#9a929e;cursor:pointer;font-family:'Space Grotesk',monospace;border-radius:6px;transition:all .15s}
.modal-actions button:hover{background:#2e343c;color:#e0dce4}
.btn-ban{border-color:#d45555 !important;color:#d45555 !important}
.btn-ban:hover{background:#d45555 !important;color:#e0dce4 !important}
.btn-kick{border-color:#e8a630 !important;color:#e8a630 !important}
.btn-kick:hover{background:#e8a630 !important;color:#13161b !important}
.btn-timeout{border-color:#b48899 !important;color:#b48899 !important}
.btn-timeout:hover{background:#b48899 !important;color:#13161b !important}
.confirm-overlay{position:fixed;inset:0;background:rgba(19,22,27,.88);display:none;justify-content:center;align-items:center;z-index:200}
.confirm-overlay.show{display:flex}
.confirm-box{background:#1e2228;border:1px solid #3a424c;padding:0;width:90%;max-width:320px;overflow:hidden;border-radius:12px}
.confirm-title{padding:12px 16px;font-size:12px;color:#e0dce4;border-bottom:1px solid #252a32;font-weight:600}
.confirm-body{padding:12px 16px}
.confirm-body label{display:block;color:#6d6572;font-size:9px;text-transform:uppercase;margin-bottom:2px;margin-top:8px;font-weight:600}
.confirm-body label:first-child{margin-top:0}
.confirm-body input,.confirm-body select,.confirm-body textarea{width:100%;padding:6px 8px;border:1px solid #2e343c;border-radius:6px;background:#13161b;color:#c0bcc4;font:11px 'Space Grotesk',monospace;outline:none;margin:0}
.confirm-body input:focus,.confirm-body textarea:focus{border-color:#b48899}
.confirm-footer{display:flex;gap:4px;padding:8px 16px;border-top:1px solid #252a32}
.confirm-footer button{flex:1;padding:6px 10px;font-size:11px;border:1px solid #3a424c;background:#252a32;color:#9a929e;cursor:pointer;font-family:'Space Grotesk',monospace;border-radius:6px;transition:all .15s}
.confirm-footer button:hover{background:#2e343c;color:#e0dce4}
.confirm-footer .confirm-danger{border-color:#d45555;color:#d45555}
.confirm-footer .confirm-danger:hover{background:#d45555;color:#e0dce4}
#panel-dms.show{display:flex;flex-direction:column;height:calc(100vh - 32px);overflow:hidden}
.mention-list{display:none;position:absolute;top:100%;left:0;right:0;background:#1e2228;border:1px solid #2e343c;border-top:none;max-height:180px;overflow-y:auto;z-index:10;scrollbar-width:none;border-radius:0 0 8px 8px}
.mention-list::-webkit-scrollbar{display:none}
.mention-list.show{display:block}
.mention-item{display:flex;align-items:center;gap:8px;padding:5px 8px;cursor:pointer;font-size:11px;color:#c0bcc4;transition:background .15s}
.mention-item:hover{background:#252a32}
.mention-item img{width:20px;height:20px;border-radius:50%;flex-shrink:0}
.mention-item .m-name{flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.mention-item .m-bot{color:#b48899;font-size:8px;text-transform:uppercase;font-weight:600;margin-left:4px}
.channel-list{display:none;position:absolute;top:100%;left:0;right:0;background:#1e2228;border:1px solid #2e343c;border-top:none;max-height:200px;overflow-y:auto;z-index:10;scrollbar-width:none;border-radius:0 0 8px 8px}
.channel-list::-webkit-scrollbar{display:none}
.channel-list.show{display:block}
.channel-item{display:flex;align-items:center;gap:6px;padding:5px 8px;cursor:pointer;font-size:11px;color:#c0bcc4;transition:background .15s}
.channel-item:hover{background:#252a32}
.channel-item .ch-hash{color:#5a5260;font-weight:600;flex-shrink:0}
.channel-item .ch-name{flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.channel-item .ch-topic{color:#5a5260;font-size:9px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:120px}
.channel-item.selected{background:#232830;color:#e0dce4}
.channel-item.selected .ch-hash{color:#b48899}
.ban-card{display:flex;align-items:center;gap:12px;padding:10px 12px;border-bottom:1px solid #252a32;transition:background .15s}
.ban-card:last-child{border-bottom:none}
.ban-card:hover{background:#252a32}
.ban-card img{width:36px;height:36px;border-radius:50%;flex-shrink:0}
.ban-info{flex:1;min-width:0}
.ban-name{color:#e0dce4;font-size:12px;font-weight:600}
.ban-name span{color:#5a5260;font-size:10px;font-weight:400;margin-left:4px}
.ban-username{color:#5a5260;font-size:10px;margin-top:1px}
.ban-reason{color:#d45555;font-size:10px;margin-top:3px;font-weight:600;padding:2px 6px;background:rgba(212,85,85,.1);border-radius:4px;display:inline-block}
.ban-unban-btn{padding:5px 14px;font-size:10px;border:1px solid #d45555;border-radius:6px;background:transparent;color:#d45555;cursor:pointer;font-family:'Space Grotesk',monospace;flex-shrink:0;font-weight:600;transition:all .15s}
.ban-unban-btn:hover{background:#d45555;color:#fff}
.timeout-card{display:flex;align-items:center;gap:12px;padding:10px 12px;border-bottom:1px solid #252a32;transition:background .15s}
.timeout-card:last-child{border-bottom:none}
.timeout-card:hover{background:#252a32}
.timeout-card img{width:36px;height:36px;border-radius:50%;flex-shrink:0}
.timeout-info{flex:1;min-width:0}
.timeout-name{color:#e0dce4;font-size:12px;font-weight:600}
.timeout-name span{color:#5a5260;font-size:10px;font-weight:400;margin-left:4px}
.timeout-username{color:#5a5260;font-size:10px;margin-top:1px}
.timeout-detail{font-size:10px;margin-top:3px;display:flex;gap:8px;flex-wrap:wrap;align-items:center}
.timeout-expiry{color:#b48899;font-weight:600}
.timeout-remaining{color:#6d6572;font-size:9px;padding:1px 5px;background:#252a32;border-radius:3px}
.timeout-reason{color:#e8a630;font-weight:600;padding:1px 5px;background:rgba(232,166,48,.1);border-radius:3px}
.timeout-remove{padding:5px 14px;font-size:10px;border:1px solid #b48899;border-radius:6px;background:transparent;color:#b48899;cursor:pointer;font-family:'Space Grotesk',monospace;flex-shrink:0;font-weight:600;transition:all .15s}
.timeout-remove:hover{background:#b48899;color:#13161b}
.mod-section-title{font-size:10px;color:#6d6572;text-transform:uppercase;letter-spacing:.5px;padding:12px 12px 8px;font-weight:600;display:flex;align-items:center;gap:6px}
.mod-section-title .count{color:#5a5260;font-weight:400;background:#252a32;padding:1px 6px;border-radius:10px;font-size:9px;margin-left:4px}
.mod-section-title .dot{width:8px;height:8px;border-radius:50%;flex-shrink:0}
.mod-section{margin-bottom:8px;background:#191d23;border:1px solid #252a32;border-radius:8px;overflow:hidden}
.mod-empty{padding:16px 12px;color:#5a5260;font-size:10px;text-align:center}
.mod-search{display:flex;gap:6px;margin-bottom:8px}
.mod-search input{flex:1}
.mod-search button{padding:5px 14px;white-space:nowrap}
.msg-edit-area textarea{width:100%;padding:6px 8px;border:1px solid #b48899;border-radius:6px;background:#13161b;color:#c0bcc4;font:11px 'Space Grotesk',monospace;resize:none;min-height:36px;outline:none}
.msg-edit-actions{display:flex;gap:4px;margin-top:4px}
.msg-edit-actions button{padding:3px 10px;font-size:10px;border-radius:4px;border:none;cursor:pointer;font-family:'Space Grotesk',monospace}
.msg-edit-save{background:#b48899;color:#13161b}
.msg-edit-cancel{background:#252a32;color:#7d7582}
.msg-edit-area textarea{width:100%;padding:6px 8px;border:1px solid #b48899;border-radius:6px;background:#13161b;color:#c0bcc4;font:11px 'Space Grotesk',monospace;resize:none;min-height:36px;outline:none}
.msg-load-more{text-align:center;padding:6px;cursor:pointer;color:#b48899;font-size:12px;border:1px solid #2e343c;border-radius:8px;background:#13161b;transition:all .15s;margin-bottom:6px}
.msg-load-more:hover{border-color:#b48899;background:#1e2228}
.audit-entry{display:grid;grid-template-columns:36px 1fr auto;gap:10px;padding:10px 12px;border-bottom:1px solid #252a32;transition:background .15s;font-size:12px;align-items:start;background:#191d23;border:1px solid #252a32;border-radius:8px;margin-bottom:4px}
.audit-entry:hover{border-color:#3a3340}
.audit-entry:last-child{margin-bottom:0}
.audit-avatar{width:36px;height:36px;border-radius:50%;flex-shrink:0;border:2px solid #252a32}
.audit-info{min-width:0}
.audit-action{color:#c0bcc4;line-height:1.4}
.audit-action b{color:#e0dce4;font-weight:600}
.audit-action .hl{color:#b48899;font-weight:600}
.audit-time{color:#5a5260;font-size:9px;flex-shrink:0;white-space:nowrap;margin-left:auto;margin-top:2px;font-weight:600;text-transform:uppercase;letter-spacing:.3px}
.audit-target{color:#5a5260;font-size:11px;margin-top:3px;font-family:monospace;background:#13161b;padding:2px 6px;border-radius:4px;display:inline-block}
.audit-changes{margin-top:6px;display:flex;flex-direction:column;gap:3px;background:#13161b;border-radius:6px;padding:6px 8px}
.audit-change{font-size:11px;color:#6d6572;display:flex;align-items:flex-start;gap:4px;flex-wrap:wrap}
.audit-change-key{color:#5a5260;font-size:10px;text-transform:uppercase;letter-spacing:.3px;min-width:60px;flex-shrink:0;margin-top:1px}
.audit-change-old{color:#d45555;font-size:11px;word-break:break-word}
.audit-change-new{color:#43b581;font-size:11px;word-break:break-word}
.audit-change-arrow{color:#3a3340;font-size:10px;margin:0 2px}
.audit-reason{color:#5a5260;font-size:11px;margin-top:4px;font-style:italic;border-left:2px solid #252a32;padding-left:6px}
.audit-options{color:#6d6572;font-size:10px;margin-top:3px;background:#13161b;padding:4px 6px;border-radius:4px;display:inline-block}
.invite-card{display:flex;align-items:center;gap:10px;padding:8px 10px;border-bottom:1px solid #252a32;transition:background .15s}
.invite-card:last-child{border-bottom:none}
.invite-card:hover{background:#1e2228}
.invite-code{color:#b48899;font-family:monospace;font-size:11px;font-weight:600}
.invite-info{flex:1;min-width:0}
.invite-meta{color:#5a5260;font-size:9px;margin-top:2px}
.invite-details{display:flex;align-items:center;gap:8px;margin-top:2px;flex-wrap:wrap}
.invite-details span{color:#6d6572;font-size:9px}
.invite-created{color:#5a5260}
.invite-expires{color:#6d6572}
.invite-never{color:#43b581}
.invite-expired{color:#d45555}
.invite-expires-in{color:#faa61a}
.invite-temp-badge{color:#13161b;background:#faa61a;padding:1px 5px;border-radius:3px;font-weight:600;font-size:8px;text-transform:uppercase;letter-spacing:.3px}
.invite-uses-count{color:#e0dce4;font-weight:600}
.invite-unlimited{color:#43b581;font-size:11px}
.invite-members{color:#5a5260}
.invite-del{padding:4px 10px;font-size:9px;border:1px solid #d45555;color:#d45555;background:transparent;border-radius:4px;cursor:pointer;font-family:'Space Grotesk',monospace;transition:all .15s;flex-shrink:0}
.invite-del:hover{background:#d45555;color:#fff}
.emoji-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(48px,1fr));gap:4px;max-height:300px;overflow-y:auto;padding:4px}
.emoji-grid::-webkit-scrollbar{width:4px}
.emoji-grid::-webkit-scrollbar-thumb{background:#252a32;border-radius:2px}
.emoji-item{display:flex;flex-direction:column;align-items:center;gap:2px;padding:6px;border-radius:6px;cursor:pointer;transition:background .15s}
.emoji-item:hover{background:#252a32}
.emoji-item img{width:32px;height:32px}
.emoji-item span{font-size:8px;color:#5a5260;text-align:center;word-break:break-all;max-width:48px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.channel-card{display:flex;align-items:center;gap:10px;padding:8px 10px;border-bottom:1px solid #252a32;transition:background .15s}
.channel-card:last-child{border-bottom:none}
.channel-card:hover{background:#1e2228}
.channel-icon{color:#6d6572;font-size:14px;flex-shrink:0}
.channel-name{color:#e0dce4;font-size:11px;font-weight:600;flex:1}
.channel-type{color:#5a5260;font-size:9px;padding:2px 6px;background:#252a32;border-radius:3px;flex-shrink:0}
.channel-menu{position:relative;margin-left:auto;flex-shrink:0}
.channel-menu-btn{background:none;border:none;color:#5a5260;font-size:16px;cursor:pointer;padding:2px 6px;border-radius:4px;line-height:1;transition:all .15s}
.channel-menu-btn:hover{color:#e0dce4;background:#252a32}
.channel-menu-dropdown{display:none;position:fixed;right:auto;bottom:auto;background:#1e2228;border:1px solid #2e343c;border-radius:6px;padding:4px 0;z-index:999;min-width:80px;box-shadow:0 4px 12px rgba(0,0,0,.4)}
.channel-menu-dropdown.show{display:block}
.channel-menu-dropdown div{padding:6px 12px;font-size:10px;color:#c0bcc4;cursor:pointer;white-space:nowrap}
.channel-menu-dropdown div:hover{background:#252a32;color:#e0dce4}
.channel-menu-dropdown div.menu-sep{border-top:1px solid #2e343c;margin:4px 0;padding:0;height:0;cursor:default;background:none}
.channel-menu-dropdown div.menu-sep:hover{background:none}
.channel-cat{margin-bottom:4px;background:#191d23;border:1px solid #252a32;border-radius:8px;overflow:hidden}
.channel-cat-header{display:flex;align-items:center;gap:8px;padding:7px 10px;background:#1e2228;border-bottom:1px solid #252a32}
.channel-cat-header .channel-menu{margin-left:auto}
.channel-cat .channel-card{border-bottom:1px solid #1e2228;padding-left:28px}
.channel-cat .channel-card:last-child{border-bottom:none}
.create-form{display:flex;gap:6px;margin-bottom:10px;flex-wrap:wrap;align-items:center}
.create-form input,.create-form select{flex:1;min-width:100px;margin:0}
.create-form button{padding:6px 14px;font:12px/1.4 'Space Grotesk',sans-serif;font-weight:600;border-radius:6px;background:#b48899;color:#13161b;border:none;cursor:pointer;white-space:nowrap;height:30px;display:flex;align-items:center}
.create-form button:hover{background:#c9a0ae}
.toast{position:fixed;bottom:20px;right:20px;padding:10px 16px;border-radius:8px;font:11px 'Space Grotesk',monospace;z-index:300;animation:toastIn .2s ease;max-width:320px}
.toast-success{background:#1e3a2a;border:1px solid #55b488;color:#55b488}
.toast-error{background:#3a1e1e;border:1px solid #d45555;color:#d45555}
@keyframes toastIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
.activity-item{display:flex;align-items:center;gap:10px;padding:8px 10px;border-bottom:1px solid #252a32}
.activity-item:last-child{border-bottom:none}
.activity-item img{width:28px;height:28px;border-radius:50%;flex-shrink:0}
.activity-text{flex:1;font-size:11px;color:#c0bcc4}
.activity-text b{color:#e0dce4;font-weight:600}
.activity-time{color:#5a5260;font-size:9px;flex-shrink:0;font-weight:600}
.activity-badge{font-size:8px;padding:2px 6px;border-radius:3px;font-weight:600;text-transform:uppercase;margin-left:4px}
.badge-join{background:rgba(85,180,136,.15);color:#55b488}
.badge-kick{background:rgba(212,85,85,.15);color:#d45555}
.badge-ban{background:rgba(212,85,85,.15);color:#d45555}
.badge-boost{background:rgba(180,136,153,.15);color:#b48899}
.dash-edit-btn{background:none;border:none;color:#5a5260;cursor:pointer;font-size:10px;padding:2px 6px;border-radius:4px;transition:all .15s}
.dash-edit-btn:hover{color:#b48899;background:rgba(180,136,153,.1)}
</style>
</head>
<body>
<div id="sidebar" class="sidebar">
<div class="sidebar-nav">
<button class="active" data-tab="dashboard" onclick="switchTab('dashboard')"><img src="/icons/dashboard.png" alt="">dashboard</button>
<button data-tab="members" onclick="switchTab('members')"><img src="/icons/members.png" alt="">members</button>
<button data-tab="bans" onclick="switchTab('bans')"><img src="/icons/sanctions.png" alt="">sanctions</button>
<button data-tab="messages" onclick="switchTab('messages')"><img src="/icons/messages.png" alt="">messages</button>
<button data-tab="dms" onclick="switchTab('dms')"><img src="/icons/whispers.png" alt="">whispers</button>
<button data-tab="channels" onclick="switchTab('channels')"><img src="/icons/channels2.png" alt="">channels</button>
<button data-tab="invites" onclick="switchTab('invites')"><img src="/icons/invites.png" alt="">invites</button>
<button data-tab="emojis" onclick="switchTab('emojis')"><img src="/icons/emojis.png" alt="">emojis</button>
<button data-tab="audit" onclick="switchTab('audit')"><img src="/icons/auditlog.png" alt="">audit log</button>
<div class="bocchi-wrap"><img src="/icons/bocchi-rotate.gif" alt=""/></div>
</div>
<button id="logoutBtn" onclick="logout()"><img src="/icons/logout.png" alt="">logout</button>
</div>
<div class="main">
<div id="loginOverlay" style="display:none;position:fixed;inset:0;background:rgba(19,22,27,.92);z-index:99;justify-content:center;align-items:center">
<div style="background:#1e2228;border:1px solid #252a32;padding:32px 28px;width:100%;max-width:300px;text-align:center;border-radius:12px">
<img src="/icons/nenchan.png" alt="nenchan" style="width:160px;height:auto;margin-bottom:4px"/>
<p style="color:#5a5260;font-size:10px;margin-bottom:20px;text-transform:uppercase;letter-spacing:1.5px">admin panel</p>
<div id="loginError" style="color:#d45555;font-size:11px;margin-bottom:8px;min-height:16px"></div>
<button onclick="loginDiscord()" style="width:100%;padding:10px 12px;background:#b48899;color:#13161b;border:none;border-radius:4px;font:600 12px 'Space Grotesk',monospace;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;transition:background .15s" onmouseover="this.style.background='#c9a0ae'" onmouseout="this.style.background='#b48899'"><img src="/icons/discord.png" alt="" style="width:18px;height:18px;filter:brightness(0)"/>Login with Discord</button>
<p style="color:#3a3340;font-size:9px;margin-top:12px">authorized users only</p>
</div>
</div>
<div id="panel-dashboard" class="panel">
<div id="dashContent"><p style="color:#6d6572">loading...</p></div>
</div>
<div id="panel-messages" class="panel">
<div class="msg-topbar">
<div class="msg-channel-pick" id="channelPicker">
<input type="text" id="channelSearch" placeholder="#channel" oninput="filterChannels(this.value)" onfocus="showChannelList()"/>
<div id="channelList" class="channel-list"></div>
</div>
<div class="msg-search-input">
<input type="text" id="msgSearchInput" placeholder="search messages..." oninput="filterMsgHistory(this.value)"/>
</div>
</div>
<div id="msgLoadMore" class="msg-load-more" style="display:none" onclick="loadMoreMessages()">load older messages</div>
<div id="msgHistory" class="msg-history-box">
<p style="color:#5a5260;text-align:center;padding:20px 0">select a channel</p>
</div>
<div class="msg-compose">
<div class="inline-mention-wrap">
<textarea id="msgInput" placeholder="message..." onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();sendMsg()}"></textarea>
<div id="inlineMentionList" class="inline-mention-list"></div>
<div id="emojiAutocompleteList" class="inline-mention-list"></div>
</div>
</div>
</div>
<div id="panel-members" class="panel">
<input type="text" class="member-search" id="memberSearch" placeholder="search members..." oninput="filterMembers(this.value)"/>
<div id="memberStats" class="member-stats"></div>
<div id="memberList" class="member-grid"><p style="color:#6d6572;text-align:center;padding:20px 0">loading...</p></div>
</div>
<div id="panel-dms" class="panel">
<div class="msg-topbar">
<div class="msg-channel-pick" id="dmPicker">
<input type="text" id="dmSearch" placeholder="select DM..." oninput="filterDmChannels(this.value)" onfocus="showDmChannelList()"/>
<div id="dmChannelList" class="channel-list"></div>
</div>
<div class="msg-search-input">
<input type="text" id="dmMsgSearch" placeholder="search messages..." oninput="filterDmMsgHistory(this.value)"/>
</div>
</div>
<div id="dmLoadMore" class="msg-load-more" style="display:none" onclick="loadMoreDmMessages()">load older messages</div>
<div id="dmHistory" class="msg-history-box">
<p style="color:#5a5260;text-align:center;padding:20px 0">select a DM conversation</p>
</div>
<div class="msg-compose">
<div class="inline-mention-wrap">
<textarea id="dmInput" placeholder="message..." onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();sendDm()}"></textarea>
<div id="inlineMentionListDm" class="inline-mention-list"></div>
<div id="emojiAutocompleteListDm" class="inline-mention-list"></div>
</div>
</div>
</div>
<div id="panel-bans" class="panel">
<div id="banStats" class="member-stats"></div>
<div id="banTimeouts"></div>
<div id="banBans"></div>
</div>
<div id="panel-channels" class="panel">
<div class="create-form" id="channelCreateForm">
<input type="text" id="newChannelName" placeholder="channel name"/>
<select id="newChannelType"><option value="0">Text</option><option value="2">Voice</option></select>
<select id="newChannelCategory"><option value="">no category</option></select>
<button onclick="createChannel()" style="background:#b48899;color:#13161b;border:none">create</button>
</div>
<div id="channelManageList"></div>
</div>
<div id="panel-invites" class="panel">
<div id="inviteList"></div>
</div>
<div id="panel-emojis" class="panel">
<div id="emojiContent"></div>
</div>
<div id="panel-audit" class="panel">
<div id="auditList"></div>
</div>
<div id="userModal" class="modal"><div class="modal-box" id="modalBox"></div></div>
<div id="roleModal" class="modal"><div class="modal-box" id="roleModalBox" style="max-width:360px;padding:0;border-radius:12px"><div class="modal-header" style="padding:12px 16px"><h3 style="font-size:12px;color:#e0dce4;margin:0;font-weight:600">edit roles</h3></div><div id="roleModalBody" style="padding:10px 16px;max-height:400px;overflow-y:auto"></div><div class="modal-footer" style="padding:8px 16px"><button onclick="closeRoleEditor()">close</button></div></div></div>
<div id="confirmOverlay" class="confirm-overlay">
<div class="confirm-box">
<div class="confirm-title" id="confirmTitle">confirm</div>
<div class="confirm-body" id="confirmBody"></div>
<div class="confirm-footer">
<button onclick="closeConfirm()">cancel</button>
<button class="confirm-danger" id="confirmBtn" onclick="executeConfirm()">confirm</button>
</div>
</div>
</div>
<div id="channelEditModal" class="modal"><div class="modal-box" id="channelEditBox" style="max-width:380px;padding:0;border-radius:12px"><div class="modal-header" style="padding:12px 16px"><h3 id="channelEditTitle" style="font-size:12px;color:#e0dce4;margin:0;font-weight:600">edit channel</h3></div><div id="channelEditBody" style="padding:12px 16px"></div><div class="modal-footer" style="padding:8px 16px"><button onclick="saveChannelEdit()" style="background:#b48899;color:#13161b;border:none;font-weight:600">save</button><button onclick="closeChannelEdit()" style="margin-left:4px">cancel</button></div></div></div>
<script>
function g(i){return document.getElementById(i)}
var allMembers=[],allRoles=[],allChannels=[];

function loginDiscord(){
  api({action:"oauth_url"},function(d){
    if(d.url){window.location.href=d.url}
    else{g("loginError").textContent=d.error||"failed to start login"}
  });
}

function initPanel(){
  g("loginOverlay").style.display="none";
  g("panel-dashboard").classList.add("show");
  loadDashboard();loadMembers();loadMsgChannels();
  parseTwemoji();
}

function switchTab(name){
  document.querySelectorAll(".panel").forEach(function(e){e.classList.remove("show")});
  var el=g("panel-"+name);
  if(el)el.classList.add("show");
  document.querySelectorAll(".sidebar button").forEach(function(b){b.classList.remove("active")});
  var btn=document.querySelector(".sidebar button[data-tab='"+name+"']");
  if(btn)btn.classList.add("active");
  if(name==="messages")loadMsgChannels();
  if(name==="members")loadMembers();
  if(name==="dashboard")loadDashboard();
  if(name==="bans")loadModerations();
  if(name==="dms")loadDmChannels();
  if(name==="channels")loadChannels();
  if(name==="invites")loadInvites();
  if(name==="emojis")loadEmojis();
  if(name==="audit")loadAuditLog();

}

function api(body,cb){
  var x=new XMLHttpRequest();
  x.open("POST","/api",true);
  x.setRequestHeader("Content-Type","application/json");
  x.onload=function(){try{var d=JSON.parse(x.responseText);cb(d)}catch(e){console.error("api error:",e,x.responseText.slice(0,300));cb({error:"api error: "+(e.message||e)})}};
  x.onerror=function(){cb({error:"connection error"})};
  x.send(JSON.stringify(body));
}

var botId=null;
function loadDashboard(){
  api({action:"guildinfo"},function(d){
    if(d.error)return;
    if(d.botId)botId=d.botId;
    var iconHtml=d.icon?"<img class='dash-icon' src='"+d.icon+"' alt=''/>":"<div class='dash-icon' style='display:flex;align-items:center;justify-content:center;color:#5a5260;font-size:22px'>"+esc(d.name.charAt(0))+"</div>";
    var rolesSorted=d.roles.slice().sort(function(a,b){return b.position-a.position});
    var hoisted=rolesSorted.filter(function(r){return r.hoist});
    var roleItems=rolesSorted.map(function(r){
      var c=r.color?"#"+r.color.toString(16).padStart(6,"0"):"#666";
      return "<div class='role-item'><span class='role-dot' style='background:"+c+"'></span>"+esc(r.name)+"</div>";
    }).join("");
    var hdrIdx=Math.floor(Math.random()*3)+1;
    var h="<div class='dash-banner' id='dashBanner' data-hdr='/icons/headers/header"+hdrIdx+".png'></div>";
    h+="<div class='dash-header'>";
    h+=iconHtml;
    h+="<div class='dash-info'><p class='dash-name'><span id='guildNameDisplay' style='cursor:pointer' onclick='editGuildName()' title='click to edit'>"+esc(d.name)+"</span> <button class='dash-edit-btn' onclick='editGuildName()' title='edit server name'>&#9998;</button></p><div class='dash-id'>"+esc(d.created)+"</div></div>";
    h+="</div>";
    h+="<div class='dash-grid'>";
    h+="<div class='dash-card'><div class='dash-card-icon'><img src='/icons/users.png' alt=''/></div><div><div class='dash-card-label'>members</div><div class='dash-card-val'>"+d.totalMembers+"</div><div class='dash-card-sub'>"+d.humans+" humans &middot; "+d.bots+" bots</div></div></div>";
    h+="<div class='dash-card'><div class='dash-card-icon'><img src='/icons/boost.png' alt=''/></div><div><div class='dash-card-label'>boosts</div><div class='dash-card-val'>"+d.boostCount+" boosts</div><div class='dash-card-sub'>tier "+d.boostLevel+" &middot; "+Math.max(0,14-d.boostCount)+" to next tier</div></div></div>";
    h+="</div>";
    h+="<div class='dash-roles-wrap'>";
    h+="<div class='dash-roles-header' onclick='toggleDashRoles()'><span>roles ("+d.roleCount+")</span><span class='role-arrow' id='dashRoleArrow'>&#9660;</span></div>";
    h+="<div id='dashRoleList' class='dash-roles-list'>"+roleItems+"</div>";
    h+="</div>";
    h+="<div id='dashActivity' style='background:#191d23;border:1px solid #252a32;border-radius:8px;padding:10px;margin-bottom:8px'></div>";
    g("dashContent").innerHTML=h;
    var b=g("dashBanner");if(b&&b.dataset.hdr)b.style.backgroundImage="url('"+b.dataset.hdr+"')";
    loadDashboardActivity();
  });
}

function toggleDashRoles(){g("dashRoleList").classList.toggle("show");g("dashRoleArrow").innerHTML=g("dashRoleList").classList.contains("show")?"&#9650;":"&#9660;"}

var allModData={timeouts:[],bans:[]};
function loadModerations(){
  g("banTimeouts").innerHTML="<p style='color:#6d6572;font-size:10px'>loading...</p>";
  g("banBans").innerHTML="";
  g("banStats").innerHTML="";
  api({action:"moderations"},function(d){
    if(d.error){g("banTimeouts").innerHTML="";g("banBans").innerHTML="<p style='color:#d45555;font-size:10px'>"+esc(d.error)+"</p>";return}
    var timeouts=d.timeouts||[];
    var bans=d.bans||[];
    allModData={timeouts:timeouts,bans:bans};
    g("banStats").innerHTML="<div class='member-stat'><span>timeout</span><p>"+timeouts.length+"</p></div>"+
      "<div class='member-stat'><span>banned</span><p>"+bans.length+"</p></div>"+
      "<div class='member-stat'><span>total</span><p>"+(timeouts.length+bans.length)+"</p></div>";
    renderTimeouts(timeouts);
    renderBans(bans);
  });
}

function renderTimeouts(timeouts){
  var h="<div class='mod-section'>";
  h+="<div class='mod-section-title'><span class='dot' style='background:#b48899'></span>timed out</div>";
  if(!timeouts.length){
    h+="<div class='mod-empty'>no active timeouts</div>";
  }else{
    h+="<div class='mod-search'><input type='text' id='banSearchTimeout' placeholder='search timeouts...' oninput='filterTimeouts(this.value)'/></div>";
    h+="<div id='timeoutList'>";
    for(var i=0;i<timeouts.length;i++){h+=renderTimeoutCard(timeouts[i])}
    h+="</div>";
  }
  h+="</div>";
  g("banTimeouts").innerHTML=h;
}

function renderTimeoutCard(m){
  var u=m.user;
  var avatar=u.avatar?"https://cdn.discordapp.com/avatars/"+u.id+"/"+u.avatar+(u.avatar.startsWith("a_")?".gif":".png"):"https://cdn.discordapp.com/embed/avatars/"+(parseInt(u.discriminator||"0")%5)+".png";
  var name=u.global_name||u.username;
  var until=new Date(m.communication_disabled_until);
  var now=new Date();
  var remaining=until-now;
  var remStr="";
  if(remaining<=0){remStr="expired"}
  else if(remaining>86400000){remStr=Math.floor(remaining/86400000)+"d "+Math.floor((remaining%86400000)/3600000)+"h"}
  else if(remaining>3600000){remStr=Math.floor(remaining/3600000)+"h "+Math.floor((remaining%3600000)/60000)+"m"}
  else{remStr=Math.floor(remaining/60000)+"m"}
  var expiryStr=until.toLocaleString("en-US",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"});
  var h="<div class='timeout-card'>";
  h+="<img src='"+avatar+"' alt='' loading='lazy'/>";
  h+="<div class='timeout-info'>";
  h+="<div class='timeout-name'>"+esc(name)+(u.bot?"<span>bot</span>":"")+"</div>";
  h+="<div class='timeout-username'>"+esc(u.username)+" &middot; "+u.id+"</div>";
  h+="<div class='timeout-detail'>";
  h+="<span class='timeout-expiry'>"+expiryStr+"</span>";
  h+="<span class='timeout-remaining'>"+remStr+"</span>";
  if(m.reason)h+="<span class='timeout-reason'>"+esc(m.reason)+"</span>";
  h+="</div></div>";
  h+="<button class='timeout-remove' data-uid='"+u.id+"' data-name='"+esc(name)+"' onclick='event.stopPropagation();removeTimeout(this)'>remove</button>";
  h+="</div>";
  return h;
}

function renderBans(bans){
  var h="<div class='mod-section'>";
  h+="<div class='mod-section-title'><span class='dot' style='background:#d45555'></span>banned</div>";
  if(!bans.length){
    h+="<div class='mod-empty'>no banned users</div>";
  }else{
    h+="<div class='mod-search'><input type='text' id='banSearchBan' placeholder='search banned...' oninput='filterBansOnly(this.value)'/></div>";
    h+="<div id='banList'>";
    for(var i=0;i<bans.length;i++){h+=renderBanCard(bans[i])}
    h+="</div>";
  }
  h+="</div>";
  g("banBans").innerHTML=h;
}

function renderBanCard(b){
  var u=b.user;
  var avatar=u.avatar?"https://cdn.discordapp.com/avatars/"+u.id+"/"+u.avatar+(u.avatar.startsWith("a_")?".gif":".png"):"https://cdn.discordapp.com/embed/avatars/"+(parseInt(u.discriminator||"0")%5)+".png";
  var name=u.global_name||u.username;
  var h="<div class='ban-card'>";
  h+="<img src='"+avatar+"' alt='' loading='lazy'/>";
  h+="<div class='ban-info'>";
  h+="<div class='ban-name'>"+esc(name)+(u.bot?"<span>bot</span>":"")+"</div>";
  h+="<div class='ban-username'>"+esc(u.username)+" &middot; "+u.id+"</div>";
  if(b.reason)h+="<div class='ban-reason'>"+esc(b.reason)+"</div>";
  h+="</div>";
  h+="<button class='ban-unban-btn' data-uid='"+u.id+"' data-name='"+esc(name)+"' onclick='event.stopPropagation();confirmUnban(this)'>unban</button>";
  h+="</div>";
  return h;
}

function filterTimeouts(q){
  q=q.toLowerCase();
  var ft=allModData.timeouts.filter(function(m){
    var u=m.user;
    var name=(u.global_name||u.username).toLowerCase();
    return name.indexOf(q)!==-1||u.username.toLowerCase().indexOf(q)!==-1||u.id.indexOf(q)!==-1;
  });
  var list=g("timeoutList");
  if(!list)return;
  if(!ft.length){list.innerHTML="<div class='mod-empty'>no matching timeouts</div>";return}
  var h="";for(var i=0;i<ft.length;i++)h+=renderTimeoutCard(ft[i]);
  list.innerHTML=h;
}

function filterBansOnly(q){
  q=q.toLowerCase();
  var fb=allModData.bans.filter(function(b){
    var u=b.user;
    var name=(u.global_name||u.username).toLowerCase();
    return name.indexOf(q)!==-1||u.username.toLowerCase().indexOf(q)!==-1||u.id.indexOf(q)!==-1;
  });
  var list=g("banList");
  if(!list)return;
  if(!fb.length){list.innerHTML="<div class='mod-empty'>no matching bans</div>";return}
  var h="";for(var i=0;i<fb.length;i++)h+=renderBanCard(fb[i]);
  list.innerHTML=h;
}

function confirmUnban(el){
  var uid=el.dataset.uid,name=el.dataset.name;
  g("confirmTitle").textContent="unban "+name;
  g("confirmBody").innerHTML="<p style='color:#7d7582;font-size:11px'>are you sure you want to unban <b style='color:#e0dce4'>"+esc(name)+"</b>?</p>";
  var btn=g("confirmBtn");
  btn.className="confirm-danger";
  btn.textContent="unban";
  btn.onclick=function(){executeUnban(uid)};
  g("confirmOverlay").classList.add("show");
}

function executeUnban(uid){
  g("confirmOverlay").classList.remove("show");
  api({action:"unban",userId:uid},function(d){
    if(d.success){loadModerations()}
    else{alert(d.error||"failed to unban");loadModerations()}
  });
}

function removeTimeout(el){
  var uid=el.dataset.uid,name=el.dataset.name;
  g("confirmTitle").textContent="remove timeout";
  g("confirmBody").innerHTML="<p style='color:#7d7582;font-size:11px'>remove timeout for <b style='color:#e0dce4'>"+esc(name)+"</b>?</p>";
  var btn=g("confirmBtn");
  btn.className="confirm-danger";
  btn.textContent="remove";
  btn.onclick=function(){executeRemoveTimeout(uid)};
  g("confirmOverlay").classList.add("show");
}

function executeRemoveTimeout(uid){
  g("confirmOverlay").classList.remove("show");
  api({action:"timeout",userId:uid,minutes:0},function(d){
    if(d.success){loadModerations()}
    else{alert(d.error||"failed to remove timeout");loadModerations()}
  });
}

var selectedChannelId=null;
var allChannelData=[];
function loadMsgChannels(){
  api({action:"channels"},function(d){
    if(d.error){g("channelSearch").placeholder="error: "+esc(d.error);return}
    var list=g("channelList");
    list.innerHTML="";
    allChannelData=[];
    for(var i=0;i<d.channels.length;i++){
      if(d.channels[i].type===0){
        var item=document.createElement("div");
        item.className="channel-item";
        item.dataset.cid=d.channels[i].id;
        item.dataset.name=d.channels[i].name;
        item.innerHTML="<span class='ch-hash'>#</span><span class='ch-name'>"+esc(d.channels[i].name)+"</span>"+(d.channels[i].topic?"<span class='ch-topic'>"+esc(d.channels[i].topic)+"</span>":"");
        item.onclick=function(){pickChannel(this.dataset.cid,this.dataset.name)};
        list.appendChild(item);
        allChannelData.push({id:d.channels[i].id,name:d.channels[i].name,topic:d.channels[i].topic||""});
      }
    }
    api({action:"members"},function(md){
      if(md.error)return;
      var seen={};
      allMembers=[];
      for(var i=0;i<md.members.length;i++){
        var m=md.members[i];
        if(!seen[m.user.id]){seen[m.user.id]=1;allMembers.push(m)}
      }
    });
  });
}
function showChannelList(){
  var el=g("channelList");
  if(!el.children.length&&allChannelData.length){
    allChannelData.forEach(function(c){
      var item=document.createElement("div");
      item.className="channel-item";
      item.dataset.cid=c.id;
      item.dataset.name=c.name;
      item.innerHTML="<span class='ch-hash'>#</span><span class='ch-name'>"+esc(c.name)+"</span>"+(c.topic?"<span class='ch-topic'>"+esc(c.topic)+"</span>":"");
      item.onclick=function(){pickChannel(c.id,c.name)};
      el.appendChild(item);
    });
  }
  el.classList.add("show");
}
function hideChannelList(){
  setTimeout(function(){g("channelList").classList.remove("show")},150);
}
function filterChannels(q){
  q=q.toLowerCase();
  var items=g("channelList").children;
  for(var i=0;i<items.length;i++){
    var name=items[i].dataset.name||"";
    items[i].style.display=name.toLowerCase().indexOf(q)===-1?"none":"";
  }
}
function pickChannel(cid,name){
  selectedChannelId=cid;
  g("channelSearch").value="#"+name;
  g("channelList").classList.remove("show");
  g("channelSearch").focus();
  loadMsgHistory(cid);
}

function sendMsg(){
  var c=selectedChannelId,m=g("msgInput").value.trim();
  if(!c)return;
  if(!m)return;
  g("msgInput").value="";
  api({action:"send",channelId:c,content:m},function(d){
    if(d.success)loadMsgHistory(c);
  });
}

function deleteMsg(cid,mid){
  if(!confirm("delete this message?"))return;
  var el=document.querySelector('[data-mid="'+mid+'"]');
  if(el)el.style.opacity="0.4";
  api({action:"delete",channelId:cid,messageId:mid},function(d){
    if(d.success){loadMsgHistory(cid)}
    else{if(el)el.style.opacity="1";alert(d.error||"failed to delete")}
  });
}

function loadMembers(){
  api({action:"members"},function(d){
    if(d.error)return;
    allMembers=d.members;allRoles=d.roles;
    var humans=0,bots=0;
    for(var i=0;i<d.members.length;i++){if(d.members[i].user.bot)bots++;else humans++}
    g("memberStats").innerHTML="<div class='member-stat'><span>total</span><p>"+d.members.length+"</p></div>"+
      "<div class='member-stat'><span>humans</span><p>"+humans+"</p></div>"+
      "<div class='member-stat'><span>bots</span><p>"+bots+"</p></div>";
    renderMembers(d.members);
  });
}

function renderMembers(members){
  var sortedRoles=allRoles.slice().sort(function(a,b){return b.position-a.position});
  var hoistedRoles=sortedRoles.filter(function(r){return r.hoist});
  var groups={};
  var ungrouped=[];
  for(var i=0;i<members.length;i++){
    var m=members[i];
    var highestHoisted=null;
    for(var j=0;j<sortedRoles.length;j++){
      if(m.roles.indexOf(sortedRoles[j].id)!==-1&&sortedRoles[j].hoist){highestHoisted=sortedRoles[j];break}
    }
    if(highestHoisted){
      if(!groups[highestHoisted.id])groups[highestHoisted.id]={role:highestHoisted,members:[]};
      groups[highestHoisted.id].members.push(m);
    }else{ungrouped.push(m)}
  }
  var h="";
  for(var k=0;k<hoistedRoles.length;k++){
    var gid=hoistedRoles[k].id;
    if(!groups[gid])continue;
    var g2=groups[gid];
    var rc=g2.role.color?"#"+g2.role.color.toString(16).padStart(6,"0"):"#555";
    g2.members.sort(function(a,b){
      var an=a.nick||(a.user.global_name||a.user.username).toLowerCase();
      var bn=b.nick||(b.user.global_name||b.user.username).toLowerCase();
      return an.localeCompare(bn);
    });
    h+="<div class='role-group-header' style='color:"+rc+"'>"+esc(g2.role.name)+" <span class='role-group-count'>"+g2.members.length+"</span></div>";
    for(var i=0;i<g2.members.length;i++){h+=renderMemberCard(g2.members[i])}
  }
  if(ungrouped.length){
    ungrouped.sort(function(a,b){
      var an=a.nick||(a.user.global_name||a.user.username).toLowerCase();
      var bn=b.nick||(b.user.global_name||b.user.username).toLowerCase();
      return an.localeCompare(bn);
    });
    h+="<div class='role-group-header'>offline <span class='role-group-count'>"+ungrouped.length+"</span></div>";
    for(var i=0;i<ungrouped.length;i++){h+=renderMemberCard(ungrouped[i])}
  }
  if(!members.length)h="<p style='color:#5a5260;text-align:center;padding:20px 0'>no members found</p>";
  g("memberList").innerHTML=h;
}

function renderMemberCard(m){
  var name=m.nick||(m.user.global_name||m.user.username);
  var avatar=m.user.avatar?"https://cdn.discordapp.com/avatars/"+m.user.id+"/"+m.user.avatar+(m.user.avatar.startsWith("a_")?".gif":".png"):"https://cdn.discordapp.com/embed/avatars/"+(parseInt(m.user.discriminator||"0")%5)+".png";
  var joined=new Date(m.joined_at).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"});
  var roleBadges="";
  for(var j=0;j<m.roles.length&&j<3;j++){
    var role=allRoles.find(function(x){return x.id===m.roles[j]});
    if(role){
      var rc=role.color?"#"+role.color.toString(16).padStart(6,"0"):"#555";
      roleBadges+="<span class='role-badge' style='border-color:"+rc+"44;color:"+rc+"'>"+esc(role.name)+"</span>";
    }
  }
  if(m.roles.length>3)roleBadges+="<span class='role-badge'>+"+(m.roles.length-3)+"</span>";
  var badges="";
  if(m.premium_since)badges+="<span class='member-badge badge-boost'>boost</span>";
  var h="<div class='member-card' data-mid='"+m.user.id+"' onclick='showMember(this.dataset.mid)'>";
  h+="<img class='member-avatar' src='"+avatar+"' alt='' loading='lazy'/>";
  h+="<div class='member-info'><div class='member-name'>"+esc(name)+(m.user.bot?" <span>bot</span>":"")+"</div>";
  if(m.user.username!==name.toLowerCase()&&m.user.username!==(m.user.global_name||"").toLowerCase())h+="<div class='member-username'>"+esc(m.user.username)+"</div>";
  if(badges)h+="<div class='member-badges'>"+badges+"</div>";
  h+="<div class='member-roles'>"+(roleBadges||"<span class='role-badge'>no roles</span>")+"</div></div>";
  h+="<span class='member-joined'>"+joined+"</span>";
  h+="</div>";
  return h;
}

function filterMembers(q){
  if(!allMembers.length)return;
  q=q.toLowerCase();
  var filtered=allMembers.filter(function(m){
    var name=(m.nick||(m.user.global_name||m.user.username)).toLowerCase();
    var id=m.user.id;
    return name.indexOf(q)!==-1||id.indexOf(q)!==-1;
  });
  renderMembers(filtered);
}

function c(){g("userModal").classList.remove("show")}
function esc(s){var d=document.createElement("div");d.appendChild(document.createTextNode(s));return d.innerHTML}
function escUrl(s){return String(s).replace(/[^a-zA-Z0-9-._~:/?#@[!$&'()*+,;=%]/g,encodeURIComponent)}
function isContentUrlInEmbeds(content,embeds){
  if(!content||!embeds||!embeds.length)return false;
  content=content.trim();
  if(!content.startsWith("http"))return false;
  for(var i=0;i<embeds.length;i++){
    var e=embeds[i];
    if(e.url===content)return true;
    if(e.thumbnail&&e.thumbnail.url===content)return true;
    if(e.image&&e.image.url===content)return true;
    if(e.video&&e.video.url===content)return true;
  }
  return false;
}
function fmt(s,mentions){
  var r=esc(s);
  r=r.replace(new RegExp("&lt;:([^:]+):(\\\\d+)&gt;","g"),"<img src='https://cdn.discordapp.com/emojis/$2.png' style='width:18px;height:18px;vertical-align:middle' alt=':$1:'>");
  r=r.replace(new RegExp("&lt;a:([^:]+):(\\\\d+)&gt;","g"),"<img src='https://cdn.discordapp.com/emojis/$2.gif' style='width:18px;height:18px;vertical-align:middle' alt=':$1:'>");
  r=r.replace(new RegExp("\\\\|\\\\|([^|]+)\\\\|\\\\|","g"),"<span class='spoiler' onclick='this.classList.toggle(&quot;revealed&quot;)'>$1</span>");
  r=r.replace(new RegExp("\\\\*\\\\*(.+?)\\\\*\\\\*","g"),"<b>$1</b>");
  r=r.replace(new RegExp("\\\\*(.+?)\\\\*","g"),"<i>$1</i>");
  r=r.replace(new RegExp("__(.+?)__","g"),"<u>$1</u>");
  r=r.replace(new RegExp("~~(.+?)~~","g"),"<s>$1</s>");
  r=r.replace(new RegExp("\`\`\`([\\\\s\\\\S]+?)\`\`\`","g"),"<pre><code>$1</code></pre>");
  r=r.replace(new RegExp("\`([^\`]+)\`","g"),"<code>$1</code>");
  r=r.replace(new RegExp("&lt;@!?(\\\\d+)&gt;","g"),function(m,id){
    if(mentions){
      for(var mi=0;mi<mentions.length;mi++){
        if(mentions[mi].id===id)return "<span class='mention'>@"+esc(mentions[mi].global_name||mentions[mi].username)+"</span>";
      }
    }
    for(var mi=0;mi<allMembers.length;mi++){
      if(allMembers[mi].user.id===id){var mn=allMembers[mi].nick||(allMembers[mi].user.global_name||allMembers[mi].user.username);return "<span class='mention'>@"+esc(mn)+"</span>"}
    }
    return "<span class='mention'>@"+id+"</span>";
  });
  return r;
}
function logout(){fetch("/api",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"logout"})}).finally(function(){location.reload()})}
// --- Toast notifications ---
function showToast(msg,type){
  var t=document.createElement("div");
  t.className="toast toast-"+(type||"success");
  t.textContent=msg;
  document.body.appendChild(t);
  setTimeout(function(){t.style.opacity="0";t.style.transition="opacity .3s";setTimeout(function(){t.remove()},300)},3000);
}

// --- Message editing ---
var editingMsgId=null;
function editMsg(cid,mid){
  var row=document.querySelector('[data-mid="'+mid+'"]');
  if(!row)return;
  var content=row.querySelector(".msg-content");
  if(!content)return;
  var oldText=content.textContent||"";
  editingMsgId=mid;
  var area=document.createElement("div");
  area.className="msg-edit-area";
  area.innerHTML="<textarea id='editTextarea'>"+esc(oldText)+"</textarea><div class='msg-edit-actions'><button class='msg-edit-save' onclick='saveEdit(&quot;"+cid+"&quot;,&quot;"+mid+"&quot;)'>save</button><button class='msg-edit-cancel' onclick='cancelEdit()'>cancel</button></div>";
  content.style.display="none";
  content.parentNode.insertBefore(area,content.nextSibling);
  var ta=g("editTextarea");if(ta){ta.focus();ta.selectionStart=ta.value.length}
}
function saveEdit(cid,mid){
  var ta=g("editTextarea");
  if(!ta)return;
  var newContent=ta.value.trim();
  if(!newContent){showToast("message cannot be empty","error");return}
  api({action:"edit",channelId:cid,messageId:mid,content:newContent},function(d){
    if(d.success){showToast("message edited");cancelEdit();loadMsgHistory(cid)}
    else{showToast(d.error||"failed to edit","error")}
  });
}
function cancelEdit(){
  var area=g("editTextarea");
  if(area&&area.parentNode)area.parentNode.remove();
  var rows=document.querySelectorAll(".msg-content");
  rows.forEach(function(r){r.style.display=""});
  editingMsgId=null;
}

// --- Message search (client-side filter) ---
function filterMsgHistory(q){
  q=q.toLowerCase();
  var rows=document.querySelectorAll("#msgHistory .msg-row");
  rows.forEach(function(r){
    var content=r.querySelector(".msg-content");
    var author=r.querySelector(".msg-author");
    var text=(content?content.textContent:"")+(author?author.textContent:"");
    if(!q||text.toLowerCase().indexOf(q)!==-1){r.style.display=""}
    else{r.style.display="none"}
  });
}

// --- Message pagination ---
var msgPagination={before:null,channelId:null,loading:false};
function loadMsgHistory(cid){
  if(!cid){g("msgHistory").innerHTML="<p style='color:#5a5260;text-align:center;padding:20px 0'>select a channel</p>";g("msgLoadMore").style.display="none";return}
  g("msgHistory").innerHTML="<p style='color:#6d6572;text-align:center;padding:20px 0'>loading...</p>";
  g("msgLoadMore").style.display="none";
  msgPagination={before:null,channelId:cid,loading:false};
  g("msgSearchInput").value="";
  api({action:"messages",channelId:cid,limit:50},function(d){
    if(d.error){g("msgHistory").innerHTML="<p style='color:#d45555;text-align:center;padding:20px 0'>"+esc(d.error)+"</p>";return}
    if(!d.messages||!d.messages.length){g("msgHistory").innerHTML="<p style='color:#5a5260;text-align:center;padding:20px 0'>no messages found.</p>";return}
    if(!Array.isArray(d.messages)){g("msgHistory").innerHTML="<p style='color:#d45555;text-align:center;padding:20px 0'>invalid response</p>";return}
    if(d.messages.length>=50){g("msgLoadMore").style.display="block";msgPagination.before=d.messages[d.messages.length-1].id}
    renderMsgHistory(d.messages,cid);
  });
}
function loadMoreMessages(){
  if(msgPagination.loading||!msgPagination.before||!msgPagination.channelId)return;
  msgPagination.loading=true;
  g("msgLoadMore").textContent="loading...";
  var cid=msgPagination.channelId,before=msgPagination.before;
  api({action:"messages",channelId:cid,limit:50,before:before},function(d){
    if(cid!==msgPagination.channelId)return;
    msgPagination.loading=false;
    g("msgLoadMore").textContent="load older messages";
    if(d.error||!d.messages||!d.messages.length){g("msgLoadMore").style.display="none";return}
    if(d.messages.length>=50){msgPagination.before=d.messages[d.messages.length-1].id;g("msgLoadMore").style.display="block"}
    else{g("msgLoadMore").style.display="none";msgPagination.before=null}
    g("msgHistory").insertAdjacentHTML("afterbegin",renderMsgRows(d.messages,cid));
    parseTwemoji(g("msgHistory"));
  });
}

// --- Emoji data & autocomplete ---
var emojiMap={
  "grinning":"\u{1F600}","smiley":"\u{1F603}","smile":"\u{1F604}","grin":"\u{1F601}","laughing":"\u{1F606}","sweat_smile":"\u{1F605}","rofl":"\u{1F923}","joy":"\u{1F602}",
  "slightly_smiling":"\u{1F642}","upside_down":"\u{1F643}","wink":"\u{1F609}","blush":"\u{1F60A}","innocent":"\u{1F607}","smiling_face_with_3_hearts":"\u{1F970}",
  "heart_eyes":"\u{1F60D}","star_struck":"\u{1F929}","kissing_heart":"\u{1F618}","kissing":"\u{1F617}","relaxed":"\u263A\uFE0F","kissing_closed_eyes":"\u{1F61A}",
  "kissing_smiling_eyes":"\u{1F619}","yum":"\u{1F60B}","stuck_out_tongue":"\u{1F61B}","stuck_out_tongue_winking_eye":"\u{1F61C}","zany":"\u{1F92A}",
  "stuck_out_tongue_closed_eyes":"\u{1F61D}","money_mouth":"\u{1F911}","hugging":"\u{1F917}","face_with_hand_over_mouth":"\u{1F92D}",
  "shushing":"\u{1F92B}","thinking":"\u{1F914}","zipper_mouth":"\u{1F910}","raised_eyebrow":"\u{1F928}","neutral_face":"\u{1F610}","expressionless":"\u{1F611}",
  "no_mouth":"\u{1F636}","dizzy_face":"\u{1F635}","flushed":"\u{1F633}","face_in_clouds":"\u{1F636}\u200D\u{1F32B}\uFE0F","rolling_eyes":"\u{1F644}","grimacing":"\u{1F62C}",
  "lying":"\u{1F925}","relieved":"\u{1F60C}","pensive":"\u{1F614}","sleepy":"\u{1F62A}","drooling":"\u{1F924}","sleeping":"\u{1F634}","mask":"\u{1F637}",
  "face_with_thermometer":"\u{1F912}","face_with_head_bandage":"\u{1F915}","nauseated":"\u{1F922}","vomiting":"\u{1F92E}","sneezing":"\u{1F927}",
  "hot":"\u{1F975}","cold":"\u{1F976}","woozy":"\u{1F974}","dizzy":"\u{1F4AB}","exploding_head":"\u{1F92F}","cowboy":"\u{1F920}","partying":"\u{1F973}",
  "disguised":"\u{1F978}","sunglasses":"\u{1F60E}","nerd":"\u{1F913}","monocle":"\u{1F9D0}","confused":"\u{1F615}","worried":"\u{1F61F}","slightly_frowning":"\u{1F641}",
  "frowning":"\u2639\uFE0F","open_mouth":"\u{1F62E}","hushed":"\u{1F62F}","astonished":"\u{1F632}","flushed":"\u{1F633}","pleading":"\u{1F97A}","frowning":"\u{1F626}",
  "anguished":"\u{1F627}","fearful":"\u{1F628}","cold_sweat":"\u{1F630}","disappointed_relieved":"\u{1F625}","cry":"\u{1F622}","sob":"\u{1F62D}","scream":"\u{1F631}",
  "confounded":"\u{1F616}","persevere":"\u{1F623}","disappointed":"\u{1F61E}","sweat":"\u{1F613}","weary":"\u{1F629}","tired_face":"\u{1F62B}","yawning":"\u{1F971}",
  "triumph":"\u{1F624}","rage":"\u{1F621}","angry":"\u{1F620}","cursing":"\u{1F92C}","smirk":"\u{1F60F}","unamused":"\u{1F612}","pouting":"\u{1F621}",
  "palms_up":"\u{1F937}","shrug":"\u{1F937}","facepalm":"\u{1F926}","fist":"\u270A","raised_hand":"\u270B","wave":"\u{1F44B}","ok_hand":"\u{1F44C}",
  "pinching":"\u{1F90F}","crossed_fingers":"\u{1F91E}","love_you":"\u{1F91F}","metal":"\u{1F918}","call_me":"\u{1F919}","point_left":"\u{1F448}",
  "point_right":"\u{1F449}","point_up":"\u261D\uFE0F","point_up_2":"\u{1F446}","middle_finger":"\u{1F595}","point_down":"\u{1F447}","victory":"\u270C\uFE0F",
  "clap":"\u{1F44F}","raised_hands":"\u{1F64C}","open_hands":"\u{1F450}","handshake":"\u{1F91D}","pray":"\u{1F64F}","writing_hand":"\u270D\uFE0F",
  "nail_care":"\u{1F485}","muscle":"\u{1F4AA}","leg":"\u{1F9B5}","foot":"\u{1F9B6}","ear":"\u{1F442}","nose":"\u{1F443}","brain":"\u{1F9E0}","eye":"\u{1F441}\uFE0F",
  "eyes":"\u{1F440}","tongue":"\u{1F445}","lips":"\u{1F444}","baby":"\u{1F476}","child":"\u{1F9D2}","boy":"\u{1F466}","girl":"\u{1F467}","adult":"\u{1F9D1}",
  "person":"\u{1F9D1}","blond_haired":"\u{1F471}","man":"\u{1F468}","woman":"\u{1F469}","older_adult":"\u{1F9D3}","older_man":"\u{1F474}","older_woman":"\u{1F475}",
  "male_doctor":"\u{1F468}\u200D\u2695\uFE0F","female_doctor":"\u{1F469}\u200D\u2695\uFE0F","male_scientist":"\u{1F468}\u200D\u{1F52C}","female_scientist":"\u{1F469}\u200D\u{1F52C}",
  "male_technologist":"\u{1F468}\u200D\u{1F4BB}","female_technologist":"\u{1F469}\u200D\u{1F4BB}","male_farmer":"\u{1F468}\u200D\u{1F33E}","female_farmer":"\u{1F469}\u200D\u{1F33E}",
  "male_cook":"\u{1F468}\u200D\u{1F373}","female_cook":"\u{1F469}\u200D\u{1F373}","male_student":"\u{1F468}\u200D\u{1F393}","female_student":"\u{1F469}\u200D\u{1F393}",
  "male_singer":"\u{1F468}\u200D\u{1F3A4}","female_singer":"\u{1F469}\u200D\u{1F3A4}","male_teacher":"\u{1F468}\u200D\u{1F3EB}","female_teacher":"\u{1F469}\u200D\u{1F3EB}",
  "police":"\u{1F46E}","detective":"\u{1F575}\uFE0F","guard":"\u{1F482}","construction_worker":"\u{1F477}","prince":"\u{1F934}","princess":"\u{1F478}",
  "person_with_turban":"\u{1F473}","man_with_gua_pi_mao":"\u{1F472}","person_with_headscarf":"\u{1F9D5}","bearded_person":"\u{1F9D4}",
  "mage":"\u{1F9D9}","fairy":"\u{1F9DA}","vampire":"\u{1F9DB}","merperson":"\u{1F9DC}","elf":"\u{1F9D1}\u200D\u{1F9DD}","genie":"\u{1F9DE}","zombie":"\u{1F9DF}",
  "dancer":"\u{1F483}","man_dancing":"\u{1F57A}","people_with_bunny_ears_partying":"\u{1F46F}","person_in_steamy_room":"\u{1F9D6}",
  "person_climbing":"\u{1F9D7}","person_in_lotus_position":"\u{1F9D8}","bath":"\u{1F6C0}","sleeping_bed":"\u{1F6CC}",
  "heart":"\u2764\uFE0F","orange_heart":"\u{1F9E1}","yellow_heart":"\u{1F49B}","green_heart":"\u{1F49A}","blue_heart":"\u{1F499}",
  "purple_heart":"\u{1F49C}","brown_heart":"\u{1F90E}","black_heart":"\u{1F5A4}","white_heart":"\u{1F90D}","broken_heart":"\u{1F494}",
  "heart_exclamation":"\u2763\uFE0F","two_hearts":"\u{1F495}","revolving_hearts":"\u{1F49E}","heartbeat":"\u{1F493}","heartpulse":"\u{1F497}",
  "sparkling_heart":"\u{1F496}","cupid":"\u{1F498}","gift_heart":"\u{1F49D}","heart_decoration":"\u{1F49F}","peace":"\u262E\uFE0F","cross":"\u271D\uFE0F",
  "star_and_crescent":"\u262A\uFE0F","om_symbol":"\u{1F549}\uFE0F","wheel_of_dharma":"\u2638\uFE0F","star_of_david":"\u2721\uFE0F","six_pointed_star":"\u{1F52F}",
  "menorah":"\u{1F54E}","yin_yang":"\u262F\uFE0F","orthodox_cross":"\u2626\uFE0F","place_of_worship":"\u{1F6D0}","ophiuchus":"\u26CE",
  "aries":"\u2648","taurus":"\u2649","gemini":"\u264A","cancer":"\u264B","leo":"\u264C","virgo":"\u264D","libra":"\u264E","scorpius":"\u264F",
  "sagittarius":"\u2650","capricorn":"\u2651","aquarius":"\u2652","pisces":"\u2653","fire":"\u{1F525}","rocket":"\u{1F680}",
  "star":"\u2B50","sparkles":"\u2728","comet":"\u2604\uFE0F","sunny":"\u2600\uFE0F","moon":"\u{1F319}","cloud":"\u2601\uFE0F","umbrella":"\u2602\uFE0F",
  "snowman":"\u2603\uFE0F","zap":"\u26A1","cyclone":"\u{1F300}","rainbow":"\u{1F308}","ocean":"\u{1F30A}","dog":"\u{1F436}","cat":"\u{1F431}","mouse":"\u{1F42D}",
  "hamster":"\u{1F439}","rabbit":"\u{1F430}","fox":"\u{1F98A}","bear":"\u{1F43B}","panda":"\u{1F43C}","koala":"\u{1F428}","tiger":"\u{1F42F}","lion":"\u{1F981}",
  "cow":"\u{1F42E}","pig":"\u{1F437}","frog":"\u{1F438}","monkey":"\u{1F435}","chicken":"\u{1F414}","bird":"\u{1F426}","penguin":"\u{1F427}","snake":"\u{1F40D}",
  "dragon":"\u{1F409}","whale":"\u{1F433}","dolphin":"\u{1F42C}","fish":"\u{1F41F}","octopus":"\u{1F419}","shell":"\u{1F41A}","snail":"\u{1F40C}",
  "butterfly":"\u{1F98B}","bug":"\u{1F41B}","ant":"\u{1F41C}","bee":"\u{1F41D}","beetle":"\u{1FAB2}","ladybug":"\u{1F41E}","cricket":"\u{1F997}",
  "cockroach":"\u{1FAB3}","spider":"\u{1F577}\uFE0F","scorpion":"\u{1F982}","mosquito":"\u{1F99F}","microbe":"\u{1F9A0}",
  "bouquet":"\u{1F490}","cherry_blossom":"\u{1F338}","white_flower":"\u{1F4AE}","rosette":"\u{1F3F5}\uFE0F","rose":"\u{1F339}","wilted_flower":"\u{1F940}",
  "hibiscus":"\u{1F33A}","sunflower":"\u{1F33B}","blossom":"\u{1F33C}","tulip":"\u{1F337}","seedling":"\u{1F331}","palm_tree":"\u{1F334}","cactus":"\u{1F335}",
  "mushroom":"\u{1F344}","crown":"\u{1F451}","dress":"\u{1F457}","necktie":"\u{1F454}","shirt":"\u{1F455}","jeans":"\u{1F456}","scarf":"\u{1F9E3}",
  "gloves":"\u{1F9E4}","coat":"\u{1F9E5}","socks":"\u{1F9E6}","purse":"\u{1F45B}","handbag":"\u{1F45C}","school_satchel":"\u{1F392}","shoe":"\u{1F45F}",
  "high_heel":"\u{1F460}","sandal":"\u{1F461}","boot":"\u{1F462}","ring":"\u{1F48D}","lipstick":"\u{1F484}","kiss":"\u{1F48B}","gem":"\u{1F48E}",
  "pizza":"\u{1F355}","hamburger":"\u{1F354}","fries":"\u{1F35F}","hotdog":"\u{1F32D}","taco":"\u{1F32E}","burrito":"\u{1F32F}","sushi":"\u{1F363}",
  "ramen":"\u{1F35C}","spaghetti":"\u{1F35D}","bread":"\u{1F35E}","croissant":"\u{1F950}","pancakes":"\u{1F95E}","waffle":"\u{1F9C7}",
  "cake":"\u{1F370}","cookie":"\u{1F36A}","chocolate":"\u{1F36B}","candy":"\u{1F36C}","lollipop":"\u{1F36D}","ice_cream":"\u{1F368}",
  "beer":"\u{1F37A}","wine":"\u{1F389}","cocktail":"\u{1F378}","coffee":"\u2615","tea":"\u{1F375}","sake":"\u{1F376}","champagne":"\u{1F942}",
  "grapes":"\u{1F347}","melon":"\u{1F348}","watermelon":"\u{1F349}","orange":"\u{1F34A}","lemon":"\u{1F34B}","banana":"\u{1F34C}","apple":"\u{1F34E}",
  "pear":"\u{1F350}","peach":"\u{1F351}","cherries":"\u{1F352}","strawberry":"\u{1F353}","kiwi":"\u{1F95D}","tomato":"\u{1F345}",
  "soccer":"\u26BD","basketball":"\u{1F3C0}","football":"\u{1F3C8}","baseball":"\u26BE","tennis":"\u{1F3BE}","volleyball":"\u{1F3D0}",
  "rugby":"\u{1F3C9}","pool_8":"\u{1F3B1}","ping_pong":"\u{1F3D3}","badminton":"\u{1F3F8}","boxing_glove":"\u{1F94A}","martial_arts":"\u{1F94B}",
  "goal":"\u{1F945}","fishing":"\u{1F3A3}","dart":"\u{1F3AF}","golf":"\u26F3","ice_skate":"\u26F8\uFE0F","ski":"\u{1F3BF}","sled":"\u{1F6F7}",
  "checkered_flag":"\u{1F3C1}","trophy":"\u{1F3C6}","medal":"\u{1F947}","guitar":"\u{1F3B8}","violin":"\u{1F3BB}","piano":"\u{1F3B9}","drum":"\u{1F941}",
  "musical_note":"\u{1F3B5}","notes":"\u{1F3B6}","headphone":"\u{1F3A7}","radio":"\u{1F4FB}","movie_camera":"\u{1F3A5}","clapper":"\u{1F3AC}",
  "tv":"\u{1F4FA}","camera":"\u{1F4F7}","phone":"\u{1F4F1}","computer":"\u{1F4BB}","printer":"\u{1F5A8}\uFE0F","keyboard":"\u2328\uFE0F","mouse_three_button":"\u{1F5B1}\uFE0F",
  "joystick":"\u{1F579}\uFE0F","robot":"\u{1F916}","satellite":"\u{1F4E1}","bulb":"\u{1F4A1}","alarm_clock":"\u23F0","hourglass":"\u231B",
  "moneybag":"\u{1F4B0}","credit_card":"\u{1F4B3}","dollar":"\u{1F4B5}","yen":"\u{1F4B4}","euro":"\u{1F4B6}","pound":"\u{1F4B7}",
  "envelope":"\u2709\uFE0F","mailbox":"\u{1F4EB}","postbox":"\u{1F4EE}","pencil":"\u270F\uFE0F","book":"\u{1F4D6}","newspaper":"\u{1F4F0}",
  "memo":"\u{1F4DD}","paperclip":"\u{1F4CE}","scissors":"\u2702\uFE0F","lock":"\u{1F512}","unlock":"\u{1F513}","key":"\u{1F511}",
  "hammer":"\u{1F528}","pick":"\u26CF\uFE0F","wrench":"\u{1F527}","nut_and_bolt":"\u{1F529}","gear":"\u2699\uFE0F","clamp":"\u{1F5DC}\uFE0F",
  "microscope":"\u{1F52C}","telescope":"\u{1F52D}","syringe":"\u{1F489}","pill":"\u{1F48A}","soap":"\u{1F9FC}","toilet":"\u{1F6BD}",
  "shower":"\u{1F6BF}","smoking":"\u{1F6AC}","coffin":"\u26B0\uFE0F","funeral_urn":"\u26B1\uFE0F","moyai":"\u{1F5FF}","flag_white":"\u{1F3F3}\uFE0F",
  "flag_black":"\u{1F3F4}","checkered_flag":"\u{1F3C1}","triangular_flag_on_post":"\u{1F6A9}","crossed_flags":"\u{1F38C}"
};
var emojiRange=null;
document.getElementById("msgInput").addEventListener("input",function(){
  var ta=this,val=ta.value,pos=ta.selectionStart;
  var idx=val.lastIndexOf(":",pos-1);
  if(idx===-1||(idx>0&&val.charCodeAt(idx-1)!==32&&val.charCodeAt(idx-1)!==10)){g("emojiAutocompleteList").classList.remove("show");emojiRange=null;return}
  var query=val.substring(idx+1,pos);
  if(query.indexOf(" ")!==-1||query.indexOf(":")!==-1){g("emojiAutocompleteList").classList.remove("show");emojiRange=null;return}
  emojiRange={start:idx,end:pos};
  var h="",count=0,ql=query.toLowerCase();
  var names=Object.keys(emojiMap);
  for(var i=0;i<names.length&&count<20;i++){
    var name=names[i];
    if(ql&&name.indexOf(ql)===-1&&emojiMap[name].indexOf(ql)===-1)continue;
    h+="<div class='mention-item' data-emoji='"+name+"'><span class='emoji-wrap'>"+emojiImg(emojiMap[name],16)+"</span> <span style='font-size:11px'>:"+name+"</span></div>";
    count++;
  }
  if(!count)h="<div class='mention-item' style='color:#5a5260;cursor:default'>no results</div>";
  g("emojiAutocompleteList").innerHTML=h;
  g("emojiAutocompleteList").classList.add("show");
  g("inlineMentionList").classList.remove("show");mentionRange=null;
});
document.getElementById("emojiAutocompleteList").addEventListener("mousedown",function(e){
  var item=e.target.closest(".mention-item");
  if(!item||!item.dataset.emoji)return;
  e.preventDefault();
  var ta=g("msgInput"),val=ta.value;
  if(emojiRange){ta.value=val.substring(0,emojiRange.start)+emojiMap[item.dataset.emoji]+" "+val.substring(emojiRange.end);ta.focus();ta.selectionStart=ta.selectionEnd=emojiRange.start+2}
  g("emojiAutocompleteList").classList.remove("show");emojiRange=null;
});

var emojiRangeDm=null;
document.getElementById("dmInput").addEventListener("input",function(){
  var ta=this,val=ta.value,pos=ta.selectionStart;
  var idx=val.lastIndexOf(":",pos-1);
  if(idx===-1||(idx>0&&val.charCodeAt(idx-1)!==32&&val.charCodeAt(idx-1)!==10)){g("emojiAutocompleteListDm").classList.remove("show");emojiRangeDm=null;return}
  var query=val.substring(idx+1,pos);
  if(query.indexOf(" ")!==-1||query.indexOf(":")!==-1){g("emojiAutocompleteListDm").classList.remove("show");emojiRangeDm=null;return}
  emojiRangeDm={start:idx,end:pos};
  var h="",count=0,ql=query.toLowerCase();
  var names=Object.keys(emojiMap);
  for(var i=0;i<names.length&&count<20;i++){
    var name=names[i];
    if(ql&&name.indexOf(ql)===-1&&emojiMap[name].indexOf(ql)===-1)continue;
    h+="<div class='mention-item' data-emoji='"+name+"'><span class='emoji-wrap'>"+emojiImg(emojiMap[name],16)+"</span> <span style='font-size:11px'>:"+name+"</span></div>";
    count++;
  }
  if(!count)h="<div class='mention-item' style='color:#5a5260;cursor:default'>no results</div>";
  g("emojiAutocompleteListDm").innerHTML=h;
  g("emojiAutocompleteListDm").classList.add("show");
  g("inlineMentionListDm").classList.remove("show");mentionRangeDm=null;
});
document.getElementById("emojiAutocompleteListDm").addEventListener("mousedown",function(e){
  var item=e.target.closest(".mention-item");
  if(!item||!item.dataset.emoji)return;
  e.preventDefault();
  var ta=g("dmInput"),val=ta.value;
  if(emojiRangeDm){ta.value=val.substring(0,emojiRangeDm.start)+emojiMap[item.dataset.emoji]+" "+val.substring(emojiRangeDm.end);ta.focus();ta.selectionStart=ta.selectionEnd=emojiRangeDm.start+2}
  g("emojiAutocompleteListDm").classList.remove("show");emojiRangeDm=null;
});

// --- Inline @mention autocomplete ---
var mentionRange=null;
document.getElementById("msgInput").addEventListener("input",function(){
  var ta=this,val=ta.value,pos=ta.selectionStart;
  var idx=val.lastIndexOf("@",pos-1);
  if(idx===-1||(idx>0&&val.charCodeAt(idx-1)!==32&&val.charCodeAt(idx-1)!==10)){g("inlineMentionList").classList.remove("show");mentionRange=null;return}
  var query=val.substring(idx+1,pos);
  if(query.indexOf(" ")!==-1||query.indexOf("@")!==-1){g("inlineMentionList").classList.remove("show");mentionRange=null;return}
  mentionRange={start:idx,end:pos};
  if(!allMembers.length){loadMembers()}
  var h="";
  var count=0;
  var ql=query.toLowerCase();
  for(var i=0;i<allMembers.length&&count<20;i++){
    var m=allMembers[i],name=m.nick||(m.user.global_name||m.user.username);
    if(ql&&name.toLowerCase().indexOf(ql)===-1&&m.user.username.toLowerCase().indexOf(ql)===-1)continue;
    var avatar=m.user.avatar?"https://cdn.discordapp.com/avatars/"+m.user.id+"/"+m.user.avatar+(m.user.avatar.startsWith("a_")?".gif":".png"):"https://cdn.discordapp.com/embed/avatars/"+(parseInt(m.user.discriminator||"0")%5)+".png";
    h+="<div class='mention-item' data-uid='"+m.user.id+"' data-name='"+esc(name)+"'><img src='"+avatar+"' alt=''/>"+esc(name)+(m.user.bot?"<span style='font-size:8px;background:#b48899;color:#13161b;padding:1px 4px;border-radius:3px;margin-left:4px;font-weight:700;text-transform:uppercase'>bot</span>":"")+"</div>";
    count++;
  }
  if(!count)h="<div class='mention-item' style='color:#5a5260;cursor:default'>no results</div>";
  var ml=g("inlineMentionList");ml.innerHTML=h;ml.classList.add("show");
});
document.getElementById("inlineMentionList").addEventListener("mousedown",function(e){
  var item=e.target.closest(".mention-item");
  if(!item||!item.dataset.uid)return;
  e.preventDefault();
  var ta=g("msgInput"),val=ta.value;
  if(mentionRange){ta.value=val.substring(0,mentionRange.start)+"<@"+item.dataset.uid+"> "+val.substring(mentionRange.end);ta.focus();ta.selectionStart=ta.selectionEnd=mentionRange.start+item.dataset.uid.length+4}
  g("inlineMentionList").classList.remove("show");mentionRange=null;
});
document.addEventListener("click",function(e){if(!e.target.closest(".inline-mention-wrap")){g("inlineMentionList").classList.remove("show");g("inlineMentionListDm").classList.remove("show");g("emojiAutocompleteList").classList.remove("show");g("emojiAutocompleteListDm").classList.remove("show");mentionRange=null;emojiRange=null;emojiRangeDm=null}});

var mentionRangeDm=null;
document.getElementById("dmInput").addEventListener("input",function(){
  var ta=this,val=ta.value,pos=ta.selectionStart;
  var idx=val.lastIndexOf("@",pos-1);
  if(idx===-1||(idx>0&&val.charCodeAt(idx-1)!==32&&val.charCodeAt(idx-1)!==10)){g("inlineMentionListDm").classList.remove("show");mentionRangeDm=null;return}
  var query=val.substring(idx+1,pos);
  if(query.indexOf(" ")!==-1||query.indexOf("@")!==-1){g("inlineMentionListDm").classList.remove("show");mentionRangeDm=null;return}
  mentionRangeDm={start:idx,end:pos};
  if(!allMembers.length){loadMembers()}
  var h="";
  var count=0;
  var ql=query.toLowerCase();
  for(var i=0;i<allMembers.length&&count<20;i++){
    var m=allMembers[i],name=m.nick||(m.user.global_name||m.user.username);
    if(ql&&name.toLowerCase().indexOf(ql)===-1&&m.user.username.toLowerCase().indexOf(ql)===-1)continue;
    var avatar=m.user.avatar?"https://cdn.discordapp.com/avatars/"+m.user.id+"/"+m.user.avatar+(m.user.avatar.startsWith("a_")?".gif":".png"):"https://cdn.discordapp.com/embed/avatars/"+(parseInt(m.user.discriminator||"0")%5)+".png";
    h+="<div class='mention-item' data-uid='"+m.user.id+"' data-name='"+esc(name)+"'><img src='"+avatar+"' alt=''/>"+esc(name)+(m.user.bot?"<span style='font-size:8px;background:#b48899;color:#13161b;padding:1px 4px;border-radius:3px;margin-left:4px;font-weight:700;text-transform:uppercase'>bot</span>":"")+"</div>";
    count++;
  }
  if(!count)h="<div class='mention-item' style='color:#5a5260;cursor:default'>no results</div>";
  var ml=g("inlineMentionListDm");ml.innerHTML=h;ml.classList.add("show");
});
document.getElementById("inlineMentionListDm").addEventListener("mousedown",function(e){
  var item=e.target.closest(".mention-item");
  if(!item||!item.dataset.uid)return;
  e.preventDefault();
  var ta=g("dmInput"),val=ta.value;
  if(mentionRangeDm){ta.value=val.substring(0,mentionRangeDm.start)+"<@"+item.dataset.uid+"> "+val.substring(mentionRangeDm.end);ta.focus();ta.selectionStart=ta.selectionEnd=mentionRangeDm.start+item.dataset.uid.length+4}
  g("inlineMentionListDm").classList.remove("show");mentionRangeDm=null;
});


function renderMsgRows(messages,cid,dm){
  var h="";var prevDate="";var prevAuthor=null;var prevTime=0;
  var delFn=dm?"deleteDmMsg":"deleteMsg";
  var editFn=dm?"editDmMsg":"editMsg";
  for(var i=messages.length-1;i>=0;i--){
    var msg=messages[i],u=msg.author;
    if(!u)continue;
    var ts=new Date(msg.timestamp);
    var dayStr=ts.toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"});
    var timeStr=ts.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"});
    var tsVal=ts.getTime();
    if(dayStr!==prevDate){h+="<div class='msg-day-divider'><span>"+dayStr+"</span></div>";prevDate=dayStr;prevAuthor=null}
    var sameUser=prevAuthor&&prevAuthor===u.id;
    var sameGroup=sameUser&&(tsVal-prevTime)<420000;
    var name=u.global_name||u.username;
    var avatar=u.avatar?"https://cdn.discordapp.com/avatars/"+u.id+"/"+u.avatar+(u.avatar.startsWith("a_")?".gif":".png"):"https://cdn.discordapp.com/embed/avatars/"+(parseInt(u.discriminator||"0")%5)+".png";
    if(!sameGroup&&prevAuthor!==null){h+="<div style='height:4px'></div>"}
    h+="<div class='msg-row"+(sameGroup?" msg-group-start":"")+"'>";
    if(sameGroup){h+="<div class='msg-avatar' style='visibility:hidden;width:28px;height:0'></div>"}
    else{h+="<img class='msg-avatar' src='"+avatar+"' alt='' loading='lazy'/>"}
    h+="<div class='msg-body'>";
    if(!sameGroup){h+="<div><span class='msg-author'>"+esc(name)+"</span>"+(u.bot?"<span style='font-size:8px;background:#b48899;color:#13161b;padding:1px 4px;border-radius:3px;margin-left:5px;font-weight:700;text-transform:uppercase;vertical-align:middle'>bot</span>":"")+"<span class='msg-time'>"+timeStr+"</span>"+(msg.edited_timestamp?"<span class='msg-edited'>(edited)</span>":"")+"</div>"}
    if(msg.referenced_message&&msg.referenced_message.author){
      var ru=msg.referenced_message.author,rn=ru.global_name||ru.username;
      var ra=ru.avatar?"https://cdn.discordapp.com/avatars/"+ru.id+"/"+ru.avatar+(ru.avatar.startsWith("a_")?".gif":".png"):"https://cdn.discordapp.com/embed/avatars/"+(parseInt(ru.discriminator||"0")%5)+".png";
      h+="<div class='msg-ref'><img src='"+ra+"' style='width:14px;height:14px;border-radius:50%;vertical-align:middle' alt=''/> <b>"+esc(rn)+"</b> "+fmt(msg.referenced_message.content||"(attachment)",msg.mentions).substring(0,120)+"</div>";
    }
    if(!(msg.embeds&&msg.embeds.length&&isContentUrlInEmbeds(msg.content,msg.embeds))){h+="<div class='msg-content'>"+fmt(msg.content||"",msg.mentions)+"</div>"}
    if(msg.sticker_items&&msg.sticker_items.length){
      for(var j=0;j<msg.sticker_items.length;j++){
        var s=msg.sticker_items[j];
        var sfmt=s.format_type===3?"lottie":s.format_type===4?"gif":"png";
        if(sfmt==="lottie")h+="<div class='msg-sticker' style='max-height:120px;display:flex;align-items:center;justify-content:center;color:#5a5260;font-size:10px;border:1px solid #252a32;border-radius:8px;padding:8px'>sticker (lottie)</div>";
        else h+="<img class='msg-sticker' src='https://cdn.discordapp.com/stickers/"+s.id+"."+sfmt+"' alt='' loading='lazy'/>";
      }
    }
    if(msg.attachments&&msg.attachments.length){
      for(var j=0;j<msg.attachments.length;j++){
        var a=msg.attachments[j];
        var isImg=a.content_type&&(a.content_type.startsWith("image/")||a.width);
        var isGif=!isImg&&a.filename&&a.filename.toLowerCase().endsWith(".gif");
        var isVid=a.content_type&&a.content_type.startsWith("video/");
        var isAud=a.content_type&&a.content_type.startsWith("audio/");
        if(isImg||isGif){
          h+="<img class='msg-img' src='"+escUrl(a.url)+"' alt='' loading='lazy'/>";
        }else if(isVid){
          h+="<video class='msg-video' src='"+escUrl(a.url)+"' controls></video>";
        }else if(isAud){
          h+="<audio class='msg-audio' src='"+escUrl(a.url)+"' controls></audio>";
        }else{
          h+="<a class='msg-file-link' href='"+escUrl(a.url)+"'>&#128206; "+esc(a.filename)+"</a>";
        }
      }
    }
    if(msg.embeds&&msg.embeds.length){
      for(var j=0;j<msg.embeds.length;j++){
        var e=msg.embeds[j];
        if(e.type=="image"&&e.thumbnail&&e.thumbnail.url){h+="<img class='msg-img' src='"+escUrl(e.thumbnail.url)+"' alt='' loading='lazy'/>";continue}
        var bg=e.color?"#"+("000000"+e.color.toString(16)).slice(-6):"";
        h+="<div class='msg-embed'"+(bg?" style='border-left-color:"+bg+"'":"")+">";
        if(e.author&&e.author.name)h+="<div class='msg-embed-author'>"+esc(e.author.name)+"</div>";
        if(e.title){if(e.url)h+="<a class='msg-embed-title' href='"+escUrl(e.url)+"' style='text-decoration:none'>"+esc(e.title)+"</a>";else h+="<div class='msg-embed-title'>"+esc(e.title)+"</div>"}
        if(e.description)h+="<div class='msg-embed-desc'>"+fmt(e.description||"",msg.mentions)+"</div>";
        if(e.fields&&e.fields.length){for(var k=0;k<e.fields.length;k++){var f=e.fields[k];h+="<div><div class='msg-embed-field-name'>"+esc(f.name)+"</div><div class='msg-embed-field-val'>"+fmt(f.value||"",msg.mentions)+"</div></div>"}}
        if(e.video&&e.video.url){h+="<video class='msg-video' src='"+escUrl(e.video.url)+"' autoplay loop muted poster='"+(e.thumbnail&&e.thumbnail.url?escUrl(e.thumbnail.url):"")+"'></video>"}
        else if(e.image&&e.image.url)h+="<img class='msg-img' src='"+escUrl(e.image.url)+"' alt='' loading='lazy'/>";
        if(e.thumbnail&&e.thumbnail.url&&!(e.type=="image")&&!e.video)h+="<img class='msg-img' src='"+escUrl(e.thumbnail.url)+"' alt='' loading='lazy' style='max-width:80px;max-height:80px;float:right;margin:2px'/>";
        if(e.footer&&e.footer.text)h+="<div style='color:#5a5260;font-size:8px;margin-top:3px'>"+esc(e.footer.text)+"</div>";
        h+="</div>";
      }
    }
    if(msg.reactions&&msg.reactions.length){
      h+="<div class='msg-reactions'>";
      for(var j=0;j<msg.reactions.length;j++){
        var r=msg.reactions[j],emo=r.emoji;
        if(emo.id){h+="<span class='msg-reaction'><img src='https://cdn.discordapp.com/emojis/"+emo.id+".png' style='width:14px;height:14px' alt=''/> <span class='msg-reaction-count'>"+r.count+"</span></span>"}
        else{h+="<span class='msg-reaction'>"+esc(emo.name)+" <span class='msg-reaction-count'>"+r.count+"</span></span>"}
      }
      h+="</div>";
    }
    h+="</div>";
    h+="<div class='msg-actions'>";
    if(msg.author.id===botId)h+="<span class='msg-act' data-cid='"+cid+"' data-mid='"+msg.id+"' onclick='"+editFn+"(this.dataset.cid,this.dataset.mid)'>edit</span>";
    h+="<span class='msg-act msg-act-del' data-cid='"+cid+"' data-mid='"+msg.id+"' onclick='"+delFn+"(this.dataset.cid,this.dataset.mid)'>delete</span>";
    h+="</div>";
    h+="</div>";
    prevAuthor=u.id;prevTime=tsVal;
  }
  return h;
}
function renderMsgHistory(messages,cid){
  g("msgHistory").innerHTML=renderMsgRows(messages,cid);
  parseTwemoji(g("msgHistory"));
  g("msgHistory").scrollTop=g("msgHistory").scrollHeight;
}

// --- Emoji picker (Discord/Twemoji) ---
var twemojiBase="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/";
function emojiToCodepoint(e){
  var cp=[];
  for(var i=0;i<e.length;i++){
    var code=e.codePointAt(i);
    if(code>0xFFFF)i++;
    if(code!==0xFE0F)cp.push(code.toString(16));
  }
  return cp.join("-");
}
function emojiImg(e,size){return "<img src='"+twemojiBase+emojiToCodepoint(e)+".svg' width='"+(size||22)+"' height='"+(size||22)+"' alt='' style='display:inline-block' loading='lazy'/>"}
var emojiRegex=/(\uD83C[\uDF00-\uDFFF]|\uD83D[\uDE00-\uDE4F\uDD00-\uDE7F\uDE80-\uDEFF\uDC00-\uDFFF]|[\u2600-\u27BF]|\uD83E[\uDD00-\uDDFF\uDDB0-\uDDBF\uDE00-\uDE6F\uDE70-\uDEFF\uFE0F]|\uFE0F|\u200D|\u20E3|[\u2B50\u2B55\u231A\u231B\u2328\u23CF\u23E9\u23EA\u23EB\u23EC\u23ED\u23EE\u23EF\u23F0\u23F1\u23F2\u23F3\u2602\u2604\u2611\u2614\u2615\u2622\u2623\u2626\u262A\u262E\u262F\u2638\u2639\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uFE0F)/g;
function parseTwemoji(el){
  el=el||document.body;
  var walker=document.createTreeWalker(el,NodeFilter.SHOW_TEXT,null,false);
  var nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
  nodes.forEach(function(node){
    if(!node.nodeValue||!emojiRegex.test(node.nodeValue))return;
    var p=node.parentNode;
    if(p&&(p.tagName==="SCRIPT"||p.tagName==="STYLE"))return;
    emojiRegex.lastIndex=0;
    var span=document.createElement("span");
    span.innerHTML=node.nodeValue.replace(emojiRegex,function(m){
      if(m.charCodeAt(0)===0xFE0F)return"";
      return emojiImg(m,16);
    });
    p.replaceChild(span,node);
  });
}
;

// --- Channel management ---
function loadChannels(){
  api({action:"channels"},function(d){
    if(d.error){g("channelManageList").innerHTML="<p style='color:#d45555;font-size:10px'>"+esc(d.error)+"</p>";return}
    var channels=d.channels||[];
    allChannels=channels;
    var categories=channels.filter(function(c){return c.type===4}).sort(function(a,b){return a.position-b.position});
    var catSel=g("newChannelCategory");
    catSel.innerHTML="<option value=''>no category</option>";
    for(var i=0;i<categories.length;i++){catSel.innerHTML+="<option value='"+categories[i].id+"'>"+esc(categories[i].name)+"</option>"}
    var h='<div style="font-size:10px;color:#5a5260;margin-bottom:6px">'+channels.length+' channels</div>';
    var byParent={};
    for(var i=0;i<channels.length;i++){
      var c=channels[i];
      if(c.type===4)continue;
      var pid=c.parent_id||"_root";
      if(!byParent[pid])byParent[pid]=[];
      byParent[pid].push(c);
    }
    var rootChannels=byParent["_root"]||[];
    rootChannels.sort(function(a,b){return a.position-b.position});
    if(rootChannels.length){
      h+='<div class="channel-cat"><div class="channel-cat-header"><span class="channel-icon">\u{1F4C1}</span><span class="channel-name" style="color:#5a5260">no category</span></div>';
      for(var i=0;i<rootChannels.length;i++){
        var c=rootChannels[i];
        var icon=c.type===0?"#":c.type===2?"\u{1F50A}":"#";
        var typeLabel=c.type===0?"text":c.type===2?"voice":"type "+c.type;
        h+="<div class=\\"channel-card\\"><span class=\\"channel-icon\\">"+icon+"</span><span class=\\"channel-name\\">"+esc(c.name)+"</span><span class=\\"channel-type\\">"+typeLabel+"</span><div class=\\"channel-menu\\"><button class=\\"channel-menu-btn\\" onclick=\\"event.stopPropagation();toggleChannelMenu('"+c.id+"')\\">\u22EE</button><div class=\\"channel-menu-dropdown\\" id=\\"cm_"+c.id+"\\"><div onclick=\\"openChannelEdit('"+c.id+"')\\">edit</div><div onclick=\\"copyToClipboard('"+c.id+"')\\">copy id</div><div onclick=\\"copyToClipboard('"+esc(c.name)+"')\\">copy name</div><div class=\\"menu-sep\\"></div><div onclick=\\"deleteChannel('"+c.id+"','"+esc(c.name)+"')\\">delete</div></div></div></div>";
      }
      h+='</div>';
    }
    for(var ci=0;ci<categories.length;ci++){
      var cat=categories[ci];
      var children=byParent[cat.id]||[];
      children.sort(function(a,b){return a.position-b.position});
      h+="<div class=\\"channel-cat\\"><div class=\\"channel-cat-header\\"><span class=\\"channel-icon\\">\u{1F4C2}</span><span class=\\"channel-name\\">"+esc(cat.name)+"</span><span class=\\"channel-type\\">category</span><div class=\\"channel-menu\\"><button class=\\"channel-menu-btn\\" onclick=\\"event.stopPropagation();toggleChannelMenu('"+cat.id+"')\\">\u22EE</button><div class=\\"channel-menu-dropdown\\" id=\\"cm_"+cat.id+"\\"><div onclick=\\"openChannelEdit('"+cat.id+"')\\">edit</div><div onclick=\\"copyToClipboard('"+cat.id+"')\\">copy id</div><div onclick=\\"copyToClipboard('"+esc(cat.name)+"')\\">copy name</div><div class=\\"menu-sep\\"></div><div onclick=\\"deleteChannel('"+cat.id+"','"+esc(cat.name)+"')\\">delete</div></div></div></div>";
      for(var j=0;j<children.length;j++){
        var c=children[j];
        var icon=c.type===0?"#":c.type===2?"\u{1F50A}":"#";
        var typeLabel=c.type===0?"text":c.type===2?"voice":"type "+c.type;
        h+="<div class=\\"channel-card\\"><span class=\\"channel-icon\\">"+icon+"</span><span class=\\"channel-name\\">"+esc(c.name)+"</span><span class=\\"channel-type\\">"+typeLabel+"</span><div class=\\"channel-menu\\"><button class=\\"channel-menu-btn\\" onclick=\\"event.stopPropagation();toggleChannelMenu('"+c.id+"')\\">\u22EE</button><div class=\\"channel-menu-dropdown\\" id=\\"cm_"+c.id+"\\"><div onclick=\\"openChannelEdit('"+c.id+"')\\">edit</div><div onclick=\\"copyToClipboard('"+c.id+"')\\">copy id</div><div onclick=\\"copyToClipboard('"+esc(c.name)+"')\\">copy name</div><div class=\\"menu-sep\\"></div><div onclick=\\"deleteChannel('"+c.id+"','"+esc(c.name)+"')\\">delete</div></div></div></div>";
      }
      h+='</div>';
    }
    if(!channels.length)h='<p style="color:#5a5260;font-size:10px;text-align:center;padding:16px">no channels</p>';
    g("channelManageList").innerHTML=h;
  });
}
function createChannel(){
  var name=g("newChannelName").value.trim();
  var type=g("newChannelType").value;
  var catId=g("newChannelCategory").value;
  if(!name){showToast("enter a channel name","error");return}
  var body={action:"create_channel",name:name,type:type};
  if(catId)body.categoryId=catId;
  api(body,function(d){
    if(d.success){showToast("channel created");g("newChannelName").value="";loadChannels()}
    else{showToast(d.error||"failed","error")}
  });
}
function deleteChannel(id,name){
  g("confirmTitle").textContent="delete #"+name;
  g("confirmBody").innerHTML="<p style='color:#7d7582;font-size:11px'>delete channel <b style='color:#e0dce4'>#"+esc(name)+"</b>? This cannot be undone.</p>";
  var btn=g("confirmBtn");btn.className="confirm-danger";btn.textContent="delete";
  btn.onclick=function(){api({action:"delete_channel",channelId:id},function(d){closeConfirm();if(d.success){showToast("channel deleted");loadChannels()}else{showToast(d.error||"failed","error")}})};
  g("confirmOverlay").classList.add("show");
}
function copyToClipboard(text){navigator.clipboard.writeText(text).then(function(){showToast("copied!")}).catch(function(){showToast("failed to copy","error")})}
function toggleChannelMenu(id){var e=window.event;if(e)e.stopPropagation();var a=document.querySelectorAll('.channel-menu-dropdown.show');for(var i=0;i<a.length;i++)a[i].classList.remove('show');var el=document.getElementById('cm_'+id);if(!el)return;if(el.classList.contains('show')){el.classList.remove('show');return}var btn=el.previousElementSibling;if(btn){var r=btn.getBoundingClientRect();var mw=120,mh=el.offsetHeight||80;var left=r.left;var top=r.top-mh-4;if(top<0)top=r.bottom+4;if(left+mw>window.innerWidth)left=window.innerWidth-mw-8;if(left<0)left=8;el.style.left=left+'px';el.style.top=top+'px';el.style.transform='none'}el.classList.add('show')}
document.addEventListener('click',function(){var a=document.querySelectorAll('.channel-menu-dropdown.show');for(var i=0;i<a.length;i++)a[i].classList.remove('show')});
var currentEditChannelId=null;
function openChannelEdit(id){
  var ch=allChannels.find(function(x){return x.id===id});if(!ch)return;
  currentEditChannelId=id;
  var isCat=ch.type===4;
  var isVoice=ch.type===2;
  var isText=ch.type===0;
  g("channelEditTitle").textContent="edit "+(isCat?"category":isVoice?"voice channel":"channel")+" #"+ch.name;
  var h="";
  h+="<label style='display:block;color:#6d6572;font-size:9px;text-transform:uppercase;margin-bottom:2px;font-weight:600'>name</label>";
  h+="<input id='ceName' value='"+esc(ch.name)+"' style='width:100%;padding:5px 6px;border:1px solid #2e343c;border-radius:5px;background:#191d23;color:#c0bcc4;font:11px Space Grotesk,monospace;margin-bottom:8px;outline:none'/>";
  if(isText){
    h+="<label style='display:block;color:#6d6572;font-size:9px;text-transform:uppercase;margin-bottom:2px;font-weight:600'>topic</label>";
    h+="<textarea id='ceTopic' style='width:100%;padding:4px 6px;border:1px solid #2e343c;border-radius:5px;background:#191d23;color:#c0bcc4;font:11px Space Grotesk,monospace;margin-bottom:8px;outline:none;resize:vertical;min-height:40px'>"+esc(ch.topic||"")+"</textarea>";
    h+="<label style='display:block;color:#6d6572;font-size:9px;text-transform:uppercase;margin-bottom:2px;font-weight:600'>slow mode (seconds)</label>";
    h+="<input id='ceSlow' type='number' min='0' max='21600' value='"+(ch.rate_limit_per_user||0)+"' style='width:100%;padding:5px 6px;border:1px solid #2e343c;border-radius:5px;background:#191d23;color:#c0bcc4;font:11px Space Grotesk,monospace;margin-bottom:8px;outline:none'/>";
    h+="<label style='display:flex;align-items:center;gap:6px;color:#9a929e;font-size:10px;margin-bottom:8px;cursor:pointer'><input id='ceNsfw' type='checkbox'"+(ch.nsfw?" checked":"")+" style='accent-color:#b48899'/>NSFW</label>";
  }
  if(isVoice){
    h+="<label style='display:block;color:#6d6572;font-size:9px;text-transform:uppercase;margin-bottom:2px;font-weight:600'>bitrate (kbps)</label>";
    h+="<input id='ceBitrate' type='number' min='8' max='384' value='"+(Math.floor((ch.bitrate||64000)/1000))+"' style='width:100%;padding:5px 6px;border:1px solid #2e343c;border-radius:5px;background:#191d23;color:#c0bcc4;font:11px Space Grotesk,monospace;margin-bottom:8px;outline:none'/>";
    h+="<label style='display:block;color:#6d6572;font-size:9px;text-transform:uppercase;margin-bottom:2px;font-weight:600'>user limit (0 = unlimited)</label>";
    h+="<input id='ceUserLimit' type='number' min='0' max='99' value='"+(ch.user_limit||0)+"' style='width:100%;padding:5px 6px;border:1px solid #2e343c;border-radius:5px;background:#191d23;color:#c0bcc4;font:11px Space Grotesk,monospace;margin-bottom:8px;outline:none'/>";
  }
  h+="<label style='display:block;color:#6d6572;font-size:9px;text-transform:uppercase;margin-bottom:2px;font-weight:600'>category</label>";
  h+="<select id='ceCategory' style='width:100%;padding:5px 6px;border:1px solid #2e343c;border-radius:5px;background:#191d23;color:#c0bcc4;font:11px Space Grotesk,monospace;margin-bottom:4px;outline:none'>";
  h+="<option value=''>no category</option>";
  var cats=allChannels.filter(function(x){return x.type===4}).sort(function(a,b){return a.position-b.position});
  for(var i=0;i<cats.length;i++){
    h+="<option value='"+cats[i].id+"'"+(ch.parent_id===cats[i].id?" selected":"")+">"+esc(cats[i].name)+"</option>";
  }
  h+="</select>";
  g("channelEditBody").innerHTML=h;
  g("channelEditModal").classList.add("show");
}
function closeChannelEdit(){g("channelEditModal").classList.remove("show");currentEditChannelId=null}
function saveChannelEdit(){
  var id=currentEditChannelId;
  var ch=allChannels.find(function(x){return x.id===id});if(!ch)return;
  var name=g("ceName").value.trim();
  if(!name){showToast("enter a channel name","error");return}
  var body={action:"edit_channel",channelId:id,name:name};
  if(ch.type===0){
    body.topic=g("ceTopic").value.trim();
    body.rate_limit_per_user=parseInt(g("ceSlow").value,10)||0;
    body.nsfw=g("ceNsfw").checked;
  }
  if(ch.type===2){
    body.bitrate=(parseInt(g("ceBitrate").value,10)||64)*1000;
    body.user_limit=parseInt(g("ceUserLimit").value,10)||0;
  }
  body.parent_id=g("ceCategory").value||null;
  var btn=g("channelEditBox").querySelector(".modal-footer button");
  btn.disabled=true;btn.textContent="saving...";
  api(body,function(d){
    btn.disabled=false;btn.textContent="save";
    if(d.success){showToast("channel updated");closeChannelEdit();loadChannels()}
    else{showToast(d.error||"failed","error")}
  });
}
function loadInvites(){
  g("inviteList").innerHTML="<p style='color:#6d6572;font-size:10px;text-align:center;padding:16px'>loading...</p>";
  api({action:"invites"},function(d){
    if(d.error){g("inviteList").innerHTML="<p style='color:#d45555;font-size:10px'>"+esc(d.error)+"</p>";return}
    var invites=d.invites||[];
    if(!invites.length){g("inviteList").innerHTML="<p style='color:#5a5260;font-size:10px;text-align:center;padding:16px'>no invites</p>";return}
    var h="";
    for(var i=0;i<invites.length;i++){
      var inv=invites[i];
      var inviter=inv.inviter;
      var inviterName=inviter?(inviter.global_name||inviter.username):"unknown";
      var created=inv.created_at?timeAgo(new Date(inv.created_at)):"";
      var maxAge=inv.max_age!==undefined?inv.max_age:86400;
      var maxUses=inv.max_uses!==undefined?inv.max_uses:0;
      var isTemp=inv.temporary;
      var expiresStr;
      if(maxAge<=0){expiresStr="<span class='invite-never'>never</span>"}
      else{
        var expiresAt=new Date(new Date(inv.created_at).getTime()+maxAge*1000);
        if(expiresAt<=new Date()){expiresStr="<span class='invite-expired'>expired</span>"}
        else{expiresStr="<span class='invite-expires-in'>"+formatDuration(maxAge)+"</span>"}
      }
      var usesStr="<span class='invite-uses-count'>"+(inv.uses||0)+"</span> / "+(maxUses>0?maxUses:"<span class='invite-unlimited'>&infin;</span>");
      var memberStr=(inv.approximate_member_count!==undefined)?"<span class='invite-members'>~"+inv.approximate_member_count+" members</span>":"";
      h+="<div class='invite-card'>";
      h+="<div class='invite-info'>";
      h+="<div class='invite-code'>"+esc(inv.code)+"</div>";
      h+="<div class='invite-meta'>by <b style='color:#e0dce4'>"+esc(inviterName)+"</b>"+(inv.channel?" #"+esc(inv.channel.name||""):"")+"</div>";
      h+="<div class='invite-details'>";
      if(created)h+="<span class='invite-created'>created "+created+"</span>";
      h+="<span class='invite-expires'>expires "+expiresStr+"</span>";
      if(isTemp)h+="<span class='invite-temp-badge'>temporary</span>";
      h+="</div>";
      h+="<div class='invite-details'>";
      h+="<span class='invite-uses'>uses: "+usesStr+"</span>";
      if(memberStr)h+=memberStr;
      h+="</div>";
      h+="</div>";
      h+="<button class='invite-del' onclick='deleteInvite(&quot;"+esc(inv.code)+"&quot;)'>delete</button>";
      h+="</div>";
    }
    g("inviteList").innerHTML=h;
  });
}
function deleteInvite(code){
  api({action:"delete_invite",inviteCode:code},function(d){
    if(d.success){showToast("invite deleted");loadInvites()}
    else{showToast(d.error||"failed","error")}
  });
}

// --- Emoji/Sticker list ---
function loadEmojis(){
  g("emojiContent").innerHTML="<p style='color:#6d6572;font-size:10px;text-align:center;padding:16px'>loading...</p>";
  api({action:"emojis"},function(d){
    if(d.error){g("emojiContent").innerHTML="<p style='color:#d45555;font-size:10px'>"+esc(d.error)+"</p>";return}
    var emojis=d.emojis||[];
    if(!emojis.length){g("emojiContent").innerHTML="<p style='color:#5a5260;font-size:10px;text-align:center;padding:16px'>no custom emojis</p>";return}
    var h="<div class='emoji-grid'>";
    for(var i=0;i<emojis.length;i++){
      var e=emojis[i];
      var ext=e.animated?".gif":".png";
      var url="https://cdn.discordapp.com/emojis/"+e.id+ext;
      h+="<div class='emoji-item' title=':"+esc(e.name)+":'>"+((e.animated||ext===".gif")?"<img src='"+url+"' alt='' loading='lazy'/>":"<img src='"+url+"' alt='' loading='lazy'/>")+"<span>:"+esc(e.name)+":</span></div>";
    }
    h+="</div>";
    g("emojiContent").innerHTML=h;
  });
}

// --- Audit Log ---
var auditPagination=null;
function loadAuditLog(){
  auditPagination={entries:[],users:[],roles:[],webhooks:[],integrations:[],before:null,loading:false,allLoaded:false};
  g("auditList").innerHTML="<p style='color:#6d6572;font-size:12px;text-align:center;padding:20px'>loading...</p>";
  fetchAuditLog();
}
function fetchAuditLog(){
  if(auditPagination.loading||auditPagination.allLoaded)return;
  auditPagination.loading=true;
  var limit=100;
  var body={action:"audit_log",limit:limit};
  if(auditPagination.before)body.before=auditPagination.before;
  api(body,function(d){
    auditPagination.loading=false;
    if(d.error){g("auditList").innerHTML="<p style='color:#d45555;font-size:12px;text-align:center;padding:20px'>"+esc(d.error)+"</p>";return}
    var entries=d.entries||[];
    if(entries.length<limit)auditPagination.allLoaded=true;
    if(!entries.length&&!auditPagination.entries.length){
      if(auditPagination.before){/* no more entries */}
      else{g("auditList").innerHTML="<p style='color:#5a5260;font-size:12px;text-align:center;padding:20px'>no audit log entries</p>";return}
    }
    auditPagination.entries=auditPagination.entries.concat(entries);
    auditPagination.users=auditPagination.users.concat(d.users||[]);
    auditPagination.roles=auditPagination.roles.concat(d.roles||[]);
    auditPagination.webhooks=auditPagination.webhooks.concat(d.webhooks||[]);
    auditPagination.integrations=auditPagination.integrations.concat(d.integrations||[]);
    if(entries.length)auditPagination.before=entries[entries.length-1].id;
    renderAuditLog();
  });
}
function renderAuditLog(){
  var entries=auditPagination.entries,users=auditPagination.users,roles=auditPagination.roles;
  var webhooks=auditPagination.webhooks,integrations=auditPagination.integrations;
  var userMap={};for(var i=0;i<users.length;i++)userMap[users[i].id]=users[i];
  var roleMap={};for(var i=0;i<roles.length;i++)roleMap[roles[i].id]=roles[i];
  var webhookMap={};for(var i=0;i<webhooks.length;i++)webhookMap[webhooks[i].id]=webhooks[i];
  var integrationMap={};for(var i=0;i<integrations.length;i++)integrationMap[integrations[i].id]=integrations[i];
  entries.sort(function(a,b){return String(b.id).localeCompare(String(a.id))});
  var h="";
  if(auditPagination.loading)h+="<p style='color:#5a5260;font-size:11px;text-align:center;padding:6px'>loading...</p>";
  for(var i=0;i<entries.length;i++){
    var e=entries[i];
    var user=userMap[e.user_id];
    var userName=user?(user.global_name||user.username):"@"+e.user_id;
    var avatar=user&&user.avatar?"https://cdn.discordapp.com/avatars/"+user.id+"/"+user.avatar+(user.avatar.startsWith("a_")?".gif":".png"):"https://cdn.discordapp.com/embed/avatars/"+((user?Number(user.discriminator):0)%5)+".png";
    var ts=new Date(e.id?Number(BigInt(e.id)>>22n)+1420070400000:Date.now());
    var timeStr=ts.toLocaleString("en-US",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"});
    h+="<div class='audit-entry'>";
    h+="<img class='audit-avatar' src='"+avatar+"' alt='' loading='lazy'/>";
    h+="<div class='audit-info'>";
    h+=formatAuditAction(e,userName,roleMap);
    h+="</div>";
    h+="<span class='audit-time'>"+timeStr+"</span>";
    h+="</div>";
  }
  if(auditPagination.allLoaded)h+="<p style='color:#5a5260;font-size:10px;text-align:center;padding:10px;opacity:.6'>all entries loaded</p>";
  if(!auditPagination.allLoaded&&!auditPagination.loading){
    h+="<div class='msg-load-more' onclick='fetchAuditLog()' style='margin:8px'>load older entries</div>";
  }
  g("auditList").innerHTML=h;
}
function formatAuditAction(e,userName,roleMap){
  var d=e.changes||[];
  var target=e.target_id||"";
  var actions={
    1:"guild update",
    10:"channel create",11:"channel update",12:"channel delete",
    13:"overwrite create",14:"overwrite update",15:"overwrite delete",
    20:"kick",21:"prune",22:"ban",23:"unban",
    24:"member update",25:"member role update",26:"member move",
    27:"member disconnect",28:"bot add",
    30:"role create",31:"role update",32:"role delete",
    40:"invite create",41:"invite update",42:"invite delete",
    50:"webhook create",51:"webhook update",52:"webhook delete",
    60:"emoji create",61:"emoji update",62:"emoji delete",
    72:"message delete",73:"bulk delete",74:"message pin",75:"message unpin",
    80:"integration create",81:"integration update",82:"integration delete",
    83:"stage create",84:"stage update",85:"stage delete",
    90:"sticker create",91:"sticker update",92:"sticker delete",
    100:"scheduled event create",101:"scheduled event update",102:"scheduled event delete",
    110:"thread create",111:"thread update",112:"thread delete",
    121:"permission update",
    130:"soundboard create",131:"soundboard update",132:"soundboard delete",
    140:"auto mod rule create",141:"auto mod rule update",142:"auto mod rule delete",
    143:"auto mod block",144:"auto mod flag",145:"auto mod mute",
    146:"auto mod quarantine"
  };
  var actionStr=actions[e.action_type]||"action #"+e.action_type;
  var result="<b>"+esc(userName)+"</b> <span class='hl'>"+esc(actionStr)+"</span>";
  if(target){
    var targetName=resolveTarget(target,roleMap);
    result+="<div class='audit-target'>"+esc(targetName||target)+"</div>";
  }
  if(d.length){
    result+="<div class='audit-changes'>";
    for(var i=0;i<d.length;i++){
      var c=d[i],k=c.key||"",ov=c.old_value,nv=c.new_value;
      if(k==="$add"||k==="$remove"){
        var items=k==="$add"?nv:ov;
        if(items&&items.length){
          var label=k==="$add"?"added":"removed";
          var names=items.map(function(x){return roleMap[x.id]?roleMap[x.id].name:(x.name||x.id)}).join(", ");
          result+="<div class='audit-change'><span class='audit-change-key'>"+esc(label)+":</span><span class='audit-change-new'>"+esc(names)+"</span></div>";
        }
      }else if(k==="permission_overwrites"){
        if(ov){result+="<div class='audit-change'><span class='audit-change-key'>overwrites:</span><span class='audit-change-old'>"+esc(formatPermOverwrite(ov))+"</span></div>"}
        if(nv){result+="<div class='audit-change'><span class='audit-change-key'>?</span><span class='audit-change-new'>"+esc(formatPermOverwrite(nv))+"</span></div>"}
      }else{
        result+="<div class='audit-change'>";
        result+="<span class='audit-change-key'>"+esc(k)+":</span>";
        if(ov!==undefined)result+="<span class='audit-change-old'>"+esc(formatValue(ov))+"</span>";
        if(ov!==undefined&&nv!==undefined)result+="<span class='audit-change-arrow'>?</span>";
        if(nv!==undefined)result+="<span class='audit-change-new'>"+esc(formatValue(nv))+"</span>";
        result+="</div>";
      }
    }
    result+="</div>";
  }
  if(e.reason)result+="<div class='audit-reason'>"+esc(e.reason)+"</div>";
  if(e.options){
    var opts=e.options;
    result+="<div class='audit-options'>";
    if(opts.channel_id)result+="channel: "+esc(opts.channel_id)+" ";
    if(opts.message_id)result+="message: "+esc(opts.message_id)+" ";
    if(opts.count!==undefined)result+="count: "+opts.count+" ";
    if(opts.members!==undefined)result+="members: "+opts.members+" ";
    if(opts.role_name)result+="role: "+esc(opts.role_name)+" ";
    if(opts.type)result+="type: "+opts.type+" ";
    result+="</div>";
  }
  return result;
}
function resolveTarget(id,roleMap){
  if(roleMap[id])return "@"+roleMap[id].name;
  return id;
}
function formatValue(v){
  if(typeof v==="object"&&v!==null)return JSON.stringify(v).substring(0,100);
  return String(v).substring(0,100);
}
function formatPermOverwrite(arr){
  if(!arr||!arr.length)return "none";
  return arr.map(function(o){return (o.id?o.id:"")+" allow:"+(o.allow||0)+" deny:"+(o.deny||0)}).join("; ").substring(0,120);
}

// --- Role management in member modal ---
var currentRoleMemberId=null;
function showMember(id){
  var m=allMembers.find(function(x){return x.user.id===id});if(!m)return;
  currentRoleMemberId=id;
  var name=m.nick||(m.user.global_name||m.user.username);
  var avatar=m.user.avatar?"https://cdn.discordapp.com/avatars/"+m.user.id+"/"+m.user.avatar+(m.user.avatar.startsWith("a_")?".gif":".png"):"https://cdn.discordapp.com/embed/avatars/"+(parseInt(m.user.discriminator||"0")%5)+".png";
  var joined=new Date(m.joined_at).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"});
  var rolesHtml="";
  for(var i=0;i<m.roles.length;i++){
    var role=allRoles.find(function(x){return x.id===m.roles[i]});
    if(role){
      var rc=role.color?"#"+role.color.toString(16).padStart(6,"0"):"#555";
      rolesHtml+="<div class='modal-role'><span class='modal-role-dot' style='background:"+rc+"'></span>"+esc(role.name)+"</div>";
    }
  }
  g("modalBox").innerHTML="<div class='modal-header'><img src='"+avatar+"' alt='' /><div class='modal-header-info'><h3>"+esc(name)+"</h3><p>"+esc(m.user.username)+(m.user.bot?" &middot; bot":"")+"</p></div></div>"+
    "<div class='modal-body'>"+
    "<div id='modalBadges'></div>"+
    "<div class='modal-section'><div class='modal-section-label'>id</div><p style='color:#9a929e;font-size:11px'>"+m.user.id+"</p></div>"+
    "<div class='modal-section'><div class='modal-section-label'>joined</div><p style='color:#9a929e;font-size:11px'>"+joined+"</p></div>"+
    (m.premium_since?"<div class='modal-section'><div class='modal-section-label'>boosting since</div><p style='color:#9a929e;font-size:11px'>"+new Date(m.premium_since).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"})+"</p></div>":"")+
    "<div class='modal-section'><div class='modal-section-label'>roles <span id='modalRoleCount' style='color:#5a5260'>("+m.roles.length+")</span></div><div id='modalRolesList' class='modal-roles'>"+(rolesHtml||"<span style='color:#5a5260;font-size:10px'>no roles</span>")+"</div>"+
    "<button class='role-edit-btn' onclick='toggleRoleEditor()'>edit roles</button>"+
    "</div>"+
    "<div class='modal-actions'>"+
    "<button class='btn-timeout' data-action='timeout' data-uid='"+m.user.id+"' data-uname='"+esc(name)+"' onclick='openConfirm(this)'>timeout</button>"+
    "<button class='btn-kick' data-action='kick' data-uid='"+m.user.id+"' data-uname='"+esc(name)+"' onclick='openConfirm(this)'>kick</button>"+
    "<button class='btn-ban' data-action='ban' data-uid='"+m.user.id+"' data-uname='"+esc(name)+"' onclick='openConfirm(this)'>ban</button>"+
    "</div>"+
    "<div class='modal-footer'><button onclick='c()'>close</button></div>";
  g("userModal").classList.add("show");
  api({action:"userinfo",userId:id},function(u){
    if(!u||u.error)return;
    var bannerHtml="";
    if(u.banner){
      var ext=u.banner.startsWith("a_")?".gif":".png";
      bannerHtml="<div class='modal-banner' style='background-image:url(https://cdn.discordapp.com/banners/"+u.id+"/"+u.banner+ext+"?size=480)'></div>";
    }else if(u.accent_color!=null){
      var ac="#"+u.accent_color.toString(16).padStart(6,"0");
      bannerHtml="<div class='modal-banner-color' style='background:"+ac+"'></div>";
    }else{
      var rc="#b48899";
      for(var ri=0;ri<m.roles.length;ri++){
        var rl=allRoles.find(function(x){return x.id===m.roles[ri]});
        if(rl&&rl.color){rc="#"+rl.color.toString(16).padStart(6,"0");break}
      }
      bannerHtml="<div class='modal-banner-color' style='background:"+rc+"'></div>";
    }
    var box=g("modalBox");
    box.insertAdjacentHTML("afterbegin",bannerHtml);
    if(u.banner){
      var newAvatar=u.avatar?"https://cdn.discordapp.com/avatars/"+u.id+"/"+u.avatar+(u.avatar.startsWith("a_")?".gif":".png"):avatar;
      var headerImg=box.querySelector(".modal-header img");
      if(headerImg)headerImg.src=newAvatar;
    }
    var flagsList=[];
    var f=u.public_flags||u.flags||0;
    if(f&1)flagsList.push("Discord Staff");
    if(f&2)flagsList.push("Discord Partner");
    if(f&4)flagsList.push("HypeSquad Events");
    if(f&8)flagsList.push("Bug Hunter L1");
    if(f&64)flagsList.push("Bug Hunter L2");
    if(f&128)flagsList.push("HypeSquad Bravery");
    if(f&256)flagsList.push("HypeSquad Brilliance");
    if(f&512)flagsList.push("HypeSquad Balance");
    if(f&16384)flagsList.push("Early Supporter");
    if(f&131072)flagsList.push("Verified Bot Developer");
    var badgesEl=g("modalBadges");
    if(badgesEl&&flagsList.length)badgesEl.innerHTML="<div class='modal-section'><div class='modal-section-label'>badges</div><div style='display:flex;flex-wrap:wrap;gap:3px'>"+flagsList.map(function(fl){return "<span style='font-size:9px;padding:2px 6px;background:#252a32;border:1px solid #2e343c;border-radius:2px;color:#7d7582'>"+fl+"</span>"}).join("")+"</div></div>";
  });
}
function toggleRoleEditor(){
  renderRoleEditor("");
  g("roleModal").classList.add("show");
}
function closeRoleEditor(){g("roleModal").classList.remove("show")}
function renderRoleEditor(filter){
  filter=(filter||"").toLowerCase();
  var m=allMembers.find(function(x){return x.user.id===currentRoleMemberId});
  if(!m)return;
  var searchH="<input class='role-editor-search' id='roleEditorSearch' placeholder='filter roles...' oninput='renderRoleEditor(this.value)' style='width:100%;padding:4px 6px;margin-bottom:6px;border:1px solid #2e343c;border-radius:4px;background:#13161b;color:#c0bcc4;font:10px Space Grotesk,monospace;outline:none'/>";
  var h="";
  var sortedRoles=allRoles.slice().sort(function(a,b){return b.position-a.position});
  for(var i=0;i<sortedRoles.length;i++){
    var r=sortedRoles[i];
    if(r.id===m.guild_id)continue;
    if(filter&&r.name.toLowerCase().indexOf(filter)===-1)continue;
    var hasRole=m.roles.indexOf(r.id)!==-1;
    var rc=r.color?"#"+r.color.toString(16).padStart(6,"0"):"#555";
    h+="<div class='role-editor-item"+(hasRole?" has-role":"")+"' data-roleid='"+r.id+"' onclick='roleEditorToggleRole(this)'>";
    h+="<span class='role-check'>"+(hasRole?"&#10003;":"")+"</span>";
    h+="<span class='modal-role-dot' style='background:"+rc+"'></span>"+esc(r.name);
    h+="</div>";
  }
  if(!h)h="<p style='color:#5a5260;font-size:10px;text-align:center;padding:6px'>no roles match</p>";
  g("roleModalBody").innerHTML=searchH+"<div style='display:flex;flex-direction:column;gap:1px'>"+h+"</div>";
}
function roleEditorToggleRole(el){
  var roleId=el.dataset.roleid,userId=currentRoleMemberId;
  var hasRole=el.classList.contains("has-role");
  var action=hasRole?"remove_role":"add_role";
  el.style.opacity="0.5";
  api({action:action,userId:userId,roleId:roleId},function(d){
    el.style.opacity="1";
    if(d.success){
      el.classList.toggle("has-role");
      var check=el.querySelector(".role-check");
      if(check)check.innerHTML=el.classList.contains("has-role")?"&#10003;":"";
      var m=allMembers.find(function(x){return x.user.id===currentRoleMemberId});
      if(m){
        if(hasRole)m.roles=m.roles.filter(function(x){return x!==roleId});
        else m.roles.push(roleId);
      }
      renderRoleEditor(g("roleEditorSearch")?g("roleEditorSearch").value:"");
      var roleCount=g("modalRoleCount");
      if(roleCount&&m)roleCount.textContent="("+m.roles.length+")";
      var rolesList=g("modalRolesList");
      if(rolesList&&m){
        var h="";
        for(var i=0;i<m.roles.length;i++){
          var role=allRoles.find(function(x){return x.id===m.roles[i]});
          if(role){
            var rc=role.color?"#"+role.color.toString(16).padStart(6,"0"):"#555";
            h+="<div class='modal-role'><span class='modal-role-dot' style='background:"+rc+"'></span>"+esc(role.name)+"</div>";
          }
        }
        rolesList.innerHTML=h||"<span style='color:#5a5260;font-size:10px'>no roles</span>";
      }
    }else{showToast(d.error||"failed","error")}
  });
}

// --- Dashboard activity ---
function loadDashboardActivity(){
  api({action:"guild_activity"},function(d){
    if(d.error)return;
    var el=g("dashActivity");
    if(!el)return;
    var h="";
    var hasAnyActivity=false;
    if(d.recentJoins&&d.recentJoins.length){
      hasAnyActivity=true;
      h+="<div style='margin-bottom:8px'><span style='font-size:10px;color:#6d6572;text-transform:uppercase;letter-spacing:.5px;font-weight:600'>recents</span></div>";
      for(var i=0;i<Math.min(d.recentJoins.length,10);i++){
        var j=d.recentJoins[i];
        var u=j.user;
        var name=u.global_name||u.username;
        var avatar=u.avatar?"https://cdn.discordapp.com/avatars/"+u.id+"/"+u.avatar+(u.avatar.startsWith("a_")?".gif":".png"):"https://cdn.discordapp.com/embed/avatars/"+(parseInt(u.discriminator||"0")%5)+".png";
        var ago=timeAgo(new Date(j.joined_at));
        var joinDate=new Date(j.joined_at).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"});
        h+="<div class='activity-item'><img src='"+avatar+"' alt='' loading='lazy'/><div class='activity-text'><b>"+esc(name)+"</b> joined<span class='activity-badge badge-join'>join</span></div><span class='activity-time' title='"+joinDate+"'>"+ago+"</span></div>";
      }
    }
    if(d.kicks&&d.kicks.length){
      if(!hasAnyActivity){hasAnyActivity=true;h+="<div style='margin-bottom:8px'><span style='font-size:10px;color:#6d6572;text-transform:uppercase;letter-spacing:.5px;font-weight:600'>recents</span></div>"}
      for(var i=0;i<Math.min(d.kicks.length,5);i++){
        var k=d.kicks[i];var u=k.target;
        var name=u.global_name||u.username;
        var avatar=u.avatar?"https://cdn.discordapp.com/avatars/"+u.id+"/"+u.avatar+(u.avatar.startsWith("a_")?".gif":".png"):"https://cdn.discordapp.com/embed/avatars/"+(parseInt(u.discriminator||"0")%5)+".png";
        var ago=k.created_at?timeAgo(new Date(k.created_at)):"";
        h+="<div class='activity-item'><img src='"+avatar+"' alt='' loading='lazy'/><div class='activity-text'><b>"+esc(name)+"</b> was kicked<span class='activity-badge badge-kick'>kick</span></div><span class='activity-time'>"+ago+"</span></div>";
      }
    }
    if(d.bans&&d.bans.length){
      if(!hasAnyActivity){hasAnyActivity=true;h+="<div style='margin-bottom:8px'><span style='font-size:10px;color:#6d6572;text-transform:uppercase;letter-spacing:.5px;font-weight:600'>recents</span></div>"}
      for(var i=0;i<Math.min(d.bans.length,5);i++){
        var b=d.bans[i];var u=b.user;
        var name=u.global_name||u.username;
        var avatar=u.avatar?"https://cdn.discordapp.com/avatars/"+u.id+"/"+u.avatar+(u.avatar.startsWith("a_")?".gif":".png"):"https://cdn.discordapp.com/embed/avatars/"+(parseInt(u.discriminator||"0")%5)+".png";
        h+="<div class='activity-item'><img src='"+avatar+"' alt='' loading='lazy'/><div class='activity-text'><b>"+esc(name)+"</b>"+(b.reason?" \u2013 "+esc(b.reason):"")+"<span class='activity-badge badge-ban'>ban</span></div></div>";
      }
    }
    el.innerHTML=h;
  });
}
function timeAgo(date){
  var s=Math.floor((Date.now()-date.getTime())/1000);
  if(s<60)return s+"s ago";
  if(s<3600)return Math.floor(s/60)+"m ago";
  if(s<86400)return Math.floor(s/3600)+"h ago";
  return Math.floor(s/86400)+"d ago";
}
function formatDuration(s){
  if(!s||s<=0)return "never";
  if(s<60)return s+"s";
  if(s<3600)return Math.floor(s/60)+"m";
  if(s<86400)return Math.floor(s/3600)+"h";
  if(s<604800)return Math.floor(s/86400)+"d";
  return Math.floor(s/86400)+"d";
}

// --- Guild edit ---
function editGuildName(){
  var current=g("guildNameDisplay");
  if(!current)return;
  var oldName=current.textContent;
  current.outerHTML="<input type='text' id='guildNameInput' value='"+esc(oldName)+"' style='font-size:16px;color:#e0dce4;background:#191d23;border:1px solid #b48899;padding:2px 6px;border-radius:4px;font-weight:600;font-family:Space Grotesk,monospace;width:200px' onkeydown='if(event.key===&quot;Enter&quot;)saveGuildName();if(event.key===&quot;Escape&quot;)cancelGuildEdit(&quot;"+esc(oldName)+"&quot;)'/>";
  g("guildNameInput").focus();g("guildNameInput").select();
}
function saveGuildName(){
  var input=g("guildNameInput");
  if(!input)return;
  var name=input.value.trim();
  if(!name||name.length>100){showToast("invalid name","error");return}
  api({action:"edit_guild",name:name},function(d){
    if(d.success){showToast("server name updated");loadDashboard()}
    else{showToast(d.error||"failed","error")}
  });
}
function cancelGuildEdit(name){
  var input=g("guildNameInput");
  if(input)input.outerHTML="<span id='guildNameDisplay' style='cursor:pointer' onclick='editGuildName()' title='click to edit'>"+esc(name)+"</span>";
}
var currentDmChannel=null;
var allDmChannels=[];

// --- DM Channel List ---
function loadDmChannels(){
  api({action:"dm_channels"},function(d){
    if(d.error){g("dmChannelList").innerHTML="<p style='color:#d45555;padding:8px;font-size:11px'>"+esc(d.error)+"</p>";return}
    if(!d.channels||!d.channels.length){g("dmChannelList").innerHTML="<p style='color:#5a5260;padding:8px;font-size:11px'>no DMs found</p><div style='padding:6px 8px;border-top:1px solid #252a32'><input id='dmUserIdInput' placeholder='enter user ID...' style='width:100%;padding:4px 6px;border:1px solid #2e343c;border-radius:4px;background:#13161b;color:#c0bcc4;font:11px monospace;outline:none;box-sizing:border-box' onkeydown='if(event.key==&quot;Enter&quot;)startDmWithUser()'/><div style='margin-top:4px'><button onclick='startDmWithUser()' style='padding:3px 10px;background:#b48899;color:#13161b;border:none;border-radius:4px;font-size:10px;cursor:pointer'>start DM</button></div></div>";return}
    var channels=d.channels;
    channels.sort(function(a,b){
      var al=(a.last_message_id||"0"),bl=(b.last_message_id||"0");
      return bl>al?1:bl<al?-1:0;
    });
    allDmChannels=channels;
    renderDmChannelList(channels);
  });
}
function startDmWithUser(){
  var inp=g("dmUserIdInput");if(!inp)return;
  var uid=inp.value.trim();
  if(!uid||uid.length<17)return;
  inp.disabled=true;
  inp.value="opening DM...";
  api({action:"dm_send",userId:uid,content:""},function(d){
    if(d.success&&d.channelId){pickDmChannel(d.channelId)}
    else{showToast(d.error||"failed to open DM","error");inp.disabled=false;inp.value=uid}
  });
}
function renderDmChannelList(channels){
  if(!channels||!channels.length){g("dmChannelList").innerHTML="<p style='color:#5a5260;padding:8px;font-size:11px'>no DMs</p>";return}
  var h="";
  for(var i=0;i<channels.length;i++){
    var ch=channels[i];
    var recip=getDmRecipient(ch);
    if(!recip)continue;
    var name=recip.global_name||recip.username;
    var avatar=recip.avatar?"https://cdn.discordapp.com/avatars/"+recip.id+"/"+recip.avatar+(recip.avatar.startsWith("a_")?".gif":".png"):"https://cdn.discordapp.com/embed/avatars/"+(parseInt(recip.discriminator||"0")%5)+".png";
    h+="<div class=\\"channel-item"+(currentDmChannel===ch.id?" selected":"")+"\\" onclick=\\"pickDmChannel('"+ch.id+"')\\" data-name=\\""+esc(name.toLowerCase())+"\\">";
    h+="<img src=\\""+avatar+"\\" style=\\"width:18px;height:18px;border-radius:50%;flex-shrink:0\\" alt=\\"\\" loading=\\"lazy\\"/>";
    h+="<span class=\\"ch-name\\">"+esc(name)+"</span>";
    h+="</div>";
  }
  g("dmChannelList").innerHTML=h;
}
function getDmRecipient(ch){
  if(ch.recipients&&ch.recipients.length){return ch.recipients[0]}
  return null;
}
function showDmChannelList(){
  g("dmChannelList").classList.add("show");
}
function hideDmChannelList(){
  g("dmChannelList").classList.remove("show");
}
function filterDmChannels(q){
  var items=g("dmChannelList").querySelectorAll(".channel-item");
  var ql=q.toLowerCase();
  for(var i=0;i<items.length;i++){
    var name=items[i].getAttribute("data-name")||"";
    items[i].style.display=name.indexOf(ql)===-1?"none":"";
  }
  showDmChannelList();
}

// --- DM Channel Select ---
function pickDmChannel(cid){
  hideDmChannelList();
  currentDmChannel=cid;
  var recip=null;
  for(var i=0;i<allDmChannels.length;i++){
    if(allDmChannels[i].id===cid){recip=getDmRecipient(allDmChannels[i]);break}
  }
  var name=recip?(recip.global_name||recip.username):"DM";
  g("dmSearch").value=name;
  loadDmHistory(cid);
}

// --- DM History ---
var dmPagination={before:null,channelId:null,loading:false};
function loadDmHistory(cid){
  g("dmHistory").innerHTML="<p style='color:#6d6572;text-align:center;padding:20px 0'>loading...</p>";
  g("dmLoadMore").style.display="none";
  g("dmMsgSearch").value="";
  dmPagination={before:null,channelId:cid,loading:false};
  api({action:"dm_messages",channelId:cid,limit:50},function(d){
    if(d.error){g("dmHistory").innerHTML="<p style='color:#d45555;text-align:center;padding:20px 0'>"+esc(d.error)+"</p>";return}
    if(!d.messages||!d.messages.length){g("dmHistory").innerHTML="<p style='color:#5a5260;text-align:center;padding:20px 0'>no messages</p>";return}
    if(!Array.isArray(d.messages)){g("dmHistory").innerHTML="<p style='color:#d45555;text-align:center;padding:20px 0'>invalid response</p>";return}
    if(d.messages.length>=50){g("dmLoadMore").style.display="block";dmPagination.before=d.messages[d.messages.length-1].id}
    renderDmHistory(d.messages,cid);
  });
}
function renderDmHistory(messages,cid){
  g("dmHistory").innerHTML=renderMsgRows(messages,cid,true);
  parseTwemoji(g("dmHistory"));
  g("dmHistory").scrollTop=g("dmHistory").scrollHeight;
}
function loadMoreDmMessages(){
  if(dmPagination.loading||!dmPagination.before||!dmPagination.channelId)return;
  dmPagination.loading=true;
  g("dmLoadMore").textContent="loading...";
  var cid=dmPagination.channelId,before=dmPagination.before;
  api({action:"dm_messages",channelId:cid,limit:50,before:before},function(d){
    if(cid!==dmPagination.channelId)return;
    dmPagination.loading=false;
    g("dmLoadMore").textContent="load older messages";
    if(d.error||!d.messages||!d.messages.length){g("dmLoadMore").style.display="none";return}
    if(d.messages.length>=50){dmPagination.before=d.messages[d.messages.length-1].id;g("dmLoadMore").style.display="block"}
    else{dmPagination.before=null}
    g("dmHistory").insertAdjacentHTML("afterbegin",renderMsgRows(d.messages,cid,true));
    parseTwemoji(g("dmHistory"));
  });
}
function filterDmMsgHistory(q){
  var rows=document.querySelectorAll("#dmHistory .msg-row");
  var ql=q.toLowerCase();
  for(var i=0;i<rows.length;i++){
    var content=rows[i].querySelector(".msg-content");
    var author=rows[i].querySelector(".msg-author");
    var text=(content?content.textContent:"")+(author?author.textContent:"");
    rows[i].style.display=ql&&text.toLowerCase().indexOf(ql)===-1?"none":"";
  }
}

// --- DM Send ---
function sendDm(){
  var c=currentDmChannel,m=g("dmInput").value.trim();
  if(!c)return;
  if(!m)return;
  g("dmInput").value="";
  api({action:"dm_send",channelId:c,content:m},function(d){
    if(d.success)loadDmHistory(c);
  });
}

// --- DM Edit ---
function editDmMsg(cid,mid){
  var row=document.querySelector('[data-mid="'+mid+'"]');
  if(!row)return;
  var content=row.querySelector(".msg-content");
  if(!content)return;
  var old=content.textContent;
  content.outerHTML="<div class='msg-content'><textarea id='dmEditInput' style='width:100%;background:#13161b;border:1px solid #b48899;border-radius:6px;color:#c0bcc4;padding:4px 8px;font:13px monospace;resize:none'>"+esc(old)+"</textarea><div style='margin-top:4px'><button onclick='saveDmEdit(&quot;"+cid+"&quot;,&quot;"+mid+"&quot;)' style='padding:2px 8px;background:#b48899;color:#13161b;border:none;border-radius:4px;font-size:10px;cursor:pointer'>save</button> <button onclick='loadDmHistory(&quot;"+cid+"&quot;)' style='padding:2px 8px;font-size:10px;cursor:pointer'>cancel</button></div></div>";
  var inp=g("dmEditInput");inp.focus();inp.select();
}
function saveDmEdit(cid,mid){
  var inp=g("dmEditInput");
  if(!inp)return;
  var content=inp.value.trim();
  if(!content){return}
  api({action:"edit",channelId:cid,messageId:mid,content:content},function(d){
    if(d.success)loadDmHistory(cid);
    else alert(d.error||"failed to edit");
  });
}

// --- DM Delete ---
function deleteDmMsg(cid,mid){
  if(!confirm("delete this message?"))return;
  var el=document.querySelector('[data-mid="'+mid+'"]');
  if(el)el.style.opacity="0.4";
  api({action:"delete",channelId:cid,messageId:mid},function(d){
    if(d.success)loadDmHistory(cid);
    else{if(el)el.style.opacity="1";alert(d.error||"failed to delete")}
  });
}
var confirmData={};
function openConfirm(el){
  var action=el.dataset.action,userId=el.dataset.uid,userName=el.dataset.uname;
  confirmData={action:action,userId:userId};
  var title={timeout:"timeout "+userName,kick:"kick "+userName,ban:"ban "+userName};
  var h="";
  if(action==="timeout"){
    h+="<label>duration</label><select id='cfDuration'><option value='1'>1 minute</option><option value='5'>5 minutes</option><option value='10'>10 minutes</option><option value='30' selected>30 minutes</option><option value='60'>1 hour</option><option value='360'>6 hours</option><option value='1440'>24 hours</option><option value='10080'>7 days</option></select>";
  }
  h+="<label>reason (optional)</label><input type='text' id='cfReason' placeholder='reason...'/>";
  g("confirmTitle").textContent=title[action];
  g("confirmBody").innerHTML=h;
  var btn=g("confirmBtn");
  btn.className="confirm-danger";
  btn.textContent=action;
  g("confirmOverlay").classList.add("show");
}
function closeConfirm(){g("confirmOverlay").classList.remove("show")}
function executeConfirm(){
  var action=confirmData.action,userId=confirmData.userId,reason=g("cfReason").value;
  var body={action:action,userId:userId};
  if(reason)body.reason=reason;
  if(action==="timeout")body.minutes=parseInt(g("cfDuration").value)||30;
  closeConfirm();c();
  g("memberList").innerHTML="<p style='color:#6d6572;text-align:center;padding:20px 0'>executing "+action+"...</p>";
  api(body,function(d){
    if(d.success){
      loadMembers();
    }else{
      alert(d.error||"failed to "+action);
      loadMembers();
    }
  });
}
document.addEventListener("click",function(e){if(!e.target.closest("#channelPicker")&&!e.target.closest("#channelList"))hideChannelList();if(!e.target.closest("#dmPicker")&&!e.target.closest("#dmChannelList"))hideDmChannelList()});
api({action:"guildinfo"},function(d){
  if(d.error&&d.error==="Unauthorized"){g("panel-dashboard").classList.add("show");g("loginOverlay").style.display="flex"}
  else{initPanel()}
});
</script>
</body>
</html>`;
}
async function handler(req, res) {
  const clientIp = req.headers["x-forwarded-for"]?.split(",")[0]?.trim() || "unknown";
  if (!checkRateLimit(clientIp)) {
    logRequest(req.method || "?", "/api", void 0, clientIp, 429);
    return res.status(429).json({ error: "Too many requests" });
  }
  try {
    if (req.method === "GET") {
      const code = req.query.code;
      if (code) {
        return await handleOAuthCallback(req, res, code);
      }
      const oauthError = req.query.error;
      if (oauthError) {
        const desc = req.query.error_description || "Login was denied.";
        res.setHeader("Content-Type", "text/html; charset=utf-8");
        return res.status(403).send("<html><body style='background:#13161b;color:#d45555;font-family:monospace;display:flex;justify-content:center;align-items:center;height:100vh'><div style='text-align:center'><h1>Access Denied</h1><p style='color:#7d7582'>" + htmlEscape(desc) + "</p><a href='/api' style='color:#b48899'>&larr; back</a></div></body></html>");
      }
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      return res.status(200).send(html());
    }
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method Not Allowed" });
    }
    const signature = req.headers["x-signature-ed25519"];
    const timestamp = req.headers["x-signature-timestamp"];
    let body = req.body;
    if (!body) {
      try {
        const chunks = [];
        let totalSize = 0;
        const MAX_BODY_SIZE = 1024 * 1024;
        for await (const chunk of req) {
          totalSize += chunk.length;
          if (totalSize > MAX_BODY_SIZE) {
            return res.status(413).json({ error: "Request body too large" });
          }
          chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
        }
        const raw = Buffer.concat(chunks).toString();
        if (raw) body = JSON.parse(raw);
      } catch {
      }
    }
    if (!body || typeof body !== "object") {
      return res.status(400).json({ error: "Invalid body" });
    }
    if (typeof signature === "string" && typeof timestamp === "string") {
      return await handleDiscord(req, res, JSON.stringify(body), signature, timestamp);
    }
    const panelResult = await handlePanel(res, body, req);
    logRequest("POST", "/api", body.action, clientIp, res.statusCode || 200);
    return panelResult;
  } catch (error) {
    console.error("Handler error", error);
    logRequest(req.method || "?", "/api", void 0, clientIp, 500);
    return res.status(500).json({ error: "Internal error" });
  }
}
async function handleDiscord(req, res, rawBody, signature, timestamp) {
  if (!process.env.DISCORD_PUBLIC_KEY) {
    return res.status(500).json({ error: "No public key" });
  }
  let isValid = false;
  try {
    isValid = await verifyKey(Buffer.from(rawBody), signature, timestamp, process.env.DISCORD_PUBLIC_KEY);
  } catch {
    return res.status(401).json({ error: "Invalid signature" });
  }
  if (!isValid) return res.status(401).json({ error: "Invalid signature" });
  const message = JSON.parse(rawBody);
  if (message.type === InteractionType2.PING) {
    return res.status(200).json({ type: InteractionResponseType.Pong });
  }
  if (message.type === InteractionType2.APPLICATION_COMMAND) {
    const commandName = message.data.name.toLowerCase();
    const command = commands_default[commandName];
    if (command) {
      try {
        await discordFetch3(
          `https://discord.com/api/v10/interactions/${message.id}/${message.token}/callback`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              type: InteractionResponseType.DeferredChannelMessageWithSource,
              data: { flags: command.data.initialEphemeral ? MessageFlags5.Ephemeral : 0 }
            })
          }
        );
      } catch {
        return res.status(500).json({ error: "Failed to defer" });
      }
      let commandResult;
      try {
        commandResult = await command.execute({ interaction: message });
      } catch (error) {
        const errMsg = error instanceof Error ? error.message : "Unknown error";
        commandResult = {
          flags: MessageFlags5.Ephemeral,
          embeds: [{
            color: 15548997,
            title: "Command Error",
            fields: [
              { name: "Command", value: `/${commandName}`, inline: true },
              { name: "Error", value: `\`\`\`
${errMsg.length > 1e3 ? errMsg.slice(0, 1e3) + "..." : errMsg}
\`\`\``, inline: false }
            ]
          }]
        };
      }
      try {
        await discordFetch3(
          `https://discord.com/api/v10/webhooks/${message.application_id}/${message.token}/messages/@original`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              content: commandResult.content ?? "",
              flags: commandResult.flags,
              embeds: commandResult.embeds
            })
          }
        );
        return res.status(200).end();
      } catch {
        return res.status(500).json({ error: "Failed to update message" });
      }
    }
    return res.status(400).json({ error: "Unknown Command" });
  }
  return res.status(400).json({ error: "Unknown Interaction Type" });
}
async function handleOAuthCallback(req, res, code) {
  try {
    const stateParam = req.query.state || "";
    if (!stateParam || !verifyState(stateParam)) {
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      return res.status(403).send("<html><body style='background:#13161b;color:#d45555;font-family:monospace;display:flex;justify-content:center;align-items:center;height:100vh'><div style='text-align:center'><h1>Invalid State</h1><p style='color:#7d7582'>CSRF validation failed.</p><a href='/api' style='color:#b48899'>&larr; back</a></div></body></html>");
    }
    const params = new URLSearchParams({
      client_id: DISCORD_APP_ID,
      client_secret: DISCORD_CLIENT_SECRET,
      grant_type: "authorization_code",
      code,
      redirect_uri: OAUTH_REDIRECT
    });
    const tokenRes = await discordFetch3("https://discord.com/api/v10/oauth2/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString()
    });
    const userRes = await discordFetch3("https://discord.com/api/v10/users/@me", {
      headers: { Authorization: `Bearer ${tokenRes.access_token}` }
    });
    if (userRes.id !== DISCORD_OWNER_ID) {
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      return res.status(403).send("<html><body style='background:#13161b;color:#d45555;font-family:monospace;display:flex;justify-content:center;align-items:center;height:100vh'><div style='text-align:center'><h1>Access Denied</h1><p style='color:#7d7582'>This account is not authorized.</p><a href='/api' style='color:#b48899'>? back</a></div></body></html>");
    }
    res.setHeader("Set-Cookie", `token=${signToken(userRes.id)}; Path=/; Max-Age=86400; SameSite=Strict; HttpOnly; Secure`);
    res.setHeader("Location", "/api");
    return res.status(302).end();
  } catch (err) {
    console.error("OAuth callback error:", err.message);
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    return res.status(500).send("<html><body style='background:#13161b;color:#d45555;font-family:monospace;display:flex;justify-content:center;align-items:center;height:100vh'><div style='text-align:center'><h1>OAuth Error</h1><p style='color:#7d7582'>" + htmlEscape(err.message || "Unknown error") + "</p><a href='/api' style='color:#b48899'>? back</a></div></body></html>");
  }
}
async function handlePanel(res, body, req) {
  if (body.action === "oauth_url") {
    const state = crypto.randomBytes(16).toString("hex");
    const signedState = signState(state);
    res.setHeader("Set-Cookie", `oauth_state=${signedState}; Path=/; Max-Age=600; SameSite=Lax; HttpOnly; Secure`);
    const url = `https://discord.com/api/oauth2/authorize?client_id=${DISCORD_APP_ID}&redirect_uri=${encodeURIComponent(OAUTH_REDIRECT)}&response_type=code&scope=identify&state=${encodeURIComponent(signedState)}`;
    return res.json({ url });
  }
  if (body.action === "logout") {
    res.setHeader("Set-Cookie", "token=; Path=/; Max-Age=0; SameSite=Strict; HttpOnly; Secure");
    return res.json({ success: true });
  }
  const reqToken = getTokenFromRequest(req) || "";
  if (!verifyToken(reqToken)) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const headers = { Authorization: `Bot ${process.env.DISCORD_TOKEN}` };
  const guildId = process.env.GUILD_ID;
  try {
    if (body.action === "guildinfo") {
      const [guildRes, chanRes, rolesRes] = await Promise.all([
        discordFetch3(`https://discord.com/api/v10/guilds/${guildId}?with_counts=true`, { headers }),
        discordFetch3(`https://discord.com/api/v10/guilds/${guildId}/channels`, { headers }),
        discordFetch3(`https://discord.com/api/v10/guilds/${guildId}/roles`, { headers })
      ]);
      const guild = guildRes;
      const botRes = await discordFetch3("https://discord.com/api/v10/users/@me", { headers });
      const ownerRes = await discordFetch3(`https://discord.com/api/v10/users/${guild.owner_id}`, { headers });
      let bots = 0, humans = 0, totalMembers = guild.approximate_member_count || guild.member_count || "?";
      try {
        const members = await discordFetch3(`https://discord.com/api/v10/guilds/${guildId}/members?limit=1000`, { headers });
        bots = members.filter((m) => m.user?.bot).length;
        humans = members.length - bots;
        totalMembers = guild.approximate_member_count || guild.member_count || members.length;
      } catch {
      }
      let textCh = 0, voiceCh = 0, categoryCh = 0;
      for (const ch of chanRes) {
        if (ch.type === 0) textCh++;
        else if (ch.type === 2) voiceCh++;
        else if (ch.type === 4) categoryCh++;
      }
      let iconUrl = null;
      if (guild.icon) {
        const ext = guild.icon.startsWith("a_") ? ".gif" : ".png";
        iconUrl = `https://cdn.discordapp.com/icons/${guildId}/${guild.icon}${ext}?size=256`;
      }
      return res.json({
        botId: botRes.id,
        name: guild.name,
        icon: iconUrl,
        owner: ownerRes.global_name || ownerRes.username,
        ownerId: guild.owner_id,
        totalMembers,
        bots,
        humans,
        channelCount: chanRes.length,
        textChannels: textCh,
        voiceChannels: voiceCh,
        categories: categoryCh,
        roleCount: rolesRes.length,
        roles: rolesRes.map((r) => ({ id: r.id, name: r.name, color: r.color, position: r.position, hoist: r.hoist })),
        created: new Date(Number(BigInt(guild.id) >> 22n) + 14200704e5).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) + " \uFFFD " + new Date(Number(BigInt(guild.id) >> 22n) + 14200704e5).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
        createdTs: Number(BigInt(guild.id) >> 22n) + 14200704e5,
        boostLevel: guild.premium_tier || 0,
        boostCount: guild.premium_subscription_count || 0,
        features: guild.features || []
      });
    }
    if (body.action === "channels") {
      const channels = await discordFetch3(`https://discord.com/api/v10/guilds/${guildId}/channels`, { headers });
      return res.json({ channels });
    }
    if (body.action === "send") {
      if (!isValidSnowflake(body.channelId)) return res.status(400).json({ error: "Invalid channel ID" });
      const content = validateContent(body.content);
      if (content === null) return res.status(400).json({ error: "Invalid content (max 2000 chars)" });
      const form = new FormData();
      form.append("content", content);
      const file = validateFileUpload(body.fileData, body.fileName, body.fileType);
      if (file) form.append("file", file.blob, file.name);
      const response = await fetch(`https://discord.com/api/v10/channels/${body.channelId}/messages`, {
        method: "POST",
        headers: { ...headers },
        body: form
      });
      if (!response.ok) {
        let msg = `HTTP ${response.status}`;
        try {
          const d = await response.json();
          msg = d.message || msg;
        } catch {
        }
        throw new Error(msg);
      }
      return res.json({ success: true });
    }
    if (body.action === "messages") {
      if (!isValidSnowflake(body.channelId)) return res.status(400).json({ error: "Invalid channel ID" });
      try {
        const limit = parseLimit(body.limit, 30, 100);
        let url = `https://discord.com/api/v10/channels/${body.channelId}/messages?limit=${limit}`;
        if (body.before && isValidSnowflake(body.before)) url += `&before=${body.before}`;
        const messages = await discordFetch3(url, { headers });
        return res.json({ messages });
      } catch (e) {
        return res.status(500).json({ error: e.message || "Failed to fetch messages" });
      }
    }
    if (body.action === "delete") {
      if (!isValidSnowflake(body.channelId)) return res.status(400).json({ error: "Invalid channel ID" });
      if (!isValidSnowflake(body.messageId)) return res.status(400).json({ error: "Invalid message ID" });
      await discordFetch3(
        `https://discord.com/api/v10/channels/${body.channelId}/messages/${body.messageId}`,
        { method: "DELETE", headers }
      );
      return res.json({ success: true });
    }
    if (body.action === "members") {
      const [memberRes, rolesRes] = await Promise.all([
        discordFetch3(`https://discord.com/api/v10/guilds/${guildId}/members?limit=1000`, { headers }),
        discordFetch3(`https://discord.com/api/v10/guilds/${guildId}/roles`, { headers })
      ]);
      const members = Array.isArray(memberRes) ? memberRes : [];
      return res.json({ members, roles: rolesRes });
    }
    if (body.action === "userinfo") {
      if (!isValidSnowflake(body.userId)) return res.status(400).json({ error: "Invalid user ID" });
      const userRes = await discordFetch3(`https://discord.com/api/v10/users/${body.userId}`, { headers });
      return res.json(userRes);
    }
    if (body.action === "dm_channels") {
      try {
        const channels = await discordFetch3(`https://discord.com/api/v10/users/@me/channels`, { headers });
        return res.json({ channels });
      } catch (e) {
        return res.status(500).json({ error: e.message || "Failed to fetch DM channels" });
      }
    }
    if (body.action === "dm_messages") {
      if (!isValidSnowflake(body.channelId)) return res.status(400).json({ error: "Invalid channel ID" });
      try {
        const limit = parseLimit(body.limit, 50, 100);
        let url = `https://discord.com/api/v10/channels/${body.channelId}/messages?limit=${limit}`;
        if (body.before && isValidSnowflake(body.before)) url += `&before=${body.before}`;
        const messages = await discordFetch3(url, { headers });
        return res.json({ messages });
      } catch (e) {
        return res.status(500).json({ error: e.message || "Failed to fetch DM messages" });
      }
    }
    if (body.action === "dm_send") {
      let channelId = body.channelId;
      if (!channelId && body.userId) {
        if (!isValidSnowflake(body.userId)) return res.status(400).json({ error: "Invalid user ID" });
        try {
          const ch = await discordFetch3(`https://discord.com/api/v10/users/@me/channels`, {
            method: "POST",
            headers,
            body: JSON.stringify({ recipient_id: body.userId })
          });
          channelId = ch.id;
        } catch (e) {
          return res.status(500).json({ error: e.message || "Failed to create DM channel" });
        }
      }
      if (!channelId) return res.status(400).json({ error: "No channel or user specified" });
      if (channelId && !isValidSnowflake(channelId)) return res.status(400).json({ error: "Invalid channel ID" });
      try {
        if (body.content || body.fileData) {
          const content = validateContent(body.content);
          if (content === null) return res.status(400).json({ error: "Invalid content (max 2000 chars)" });
          const form = new FormData();
          form.append("content", content);
          const file = validateFileUpload(body.fileData, body.fileName, body.fileType);
          if (file) form.append("file", file.blob, file.name);
          const response = await fetch(`https://discord.com/api/v10/channels/${channelId}/messages`, {
            method: "POST",
            headers: { ...headers },
            body: form
          });
          if (!response.ok) {
            let msg = `HTTP ${response.status}`;
            try {
              const d = await response.json();
              msg = d.message || msg;
            } catch {
            }
            return res.status(500).json({ error: msg });
          }
        }
        return res.json({ success: true, channelId });
      } catch (e) {
        return res.status(500).json({ error: e.message || "Failed to send DM" });
      }
    }
    if (body.action === "ban") {
      const userId = body.userId;
      if (!userId) return res.status(400).json({ error: "No user specified" });
      if (!isValidSnowflake(userId)) return res.status(400).json({ error: "Invalid user ID" });
      try {
        const banHeaders = { ...headers, "Content-Type": "application/json" };
        if (body.reason) banHeaders["X-Audit-Log-Reason"] = encodeURIComponent(String(body.reason).slice(0, 512));
        const banBody = {};
        if (body.deleteDays) banBody.delete_message_seconds = Math.min(Math.max(parseInt(String(body.deleteDays), 10) || 1, 0), 7) * 86400;
        await discordFetch3(
          `https://discord.com/api/v10/guilds/${guildId}/bans/${userId}`,
          { method: "PUT", headers: banHeaders, body: JSON.stringify(banBody) }
        );
        return res.json({ success: true });
      } catch (e) {
        return res.status(500).json({ error: e.message || "Failed to ban user" });
      }
    }
    if (body.action === "kick") {
      const userId = body.userId;
      if (!userId) return res.status(400).json({ error: "No user specified" });
      if (!isValidSnowflake(userId)) return res.status(400).json({ error: "Invalid user ID" });
      try {
        const kickHeaders = { ...headers };
        if (body.reason) kickHeaders["X-Audit-Log-Reason"] = encodeURIComponent(String(body.reason).slice(0, 512));
        await discordFetch3(
          `https://discord.com/api/v10/guilds/${guildId}/members/${userId}`,
          { method: "DELETE", headers: kickHeaders }
        );
        return res.json({ success: true });
      } catch (e) {
        return res.status(500).json({ error: e.message || "Failed to kick user" });
      }
    }
    if (body.action === "timeout") {
      const userId = body.userId;
      if (!userId) return res.status(400).json({ error: "No user specified" });
      if (!isValidSnowflake(userId)) return res.status(400).json({ error: "Invalid user ID" });
      try {
        const clampedMinutes = clampMinutes(body.minutes);
        const timeoutValue = clampedMinutes > 0 ? new Date(Date.now() + clampedMinutes * 60 * 1e3).toISOString() : null;
        const timeoutHeaders = { ...headers, "Content-Type": "application/json" };
        if (body.reason) timeoutHeaders["X-Audit-Log-Reason"] = encodeURIComponent(String(body.reason).slice(0, 512));
        await discordFetch3(
          `https://discord.com/api/v10/guilds/${guildId}/members/${userId}`,
          { method: "PATCH", headers: timeoutHeaders, body: JSON.stringify({ communication_disabled_until: timeoutValue }) }
        );
        return res.json({ success: true });
      } catch (e) {
        return res.status(500).json({ error: e.message || "Failed to timeout user" });
      }
    }
    if (body.action === "moderations") {
      try {
        const [bans, members] = await Promise.all([
          discordFetch3(`https://discord.com/api/v10/guilds/${guildId}/bans?limit=1000`, { headers }).catch(() => []),
          discordFetch3(`https://discord.com/api/v10/guilds/${guildId}/members?limit=1000`, { headers }).catch(() => [])
        ]);
        const now = (/* @__PURE__ */ new Date()).toISOString();
        const timeouts = (Array.isArray(members) ? members : []).filter((m) => m.communication_disabled_until && m.communication_disabled_until > now);
        return res.json({
          bans: Array.isArray(bans) ? bans : [],
          timeouts: timeouts.map((m) => ({ user: m.user, communication_disabled_until: m.communication_disabled_until, nick: m.nick }))
        });
      } catch (e) {
        return res.json({ bans: [], timeouts: [], error: e.message || "Failed to fetch moderations" });
      }
    }
    if (body.action === "bans") {
      try {
        const bans = await discordFetch3(
          `https://discord.com/api/v10/guilds/${guildId}/bans?limit=1000`,
          { headers }
        );
        return res.json({ bans: Array.isArray(bans) ? bans : [] });
      } catch (e) {
        return res.json({ bans: [], error: e.message || "Failed to fetch bans" });
      }
    }
    if (body.action === "unban") {
      const userId = body.userId;
      if (!userId) return res.status(400).json({ error: "No user specified" });
      if (!isValidSnowflake(userId)) return res.status(400).json({ error: "Invalid user ID" });
      try {
        await discordFetch3(
          `https://discord.com/api/v10/guilds/${guildId}/bans/${userId}`,
          { method: "DELETE", headers }
        );
        return res.json({ success: true });
      } catch (e) {
        return res.status(500).json({ error: e.message || "Failed to unban" });
      }
    }
    if (body.action === "edit") {
      if (!isValidSnowflake(body.channelId)) return res.status(400).json({ error: "Invalid channel ID" });
      if (!isValidSnowflake(body.messageId)) return res.status(400).json({ error: "Invalid message ID" });
      const content = validateContent(body.content);
      if (content === null) return res.status(400).json({ error: "Invalid content (max 2000 chars)" });
      try {
        await discordFetch3(
          `https://discord.com/api/v10/channels/${body.channelId}/messages/${body.messageId}`,
          { method: "PATCH", headers: { ...headers, "Content-Type": "application/json" }, body: JSON.stringify({ content }) }
        );
        return res.json({ success: true });
      } catch (e) {
        return res.status(500).json({ error: e.message || "Failed to edit message" });
      }
    }
    if (body.action === "audit_log") {
      try {
        const limit = parseLimit(body.limit, 25, 100);
        let url = `https://discord.com/api/v10/guilds/${guildId}/audit-logs?limit=${limit}`;
        if (body.before) url += `&before=${body.before}`;
        const log = await discordFetch3(url, { headers });
        return res.json({ entries: log.audit_log_entries || [], users: log.users || [], roles: log.roles || [], webhooks: log.webhooks || [], integrations: log.integrations || [] });
      } catch (e) {
        return res.status(500).json({ error: e.message || "Failed to fetch audit log" });
      }
    }
    if (body.action === "invites") {
      try {
        const invites = await discordFetch3(
          `https://discord.com/api/v10/guilds/${guildId}/invites`,
          { headers }
        );
        return res.json({ invites: Array.isArray(invites) ? invites : [] });
      } catch (e) {
        return res.status(500).json({ error: e.message || "Failed to fetch invites" });
      }
    }
    if (body.action === "delete_invite") {
      if (!body.inviteCode) return res.status(400).json({ error: "No invite code" });
      try {
        await discordFetch3(
          `https://discord.com/api/v10/guilds/${guildId}/invites/${encodeURIComponent(body.inviteCode)}`,
          { method: "DELETE", headers }
        );
        return res.json({ success: true });
      } catch (e) {
        return res.status(500).json({ error: e.message || "Failed to delete invite" });
      }
    }
    if (body.action === "emojis") {
      try {
        const emojis = await discordFetch3(
          `https://discord.com/api/v10/guilds/${guildId}/emojis`,
          { headers }
        );
        return res.json({ emojis: Array.isArray(emojis) ? emojis : [] });
      } catch (e) {
        return res.status(500).json({ error: e.message || "Failed to fetch emojis" });
      }
    }
    if (body.action === "create_channel") {
      try {
        const chName = typeof body.name === "string" ? body.name.trim().replace(/[^\w\-]/g, "-").slice(0, 100) : "";
        if (!chName) return res.status(400).json({ error: "Channel name required" });
        const chBody = { name: chName, type: parseInt(String(body.type), 10) || 0 };
        if (body.topic) chBody.topic = String(body.topic).slice(0, 1024);
        if (body.categoryId && isValidSnowflake(body.categoryId)) chBody.parent_id = body.categoryId;
        const ch = await discordFetch3(
          `https://discord.com/api/v10/guilds/${guildId}/channels`,
          { method: "POST", headers: { ...headers, "Content-Type": "application/json" }, body: JSON.stringify(chBody) }
        );
        return res.json({ success: true, channel: ch });
      } catch (e) {
        return res.status(500).json({ error: e.message || "Failed to create channel" });
      }
    }
    if (body.action === "delete_channel") {
      if (!isValidSnowflake(body.channelId)) return res.status(400).json({ error: "Invalid channel ID" });
      try {
        await discordFetch3(
          `https://discord.com/api/v10/channels/${body.channelId}`,
          { method: "DELETE", headers }
        );
        return res.json({ success: true });
      } catch (e) {
        return res.status(500).json({ error: e.message || "Failed to delete channel" });
      }
    }
    if (body.action === "edit_channel") {
      if (!isValidSnowflake(body.channelId)) return res.status(400).json({ error: "Invalid channel ID" });
      const patchBody = {};
      if (typeof body.name === "string") patchBody.name = body.name.trim().replace(/[^\w\-]/g, "-").slice(0, 100);
      if (body.topic !== void 0) patchBody.topic = String(body.topic).slice(0, 1024);
      if (body.rate_limit_per_user !== void 0) patchBody.rate_limit_per_user = Math.min(Math.max(parseInt(body.rate_limit_per_user, 10) || 0, 0), 21600);
      if (body.nsfw !== void 0) patchBody.nsfw = Boolean(body.nsfw);
      if (body.bitrate !== void 0) patchBody.bitrate = Math.min(Math.max(parseInt(body.bitrate, 10) || 8e3, 8e3), 384e3);
      if (body.user_limit !== void 0) patchBody.user_limit = Math.min(Math.max(parseInt(body.user_limit, 10) || 0, 0), 99);
      if (body.parent_id !== void 0) patchBody.parent_id = body.parent_id && isValidSnowflake(body.parent_id) ? body.parent_id : null;
      try {
        await discordFetch3(
          `https://discord.com/api/v10/channels/${body.channelId}`,
          { method: "PATCH", headers: { ...headers, "Content-Type": "application/json" }, body: JSON.stringify(patchBody) }
        );
        return res.json({ success: true });
      } catch (e) {
        return res.status(500).json({ error: e.message || "Failed to update channel" });
      }
    }
    if (body.action === "add_role") {
      if (!isValidSnowflake(body.userId)) return res.status(400).json({ error: "Invalid user ID" });
      if (!isValidSnowflake(body.roleId)) return res.status(400).json({ error: "Invalid role ID" });
      try {
        await discordFetch3(
          `https://discord.com/api/v10/guilds/${guildId}/members/${body.userId}/roles/${body.roleId}`,
          { method: "PUT", headers }
        );
        return res.json({ success: true });
      } catch (e) {
        return res.status(500).json({ error: e.message || "Failed to add role" });
      }
    }
    if (body.action === "remove_role") {
      if (!isValidSnowflake(body.userId)) return res.status(400).json({ error: "Invalid user ID" });
      if (!isValidSnowflake(body.roleId)) return res.status(400).json({ error: "Invalid role ID" });
      try {
        await discordFetch3(
          `https://discord.com/api/v10/guilds/${guildId}/members/${body.userId}/roles/${body.roleId}`,
          { method: "DELETE", headers }
        );
        return res.json({ success: true });
      } catch (e) {
        return res.status(500).json({ error: e.message || "Failed to remove role" });
      }
    }
    if (body.action === "edit_guild") {
      try {
        const patchBody = {};
        if (body.name && typeof body.name === "string") {
          const n = body.name.trim().slice(0, 100);
          if (n) patchBody.name = n;
        }
        if (body.icon && typeof body.icon === "string") {
          patchBody.icon = body.icon;
        }
        if (!Object.keys(patchBody).length) return res.status(400).json({ error: "Nothing to update" });
        const guild = await discordFetch3(
          `https://discord.com/api/v10/guilds/${guildId}`,
          { method: "PATCH", headers: { ...headers, "Content-Type": "application/json" }, body: JSON.stringify(patchBody) }
        );
        return res.json({ success: true, guild });
      } catch (e) {
        return res.status(500).json({ error: e.message || "Failed to update guild" });
      }
    }
    if (body.action === "guild_activity") {
      try {
        const members = await discordFetch3(
          `https://discord.com/api/v10/guilds/${guildId}/members?limit=1000&sort=joined_at&desc=true`,
          { headers }
        ).catch(() => []);
        const now = Date.now();
        const day = 864e5;
        const last7d = (Array.isArray(members) ? members : []).filter((m) => {
          const joined = new Date(m.joined_at).getTime();
          return now - joined < 7 * day;
        });
        const recentJoins = last7d.slice(0, 20).map((m) => ({
          user: m.user,
          joined_at: m.joined_at,
          nick: m.nick
        }));
        let bans = [];
        try {
          const banList = await discordFetch3(`https://discord.com/api/v10/guilds/${guildId}/bans?limit=100`, { headers });
          bans = Array.isArray(banList) ? banList.slice(0, 20) : [];
        } catch {
        }
        let kicks = [];
        try {
          const auditLog = await discordFetch3(`https://discord.com/api/v10/guilds/${guildId}/audit-logs?limit=100&action_type=1`, { headers });
          if (auditLog && auditLog.audit_log_entries) {
            kicks = auditLog.audit_log_entries.slice(0, 20).map((entry) => ({
              user: auditLog.users?.find((u) => u.id === entry.user_id) || { id: entry.user_id, username: "Unknown" },
              target: auditLog.users?.find((u) => u.id === entry.target_id) || { id: entry.target_id, username: "Unknown" },
              created_at: entry.id ? new Date(Bigint(entry.id) >> 22n + 14200704e5).toISOString() : null
            }));
          }
        } catch {
        }
        return res.json({ recentJoins, bans, kicks, totalJoins7d: last7d.length });
      } catch (e) {
        return res.json({ recentJoins: [], bans: [], kicks: [], totalJoins7d: 0, error: e.message });
      }
    }
    return res.status(400).json({ error: "Unknown action" });
  } catch (err) {
    return res.status(500).json({
      error: err?.message || "Request failed"
    });
  }
}
export {
  handler as default
};
