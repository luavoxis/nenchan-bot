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
  console.error("FATAL: HMAC_SECRET is empty \u2014 set DISCORD_CLIENT_SECRET or DISCORD_TOKEN");
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
  const mod = u.protocol === "https:" ? await import("https") : await import("http");
  return new Promise((resolve, reject) => {
    const req = mod.request(u, {
      method: opts.method || "GET",
      headers: opts.body ? { "Content-Type": "application/json", ...opts.headers } : { ...opts.headers }
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
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
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
.main{flex:1;padding:16px;max-width:680px;margin-left:160px;height:100vh;overflow-y:auto}
.panel{display:none}
.panel.show{display:block}
#panel-messages.show{display:flex;flex-direction:column;height:calc(100vh - 80px)}
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
.msg-row{display:flex;gap:10px;padding:6px 8px;border-radius:6px;margin-bottom:2px;position:relative}
.msg-row:hover{background:#191d23}
.msg-row:hover .msg-del{opacity:1}
.msg-row:last-child{border-bottom:none}
.msg-avatar{width:34px;height:34px;border-radius:50%;flex-shrink:0;cursor:pointer}
.msg-body{flex:1;min-width:0}
.msg-author{font-weight:600;color:#e0dce4;font-size:12px;cursor:pointer}
.msg-author:hover{text-decoration:underline}
.msg-time{color:#5a5260;font-size:10px;margin-left:6px}
.msg-time-inline{color:#5a5260;font-size:9px;visibility:hidden;min-width:34px;text-align:center}
.msg-row:hover .msg-time-inline{visibility:visible}
.msg-edited{color:#5a5260;font-size:9px;margin-left:4px}
.msg-content{color:#c0bcc4;margin-top:2px;word-wrap:break-word;white-space:pre-wrap}
.msg-content .mention{color:#b48899;background:rgba(180,136,153,0.12);padding:0 4px;border-radius:3px;cursor:pointer;font-weight:500}
.msg-content .mention:hover{background:rgba(180,136,153,0.25)}
.msg-content code{background:#252a32;padding:1px 5px;border-radius:3px;font-size:11px;color:#e0dce4}
.msg-content pre{background:#191d23;border:1px solid #252a32;border-radius:6px;padding:8px;margin:4px 0;overflow-x:auto;font-size:10px;color:#e0dce4}
.msg-content pre code{background:none;padding:0}
.msg-content a{color:#b48899;text-decoration:none}
.msg-content a:hover{text-decoration:underline}
.msg-content blockquote{border-left:3px solid #b48899;padding-left:8px;color:#6d6572;margin:4px 0}
.msg-content .spoiler{background:#252a32;color:transparent;border-radius:3px;padding:0 4px;cursor:pointer}
.msg-content .spoiler:hover,.msg-content .spoiler.revealed{color:#c0bcc4;background:rgba(180,136,153,0.15)}
.msg-ref{color:#5a5260;font-size:10px;padding:2px 0 4px;border-left:2px solid #252a32;padding-left:8px;margin:2px 0 4px;display:flex;align-items:center;gap:4px}
.msg-ref:hover{color:#6d6572}
.msg-sticker{max-height:120px;border-radius:6px;margin:4px 0}
.msg-img{max-width:320px;max-height:240px;border-radius:6px;margin:4px 0;cursor:pointer;display:block}
.msg-video{max-width:380px;max-height:260px;border-radius:6px;margin:4px 0;display:block}
.msg-audio{max-width:320px;margin:4px 0}
.msg-file-link{color:#b48899;text-decoration:none;font-size:10px;padding:4px 8px;border:1px solid #252a32;border-radius:6px;display:inline-block;background:#191d23;transition:all .15s}
.msg-file-link:hover{border-color:#b48899;background:#1e2228}
.msg-embed{background:#191d23;border-left:3px solid #b48899;border-radius:0 6px 6px 0;padding:8px 10px;margin:6px 0;max-width:480px}
.msg-embed-author{color:#b48899;font-size:10px;font-weight:600;margin-bottom:2px}
.msg-embed-title{color:#e0dce4;font-size:12px;font-weight:600;margin-bottom:4px}
.msg-embed-title:hover{text-decoration:underline;cursor:pointer}
.msg-embed-desc{color:#c0bcc4;font-size:11px;line-height:1.5}
.msg-embed-field-name{color:#e0dce4;font-size:11px;font-weight:600;margin-top:6px}
.msg-embed-field-val{color:#c0bcc4;font-size:11px;line-height:1.4}
.msg-reactions{display:flex;flex-wrap:wrap;gap:4px;margin-top:4px}
.msg-reaction{display:inline-flex;align-items:center;gap:3px;padding:2px 6px;border:1px solid #252a32;border-radius:4px;background:#191d23;font-size:10px;color:#c0bcc4;cursor:pointer;transition:all .15s}
.msg-reaction:hover{border-color:#b48899;background:#1e2228}
.msg-reaction-count{font-weight:600;color:#e0dce4}
.msg-del{position:absolute;top:8px;right:8px;width:24px;height:24px;border-radius:4px;display:flex;align-items:center;justify-content:center;cursor:pointer;opacity:0;color:#6d6572;background:#191d23;border:1px solid #252a32;font-size:10px;transition:all .15s}
.msg-del:hover{color:#d45555;border-color:#d45555;background:rgba(212,85,85,0.1)}
.msg-day-divider{text-align:center;margin:12px 0 8px;position:relative}
.msg-day-divider span{background:#13161b;padding:0 10px;color:#5a5260;font-size:10px;position:relative;z-index:1}
.msg-day-divider::before{content:'';position:absolute;top:50%;left:0;right:0;height:1px;background:#1e2228}
.msg-group-start{margin-top:8px}
.msg-group-start .msg-avatar{visibility:visible}
.mention-list{display:none;position:absolute;top:100%;left:0;right:0;background:#191d23;border:1px solid #252a32;border-radius:0 0 8px 8px;max-height:180px;overflow-y:auto;z-index:90;box-shadow:0 8px 24px rgba(0,0,0,0.4)}
.mention-list.show{display:block}
.mention-list .mention-item{display:flex;align-items:center;gap:8px;padding:6px 10px;cursor:pointer;font-size:11px;color:#c0bcc4;transition:background .1s}
.mention-list .mention-item:hover{background:#252a32}
.mention-list .mention-item img{width:22px;height:22px;border-radius:50%}
.mention-list .mention-item .m-name{font-weight:500;color:#e0dce4}
.mention-list .mention-item .m-bot{font-size:8px;background:#b48899;color:#13161b;padding:1px 4px;border-radius:3px;margin-left:5px;font-weight:700;text-transform:uppercase;vertical-align:middle}
.drop-zone{border:1px dashed #252a32;border-radius:6px;padding:8px;text-align:center;color:#5a5260;font-size:10px;cursor:pointer;margin-bottom:8px;transition:all .15s}
.drop-zone:hover,.drop-zone.dragover{border-color:#b48899;color:#b48899;background:rgba(180,136,153,0.05)}
.drop-zone.has-file{border-color:#b48899;color:#b48899}
.msg-input-row{display:flex;gap:8px}
.msg-input-row textarea{flex:1;border:1px solid #252a32;border-radius:6px;background:#13161b;color:#c0bcc4;padding:8px 10px;font:11px 'Space Grotesk',monospace;resize:none;min-height:36px;max-height:120px;outline:none;margin:0}
.msg-input-row textarea:focus{border-color:#b48899}
.msg-input-row button{background:#b48899;color:#13161b;border:none;border-radius:6px;padding:8px 16px;font:11px 'Space Grotesk',monospace;font-weight:600;cursor:pointer;transition:background .15s}
.msg-input-row button:hover{background:#c9a0ae}
.msg-topbar{display:flex;gap:8px;margin-bottom:8px;align-items:center}
.msg-topbar select{flex:1;max-width:220px;border:1px solid #252a32;border-radius:6px;background:#191d23;color:#c0bcc4;padding:8px 10px;font:11px 'Space Grotesk',monospace;outline:none;cursor:pointer}
.msg-topbar select:focus{border-color:#b48899}
.msg-topbar-mention{flex:1;position:relative}
.msg-topbar-mention input{width:100%;padding:8px 10px;border:1px solid #252a32;border-radius:6px;background:#191d23;color:#c0bcc4;font:11px 'Space Grotesk',monospace;outline:none}
.msg-topbar-mention input:focus{border-color:#b48899}
.msg-topbar-channel{flex:1;max-width:220px;position:relative}
.msg-topbar-channel input{width:100%;padding:8px 10px;border:1px solid #252a32;border-radius:6px;background:#191d23;color:#c0bcc4;font:11px 'Space Grotesk',monospace;outline:none;margin:0}
.msg-topbar-channel input:focus{border-color:#b48899}
.msg-history-box{flex:1;min-height:0;overflow-y:auto;background:#13161b;border:1px solid #1e2228;border-radius:8px;padding:8px;font-size:11px;line-height:1.55;margin-bottom:8px;max-height:calc(100vh - 260px)}
.msg-history-box::-webkit-scrollbar{width:6px}
.msg-history-box::-webkit-scrollbar-track{background:#13161b}
.msg-history-box::-webkit-scrollbar-thumb{background:#252a32;border-radius:3px}
.msg-history-box::-webkit-scrollbar-thumb:hover{background:#363d47}
.msg-compose{background:#191d23;border:1px solid #1e2228;border-radius:8px;padding:10px}
.msg-status{font-size:10px;margin-top:6px;min-height:14px;color:#6d6572}
.menu-toggle{display:none;position:fixed;top:8px;left:8px;z-index:50;background:#191d23;border:1px solid #2e343c;color:#7d7582;width:32px;height:32px;font:14px 'Space Grotesk',monospace;cursor:pointer}
.menu-toggle:hover{color:#e0dce4;border-color:#4a4350}
.sidebar-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:9}
@media(max-width:600px){
  .sidebar{position:fixed;top:0;left:0;z-index:10;height:100vh;transform:translateX(-100%);transition:transform .2s ease;padding-top:48px}
  .sidebar.open{transform:translateX(0)}
  .sidebar-overlay.show{display:block}
  .menu-toggle{display:block}
  .main{margin-left:0;padding:16px 12px 16px 48px}
}
.member-grid{display:flex;flex-direction:column;gap:6px;max-height:calc(100vh - 180px);overflow-y:auto;scrollbar-width:none;-ms-overflow-style:none}
.member-grid::-webkit-scrollbar{display:none}
.member-card{display:flex;align-items:center;gap:10px;padding:8px 10px;background:#191d23;border:1px solid #252a32;border-radius:8px;cursor:pointer;transition:border-color .15s}
.member-card:hover{border-color:#3a3340}
.member-avatar{width:34px;height:34px;border-radius:50%;flex-shrink:0;border:2px solid #252a32}
.member-info{flex:1;min-width:0}
.member-name{color:#e0dce4;font-size:11px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.member-name span{color:#5a5260;font-size:10px;font-weight:400}
.member-username{color:#5a5260;font-size:10px}
.member-badges{display:flex;gap:3px;margin-top:2px}
.member-badge{font-size:8px;padding:1px 4px;border-radius:2px;font-weight:600;text-transform:uppercase;letter-spacing:.3px}
.badge-boost{background:rgba(180,136,153,.15);color:#b48899}
.member-roles{display:flex;gap:3px;flex-wrap:wrap;margin-top:3px}
.role-badge{font-size:9px;padding:1px 5px;border-radius:3px;background:#252a32;color:#7d7582;border:1px solid #2e343c;white-space:nowrap;font-weight:600}
.role-group-header{font-size:10px;color:#6d6572;text-transform:uppercase;letter-spacing:.5px;padding:10px 8px 6px;margin-top:10px;font-weight:600;display:flex;align-items:center;gap:6px}
.role-group-header:first-child{margin-top:0}
.role-group-count{color:#5a5260;font-weight:400;font-size:10px}
.member-joined{color:#5a5260;font-size:9px;flex-shrink:0;font-weight:600}
.member-search{width:100%;padding:8px 10px;border:1px solid #2e343c;border-radius:8px;background:#191d23;color:#c0bcc4;font:12px 'Space Grotesk',monospace;margin-bottom:10px;outline:none;transition:border-color .15s}
.member-search:focus{border-color:#b48899}
.member-search::placeholder{color:#5a5260}
.member-stats{display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin-bottom:10px}
.member-stat{text-align:center;padding:10px 6px;background:#191d23;border:1px solid #252a32;border-radius:8px;transition:border-color .15s}
.member-stat:hover{border-color:#3a3340}
.member-stat span{display:block;font-size:9px;color:#6d6572;text-transform:uppercase;letter-spacing:.5px;font-weight:600}
.member-stat p{font-size:14px;color:#e0dce4;margin-top:2px;font-weight:600}
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
.dm-channel{display:flex;align-items:center;gap:10px;padding:8px 10px;background:#191d23;border:1px solid #252a32;border-radius:8px;cursor:pointer;transition:border-color .15s;margin-bottom:4px}
.dm-channel:hover{border-color:#3a3340}
.dm-channel img{width:34px;height:34px;border-radius:50%;flex-shrink:0;border:2px solid #252a32}
.dm-channel-name{color:#e0dce4;font-size:11px;font-weight:600}
.dm-channel-preview{color:#5a5260;font-size:10px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.dm-channel-time{color:#5a5260;font-size:9px;flex-shrink:0;margin-left:auto;font-weight:600}
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
.msg-edit-btn{position:absolute;top:8px;right:32px;width:24px;height:24px;border-radius:4px;display:flex;align-items:center;justify-content:center;cursor:pointer;opacity:0;color:#6d6572;background:#191d23;border:1px solid #252a32;font-size:10px;transition:all .15s}
.msg-row:hover .msg-edit-btn{opacity:1}
.msg-edit-btn:hover{color:#b48899;border-color:#b48899;background:rgba(180,136,153,0.1)}
.msg-edit-area{margin-top:4px}
.msg-edit-area textarea{width:100%;padding:6px 8px;border:1px solid #b48899;border-radius:6px;background:#13161b;color:#c0bcc4;font:11px 'Space Grotesk',monospace;resize:none;min-height:36px;outline:none}
.msg-edit-actions{display:flex;gap:4px;margin-top:4px}
.msg-edit-actions button{padding:3px 10px;font-size:10px;border-radius:4px;border:none;cursor:pointer;font-family:'Space Grotesk',monospace}
.msg-edit-save{background:#b48899;color:#13161b}
.msg-edit-cancel{background:#252a32;color:#7d7582}
.msg-search-bar{display:flex;gap:6px;margin-bottom:8px}
.msg-search-bar input{flex:1;padding:6px 10px;border:1px solid #252a32;border-radius:6px;background:#191d23;color:#c0bcc4;font:11px 'Space Grotesk',monospace;outline:none}
.msg-search-bar input:focus{border-color:#b48899}
.msg-search-bar button{padding:5px 12px}
.msg-load-more{text-align:center;padding:8px;cursor:pointer;color:#b48899;font-size:10px;border:1px solid #252a32;border-radius:6px;background:#191d23;transition:all .15s;margin-bottom:8px}
.msg-load-more:hover{border-color:#b48899;background:#1e2228}
.audit-entry{display:flex;gap:10px;padding:8px 10px;border-bottom:1px solid #252a32;transition:background .15s;font-size:11px}
.audit-entry:hover{background:#1e2228}
.audit-entry:last-child{border-bottom:none}
.audit-avatar{width:28px;height:28px;border-radius:50%;flex-shrink:0}
.audit-info{flex:1;min-width:0}
.audit-action{color:#c0bcc4;line-height:1.4}
.audit-action b{color:#e0dce4;font-weight:600}
.audit-action .hl{color:#b48899}
.audit-time{color:#5a5260;font-size:9px;flex-shrink:0;margin-left:auto;font-weight:600}
.invite-card{display:flex;align-items:center;gap:10px;padding:8px 10px;border-bottom:1px solid #252a32;transition:background .15s}
.invite-card:last-child{border-bottom:none}
.invite-card:hover{background:#1e2228}
.invite-code{color:#b48899;font-family:monospace;font-size:11px;font-weight:600}
.invite-info{flex:1;min-width:0}
.invite-meta{color:#5a5260;font-size:9px;margin-top:2px}
.invite-uses{color:#6d6572;font-size:10px}
.invite-del{padding:4px 10px;font-size:9px;border:1px solid #d45555;color:#d45555;background:transparent;border-radius:4px;cursor:pointer;font-family:'Space Grotesk',monospace;transition:all .15s;flex-shrink:0}
.invite-del:hover{background:#d45555;color:#fff}
.emoji-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(48px,1fr));gap:4px;max-height:300px;overflow-y:auto;padding:4px}
.emoji-grid::-webkit-scrollbar{width:4px}
.emoji-grid::-webkit-scrollbar-thumb{background:#252a32;border-radius:2px}
.emoji-item{display:flex;flex-direction:column;align-items:center;gap:2px;padding:6px;border-radius:6px;cursor:pointer;transition:background .15s}
.emoji-item:hover{background:#252a32}
.emoji-item img{width:32px;height:32px}
.emoji-item span{font-size:8px;color:#5a5260;text-align:center;word-break:break-all;max-width:48px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.event-card{padding:10px 12px;border-bottom:1px solid #252a32;transition:background .15s}
.event-card:last-child{border-bottom:none}
.event-card:hover{background:#1e2228}
.event-name{color:#e0dce4;font-size:12px;font-weight:600}
.event-time{color:#b48899;font-size:10px;margin-top:2px}
.event-desc{color:#6d6572;font-size:10px;margin-top:3px}
.event-status{font-size:9px;padding:2px 6px;border-radius:3px;font-weight:600;text-transform:uppercase;margin-left:6px}
.event-active{background:rgba(85,180,136,.15);color:#55b488}
.event-scheduled{background:rgba(180,136,153,.15);color:#b48899}
.event-completed{background:rgba(90,82,96,.15);color:#5a5260}
.event-cancelled{background:rgba(212,85,85,.15);color:#d45555}
.event-del{padding:4px 10px;font-size:9px;border:1px solid #d45555;color:#d45555;background:transparent;border-radius:4px;cursor:pointer;font-family:'Space Grotesk',monospace;transition:all .15s;flex-shrink:0;margin-top:4px}
.event-del:hover{background:#d45555;color:#fff}
.channel-card{display:flex;align-items:center;gap:10px;padding:8px 10px;border-bottom:1px solid #252a32;transition:background .15s}
.channel-card:last-child{border-bottom:none}
.channel-card:hover{background:#1e2228}
.channel-icon{color:#6d6572;font-size:14px;flex-shrink:0}
.channel-name{color:#e0dce4;font-size:11px;font-weight:600;flex:1}
.channel-type{color:#5a5260;font-size:9px;padding:2px 6px;background:#252a32;border-radius:3px;flex-shrink:0}
.channel-del{padding:4px 10px;font-size:9px;border:1px solid #d45555;color:#d45555;background:transparent;border-radius:4px;cursor:pointer;font-family:'Space Grotesk',monospace;transition:all .15s;flex-shrink:0}
.channel-del:hover{background:#d45555;color:#fff}
.create-form{display:flex;gap:6px;margin-bottom:10px;flex-wrap:wrap}
.create-form input,.create-form select{flex:1;min-width:100px}
.create-form button{white-space:nowrap}
.toast{position:fixed;bottom:20px;right:20px;padding:10px 16px;border-radius:8px;font:11px 'Space Grotesk',monospace;z-index:300;animation:toastIn .2s ease;max-width:320px}
.toast-success{background:#1e3a2a;border:1px solid #55b488;color:#55b488}
.toast-error{background:#3a1e1e;border:1px solid #d45555;color:#d45555}
@keyframes toastIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
.emoji-picker-wrap{position:relative;display:inline-block}
.emoji-picker-dropdown{display:none;position:absolute;bottom:100%;left:0;background:#1e2228;border:1px solid #3a424c;border-radius:8px;width:320px;max-height:360px;z-index:80;overflow:hidden;box-shadow:0 -8px 24px rgba(0,0,0,.4);display:none;flex-direction:column}
.emoji-picker-dropdown.show{display:flex}
.emoji-picker-search{margin:6px 8px;padding:5px 8px;background:#13161b;border:1px solid #2e343c;border-radius:6px;color:#c0bcc4;font:12px 'Space Grotesk',monospace;width:calc(100% - 16px);outline:none}
.emoji-picker-search:focus{border-color:#b48899}
.emoji-picker-grid{display:grid;grid-template-columns:repeat(8,1fr);gap:2px;padding:4px 8px 8px;overflow-y:auto;flex:1}
.emoji-picker-grid img{width:22px;height:22px;cursor:pointer;border-radius:4px;padding:2px;transition:background .1s}
.emoji-picker-grid img:hover{background:#252a32}
.role-manager{max-height:200px;overflow-y:auto;padding:4px 0;scrollbar-width:thin;scrollbar-color:#252a32 transparent}
.role-manager::-webkit-scrollbar{width:4px}
.role-manager::-webkit-scrollbar-thumb{background:#252a32;border-radius:2px}
.role-manage-item{display:flex;align-items:center;gap:6px;padding:4px 8px;border-radius:4px;cursor:pointer;transition:background .1s;font-size:10px;color:#9a929e}
.role-manage-item:hover{background:#252a32}
.role-manage-item .role-check{width:14px;height:14px;border:1px solid #3a424c;border-radius:3px;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:9px;transition:all .15s}
.role-manage-item.has-role .role-check{background:#b48899;border-color:#b48899;color:#13161b}
.role-manage-item.has-role{color:#e0dce4}
.activity-item{display:flex;align-items:center;gap:10px;padding:8px 10px;border-bottom:1px solid #252a32}
.activity-item:last-child{border-bottom:none}
.activity-item img{width:28px;height:28px;border-radius:50%;flex-shrink:0}
.activity-text{flex:1;font-size:11px;color:#c0bcc4}
.activity-text b{color:#e0dce4;font-weight:600}
.activity-time{color:#5a5260;font-size:9px;flex-shrink:0;font-weight:600}
.activity-badge{font-size:8px;padding:2px 6px;border-radius:3px;font-weight:600;text-transform:uppercase;margin-left:4px}
.badge-join{background:rgba(85,180,136,.15);color:#55b488}
.badge-ban{background:rgba(212,85,85,.15);color:#d45555}
.badge-boost{background:rgba(180,136,153,.15);color:#b48899}
.dash-edit-btn{background:none;border:none;color:#5a5260;cursor:pointer;font-size:10px;padding:2px 6px;border-radius:4px;transition:all .15s}
.dash-edit-btn:hover{color:#b48899;background:rgba(180,136,153,.1)}
</style>
</head>
<body>
<button class="menu-toggle" id="menuToggle" onclick="toggleMenu()">&#9776;</button>
<div class="sidebar-overlay" id="menuOverlay" onclick="toggleMenu()"></div>
<div id="sidebar" class="sidebar" style="display:none">
<div class="sidebar-nav">
<button class="active" data-tab="dashboard" onclick="switchTab('dashboard')"><img src="/icons/dashboard.png" alt="">dashboard</button>
<button data-tab="members" onclick="switchTab('members')"><img src="/icons/members.png" alt="">members</button>
<button data-tab="bans" onclick="switchTab('bans')"><img src="/icons/sanctions.png" alt="">sanctions</button>
<button data-tab="messages" onclick="switchTab('messages')"><img src="/icons/messages.png" alt="">messages</button>
<button data-tab="dms" onclick="switchTab('dms')"><img src="/icons/whispers.png" alt="">whispers</button>
<button data-tab="channels" onclick="switchTab('channels')"><img src="/icons/channels2.png" alt="">channels</button>
<button data-tab="invites" onclick="switchTab('invites')"><img src="/icons/invites.png" alt="">invites</button>
<button data-tab="emojis" onclick="switchTab('emojis')"><img src="/icons/emojis.png" alt="">emojis</button>
<button data-tab="events" onclick="switchTab('events')"><img src="/icons/events.png" alt="">events</button>
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
<div class="msg-topbar-channel" id="channelPicker">
<input type="text" id="channelSearch" placeholder="#channel" oninput="filterChannels(this.value)" onfocus="showChannelList()" style="margin:0"/>
<div id="channelList" class="channel-list"></div>
</div>
<div class="msg-topbar-mention">
<input type="text" id="mentionSearch" placeholder="@mention" oninput="filterMentions(this.value)" onfocus="showMentionList()" style="margin:0"/>
<div id="mentionList" class="mention-list"></div>
</div>
</div>
<div class="msg-search-bar">
<input type="text" id="msgSearchInput" placeholder="search messages..." oninput="filterMsgHistory(this.value)"/>
</div>
<div id="msgLoadMore" class="msg-load-more" style="display:none" onclick="loadMoreMessages()">load older messages</div>
<div id="msgHistory" class="msg-history-box">
<p style="color:#5a5260;text-align:center;padding:20px 0">select a channel</p>
</div>
<div class="msg-compose">
<div class="drop-zone" id="dropZone" onclick="g('msgFile').click()" ondragover="event.preventDefault();this.classList.add('dragover')" ondragleave="this.classList.remove('dragover')" ondrop="handleDrop(event)">
<span id="dropLabel">drop file or click to attach</span>
</div>
<input type="file" id="msgFile" style="display:none" onchange="updateDropLabel(this)"/>
<div class="msg-input-row" style="align-items:flex-end">
<div class="emoji-picker-wrap">
<button onclick="toggleEmojiPicker()" style="padding:6px 8px;font-size:16px;background:none;border:none;cursor:pointer" title="emoji">&#128578;</button>
<div class="emoji-picker-dropdown" id="emojiPicker">
<input class="emoji-picker-search" id="emojiSearch" placeholder="search emoji..." oninput="filterEmojis(this.value)"/>
<div class="emoji-picker-grid" id="emojiGrid"></div>
</div>
</div>
<textarea id="msgInput" placeholder="message..." onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();sendMsg()}"></textarea>
<button onclick="sendMsg()">send</button>
</div>
<div id="msgStatus" class="msg-status"></div>
</div>
</div>
<div id="panel-members" class="panel">
<input type="text" class="member-search" id="memberSearch" placeholder="search members..." oninput="filterMembers(this.value)"/>
<div id="memberStats" class="member-stats"></div>
<div id="memberList" class="member-grid"><p style="color:#6d6572;text-align:center;padding:20px 0">loading...</p></div>
</div>
<div id="panel-dms" class="panel">
<div id="dmStart">
<p style="color:#6d6572;font-size:10px;margin-bottom:6px">enter a user id to open dm</p>
<div style="display:flex;gap:4px">
<input type="text" id="dmUserId" placeholder="user id" style="flex:1;margin:0;border-radius:6px"/>
<button onclick="startDmById()" style="margin:0;padding:4px 12px;border-radius:6px;background:#b48899;color:#13161b;font-weight:600;border:none">open</button>
</div>
</div>
<div id="dmChat" style="display:none">
<div style="display:flex;align-items:center;gap:8px;padding-bottom:8px;border-bottom:1px solid #252a32;margin-bottom:6px">
<button onclick="dmClose()" style="margin:0;padding:3px 10px;background:#252a32;color:#7d7582;border:1px solid #2e343c;border-radius:6px;font-size:11px">close</button>
<span id="dmChatName" style="color:#e0dce4;font-size:12px;font-weight:600"></span>
</div>
<div id="dmHistory" style="max-height:380px;overflow-y:auto;margin-bottom:6px;background:#191d23;border:1px solid #252a32;padding:6px;font-size:10px;line-height:1.5;border-radius:8px">
<p style="color:#5a5260;text-align:center;padding:20px 0">loading...</p>
</div>
<div class="msg-input-row">
<textarea id="dmInput" placeholder="message..." onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();sendDm()}" style="min-height:36px;resize:none;border-radius:6px"></textarea>
<button onclick="sendDm()" style="border-radius:6px;background:#b48899;color:#13161b;font-weight:600;border:none">send</button>
</div>
<div id="dmStatus" style="font-size:10px;margin-top:4px;min-height:14px"></div>
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
<div id="channelList"></div>
</div>
<div id="panel-invites" class="panel">
<div id="inviteList"></div>
</div>
<div id="panel-emojis" class="panel">
<div id="emojiContent"></div>
</div>
<div id="panel-events" class="panel">
<div class="create-form">
<input type="text" id="newEventName" placeholder="event name"/>
<input type="datetime-local" id="newEventStart"/>
<input type="datetime-local" id="newEventEnd"/>
<button onclick="createEvent()" style="background:#b48899;color:#13161b;border:none">create</button>
</div>
<div id="eventList"></div>
</div>
<div id="panel-audit" class="panel">
<div id="auditList"></div>
</div>
<div id="userModal" class="modal"><div class="modal-box" id="modalBox"></div></div>
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
<script>
function g(i){return document.getElementById(i)}
var allMembers=[],allRoles=[];

function loginDiscord(){
  api({action:"oauth_url"},function(d){
    if(d.url){window.location.href=d.url}
    else{g("loginError").textContent=d.error||"failed to start login"}
  });
}

function initPanel(){
  g("sidebar").style.display="flex";
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
  if(name==="dms"){g("dmStart").style.display="block";g("dmChat").style.display="none";stopDmPoll()}
  if(name!=="dms")stopDmPoll();
  if(name==="channels")loadChannels();
  if(name==="invites")loadInvites();
  if(name==="emojis")loadEmojis();
  if(name==="events")loadEvents();
  if(name==="audit")loadAuditLog();
  if(window.innerWidth<=600&&g("sidebar").classList.contains("open"))toggleMenu();
}

function api(body,cb){
  var x=new XMLHttpRequest();
  x.open("POST","/api",true);
  x.setRequestHeader("Content-Type","application/json");
  x.onload=function(){try{cb(JSON.parse(x.responseText))}catch(e){cb({error:"parse error"})}};
  x.onerror=function(){cb({error:"connection error"})};
  x.send(JSON.stringify(body));
}

function loadDashboard(){
  api({action:"guildinfo"},function(d){
    if(d.error)return;
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
    h+="<div class='dash-card'><div class='dash-card-icon'><img src='/icons/channels2.png' alt=''/></div><div><div class='dash-card-label'>channels</div><div class='dash-card-val'>"+d.channelCount+"</div><div class='dash-card-sub'>"+d.textChannels+" text &middot; "+d.voiceChannels+" voice &middot; "+d.categories+" categories</div></div></div>";
    h+="<div class='dash-card'><div class='dash-card-icon'><img src='/icons/owner.png' alt=''/></div><div><div class='dash-card-label'>owner</div><div class='dash-card-val'>"+esc(d.owner)+"</div><div class='dash-card-sub'>"+d.ownerId+"</div></div></div>";
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
  h+="<div class='mod-section-title'><span class='dot' style='background:#b48899'></span>timed out<span class='count'>"+timeouts.length+"</span></div>";
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
  h+="<div class='mod-section-title'><span class='dot' style='background:#d45555'></span>banned<span class='count'>"+bans.length+"</span></div>";
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

var mentionVisible=false;
function showMentionList(){
  mentionVisible=true;
  var el=g("mentionList");
  if(!allMembers.length){loadMembers()}
  if(!el.children.length)filterMentions("");
  el.classList.add("show");
}
function hideMentionList(){mentionVisible=false;setTimeout(function(){g("mentionList").classList.remove("show")},150)}
function filterMentions(q){
  q=q.toLowerCase();
  var el=g("mentionList");
  var h="";
  var count=0;
  var sorted=allMembers.slice().sort(function(a,b){
    var an=(a.nick||(a.user.global_name||a.user.username)).toLowerCase();
    var bn=(b.nick||(b.user.global_name||b.user.username)).toLowerCase();
    return an.localeCompare(bn);
  });
  for(var i=0;i<sorted.length&&count<50;i++){
    var m=sorted[i],name=m.nick||(m.user.global_name||m.user.username);
    if(q&&name.toLowerCase().indexOf(q)===-1&&m.user.username.toLowerCase().indexOf(q)===-1&&m.user.id.indexOf(q)===-1)continue;
    var avatar=m.user.avatar?"https://cdn.discordapp.com/avatars/"+m.user.id+"/"+m.user.avatar+(m.user.avatar.startsWith("a_")?".gif":".png"):"https://cdn.discordapp.com/embed/avatars/"+(parseInt(m.user.discriminator||"0")%5)+".png";
    h+="<div class='mention-item' data-uid='"+m.user.id+"' data-name='"+esc(name)+"' onclick='pickMention(this)'>";
    h+="<img src='"+avatar+"' alt='' loading='lazy'/>";
    h+="<span class='m-name'>"+esc(name)+(m.user.bot?"<span class='m-bot'>bot</span>":"")+"</span>";
    h+="</div>";
    count++;
  }
  if(!count)h="<div class='mention-item' style='color:#5a5260;cursor:default'>no results</div>";
  el.innerHTML=h;
  el.classList.add("show");
}
function pickMention(el){
  var input=g("msgInput");
  input.value+="<@"+el.dataset.uid+"> ";
  input.focus();
  g("mentionSearch").value="";
  g("mentionList").classList.remove("show");
}

function sendMsg(){
  var c=selectedChannelId,m=g("msgInput").value.trim(),file=g("msgFile").files[0];
  if(!c){g("msgStatus").textContent="select a channel";g("msgStatus").style.color="#d45555";return}
  if(!m&&!file){g("msgStatus").textContent="enter a message or pick a file";g("msgStatus").style.color="#d45555";return}
  var status=g("msgStatus");
  status.style.color="#6d6572";status.textContent="sending...";
  var btn=document.querySelector(".msg-input-row button");
  if(btn)btn.disabled=true;
  var body={action:"send",channelId:c,content:m};
  if(file){
    var reader=new FileReader();
    reader.onload=function(e){
      body.fileData=e.target.result.split(",")[1];
      body.fileName=file.name;
      body.fileType=file.type;
      doSend(body,c,btn);
    };
    reader.readAsDataURL(file);
  }else{doSend(body,c,btn)}
}

function doSend(body,cid,btn){
  api(body,function(d){
    if(btn)btn.disabled=false;
    if(d.success){
      g("msgStatus").style.color="#b48899";g("msgStatus").textContent="sent!";
      g("msgInput").value="";g("msgFile").value="";updateFileLabel(g("msgFile"));
      loadMsgHistory(cid);
      setTimeout(function(){g("msgStatus").textContent=""},2000);
    }else{
      g("msgStatus").style.color="#d45555";g("msgStatus").textContent=d.error||"failed";
    }
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
function fmt(s){
  var r=esc(s);
  r=r.replace(new RegExp("&lt;:([^:]+):(\\\\d+)&gt;","g"),"<img src='https://cdn.discordapp.com/emojis/$2.png' style='width:18px;height:18px;vertical-align:middle' alt=':$1:'>");
  r=r.replace(new RegExp("&lt;a:([^:]+):(\\\\d+)&gt;","g"),"<img src='https://cdn.discordapp.com/emojis/$2.gif' style='width:18px;height:18px;vertical-align:middle' alt=':$1:'>");
  r=r.replace(new RegExp("\\|\\|([^|]+)\\|\\|","g"),"<span class='spoiler' onclick='this.classList.toggle(&quot;revealed&quot;)'>$1</span>");
  r=r.replace(new RegExp("\\*\\*(.+?)\\*\\*","g"),"<b>$1</b>");
  r=r.replace(new RegExp("\\*(.+?)\\*","g"),"<i>$1</i>");
  r=r.replace(new RegExp("__(.+?)__","g"),"<u>$1</u>");
  r=r.replace(new RegExp("~~(.+?)~~","g"),"<s>$1</s>");
  r=r.replace(new RegExp("\`\`\`([\\s\\S]+?)\`\`\`","g"),"<pre><code>$1</code></pre>");
  r=r.replace(new RegExp("\`([^\`]+)\`","g"),"<code>$1</code>");
  r=r.replace(new RegExp("&lt;@(\\\\d+)&gt;","g"),"<span class='mention'>@$1</span>");
  return r;
}
function logout(){fetch("/api",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"logout"})}).finally(function(){location.reload()})}
function updateFileLabel(el){
  var label=g("dropLabel");
  if(el.files&&el.files.length){label.textContent=el.files[0].name;g("dropZone").classList.add("has-file")}
  else{label.textContent="drop file or click to attach";g("dropZone").classList.remove("has-file")}
}
function updateDropLabel(el){updateFileLabel(el)}
function handleDrop(e){
  e.preventDefault();
  var dz=g("dropZone");dz.classList.remove("dragover");
  var files=e.dataTransfer.files;
  if(files.length){g("msgFile").files=files;updateFileLabel(g("msgFile"))}
}
function toggleMenu(){g("sidebar").classList.toggle("open");g("menuOverlay").classList.toggle("show")}

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
  api({action:"messages",channelId:msgPagination.channelId,limit:50,before:msgPagination.before},function(d){
    msgPagination.loading=false;
    g("msgLoadMore").textContent="load older messages";
    if(d.error||!d.messages||!d.messages.length){g("msgLoadMore").style.display="none";return}
    var existing=g("msgHistory");
    var newHtml="";
    if(d.messages.length>=50){msgPagination.before=d.messages[d.messages.length-1].id;g("msgLoadMore").style.display="block"}
    else{g("msgLoadMore").style.display="none";msgPagination.before=null}
    var tmp=document.createElement("div");
    tmp.innerHTML=renderMsgRows(d.messages,msgPagination.channelId);
    var first=existing.querySelector(".msg-day-divider");
    if(first)existing.insertBefore(tmp,first);
    else existing.innerHTML=tmp.innerHTML+existing.innerHTML;
    parseTwemoji(existing);
  });
}
function renderMsgRows(messages,cid){
  var h="";var prevDate="";var prevAuthor=null;var prevTime=0;
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
    h+="<div class='msg-row"+(sameGroup?" msg-group-start":"")+"'>";
    if(sameGroup){h+="<div class='msg-avatar' style='visibility:hidden;width:34px'></div>"}
    else{h+="<img class='msg-avatar' src='"+avatar+"' alt='' loading='lazy'/>"}
    h+="<div class='msg-body'>";
    if(!sameGroup){h+="<div><span class='msg-author'>"+esc(name)+"</span>"+(u.bot?"<span style='font-size:8px;background:#b48899;color:#13161b;padding:1px 4px;border-radius:3px;margin-left:5px;font-weight:700;text-transform:uppercase;vertical-align:middle'>bot</span>":"")+"<span class='msg-time'>"+timeStr+"</span>"+(msg.edited_timestamp?"<span class='msg-edited'>(edited)</span>":"")+"</div>"}
    else{h+="<div class='msg-time-inline'>"+timeStr+"</div>"}
    if(msg.referenced_message&&msg.referenced_message.author){
      var ru=msg.referenced_message.author,rn=ru.global_name||ru.username;
      var ra=ru.avatar?"https://cdn.discordapp.com/avatars/"+ru.id+"/"+ru.avatar+(ru.avatar.startsWith("a_")?".gif":".png"):"https://cdn.discordapp.com/embed/avatars/"+(parseInt(ru.discriminator||"0")%5)+".png";
      h+="<div class='msg-ref'><img src='"+ra+"' style='width:14px;height:14px;border-radius:50%;vertical-align:middle' alt=''/> <b>"+esc(rn)+"</b> "+fmt(msg.referenced_message.content||"(attachment)").substring(0,120)+"</div>";
    }
    h+="<div class='msg-content'>"+fmt(msg.content||"")+"</div>";
    if(msg.sticker_items&&msg.sticker_items.length){
      for(var j=0;j<msg.sticker_items.length;j++){
        var s=msg.sticker_items[j];
        h+="<img class='msg-sticker' src='https://cdn.discordapp.com/stickers/"+s.id+".png' alt='' loading='lazy'/>";
      }
    }
    if(msg.attachments&&msg.attachments.length){
      for(var j=0;j<msg.attachments.length;j++){
        var a=msg.attachments[j];
        if(a.content_type&&(a.content_type.startsWith("image/")||a.width)){
          h+="<img class='msg-img' src='"+escUrl(a.url)+"' alt='' loading='lazy'/>";
        }else if(a.content_type&&a.content_type.startsWith("video/")){
          h+="<video class='msg-video' src='"+escUrl(a.url)+"' controls></video>";
        }else if(a.content_type&&a.content_type.startsWith("audio/")){
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
        if(e.description)h+="<div class='msg-embed-desc'>"+fmt(e.description||"")+"</div>";
        if(e.fields&&e.fields.length){for(var k=0;k<e.fields.length;k++){var f=e.fields[k];h+="<div><div class='msg-embed-field-name'>"+esc(f.name)+"</div><div class='msg-embed-field-val'>"+fmt(f.value||"")+"</div></div>"}}
        if(e.image&&e.image.url)h+="<img class='msg-img' src='"+escUrl(e.image.url)+"' alt='' loading='lazy'/>";
        if(e.thumbnail&&e.thumbnail.url&&!(e.type=="image"))h+="<img class='msg-img' src='"+escUrl(e.thumbnail.url)+"' alt='' loading='lazy' style='max-width:80px;max-height:80px;float:right;margin:2px'/>";
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
    h+="<span class='msg-edit-btn' data-cid='"+cid+"' data-mid='"+msg.id+"' onclick='editMsg(this.dataset.cid,this.dataset.mid)' title='edit'>&#9998;</span>";
    h+="<span class='msg-del' data-cid='"+cid+"' data-mid='"+msg.id+"' onclick='deleteMsg(this.dataset.cid,this.dataset.mid)' title='delete'>&#10005;</span>";
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
var allEmojis=["\u{1F600}","\u{1F603}","\u{1F604}","\u{1F601}","\u{1F606}","\u{1F605}","\u{1F923}","\u{1F602}","\u{1F642}","\u{1F643}","\u{1F609}","\u{1F60A}","\u{1F607}","\u{1F970}","\u{1F60D}","\u{1F929}","\u{1F618}","\u{1F617}","\u{1F61A}","\u{1F619}","\u{1F972}","\u{1F60B}","\u{1F61B}","\u{1F61C}","\u{1F92A}","\u{1F61D}","\u{1F911}","\u{1F917}","\u{1F92D}","\u{1FAE2}","\u{1FAE3}","\u{1F92B}","\u{1F914}","\u{1FAE1}","\u{1F910}","\u{1F928}","\u{1F610}","\u{1F611}","\u{1F636}","\u{1FAE5}","\u{1F60F}","\u{1F612}","\u{1F644}","\u{1F62C}","\u{1F925}","\u{1F60C}","\u{1F614}","\u{1F62A}","\u{1F924}","\u{1F634}","\u{1F637}","\u{1F912}","\u{1F915}","\u{1F922}","\u{1F92E}","\u{1F975}","\u{1F976}","\u{1F974}","\u{1F635}","\u{1F92F}","\u{1F973}","\u{1F978}","\u{1F60E}","\u{1F913}","\u{1F9D0}","\u{1F615}","\u{1FAE4}","\u{1F61F}","\u{1F641}","\u{1F62E}","\u{1F62F}","\u{1F632}","\u{1F633}","\u{1F97A}","\u{1F979}","\u{1F626}","\u{1F627}","\u{1F628}","\u{1F630}","\u{1F625}","\u{1F622}","\u{1F62D}","\u{1F631}","\u{1F616}","\u{1F623}","\u{1F61E}","\u{1F613}","\u{1F629}","\u{1F62B}","\u{1F971}","\u{1F624}","\u{1F621}","\u{1F620}","\u{1F92C}","\u{1F608}","\u{1F47F}","\u{1F480}","\u2620\uFE0F","\u{1F4A9}","\u{1F921}","\u{1F479}","\u{1F47A}","\u{1F47B}","\u{1F47D}","\u{1F47E}","\u{1F916}","\u{1F63A}","\u{1F638}","\u{1F639}","\u{1F63B}","\u{1F63C}","\u{1F63D}","\u{1F640}","\u{1F63F}","\u{1F63E}","\u{1FAF6}","\u{1F450}","\u{1F932}","\u{1F91D}","\u{1F64F}","\u270C\uFE0F","\u{1F91E}","\u{1FAF0}","\u{1F91F}","\u{1F918}","\u{1F44C}","\u{1F90C}","\u{1F90F}","\u{1F448}","\u{1F449}","\u{1F446}","\u{1F595}","\u{1F447}","\u261D\uFE0F","\u{1FAF5}","\u{1F44D}","\u{1F44E}","\u270A","\u{1F44A}","\u{1F91B}","\u{1F91C}","\u{1F44F}","\u{1F64C}","\u{1F4AA}","\u{1F9BE}","\u{1F590}\uFE0F","\u270B","\u{1F596}","\u{1FAF1}","\u{1FAF2}","\u{1FAF3}","\u{1FAF4}","\u{1F44C}","\u{1F90C}","\u{1F90F}","\u270C\uFE0F","\u{1F91E}","\u{1FAF0}","\u{1F91F}","\u{1F918}","\u{1F919}","\u{1F448}","\u{1F449}","\u{1F446}","\u{1F595}","\u{1F447}","\u261D\uFE0F","\u{1FAF5}","\u{1F44D}","\u{1F44E}","\u270A","\u{1F44A}","\u{1F91B}","\u{1F91C}","\u{1F44F}","\u{1F64C}","\u{1F450}","\u{1F932}","\u{1F91D}","\u{1F64F}","\u270D\uFE0F","\u{1F485}","\u{1F933}","\u{1F4AA}","\u{1F9BE}","\u{1F9BF}","\u{1F9B5}","\u{1F9B6}","\u{1F442}","\u{1F9BB}","\u{1F443}","\u{1F9E0}","\u{1FAC0}","\u{1FAC1}","\u{1F9B7}","\u{1F9B4}","\u{1F440}","\u{1F441}\uFE0F","\u{1F445}","\u{1F444}","\u{1FAE6}","\u{1F48B}","\u{1F436}","\u{1F431}","\u{1F42D}","\u{1F439}","\u{1F430}","\u{1F98A}","\u{1F43B}","\u{1F43C}","\u{1F428}","\u{1F42F}","\u{1F981}","\u{1F42E}","\u{1F437}","\u{1F438}","\u{1F435}","\u{1F648}","\u{1F649}","\u{1F64A}","\u{1F412}","\u{1F414}","\u{1F427}","\u{1F426}","\u{1F424}","\u{1F423}","\u{1F425}","\u{1F986}","\u{1F985}","\u{1F989}","\u{1F987}","\u{1F43A}","\u{1F417}","\u{1F434}","\u{1F984}","\u{1F41D}","\u{1FAB1}","\u{1F41B}","\u{1F98B}","\u{1F40C}","\u{1F41E}","\u{1F41C}","\u{1FAB0}","\u{1FAB2}","\u{1FAB3}","\u{1F99F}","\u{1F997}","\u{1F577}\uFE0F","\u{1F578}\uFE0F","\u{1F982}","\u{1F422}","\u{1F40D}","\u{1F98E}","\u{1F996}","\u{1F995}","\u{1F419}","\u{1F991}","\u{1F990}","\u{1F99E}","\u{1F980}","\u{1F421}","\u{1F420}","\u{1F41F}","\u{1F42C}","\u{1F433}","\u{1F40B}","\u{1F988}","\u{1F9AD}","\u{1F40A}","\u{1F405}","\u{1F406}","\u{1F993}","\u{1F98D}","\u{1F9A7}","\u{1F418}","\u{1F9A3}","\u{1F99B}","\u{1F98F}","\u{1F42A}","\u{1F42B}","\u{1F992}","\u{1F998}","\u{1F9AC}","\u{1F403}","\u{1F402}","\u{1F404}","\u{1F40E}","\u{1F416}","\u{1F40F}","\u{1F411}","\u{1F999}","\u{1F410}","\u{1F98C}","\u{1F415}","\u{1F429}","\u{1F9AE}","\u{1F415}\u200D\u{1F9BA}","\u{1F408}","\u{1F408}\u200D\u2B1B","\u{1FAB6}","\u{1F413}","\u{1F983}","\u{1F9A4}","\u{1F99A}","\u{1F99C}","\u{1F9A2}","\u{1F9A9}","\u{1F54A}\uFE0F","\u{1F407}","\u{1F99D}","\u{1F9A8}","\u{1F9A1}","\u{1F9AB}","\u{1F9A6}","\u{1F9A5}","\u{1F401}","\u{1F400}","\u{1F43F}\uFE0F","\u{1F994}","\u{1F43E}","\u{1F409}","\u{1F432}","\u{1F335}","\u{1F384}","\u{1F332}","\u{1F333}","\u{1F334}","\u{1FAB5}","\u{1F331}","\u{1F33F}","\u2618\uFE0F","\u{1F340}","\u{1F38D}","\u{1FAB4}","\u{1F38B}","\u{1F343}","\u{1F342}","\u{1F341}","\u{1FABA}","\u{1FAB9}","\u{1F344}","\u{1F41A}","\u{1FAB8}","\u{1FAA8}","\u{1F30A}","\u{1FAE7}","\u{1F525}","\u{1F32A}\uFE0F","\u{1F308}","\u{1F34F}","\u{1F34E}","\u{1F350}","\u{1F34A}","\u{1F34B}","\u{1F34C}","\u{1F349}","\u{1F347}","\u{1F353}","\u{1FAD0}","\u{1F348}","\u{1F352}","\u{1F351}","\u{1F96D}","\u{1F34D}","\u{1F965}","\u{1F95D}","\u{1F345}","\u{1F346}","\u{1F951}","\u{1F966}","\u{1F96C}","\u{1F952}","\u{1F336}\uFE0F","\u{1FAD1}","\u{1F33D}","\u{1F955}","\u{1FAD2}","\u{1F9C4}","\u{1F9C5}","\u{1F954}","\u{1F360}","\u{1FAD8}","\u{1F950}","\u{1F35E}","\u{1F956}","\u{1F968}","\u{1F9C0}","\u{1F95A}","\u{1F373}","\u{1F9C8}","\u{1F95E}","\u{1F9C7}","\u{1F953}","\u{1F969}","\u{1F357}","\u{1F356}","\u{1F9B4}","\u{1F32D}","\u{1F354}","\u{1F35F}","\u{1F355}","\u{1FAD3}","\u{1F96A}","\u{1F959}","\u{1F9C6}","\u{1F32E}","\u{1F32F}","\u{1FAD4}","\u{1F957}","\u{1F958}","\u{1FAD5}","\u{1F96B}","\u{1F35D}","\u{1F35C}","\u{1F372}","\u{1F35B}","\u{1F363}","\u{1F371}","\u{1F95F}","\u{1F9AA}","\u{1F364}","\u{1F359}","\u{1F35A}","\u{1F358}","\u{1F365}","\u{1F96E}","\u{1F362}","\u{1F361}","\u{1F367}","\u{1F368}","\u{1F366}","\u{1F967}","\u{1F9C1}","\u{1F370}","\u{1F382}","\u{1F36E}","\u{1F36D}","\u{1F36C}","\u{1F36B}","\u{1F37F}","\u{1F369}","\u{1F36A}","\u{1F330}","\u{1F95C}","\u{1F36F}","\u{1F95B}","\u{1F37C}","\u{1FAD6}","\u2615","\u{1F375}","\u{1F9C3}","\u{1F964}","\u{1F9CB}","\u{1F376}","\u{1F37A}","\u{1F37B}","\u{1F942}","\u{1F377}","\u{1F943}","\u{1F378}","\u{1F379}","\u{1F9C9}","\u{1F37E}","\u{1F9CA}","\u{1F944}","\u{1F374}","\u{1F37D}\uFE0F","\u{1F963}","\u{1F961}","\u{1F962}","\u{1F9C2}","\u{1F697}","\u{1F695}","\u{1F699}","\u{1F68C}","\u{1F68E}","\u{1F3CE}\uFE0F","\u{1F693}","\u{1F691}","\u{1F692}","\u{1F690}","\u{1F6FB}","\u{1F69A}","\u{1F69B}","\u{1F69C}","\u{1F3CD}\uFE0F","\u{1F6F5}","\u{1F6B2}","\u{1F6F4}","\u{1F6FA}","\u{1F68D}","\u{1F698}","\u{1F696}","\u{1F6DE}","\u{1F6A1}","\u{1F6A0}","\u{1F69F}","\u{1F683}","\u{1F68B}","\u{1F69E}","\u{1F69D}","\u{1F684}","\u{1F685}","\u{1F688}","\u{1F682}","\u{1F686}","\u{1F687}","\u{1F68A}","\u{1F689}","\u2708\uFE0F","\u{1F6EB}","\u{1F6EC}","\u{1F6E9}\uFE0F","\u{1F4BA}","\u{1F6F0}\uFE0F","\u{1F680}","\u{1F6F8}","\u{1F681}","\u{1F6F6}","\u26F5","\u{1F6A4}","\u{1F6E5}\uFE0F","\u{1F6F3}\uFE0F","\u26F4\uFE0F","\u{1F6A2}","\u{1F5FC}","\u{1F3F0}","\u{1F3EF}","\u{1F3DF}\uFE0F","\u{1F3A1}","\u{1F3A2}","\u{1F3A0}","\u26F2","\u26F1\uFE0F","\u{1F3D6}\uFE0F","\u{1F3DD}\uFE0F","\u{1F3DC}\uFE0F","\u{1F30B}","\u26F0\uFE0F","\u{1F3D4}\uFE0F","\u{1F5FB}","\u{1F3D5}\uFE0F","\u{1F6D6}","\u{1F3E0}","\u{1F3E1}","\u{1F3D8}\uFE0F","\u{1F3DA}\uFE0F","\u{1F3D7}\uFE0F","\u{1F3ED}","\u{1F3E2}","\u{1F3EC}","\u{1F3E3}","\u{1F3E4}","\u{1F3E5}","\u{1F3E6}","\u{1F3E8}","\u{1F3EA}","\u{1F3EB}","\u{1F3E9}","\u{1F492}","\u{1F3DB}\uFE0F","\u26EA","\u{1F54C}","\u{1F6D5}","\u{1F54D}","\u26E9\uFE0F","\u{1F54B}","\u26F2","\u26FA","\u{1F301}","\u{1F303}","\u{1F3D9}\uFE0F","\u{1F304}","\u{1F305}","\u{1F306}","\u{1F307}","\u{1F309}","\u{1F30C}","\u{1F3A0}","\u{1F6DD}","\u{1F3A1}","\u{1F3A2}","\u{1F682}","\u{1F683}","\u{1F3A2}","\u{1F3AA}","\u{1F58C}\uFE0F","\u{1F3A8}","\u{1F3AC}","\u{1F3A4}","\u{1F3A7}","\u{1F3BC}","\u{1F3B9}","\u{1F941}","\u{1FA98}","\u{1F3B7}","\u{1F3BA}","\u{1FA97}","\u{1F3B8}","\u{1FA95}","\u{1F3BB}","\u{1F3B2}","\u265F\uFE0F","\u{1F3AF}","\u{1F3B3}","\u{1F3AE}","\u{1F3B0}","\u{1F9E9}","\u26BD","\u{1F3C0}","\u{1F3C8}","\u26BE","\u{1F94E}","\u{1F3BE}","\u{1F3D0}","\u{1F3C9}","\u{1F94F}","\u{1F3B1}","\u{1FA80}","\u{1F3D3}","\u{1F3F8}","\u{1F3D2}","\u{1F94D}","\u{1F3CF}","\u{1FA83}","\u{1F945}","\u26F3","\u{1FA81}","\u{1F3F9}","\u{1F3A3}","\u{1F93F}","\u{1F94A}","\u{1F94B}","\u{1F3BD}","\u{1F6F9}","\u{1F6FC}","\u{1F6F7}","\u26F8\uFE0F","\u{1F94C}","\u{1F3BF}","\u{1F3AF}","\u{1FA80}","\u{1FA81}","\u{1F3AE}","\u{1F579}\uFE0F","\u{1F3B0}","\u{1F9E9}","\u{1F3AA}","\u{1F3A8}","\u{1F3AC}","\u{1F3A4}","\u{1F3A7}","\u{1F3BC}","\u{1F3B9}","\u{1F941}","\u{1FA98}","\u{1F3B7}","\u{1F3BA}","\u{1FA97}","\u{1F3B8}","\u{1FA95}","\u{1F3BB}","\u{1F3B2}","\u265F\uFE0F","\u{1F3AD}","\u{1FA85}","\u{1FAA9}","\u{1FA86}","\u{1F0CF}","\u{1F004}","\u{1F3B4}","\u{1F4EF}","\u231A","\u{1F4F1}","\u{1F4F2}","\u{1F4BB}","\u2328\uFE0F","\u{1F5A5}\uFE0F","\u{1F5A8}\uFE0F","\u{1F5B1}\uFE0F","\u{1F5B2}\uFE0F","\u{1F579}\uFE0F","\u{1F5DC}\uFE0F","\u{1F4BD}","\u{1F4BE}","\u{1F4BF}","\u{1F4C0}","\u{1F4FC}","\u{1F4F7}","\u{1F4F8}","\u{1F4F9}","\u{1F3A5}","\u{1F4FD}\uFE0F","\u{1F39E}\uFE0F","\u{1F4DE}","\u260E\uFE0F","\u{1F4DF}","\u{1F4E0}","\u{1F4FA}","\u{1F4FB}","\u{1F399}\uFE0F","\u{1F39A}\uFE0F","\u{1F39B}\uFE0F","\u{1F9ED}","\u23F1\uFE0F","\u23F2\uFE0F","\u23F0","\u{1F570}\uFE0F","\u231B","\u23F3","\u{1F4E1}","\u{1F50B}","\u{1FAAB}","\u{1F50C}","\u{1F4A1}","\u{1F526}","\u{1F56F}\uFE0F","\u{1FA94}","\u{1F9EF}","\u{1F6E2}\uFE0F","\u{1F4B8}","\u{1F4B5}","\u{1F4B4}","\u{1F4B6}","\u{1F4B7}","\u{1FA99}","\u{1F4B0}","\u{1F4B3}","\u{1FAAA}","\u{1F9FE}","\u{1F4E7}","\u{1F4E8}","\u{1F4E9}","\u{1F4E4}","\u{1F4E5}","\u{1F4E6}","\u{1F3F7}\uFE0F","\u{1FAA7}","\u{1F4EA}","\u{1F4EB}","\u{1F4EC}","\u{1F4ED}","\u{1F4EE}","\u{1F4ED}","\u{1F4DC}","\u{1F4C3}","\u{1F4C4}","\u{1F4D1}","\u{1F4CA}","\u{1F4C8}","\u{1F4C9}","\u{1F5D2}\uFE0F","\u{1F5D3}\uFE0F","\u{1F4C6}","\u{1F4C5}","\u{1F5D1}\uFE0F","\u{1F4C2}","\u{1F4C1}","\u{1F5C2}\uFE0F","\u{1F5DE}\uFE0F","\u{1F4F0}","\u{1F4D3}","\u{1F4D4}","\u{1F4D2}","\u{1F4D5}","\u{1F4D6}","\u{1F4D7}","\u{1F4D8}","\u{1F4D9}","\u{1F4DA}","\u{1F52C}","\u{1F52D}","\u{1F489}","\u{1FA78}","\u{1F48A}","\u{1FA79}","\u{1FA7C}","\u{1FA7B}","\u{1FA7A}","\u{1F6AA}","\u{1F6D7}","\u{1FA9E}","\u{1FA9F}","\u{1F6CF}\uFE0F","\u{1F6CB}\uFE0F","\u{1FA91}","\u{1F6BD}","\u{1FAA0}","\u{1F6BF}","\u{1F6C1}","\u{1FAA4}","\u{1FA92}","\u{1F9F4}","\u{1F9F7}","\u{1F9F9}","\u{1F9FA}","\u{1F9FB}","\u{1FAA3}","\u{1F9FC}","\u{1FAA5}","\u{1F9FD}","\u{1F9EF}","\u{1F6D2}","\u{1F6AC}","\u26B0\uFE0F","\u{1FAA6}","\u26B1\uFE0F","\u{1F5FF}","\u{1F9F8}","\u{1FA86}","\u{1FA85}","\u{1FAA9}","\u{1FA98}","\u{1FA97}","\u{1FA95}","\u{1FA94}","\u2764\uFE0F","\u{1F9E1}","\u{1F49B}","\u{1F49A}","\u{1F499}","\u{1F49C}","\u{1F5A4}","\u{1F90D}","\u{1F90E}","\u{1F494}","\u2763\uFE0F","\u{1F495}","\u{1F49E}","\u{1F493}","\u{1F497}","\u{1F496}","\u{1F498}","\u{1F49D}","\u{1F49F}","\u262E\uFE0F","\u271D\uFE0F","\u262A\uFE0F","\u{1F549}\uFE0F","\u2638\uFE0F","\u2721\uFE0F","\u{1F52F}","\u{1F54E}","\u262F\uFE0F","\u2626\uFE0F","\u{1F6D0}","\u26CE","\u2648","\u2649","\u264A","\u264B","\u264C","\u264D","\u264E","\u264F","\u2650","\u2651","\u2652","\u2653","\u{1F194}","\u269B\uFE0F","\u{1F251}","\u2622\uFE0F","\u2623\uFE0F","\u{1F4F4}","\u{1F4F3}","\u{1F236}","\u{1F21A}","\u{1F238}","\u{1F23A}","\u{1F237}\uFE0F","\u2734\uFE0F","\u{1F19A}","\u{1F4AE}","\u{1F250}","\u3299\uFE0F","\u3297\uFE0F","\u{1F234}","\u{1F235}","\u{1F239}","\u{1F232}","\u{1F170}\uFE0F","\u{1F171}\uFE0F","\u{1F18E}","\u{1F191}","\u{1F17E}\uFE0F","\u{1F198}","\u274C","\u2B55","\u{1F6D1}","\u26D4","\u{1F4DB}","\u{1F6AB}","\u{1F4AF}","\u{1F4A2}","\u2668\uFE0F","\u{1F6B7}","\u{1F6AF}","\u{1F6B3}","\u{1F6B1}","\u{1F51E}","\u{1F4F5}","\u{1F6AD}","\u2757","\u2755","\u2753","\u2754","\u203C\uFE0F","\u2049\uFE0F","\u{1F505}","\u{1F506}","\u303D\uFE0F","\u26A0\uFE0F","\u{1F6B8}","\u{1F531}","\u269C\uFE0F","\u{1F530}","\u267B\uFE0F","\u2705","\u{1F22F}","\u{1F4B9}","\u2747\uFE0F","\u2733\uFE0F","\u274E","\u{1F310}","\u{1F4A0}","\u24C2\uFE0F","\u{1F300}","\u{1F4A4}","\u{1F3E7}","\u{1F6BE}","\u267F","\u{1F17F}\uFE0F","\u{1F6D7}","\u{1F233}","\u{1F202}\uFE0F","\u{1F6C2}","\u{1F6C3}","\u{1F6C4}","\u{1F6C5}","\u{1F6B9}","\u{1F6BA}","\u{1F6BC}","\u26A7\uFE0F","\u{1F6BB}","\u{1F6AE}","\u{1F3A6}","\u{1F4F6}","\u{1F201}","\u{1F523}","\u2139\uFE0F","\u{1F524}","\u{1F521}","\u{1F520}","\u{1F196}","\u{1F197}","\u{1F199}","\u{1F192}","\u{1F195}","\u{1F193}","0\uFE0F\u20E3","1\uFE0F\u20E3","2\uFE0F\u20E3","3\uFE0F\u20E3","4\uFE0F\u20E3","5\uFE0F\u20E3","6\uFE0F\u20E3","7\uFE0F\u20E3","8\uFE0F\u20E3","9\uFE0F\u20E3","\u{1F51F}","\u{1F522}","#\uFE0F\u20E3","*\uFE0F\u20E3","\u23CF\uFE0F","\u25B6\uFE0F","\u23F8\uFE0F","\u23EF\uFE0F","\u23F9\uFE0F","\u23FA\uFE0F","\u23ED\uFE0F","\u23EE\uFE0F","\u23E9","\u23EA","\u23EB","\u23EC","\u25C0\uFE0F","\u{1F53C}","\u{1F53D}","\u27A1\uFE0F","\u2B05\uFE0F","\u2B06\uFE0F","\u2B07\uFE0F","\u2197\uFE0F","\u2198\uFE0F","\u2199\uFE0F","\u2196\uFE0F","\u2195\uFE0F","\u2194\uFE0F","\u21AA\uFE0F","\u21A9\uFE0F","\u2934\uFE0F","\u2935\uFE0F","\u{1F500}","\u{1F501}","\u{1F502}","\u{1F504}","\u{1F503}","\u{1F3B5}","\u{1F3B6}","\u2795","\u2796","\u2797","\u2716\uFE0F","\u{1F7F0}","\u267E\uFE0F","\u{1F4B2}","\u{1F4B1}","\u2122\uFE0F","\xA9\uFE0F","\xAE\uFE0F","\u3030\uFE0F","\u27B0","\u27BF","\u{1F51A}","\u{1F519}","\u{1F51B}","\u{1F51D}","\u{1F51C}","\u2714\uFE0F","\u2611\uFE0F","\u{1F518}","\u{1F534}","\u{1F7E0}","\u{1F7E1}","\u{1F7E2}","\u{1F535}","\u{1F7E3}","\u26AB","\u26AA","\u{1F7E4}","\u{1F53A}","\u{1F53B}","\u{1F538}","\u{1F539}","\u{1F536}","\u{1F537}","\u{1F533}","\u{1F532}","\u25AA\uFE0F","\u25AB\uFE0F","\u25FE","\u25FD","\u25FC\uFE0F","\u25FB\uFE0F","\u{1F7E5}","\u{1F7E7}","\u{1F7E8}","\u{1F7E9}","\u{1F7E6}","\u{1F7EA}","\u2B1B","\u2B1C","\u{1F7EB}","\u{1F508}","\u{1F507}","\u{1F509}","\u{1F50A}","\u{1F514}","\u{1F515}","\u{1F4E3}","\u{1F4E2}","\u{1F4AC}","\u{1F4AD}","\u{1F5EF}\uFE0F","\u2660\uFE0F","\u2663\uFE0F","\u2665\uFE0F","\u2666\uFE0F","\u{1F550}","\u{1F551}","\u{1F552}","\u{1F553}","\u{1F554}","\u{1F555}","\u{1F556}","\u{1F557}","\u{1F558}","\u{1F559}","\u{1F55A}","\u{1F55B}","\u{1F55C}","\u{1F55D}","\u{1F55E}","\u{1F55F}","\u{1F560}","\u{1F561}","\u{1F562}","\u{1F563}","\u{1F564}","\u{1F565}","\u{1F566}","\u{1F567}","\u{1F3F3}\uFE0F","\u{1F3F4}","\u{1F3C1}","\u{1F6A9}","\u{1F38C}","\u{1F1FA}\u{1F1F8}","\u{1F1EC}\u{1F1E7}","\u{1F1EB}\u{1F1F7}","\u{1F1E9}\u{1F1EA}","\u{1F1EA}\u{1F1F8}","\u{1F1EE}\u{1F1F9}","\u{1F1EF}\u{1F1F5}","\u{1F1F0}\u{1F1F7}","\u{1F1E8}\u{1F1F3}","\u{1F1F7}\u{1F1FA}","\u{1F1E7}\u{1F1F7}","\u{1F1EE}\u{1F1F3}","\u{1F1E6}\u{1F1FA}","\u{1F1E8}\u{1F1E6}","\u{1F1F2}\u{1F1FD}","\u{1F1E6}\u{1F1F7}","\u{1F1F9}\u{1F1F7}","\u{1F1F8}\u{1F1E6}","\u{1F1E6}\u{1F1EA}","\u{1F1FF}\u{1F1E6}","\u{1F1F3}\u{1F1EC}","\u{1F1EA}\u{1F1EC}","\u{1F1F0}\u{1F1EA}","\u{1F1F9}\u{1F1ED}","\u{1F1FB}\u{1F1F3}","\u{1F1EE}\u{1F1E9}","\u{1F1F5}\u{1F1ED}","\u{1F1F2}\u{1F1FE}","\u{1F1F8}\u{1F1EC}","\u{1F1F3}\u{1F1FF}","\u{1F1E8}\u{1F1ED}","\u{1F1F8}\u{1F1EA}","\u{1F1F3}\u{1F1F4}","\u{1F1E9}\u{1F1F0}","\u{1F1EB}\u{1F1EE}","\u{1F1EE}\u{1F1EA}","\u{1F1F5}\u{1F1F9}","\u{1F1F3}\u{1F1F1}","\u{1F1E7}\u{1F1EA}","\u{1F1E6}\u{1F1F9}","\u{1F1F5}\u{1F1F1}","\u{1F1E8}\u{1F1FF}","\u{1F1F7}\u{1F1F4}","\u{1F1ED}\u{1F1FA}","\u{1F1EC}\u{1F1F7}","\u{1F1FA}\u{1F1E6}","\u{1F1EE}\u{1F1F1}","\u{1F1F5}\u{1F1F0}","\u{1F1E7}\u{1F1E9}","\u{1F1F1}\u{1F1F0}","\u{1F1F2}\u{1F1F2}","\u{1F1F0}\u{1F1ED}","\u{1F1F3}\u{1F1F5}","\u{1F1F2}\u{1F1F3}","\u{1F1E8}\u{1F1F4}","\u{1F1E8}\u{1F1F1}","\u{1F1F5}\u{1F1EA}","\u{1F1EA}\u{1F1E8}","\u{1F1FB}\u{1F1EA}","\u{1F1F5}\u{1F1E6}","\u{1F1E8}\u{1F1F7}","\u{1F1FA}\u{1F1FE}","\u{1F1F5}\u{1F1FE}","\u{1F1E7}\u{1F1F4}","\u{1F1ED}\u{1F1F3}","\u{1F1F8}\u{1F1FB}","\u{1F1F3}\u{1F1EE}","\u{1F1EC}\u{1F1F9}","\u{1F1E8}\u{1F1FA}","\u{1F1EF}\u{1F1F2}","\u{1F1ED}\u{1F1F9}","\u{1F1E9}\u{1F1F4}","\u{1F1F9}\u{1F1F9}","\u{1F1E7}\u{1F1E7}","\u{1F1E6}\u{1F1EC}","\u{1F1E9}\u{1F1F2}","\u{1F1EC}\u{1F1E9}","\u{1F1F0}\u{1F1F3}","\u{1F1F1}\u{1F1E8}","\u{1F1FB}\u{1F1E8}","\u{1F1E7}\u{1F1F8}","\u{1F1EF}\u{1F1F4}","\u{1F1F1}\u{1F1E7}","\u{1F1EE}\u{1F1F6}","\u{1F1EE}\u{1F1F7}","\u{1F1E6}\u{1F1EB}","\u{1F1F5}\u{1F1F8}","\u{1F1F8}\u{1F1FE}","\u{1F1FE}\u{1F1EA}","\u{1F1F4}\u{1F1F2}","\u{1F1F6}\u{1F1E6}","\u{1F1F0}\u{1F1FC}","\u{1F1E7}\u{1F1ED}","\u{1F1E6}\u{1F1FF}","\u{1F1EC}\u{1F1EA}","\u{1F1E6}\u{1F1F2}","\u{1F1F0}\u{1F1FF}","\u{1F1FA}\u{1F1FF}","\u{1F1F9}\u{1F1F2}","\u{1F1F0}\u{1F1EC}","\u{1F1F9}\u{1F1EF}","\u{1F1E6}\u{1F1F1}","\u{1F1F7}\u{1F1F8}","\u{1F1ED}\u{1F1F7}","\u{1F1E7}\u{1F1E6}","\u{1F1F2}\u{1F1EA}","\u{1F1F2}\u{1F1F0}","\u{1F1F8}\u{1F1EE}","\u{1F1E7}\u{1F1EC}","\u{1F1F1}\u{1F1F9}","\u{1F1F1}\u{1F1FB}","\u{1F1EA}\u{1F1EA}","\u{1F1E8}\u{1F1FE}","\u{1F1F2}\u{1F1F9}","\u{1F1F1}\u{1F1FA}","\u{1F1EE}\u{1F1F8}","\u{1F1E6}\u{1F1E9}","\u{1F1F2}\u{1F1E8}","\u{1F1F8}\u{1F1F2}","\u{1F1FB}\u{1F1E6}","\u{1F1F1}\u{1F1EE}","\u{1F1E7}\u{1F1F2}","\u{1F1F0}\u{1F1FE}","\u{1F1FB}\u{1F1EE}","\u{1F1EC}\u{1F1FA}","\u{1F1E6}\u{1F1F8}","\u{1F1F2}\u{1F1F5}","\u{1F1F5}\u{1F1FC}","\u{1F1EB}\u{1F1F2}","\u{1F1F2}\u{1F1ED}","\u{1F1F0}\u{1F1EE}","\u{1F1F3}\u{1F1F7}","\u{1F1F9}\u{1F1FB}","\u{1F1FC}\u{1F1F8}","\u{1F1F9}\u{1F1F4}","\u{1F1EB}\u{1F1EF}","\u{1F1F5}\u{1F1EC}","\u{1F1F8}\u{1F1E7}","\u{1F1FB}\u{1F1FA}","\u{1F1F3}\u{1F1E8}","\u{1F1F9}\u{1F1ED}","\u{1F1F0}\u{1F1ED}","\u{1F1F1}\u{1F1E6}","\u{1F1E7}\u{1F1F3}"];
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
function renderEmojiGrid(filter){
  var grid=g("emojiGrid");
  var h="";
  allEmojis.forEach(function(e){
    if(filter&&!e.toLowerCase().includes(filter.toLowerCase()))return;
    h+="<span onclick='insertEmoji(&quot;"+e+"&quot;)' title='"+e+"' style='cursor:pointer;border-radius:4px;padding:2px;display:inline-flex;align-items:center;justify-content:center;transition:background .1s'>"+emojiImg(e)+"</span>";
  });
  grid.innerHTML=h;
}
function toggleEmojiPicker(){
  var picker=g("emojiPicker");
  if(picker.classList.contains("show")){picker.classList.remove("show");return}
  if(!g("emojiGrid").innerHTML)renderEmojiGrid();
  picker.classList.add("show");
}
function filterEmojis(q){
  renderEmojiGrid((q||"").toLowerCase());
}
function insertEmoji(e){
  var ta=g("msgInput");
  ta.value+=e;ta.focus();
  g("emojiPicker").classList.remove("show");
}
document.addEventListener("click",function(e){if(!e.target.closest(".emoji-picker-wrap")){var p=g("emojiPicker");if(p)p.classList.remove("show")}});

// --- Channel management ---
function loadChannels(){
  api({action:"channels"},function(d){
    if(d.error){g("channelList").innerHTML="<p style='color:#d45555;font-size:10px'>"+esc(d.error)+"</p>";return}
    var channels=d.channels||[];
    var categories=channels.filter(function(c){return c.type===4}).sort(function(a,b){return a.position-b.position});
    var catSel=g("newChannelCategory");
    catSel.innerHTML="<option value=''>no category</option>";
    for(var i=0;i<categories.length;i++){catSel.innerHTML+="<option value='"+categories[i].id+"'>"+esc(categories[i].name)+"</option>"}
    var h="";
    var grouped={};
    for(var i=0;i<channels.length;i++){
      var c=channels[i];
      var pid=c.parent_id||"_root";
      if(!grouped[pid])grouped[pid]=[];
      grouped[pid].push(c);
    }
    for(var pid in grouped){
      var items=grouped[pid].sort(function(a,b){return a.position-b.position});
      for(var i=0;i<items.length;i++){
        var c=items[i];
        var icon=c.type===0?"#":c.type===2?"\u{1F50A}":c.type===4?"\u{1F4C2}":"#";
        var typeLabel=c.type===0?"text":c.type===2?"voice":c.type===4?"category":"type "+c.type;
        h+="<div class='channel-card'>";
        h+="<span class='channel-icon'>"+icon+"</span>";
        h+="<span class='channel-name'>"+esc(c.name)+"</span>";
        h+="<span class='channel-type'>"+typeLabel+"</span>";
        if(c.type!==4)h+="<button class='channel-del' onclick='deleteChannel(&quot;"+c.id+"&quot;,&quot;"+esc(c.name)+"&quot;)'>delete</button>";
        h+="</div>";
      }
    }
    if(!channels.length)h="<p style='color:#5a5260;font-size:10px;text-align:center;padding:16px'>no channels</p>";
    g("channelList").innerHTML=h;
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

// --- Invite management ---
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
      h+="<div class='invite-card'>";
      h+="<div class='invite-info'><div class='invite-code'>"+esc(inv.code)+"</div>";
      h+="<div class='invite-meta'>by <b style='color:#e0dce4'>"+esc(inviterName)+"</b>"+(inv.channel?" \xB7 #"+esc(inv.channel.name||""):"")+"</div>";
      h+="<div class='invite-uses'>"+(inv.uses||0)+" uses"+(inv.max_uses?" / "+inv.max_uses+" max":"")+"</div></div>";
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

// --- Scheduled Events ---
function loadEvents(){
  g("eventList").innerHTML="<p style='color:#6d6572;font-size:10px;text-align:center;padding:16px'>loading...</p>";
  api({action:"events"},function(d){
    if(d.error){g("eventList").innerHTML="<p style='color:#d45555;font-size:10px'>"+esc(d.error)+"</p>";return}
    var events=d.events||[];
    if(!events.length){g("eventList").innerHTML="<p style='color:#5a5260;font-size:10px;text-align:center;padding:16px'>no scheduled events</p>";return}
    var h="";
    for(var i=0;i<events.length;i++){
      var ev=events[i];
      var start=new Date(ev.scheduled_start_time);
      var startStr=start.toLocaleString("en-US",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"});
      var statusClass=ev.status===1?"event-scheduled":ev.status===2?"event-active":ev.status===3?"event-completed":"event-cancelled";
      var statusText=ev.status===1?"scheduled":ev.status===2?"active":ev.status===3?"ended":"cancelled";
      h+="<div class='event-card'>";
      h+="<div><span class='event-name'>"+esc(ev.name)+"</span><span class='event-status "+statusClass+"'>"+statusText+"</span></div>";
      h+="<div class='event-time'>"+startStr+"</div>";
      if(ev.description)h+="<div class='event-desc'>"+esc(ev.description.substring(0,200))+"</div>";
      h+="<button class='event-del' onclick='deleteEvent(&quot;"+ev.id+"&quot;)'>delete</button>";
      h+="</div>";
    }
    g("eventList").innerHTML=h;
  });
}
function createEvent(){
  var name=g("newEventName").value.trim();
  var start=g("newEventStart").value;
  var end=g("newEventEnd").value;
  if(!name){showToast("enter event name","error");return}
  if(!start){showToast("select start time","error");return}
  var body={action:"create_event",name:name,startTime:new Date(start).toISOString()};
  if(end)body.endTime=new Date(end).toISOString();
  api(body,function(d){
    if(d.success){showToast("event created");g("newEventName").value="";g("newEventStart").value="";g("newEventEnd").value="";loadEvents()}
    else{showToast(d.error||"failed","error")}
  });
}
function deleteEvent(id){
  g("confirmTitle").textContent="delete event";
  g("confirmBody").innerHTML="<p style='color:#7d7582;font-size:11px'>delete this event?</p>";
  var btn=g("confirmBtn");btn.className="confirm-danger";btn.textContent="delete";
  btn.onclick=function(){api({action:"delete_event",eventId:id},function(d){closeConfirm();if(d.success){showToast("event deleted");loadEvents()}else{showToast(d.error||"failed","error")}})};
  g("confirmOverlay").classList.add("show");
}

// --- Audit Log ---
function loadAuditLog(){
  g("auditList").innerHTML="<p style='color:#6d6572;font-size:10px;text-align:center;padding:16px'>loading...</p>";
  api({action:"audit_log",limit:50},function(d){
    if(d.error){g("auditList").innerHTML="<p style='color:#d45555;font-size:10px'>"+esc(d.error)+"</p>";return}
    var entries=d.entries||[];
    var users=d.users||[];
    if(!entries.length){g("auditList").innerHTML="<p style='color:#5a5260;font-size:10px;text-align:center;padding:16px'>no audit log entries</p>";return}
    var userMap={};for(var i=0;i<users.length;i++)userMap[users[i].id]=users[i];
    var h="";
    for(var i=0;i<entries.length;i++){
      var e=entries[i];
      var user=userMap[e.user_id];
      var userName=user?(user.global_name||user.username):e.user_id;
      var avatar=user&&user.avatar?"https://cdn.discordapp.com/avatars/"+user.id+"/"+user.avatar+(user.avatar.startsWith("a_")?".gif":".png"):"https://cdn.discordapp.com/embed/avatars/"+((user?user.discriminator:"0")%5||0)+".png";
      var ts=new Date(e.id?String(BigInt(e.id)>>22n+1420070400000):Date.now());
      var timeStr=ts.toLocaleString("en-US",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"});
      var actionText=formatAuditAction(e,userName);
      h+="<div class='audit-entry'>";
      h+="<img class='audit-avatar' src='"+avatar+"' alt='' loading='lazy'/>";
      h+="<div class='audit-info'><div class='audit-action'>"+actionText+"</div></div>";
      h+="<span class='audit-time'>"+timeStr+"</span>";
      h+="</div>";
    }
    g("auditList").innerHTML=h;
  });
}
function formatAuditAction(e,userName){
  var d=e.changes||[];
  var target=e.target_id;
  var actions={
    1:"created",2:"updated",3:"deleted",10:"kick",11:"prune",12:"ban",13:"unban",
    14:"role update",15:"role create",16:"role delete",20:"invite create",21:"invite delete",
    22:"webhook create",23:"webhook update",24:"webhook delete",25:"emoji create",26:"emoji update",27:"emoji delete",
    28:"message delete",29:"bulk delete",30:"channel create",31:"channel update",32:"channel overwrite create",
    33:"channel overwrite update",34:"channel overwrite delete",35:"member role update",36:"member move",
    37:"member disconnect",38:"bot add",39:"role update",40:"role move",42:"members prune",
    43:"connection create",44:"connection update",45:"connection delete",46:"bot remove",47:"integration create",
    48:"integration update",49:"integration delete",50:"stage create",51:"stage update",52:"stage delete",
    53:"sticker create",54:"sticker update",55:"sticker delete",56:"scheduled event create",
    57:"scheduled event update",58:"scheduled event delete",61:"thread create",62:"thread update",63:"thread delete",
    64:"permission create",65:"permission update",66:"permission delete",67:"auto moderation rule create",
    68:"auto moderation rule update",69:"auto moderation rule delete",70:"auto moderation block message",
    71:"auto moderation flag to channel",72:"auto moderation member communication disabled"
  };
  var actionStr=actions[e.action_type]||"action #"+e.action_type;
  var result="<b>"+esc(userName)+"</b> <span class='hl'>"+esc(actionStr)+"</span>";
  if(target)result+=" <span class='hl'>"+esc(target)+"</span>";
  if(d.length){
    for(var i=0;i<Math.min(d.length,2);i++){
      var c=d[i];
      if(c.name)result+=" \xB7 "+esc(c.name);
    }
  }
  return result;
}

// --- Role management in member modal ---
function showMember(id){
  var m=allMembers.find(function(x){return x.user.id===id});if(!m)return;
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
  var roleManagerHtml="<div class='role-manager'>";
  for(var i=0;i<allRoles.length;i++){
    var r=allRoles[i];
    if(r.id===m.guild_id)continue;
    var hasRole=m.roles.indexOf(r.id)!==-1;
    var rc=r.color?"#"+r.color.toString(16).padStart(6,"0"):"#555";
    roleManagerHtml+="<div class='role-manage-item"+(hasRole?" has-role":"")+"' data-roleid='"+r.id+"' data-uid='"+m.user.id+"' onclick='toggleMemberRole(this)'>";
    roleManagerHtml+="<span class='role-check'>"+(hasRole?"&#10003;":"")+"</span>";
    roleManagerHtml+="<span class='modal-role-dot' style='background:"+rc+"'></span>"+esc(r.name);
    roleManagerHtml+="</div>";
  }
  roleManagerHtml+="</div>";
  g("modalBox").innerHTML="<div class='modal-header'><img src='"+avatar+"' alt='' /><div class='modal-header-info'><h3>"+esc(name)+"</h3><p>"+esc(m.user.username)+(m.user.bot?" &middot; bot":"")+"</p></div></div>"+
    "<div class='modal-body'>"+
    "<div id='modalBadges'></div>"+
    "<div class='modal-section'><div class='modal-section-label'>id</div><p style='color:#9a929e;font-size:11px'>"+m.user.id+"</p></div>"+
    "<div class='modal-section'><div class='modal-section-label'>joined</div><p style='color:#9a929e;font-size:11px'>"+joined+"</p></div>"+
    (m.premium_since?"<div class='modal-section'><div class='modal-section-label'>boosting since</div><p style='color:#9a929e;font-size:11px'>"+new Date(m.premium_since).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"})+"</p></div>":"")+
    "<div class='modal-section'><div class='modal-section-label'>roles</div><div class='modal-roles'>"+(rolesHtml||"<span style='color:#5a5260;font-size:10px'>no roles</span>")+"</div></div>"+
    "<div class='modal-section'><div class='modal-section-label'>manage roles</div>"+roleManagerHtml+"</div>"+
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
function toggleMemberRole(el){
  var roleId=el.dataset.roleid,userId=el.dataset.uid;
  var hasRole=el.classList.contains("has-role");
  var action=hasRole?"remove_role":"add_role";
  el.style.opacity="0.5";
  api({action:action,userId:userId,roleId:roleId},function(d){
    el.style.opacity="1";
    if(d.success){
      el.classList.toggle("has-role");
      var check=el.querySelector(".role-check");
      if(check)check.innerHTML=el.classList.contains("has-role")?"&#10003;":"";
      loadMembers();
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
    if(d.recentJoins&&d.recentJoins.length){
      h+="<div style='margin-bottom:8px'><span style='font-size:10px;color:#6d6572;text-transform:uppercase;letter-spacing:.5px;font-weight:600'>recent joins ("+d.totalJoins7d+" this week)</span></div>";
      for(var i=0;i<Math.min(d.recentJoins.length,10);i++){
        var j=d.recentJoins[i];
        var u=j.user;
        var name=u.global_name||u.username;
        var avatar=u.avatar?"https://cdn.discordapp.com/avatars/"+u.id+"/"+u.avatar+(u.avatar.startsWith("a_")?".gif":".png"):"https://cdn.discordapp.com/embed/avatars/"+(parseInt(u.discriminator||"0")%5)+".png";
        var ago=timeAgo(new Date(j.joined_at));
        h+="<div class='activity-item'><img src='"+avatar+"' alt='' loading='lazy'/><div class='activity-text'><b>"+esc(name)+"</b> joined<span class='activity-badge badge-join'>join</span></div><span class='activity-time'>"+ago+"</span></div>";
      }
    }
    if(d.bans&&d.bans.length){
      h+="<div style='margin:12px 0 8px'><span style='font-size:10px;color:#6d6572;text-transform:uppercase;letter-spacing:.5px;font-weight:600'>recent bans</span></div>";
      for(var i=0;i<Math.min(d.bans.length,5);i++){
        var b=d.bans[i];var u=b.user;
        var name=u.global_name||u.username;
        var avatar=u.avatar?"https://cdn.discordapp.com/avatars/"+u.id+"/"+u.avatar+(u.avatar.startsWith("a_")?".gif":".png"):"https://cdn.discordapp.com/embed/avatars/"+(parseInt(u.discriminator||"0")%5)+".png";
        h+="<div class='activity-item'><img src='"+avatar+"' alt='' loading='lazy'/><div class='activity-text'><b>"+esc(name)+"</b>"+(b.reason?" \xB7 "+esc(b.reason):"")+"<span class='activity-badge badge-ban'>ban</span></div></div>";
      }
    }
    if(!h)h="<p style='color:#5a5260;font-size:10px;text-align:center;padding:12px'>no recent activity</p>";
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
var dmPollTimer=null;
function startDmPoll(){
  if(dmPollTimer)clearInterval(dmPollTimer);
  dmPollTimer=setInterval(function(){if(currentDmChannel)loadDmHistory(currentDmChannel)},4000);
}
function stopDmPoll(){
  if(dmPollTimer){clearInterval(dmPollTimer);dmPollTimer=null}
}
function startDmById(){
  var uid=g("dmUserId").value.trim();
  if(!uid)return;
  g("dmStart").style.display="none";
  g("dmChat").style.display="block";
  g("dmChatName").textContent=uid;
  g("dmHistory").innerHTML="<p style='color:#6d6572;text-align:center;padding:20px 0'>opening dm...</p>";
  g("dmInput").value="";
  g("dmStatus").textContent="";
  api({action:"dm_send",userId:uid,content:""},function(d){
    if(d.error){g("dmHistory").innerHTML="<p style='color:#d45555;text-align:center;padding:20px 0'>"+esc(d.error)+"</p>";return}
    currentDmChannel=d.channelId;
    startDmPoll();
    api({action:"userinfo",userId:uid},function(u){
      if(u&&!u.error)g("dmChatName").textContent=u.global_name||u.username||uid;
    });
    loadDmHistory(d.channelId);
  });
}
function dmClose(){
  currentDmChannel=null;
  stopDmPoll();
  g("dmChat").style.display="none";
  g("dmStart").style.display="block";
}
function loadDmHistory(cid){
  g("dmHistory").innerHTML="<p style='color:#6d6572;text-align:center;padding:20px 0'>loading...</p>";
  api({action:"dm_messages",channelId:cid,limit:50},function(d){
    if(d.error){g("dmHistory").innerHTML="<p style='color:#d45555;text-align:center;padding:20px 0'>"+esc(d.error)+"</p>";return}
    if(!d.messages||!d.messages.length){g("dmHistory").innerHTML="<p style='color:#5a5260;text-align:center;padding:20px 0'>no messages</p>";return}
    var h="";
    for(var i=d.messages.length-1;i>=0;i--){
      var msg=d.messages[i],u=msg.author;
      if(!u)continue;
      var name=u.global_name||u.username;
      var time=new Date(msg.timestamp).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"});
      var avatar=u.avatar?"https://cdn.discordapp.com/avatars/"+u.id+"/"+u.avatar+(u.avatar.startsWith("a_")?".gif":".png"):"https://cdn.discordapp.com/embed/avatars/"+(parseInt(u.discriminator||"0")%5)+".png";
      h+="<div class='msg-row'>";
      h+="<img class='msg-avatar' src='"+avatar+"' alt='' loading='lazy'/>";
      h+="<div class='msg-body'>";
      h+="<div><span class='msg-author'>"+esc(name)+"</span><span class='msg-time'>"+time+"</span>"+(msg.edited_timestamp?"<span class='msg-edited'>(edited)</span>":"")+"</div>";
      if(msg.referenced_message&&msg.referenced_message.author){
        var ru=msg.referenced_message.author,rn=ru.global_name||ru.username;
        h+="<div class='msg-ref'>&#8618; "+esc(rn)+": "+fmt(msg.referenced_message.content||"(attachment)")+"</div>";
      }
      h+="<div class='msg-content'>"+fmt(msg.content||"")+"</div>";
      if(msg.sticker_items&&msg.sticker_items.length){
        for(var j=0;j<msg.sticker_items.length;j++){
          var s=msg.sticker_items[j];
          h+="<img class='msg-sticker' src='https://cdn.discordapp.com/stickers/"+s.id+".png' alt='' loading='lazy'/>";
        }
      }
      if(msg.attachments&&msg.attachments.length){
        for(var j=0;j<msg.attachments.length;j++){
          var a=msg.attachments[j];
          if(a.content_type&&(a.content_type.startsWith("image/")||a.width)){
            h+="<img class='msg-img' src='"+escUrl(a.url)+"' alt='' loading='lazy'/>";
          }else if(a.content_type&&a.content_type.startsWith("video/")){
            h+="<video class='msg-video' src='"+escUrl(a.url)+"' controls></video>";
          }else if(a.content_type&&a.content_type.startsWith("audio/")){
            h+="<audio class='msg-audio' src='"+escUrl(a.url)+"' controls></audio>";
          }else{
            h+="<div><a class='msg-file-link' href='"+escUrl(a.url)+"'>"+esc(a.filename)+"</a></div>"
          }
        }
      }
      h+="</div>";
      h+="<span class='msg-del' data-cid='"+cid+"' data-mid='"+msg.id+"' onclick='deleteDmMsg(this.dataset.cid,this.dataset.mid)' title='delete'>&#10005;</span>";
      h+="</div>";
    }
    g("dmHistory").innerHTML=h;
    parseTwemoji(g("dmHistory"));
    g("dmHistory").scrollTop=g("dmHistory").scrollHeight;
  });
}
function sendDm(){
  var c=currentDmChannel,m=g("dmInput").value;
  if(!m){g("dmStatus").textContent="enter a message";g("dmStatus").style.color="#f44";return}
  g("dmStatus").style.color="#aaa";g("dmStatus").textContent="sending...";
  var body={action:"dm_send",content:m};
  if(c)body.channelId=c;
  else{g("dmStatus").style.color="#f44";g("dmStatus").textContent="no recipient";return}
  api(body,function(d){
    if(d.success){
      g("dmStatus").style.color="#4f4";g("dmStatus").textContent="sent!";
      g("dmInput").value="";
      if(d.channelId&&!currentDmChannel)currentDmChannel=d.channelId;
      if(currentDmChannel)loadDmHistory(currentDmChannel);
    }else{
      g("dmStatus").style.color="#f44";g("dmStatus").textContent=d.error||"failed";
    }
  });
}
function deleteDmMsg(cid,mid){
  if(!confirm("delete this message?"))return;
  api({action:"delete",channelId:cid,messageId:mid},function(d){
    if(d.success){loadDmHistory(cid)}
    else{alert(d.error||"failed to delete")}
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
document.addEventListener("click",function(e){if(!e.target.closest("#mentionSearch")&&!e.target.closest("#mentionList"))hideMentionList();if(!e.target.closest("#channelPicker")&&!e.target.closest("#channelList"))hideChannelList()});
api({action:"guildinfo"},function(d){
  if(d.error&&d.error==="Unauthorized"){g("sidebar").style.display="flex";g("panel-dashboard").classList.add("show");g("loginOverlay").style.display="flex"}
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
    const stateCookie = (req.headers.cookie || "").match(/oauth_state=([^;]+)/)?.[1] || "";
    const stateParam = req.query.state || "";
    if (!stateParam || !stateCookie || !verifyState(stateParam) || stateParam !== stateCookie) {
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      return res.status(403).send("<html><body style='background:#13161b;color:#d45555;font-family:monospace;display:flex;justify-content:center;align-items:center;height:100vh'><div style='text-align:center'><h1>Invalid State</h1><p style='color:#7d7582'>CSRF validation failed.</p><a href='/api' style='color:#b48899'>&larr; back</a></div></body></html>");
    }
    res.setHeader("Set-Cookie", "oauth_state=; Path=/; Max-Age=0; SameSite=Strict; HttpOnly; Secure");
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
      return res.status(403).send("<html><body style='background:#13161b;color:#d45555;font-family:monospace;display:flex;justify-content:center;align-items:center;height:100vh'><div style='text-align:center'><h1>Access Denied</h1><p style='color:#7d7582'>This account is not authorized.</p><a href='/api' style='color:#b48899'>\u2190 back</a></div></body></html>");
    }
    res.setHeader("Set-Cookie", `token=${signToken(userRes.id)}; Path=/; Max-Age=86400; SameSite=Strict; HttpOnly; Secure`);
    res.setHeader("Location", "/api");
    return res.status(302).end();
  } catch (err) {
    console.error("OAuth callback error:", err.message);
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    return res.status(500).send("<html><body style='background:#13161b;color:#d45555;font-family:monospace;display:flex;justify-content:center;align-items:center;height:100vh'><div style='text-align:center'><h1>OAuth Error</h1><p style='color:#7d7582'>" + htmlEscape(err.message || "Unknown error") + "</p><a href='/api' style='color:#b48899'>\u2190 back</a></div></body></html>");
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
        created: new Date(Number(BigInt(guild.id) >> 22n) + 14200704e5).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) + " \xB7 " + new Date(Number(BigInt(guild.id) >> 22n) + 14200704e5).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
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
        throw e;
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
      const channels = await discordFetch3(`https://discord.com/api/v10/users/@me/channels`, { headers });
      return res.json({ channels });
    }
    if (body.action === "dm_messages") {
      if (!isValidSnowflake(body.channelId)) return res.status(400).json({ error: "Invalid channel ID" });
      const messages = await discordFetch3(
        `https://discord.com/api/v10/channels/${body.channelId}/messages?limit=${parseLimit(body.limit, 50, 100)}`,
        { headers }
      );
      return res.json({ messages });
    }
    if (body.action === "dm_send") {
      let channelId = body.channelId;
      if (!channelId && body.userId) {
        if (!isValidSnowflake(body.userId)) return res.status(400).json({ error: "Invalid user ID" });
        const ch = await discordFetch3(`https://discord.com/api/v10/users/@me/channels`, {
          method: "POST",
          headers,
          body: JSON.stringify({ recipient_id: body.userId })
        });
        channelId = ch.id;
      }
      if (!channelId) return res.status(400).json({ error: "No channel or user specified" });
      if (channelId && !isValidSnowflake(channelId)) return res.status(400).json({ error: "Invalid channel ID" });
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
          throw new Error(msg);
        }
      }
      return res.json({ success: true, channelId });
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
        const log = await discordFetch3(
          `https://discord.com/api/v10/guilds/${guildId}/audit-logs?limit=${limit}`,
          { headers }
        );
        return res.json({ entries: log.audit_log_entries || [], users: log.users || [], roles: log.roles || [] });
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
    if (body.action === "events") {
      try {
        const events = await discordFetch3(
          `https://discord.com/api/v10/guilds/${guildId}/scheduled-events?with_user_count=true`,
          { headers }
        );
        return res.json({ events: Array.isArray(events) ? events : [] });
      } catch (e) {
        return res.status(500).json({ error: e.message || "Failed to fetch events" });
      }
    }
    if (body.action === "create_event") {
      try {
        const name = typeof body.name === "string" ? body.name.trim().slice(0, 100) : "";
        if (!name) return res.status(400).json({ error: "Event name required" });
        const eventBody = { name, scheduled_start_time: body.startTime || new Date(Date.now() + 36e5).toISOString() };
        if (body.endTime) eventBody.scheduled_end_time = body.endTime;
        if (body.description) eventBody.description = String(body.description).slice(0, 1e3);
        if (body.channelId && isValidSnowflake(body.channelId)) eventBody.channel_id = body.channelId;
        const event = await discordFetch3(
          `https://discord.com/api/v10/guilds/${guildId}/scheduled-events`,
          { method: "POST", headers: { ...headers, "Content-Type": "application/json" }, body: JSON.stringify(eventBody) }
        );
        return res.json({ success: true, event });
      } catch (e) {
        return res.status(500).json({ error: e.message || "Failed to create event" });
      }
    }
    if (body.action === "delete_event") {
      if (!body.eventId) return res.status(400).json({ error: "No event ID" });
      try {
        await discordFetch3(
          `https://discord.com/api/v10/guilds/${guildId}/scheduled-events/${body.eventId}`,
          { method: "DELETE", headers }
        );
        return res.json({ success: true });
      } catch (e) {
        return res.status(500).json({ error: e.message || "Failed to delete event" });
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
        return res.json({ recentJoins, bans, totalJoins7d: last7d.length });
      } catch (e) {
        return res.json({ recentJoins: [], bans: [], totalJoins7d: 0, error: e.message });
      }
    }
    return res.status(400).json({ error: "Unknown action" });
  } catch (err) {
    return res.status(500).json({
      error: err.message || "Request failed"
    });
  }
}
export {
  handler as default
};
