import type { VercelRequest, VercelResponse } from "@vercel/node";
import axios from "axios";
import { InteractionResponseType, MessageFlags } from "discord-api-types/v10";
import { InteractionType, verifyKey } from "discord-interactions";
import getRawBody from "raw-body";
import commands from "./.discraft/commands/index";
import { logger } from "./utils/logger";
import {
  type Command,
  type CommandExecuteUnpromised,
  type SimplifiedInteraction,
} from "./utils/types";

const PANEL_PASSWORD = process.env.PANEL_PASSWORD || "admin";

function authToken(): string {
  return Buffer.from(PANEL_PASSWORD).toString("base64");
}

function verifyToken(token: string): boolean {
  try {
    return Buffer.from(token, "base64").toString() === PANEL_PASSWORD;
  } catch {
    return false;
  }
}

function getToken(req: VercelRequest): string | null {
  const auth = req.headers.authorization;
  if (auth?.startsWith("Bearer ")) return auth.slice(7);
  const cookie = req.headers.cookie;
  if (cookie) {
    const match = cookie.match(/token=([^;]+)/);
    if (match) return match[1];
  }
  return null;
}

function html(): string {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>Bot Panel</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font:12px/1.4 monospace;background:#000;color:#ccc;min-height:100vh;padding:20px}
.card{background:#111;padding:16px;border:1px solid #222;max-width:480px;margin:0 auto}
h1{text-align:center;margin-bottom:12px;color:#fff;font-size:14px;font-weight:400;text-transform:uppercase;letter-spacing:2px}
label{display:block;color:#666;font-size:10px;text-transform:uppercase;margin-bottom:2px}
input,textarea,select{width:100%;padding:4px 6px;border:1px solid #333;border-radius:0;background:#000;color:#ccc;font:12px monospace;margin-bottom:8px;outline:none}
input:focus,textarea:focus,select:focus{border-color:#fff}
button{padding:4px 10px;background:#fff;color:#000;border:none;border-radius:0;font:11px monospace;cursor:pointer;display:inline-block;width:auto}
button:hover{background:#888}
.flex{display:flex;gap:4px}
.flex button{flex:1}
.error{color:#f44;font-size:11px;margin-bottom:4px}
.success{color:#4f4;font-size:11px;margin-bottom:4px}
.hidden{display:none}
#logout{background:none;color:#f44;border:1px solid #f44;margin-top:8px;padding:3px 8px;font-size:10px}
textarea{resize:vertical;min-height:50px;font:12px monospace}
select option{background:#000;color:#ccc}
</style>
</head>
<body>
<div class="card" id="loginScreen">
<h1>BOT PANEL</h1>
<div id="loginError" class="error"></div>
<label>password</label>
<input type="password" id="password" placeholder="password" onkeydown="if(event.key==='Enter')login()"/>
<button onclick="login()">login</button>
</div>
<div class="card hidden" id="panelScreen">
<h1>BOT CONTROL</h1>
<div id="panelMsg" class="success"></div>
<label>server</label>
<select id="guildSelect" onchange="loadChannels()"><option value="">loading...</option></select>
<label>channel</label>
<select id="channelSelect"><option value="">select server first</option></select>
<label>message</label>
<textarea id="messageInput" placeholder="message"></textarea>
<div class="flex">
<button onclick="sendMessage()">send</button>
<button onclick="clearForm()" style="background:#555">clear</button>
</div>
<button id="logout" onclick="logout()">logout</button>
</div>
<script>
const API = window.location.origin + "/api";
let token = getCookie("token");
if (token) { showPanel(); } else { showLogin(); }
function getCookie(n){const m=document.cookie.match(new RegExp("(^| )"+n+"=([^;]+)"));return m?m[2]:null}
function showLogin(){document.getElementById("loginScreen").classList.remove("hidden");document.getElementById("panelScreen").classList.add("hidden")}
function showPanel(){document.getElementById("loginScreen").classList.add("hidden");document.getElementById("panelScreen").classList.remove("hidden");loadGuilds()}
function msg(t,e){const d=document.getElementById("panelMsg");d.textContent=t;d.className=e==="error"?"error":"success";setTimeout(()=>d.textContent="",3000)}
async function login(){const p=document.getElementById("password").value;const e=document.getElementById("loginError");e.textContent="";try{const r=await fetch(API,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"login",password:p})});const d=await r.json();if(d.token){document.cookie="token="+d.token+";path=/;max-age=86400;SameSite=Lax";token=d.token;showPanel()}else{e.textContent=d.error||"Wrong password"}}catch(a){e.textContent="Connection error"}}
async function loadGuilds(){const s=document.getElementById("guildSelect");try{const r=await fetch(API,{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "+token},body:JSON.stringify({action:"guilds"})});const d=await r.json();if(d.error){s.innerHTML='<option value="">'+d.error+'</option>';return}s.innerHTML='<option value="">Select a server</option>'+d.guilds.map(g=>'<option value="'+g.id+'">'+g.name+"</option>").join("")}catch(a){s.innerHTML='<option value="">Failed to load</option>'}}
async function loadChannels(){const g=document.getElementById("guildSelect").value;const s=document.getElementById("channelSelect");s.innerHTML='<option value="">Loading...</option>';try{const r=await fetch(API,{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "+token},body:JSON.stringify({action:"channels",guildId:g})});const d=await r.json();if(d.error){s.innerHTML='<option value="">'+d.error+'</option>';return}s.innerHTML='<option value="">Select a channel</option>'+d.channels.filter(c=>c.type===0).map(c=>'<option value="'+c.id+'">#'+c.name+"</option>").join("")}catch(a){s.innerHTML='<option value="">Failed to load</option>'}}
async function sendMessage(){const g=document.getElementById("guildSelect").value;const c=document.getElementById("channelSelect").value;const m=document.getElementById("messageInput").value;if(!g||!c||!m){msg("Fill all fields","error");return}try{const r=await fetch(API,{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "+token},body:JSON.stringify({action:"send",channelId:c,content:m})});const d=await r.json();if(d.success){msg("Message sent!","success");document.getElementById("messageInput").value=""}else{msg(d.error||"Failed","error")}}catch(a){msg("Connection error","error")}}
function clearForm(){document.getElementById("messageInput").value=""}
function logout(){document.cookie="token=;path=/;max-age=0";token=null;showLogin()}
</script>
</body>
</html>`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method === "GET") {
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      return res.status(200).send(html());
    }

    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method Not Allowed" });
    }

    const isDiscord =
      typeof req.headers["x-signature-ed25519"] === "string" &&
      typeof req.headers["x-signature-timestamp"] === "string";

    if (isDiscord) {
      return await handleDiscord(req, res);
    }

    return await handlePanel(req, res);
  } catch (error) {
    logger.error("Handler error", { error });
    return res.status(500).json({ error: "Internal error" });
  }
}

async function handleDiscord(req: VercelRequest, res: VercelResponse) {
  const signature = req.headers["x-signature-ed25519"] as string;
  const timestamp = req.headers["x-signature-timestamp"] as string;

  if (!process.env.DISCORD_PUBLIC_KEY) {
    return res.status(500).json({ error: "No public key" });
  }

  const rawBody = await getRawBody(req);
  if (!rawBody) return res.status(400).json({ error: "Missing body" });

  let isValid = false;
  try {
    isValid = await verifyKey(rawBody, signature, timestamp, process.env.DISCORD_PUBLIC_KEY);
  } catch {
    return res.status(401).json({ error: "Invalid signature" });
  }
  if (!isValid) return res.status(401).json({ error: "Invalid signature" });

  const message: SimplifiedInteraction = JSON.parse(rawBody.toString());

  if (message.type === InteractionType.PING) {
    return res.status(200).json({ type: InteractionResponseType.Pong });
  }

  if (message.type === InteractionType.APPLICATION_COMMAND) {
    const commandName = message.data.name.toLowerCase();
    const command: Command = (commands as any)[commandName];

    if (command) {
      try {
        await axios.post(
          `https://discord.com/api/v10/interactions/${message.id}/${message.token}/callback`,
          {
            type: InteractionResponseType.DeferredChannelMessageWithSource,
            data: { flags: command.data.initialEphemeral ? MessageFlags.Ephemeral : 0 },
          },
          { headers: { "Content-Type": "application/json" } },
        );
      } catch {
        return res.status(500).json({ error: "Failed to defer" });
      }

      let commandResult: CommandExecuteUnpromised;
      try {
        commandResult = await command.execute({ interaction: message });
      } catch (error) {
        const errMsg = error instanceof Error ? error.message : "Unknown error";
        commandResult = {
          flags: MessageFlags.Ephemeral,
          embeds: [{
            color: 0xED4245,
            title: "Command Error",
            fields: [
              { name: "Command", value: `/${commandName}`, inline: true },
              { name: "Error", value: `\`\`\`\n${errMsg.length > 1000 ? errMsg.slice(0, 1000) + "..." : errMsg}\n\`\`\``, inline: false },
            ],
          }],
        };
      }

      try {
        await axios.patch(
          `https://discord.com/api/v10/webhooks/${message.application_id}/${message.token}/messages/@original`,
          {
            content: commandResult.content ?? "",
            flags: commandResult.flags,
            embeds: commandResult.embeds,
          },
          { headers: { "Content-Type": "application/json" } },
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

async function handlePanel(req: VercelRequest, res: VercelResponse) {
  let body: any;
  try {
    body = typeof req.body === "object" ? req.body : JSON.parse(req.body || "{}");
  } catch {
    return res.status(400).json({ error: "Invalid JSON" });
  }

  const { action } = body;

  if (action === "login") {
    if (body.password === PANEL_PASSWORD) {
      return res.json({ token: authToken() });
    }
    return res.status(401).json({ error: "Wrong password" });
  }

  const token = getToken(req);
  if (!token || !verifyToken(token)) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const headers = { Authorization: `Bot ${process.env.DISCORD_TOKEN}` };

  try {
    if (action === "guilds") {
      const r = await axios.get("https://discord.com/api/v10/users/@me/guilds", { headers });
      return res.json({ guilds: r.data });
    }

    if (action === "channels") {
      const r = await axios.get(`https://discord.com/api/v10/guilds/${body.guildId}/channels`, { headers });
      return res.json({ channels: r.data });
    }

    if (action === "send") {
      await axios.post(
        `https://discord.com/api/v10/channels/${body.channelId}/messages`,
        { content: body.content },
        { headers },
      );
      return res.json({ success: true });
    }

    return res.status(400).json({ error: "Unknown action" });
  } catch (err: any) {
    return res.status(500).json({
      error: err.response?.data?.message || err.message || "Request failed",
    });
  }
}
