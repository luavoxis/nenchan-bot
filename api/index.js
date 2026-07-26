// index.ts
import axios3 from "axios";
import { InteractionResponseType, MessageFlags as MessageFlags5 } from "discord-api-types/v10";
import { InteractionType as InteractionType2, verifyKey } from "discord-interactions";
import getRawBody from "raw-body";

// commands/userinfo.ts
import {
  ApplicationCommandOptionType
} from "discord-api-types/v10";
import axios from "axios";
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
    const userRes = await axios.get(
      `https://discord.com/api/v10/users/${targetId}`,
      { headers }
    );
    const user = userRes.data;
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
      const memberRes = await axios.get(
        `https://discord.com/api/v10/guilds/${interaction.guild_id}/members/${targetId}`,
        { headers }
      );
      const member = memberRes.data;
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
        const rolesRes = await axios.get(
          `https://discord.com/api/v10/guilds/${interaction.guild_id}/roles`,
          { headers }
        );
        const allRoles = rolesRes.data;
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
      const status = axios.isAxiosError(err) ? err.response?.status : "?";
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
import axios2 from "axios";
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
    const res = await axios2.get(
      `https://discord.com/api/v10/users/${userId}`,
      {
        headers: {
          Authorization: `Bot ${process.env.DISCORD_TOKEN}`
        }
      }
    );
    const user = res.data;
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

// utils/logger.ts
import consola from "consola";

// utils/types.ts
import "discord-interactions";

// index.ts
var PANEL_PASSWORD = process.env.PANEL_PASSWORD || "admin";
function authToken() {
  return Buffer.from(PANEL_PASSWORD).toString("base64");
}
function verifyToken(token) {
  try {
    return Buffer.from(token, "base64").toString() === PANEL_PASSWORD;
  } catch {
    return false;
  }
}
function getToken(req) {
  const auth = req.headers.authorization;
  if (auth?.startsWith("Bearer ")) return auth.slice(7);
  const cookie = req.headers.cookie;
  if (cookie) {
    const match = cookie.match(/token=([^;]+)/);
    if (match) return match[1];
  }
  return null;
}
function html() {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>bot panel</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font:12px/1.4 monospace;background:#000;color:#ccc;min-height:100vh;display:flex}
.sidebar{width:160px;background:#0a0a0a;border-right:1px solid #222;padding:12px;display:flex;flex-direction:column;gap:2px;min-height:100vh}
.sidebar h1{font-size:11px;color:#666;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;padding:0 4px}
.sidebar button{background:none;border:none;color:#888;font:11px monospace;padding:6px 8px;text-align:left;cursor:pointer;border-radius:0}
.sidebar button:hover{color:#fff;background:#111}
.sidebar button.active{color:#fff;background:#222}
#logoutBtn{margin-top:auto;color:#f44!important;border-top:1px solid #222;padding-top:8px!important}
.main{flex:1;padding:16px;max-width:800px}
.tab{display:none}
.tab.active{display:block}
h2{font-size:12px;color:#666;text-transform:uppercase;letter-spacing:1px;margin-bottom:12px;font-weight:400}
label{display:block;color:#666;font-size:10px;text-transform:uppercase;margin-bottom:2px;margin-top:6px}
input,textarea,select{width:100%;padding:4px 6px;border:1px solid #333;border-radius:0;background:#000;color:#ccc;font:12px monospace;margin-bottom:6px;outline:none}
input:focus,textarea:focus,select:focus{border-color:#fff}
button{padding:4px 10px;background:#fff;color:#000;border:none;border-radius:0;font:11px monospace;cursor:pointer;display:inline-block;width:auto}
button:hover{background:#888}
.flex{display:flex;gap:4px;margin-bottom:4px}
.flex button{flex:1}
.error{color:#f44;font-size:11px;margin-bottom:4px}
.success{color:#4f4;font-size:11px;margin-bottom:4px}
textarea{resize:vertical;min-height:50px;font:12px monospace}
select option{background:#000;color:#ccc}
.hidden{display:none!important}
.stat{background:#0a0a0a;border:1px solid #222;padding:10px;margin-bottom:6px}
.stat span{color:#666;font-size:10px;text-transform:uppercase;letter-spacing:.5px}
.stat p{color:#fff;font-size:13px;margin-top:2px}
table{width:100%;border-collapse:collapse;font-size:11px;margin-top:4px}
td,th{padding:4px 6px;text-align:left;border-bottom:1px solid #222;color:#aaa}
th{color:#666;font-size:10px;text-transform:uppercase;font-weight:400}
.member-row{cursor:pointer}
.member-row:hover{background:#111}
.modal{position:fixed;inset:0;background:rgba(0,0,0,.85);display:none;justify-content:center;align-items:center;z-index:100}
.modal.open{display:flex}
.modal-box{background:#111;border:1px solid #333;padding:16px;width:90%;max-width:400px}
.modal-box h3{font-size:12px;color:#fff;margin-bottom:8px}
.modal-box p{font-size:11px;color:#888;margin-bottom:6px}
</style>
</head>
<body>
<div id="sidebar" class="sidebar hidden">
<h1>bot panel</h1>
<button class="active" onclick="switchTab('dashboard')">[ dashboard ]</button>
<button onclick="switchTab('messages')">[ messages ]</button>
<button onclick="switchTab('members')">[ members ]</button>
<div id="guildSel"></div>
<button id="logoutBtn" onclick="logout()">[ logout ]</button>
</div>
<div class="main">
<div id="loginScreen" class="tab active" style="display:flex;flex-direction:column;justify-content:center;align-items:center;height:100vh">
<div style="background:#0a0a0a;border:1px solid #222;padding:24px;width:100%;max-width:280px;text-align:center">
<h2 style="margin-bottom:16px;color:#fff;font-size:13px;letter-spacing:2px;font-weight:400">bot panel</h2>
<div id="loginError" class="error" style="margin-bottom:6px"></div>
<input type="password" id="password" placeholder="password" style="text-align:center;margin-bottom:8px" onkeydown="if(event.key==='Enter')login()"/>
<button onclick="login()" style="width:100%">login</button>
</div>
</div>
<div id="tab-dashboard" class="tab">
<h2>dashboard</h2>
<div id="dashContent"><p style="color:#666">select a server from the sidebar</p></div>
</div>
<div id="tab-messages" class="tab">
<h2>messages</h2>
<label>channel</label>
<select id="msgChannel"><option value="">select server first</option></select>
<label>message</label>
<textarea id="msgInput" placeholder="message"></textarea>
<div class="flex">
<button onclick="sendMsg()">send</button>
<button onclick="document.getElementById('msgInput').value=''" style="background:#555">clear</button>
</div>
<div id="msgStatus"></div>
</div>
<div id="tab-members" class="tab">
<h2>members</h2>
<div id="memberList"><p style="color:#666">select a server from the sidebar</p></div>
</div>
</div>
<div id="userModal" class="modal"><div class="modal-box"><h3 id="modalName"></h3><p id="modalId"></p><p id="modalJoined"></p><p id="modalRoles"></p><div class="flex" style="margin-top:8px"><button onclick="closeModal()">close</button></div></div></div>
<script>
let token=getCookie("token"),guildId="",allMembers=[],allRoles=[];
function getCookie(n){const m=document.cookie.match(new RegExp("(^| )"+n+"=([^;]+)"));return m?m[2]:null}
function qs(s){return document.querySelector(s)}
function show(e){e?.classList.add("active")}
function hide(e){e?.classList.remove("active")}

function switchTab(name){
  document.querySelectorAll(".tab").forEach(t=>t.classList.remove("active"));
  const t=document.getElementById(name==="login"?"loginScreen":"tab-"+name);
  if(t)t.classList.add("active");
  document.querySelectorAll(".sidebar button").forEach(b=>b.classList.remove("active"));
  const btn=Array.from(document.querySelectorAll(".sidebar button")).find(b=>b.textContent.includes(name));
  if(btn)btn.classList.add("active");
  if(name==="messages"&&guildId)loadMsgChannels();
  if(name==="members"&&guildId)loadMembers();
  if(name==="dashboard"&&guildId)loadDashboard();
}

// login
async function login(){
  const pwd=document.getElementById("password").value;
  const errEl=document.getElementById("loginError");errEl.textContent="";
  try{
    const r=await fetch("/api",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"login",password:pwd})});
    const d=await r.json();
    if(d.token){document.cookie="token="+d.token+";path=/;max-age=86400;SameSite=Lax";token=d.token;initPanel()}
    else errEl.textContent=d.error||"wrong password"
  }catch(ex){errEl.textContent="connection error"}
}

// init
async function initPanel(){
  document.getElementById("sidebar").classList.remove("hidden");
  hide(document.getElementById("loginScreen"));
  try{
    const r=await fetch("/api",{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "+token},body:JSON.stringify({action:"guilds"})});
    const d=await r.json();
    if(d.error)return;
    const sel=document.getElementById("guildSel");
    sel.innerHTML="<label style='margin-top:8px;color:#666;font-size:10px;text-transform:uppercase'>server</label>";
    d.guilds.forEach(g=>{
      const b=document.createElement("button");
      b.textContent=g.name;b.style.fontSize="10px";b.style.padding="4px 8px";
      b.onclick=()=>selectGuild(g.id,g.name);
      sel.appendChild(b);
    });
    if(d.guilds.length)selectGuild(d.guilds[0].id,d.guilds[0].name);
  }catch(e){}
}

async function selectGuild(id,name){
  guildId=id;
  document.querySelectorAll("#guildSel button").forEach(b=>b.classList.remove("active"));
  const btns=document.querySelectorAll("#guildSel button");
  for(const b of btns)if(b.textContent===name)b.classList.add("active");
  loadDashboard();loadMsgChannels();loadMembers();
  switchTab("dashboard");
}

// dashboard
async function loadDashboard(){
  if(!guildId)return;
  try{
    const r=await fetch("/api",{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "+token},body:JSON.stringify({action:"guildinfo",guildId})});
    const d=await r.json();
    if(d.error)return;
    const c=document.getElementById("dashContent");
    c.innerHTML="<div class='stat'><span>server</span><p>"+d.name+"</p></div>"+
      "<div class='stat'><span>owner</span><p>"+d.owner+"</p></div>"+
      "<div class='stat'><span>members</span><p>"+d.memberCount+"</p></div>"+
      "<div class='stat'><span>channels</span><p>"+d.channelCount+"</p></div>"+
      "<div class='stat'><span>roles</span><p>"+d.roleCount+"</p></div>"+
      "<div class='stat'><span>created</span><p>"+d.created+"</p></div>"+
      "<div class='stat'><span>boost level</span><p>"+d.boostLevel+" ("+d.boostCount+" boosts)</p></div>";
  }catch(e){}
}

// messages
async function loadMsgChannels(){
  if(!guildId)return;
  try{
    const r=await fetch("/api",{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "+token},body:JSON.stringify({action:"channels",guildId})});
    const d=await r.json();
    if(d.error)return;
    const s=document.getElementById("msgChannel");
    s.innerHTML="<option value=''>select channel</option>"+d.channels.filter(c=>c.type===0).map(c=>"<option value='"+c.id+"'>#"+c.name+"</option>").join("");
  }catch(e){}
}

async function sendMsg(){
  const c=document.getElementById("msgChannel").value,m=document.getElementById("msgInput").value;
  if(!c||!m){document.getElementById("msgStatus").textContent="fill all fields";return}
  try{
    const r=await fetch("/api",{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "+token},body:JSON.stringify({action:"send",channelId:c,content:m})});
    const d=await r.json();
    document.getElementById("msgStatus").textContent=d.success?"sent!":(d.error||"failed");
    if(d.success)document.getElementById("msgInput").value="";
  }catch(e){document.getElementById("msgStatus").textContent="error"}
}

// members
async function loadMembers(){
  if(!guildId)return;
  try{
    const r=await fetch("/api",{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "+token},body:JSON.stringify({action:"members",guildId})});
    const d=await r.json();
    if(d.error)return;
    allMembers=d.members;allRoles=d.roles;
    const c=document.getElementById("memberList");
    if(!d.members.length){c.innerHTML="<p style='color:#666'>no members</p>";return}
    let html="<table><tr><th>name</th><th>id</th><th>joined</th><th>roles</th></tr>";
    d.members.forEach(m=>{
      const name=m.nick||m.user.global_name||m.user.username;
      const joined=new Date(m.joined_at).toLocaleDateString("en-US",{month:"short",day:"numeric"});
      const roleCount=m.roles.length;
      html+="<tr class='member-row' onclick='showMember(""+m.user.id+"")'><td>"+escape(name)+"</td><td style='color:#666'>"+m.user.id.slice(-4)+"</td><td>"+joined+"</td><td>"+roleCount+"</td></tr>";
    });
    html+="</table>";
    c.innerHTML=html;
  }catch(e){}
}

function showMember(id){
  const m=allMembers.find(x=>x.user.id===id);if(!m)return;
  const name=m.nick||m.user.global_name||m.user.username;
  const joined=new Date(m.joined_at).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"});
  const roles=m.roles.map(r=>{const role=allRoles.find(x=>x.id===r);return role?role.name:r}).join(", ")||"none";
  document.getElementById("modalName").textContent=name;
  document.getElementById("modalId").textContent="id: "+m.user.id;
  document.getElementById("modalJoined").textContent="joined: "+joined;
  document.getElementById("modalRoles").textContent="roles: "+roles;
  document.getElementById("userModal").classList.add("open");
}

function closeModal(){document.getElementById("userModal").classList.remove("open")}

function escape(s){const d=document.createElement("div");d.appendChild(document.createTextNode(s));return d.innerHTML}

function logout(){document.cookie="token=;path=/;max-age=0";token=null;location.reload()}

if(token)initPanel();
</script>
</body>
</html>`;
}
async function handler(req, res) {
  try {
    if (req.method === "GET") {
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      return res.status(200).send(html());
    }
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method Not Allowed" });
    }
    const isDiscord = typeof req.headers["x-signature-ed25519"] === "string" && typeof req.headers["x-signature-timestamp"] === "string";
    if (isDiscord) {
      return await handleDiscord(req, res);
    }
    return await handlePanel(req, res);
  } catch (error) {
    consola.error("Handler error", { error });
    return res.status(500).json({ error: "Internal error" });
  }
}
async function handleDiscord(req, res) {
  const signature = req.headers["x-signature-ed25519"];
  const timestamp = req.headers["x-signature-timestamp"];
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
  const message = JSON.parse(rawBody.toString());
  if (message.type === InteractionType2.PING) {
    return res.status(200).json({ type: InteractionResponseType.Pong });
  }
  if (message.type === InteractionType2.APPLICATION_COMMAND) {
    const commandName = message.data.name.toLowerCase();
    const command = commands_default[commandName];
    if (command) {
      try {
        await axios3.post(
          `https://discord.com/api/v10/interactions/${message.id}/${message.token}/callback`,
          {
            type: InteractionResponseType.DeferredChannelMessageWithSource,
            data: { flags: command.data.initialEphemeral ? MessageFlags5.Ephemeral : 0 }
          },
          { headers: { "Content-Type": "application/json" } }
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
        await axios3.patch(
          `https://discord.com/api/v10/webhooks/${message.application_id}/${message.token}/messages/@original`,
          {
            content: commandResult.content ?? "",
            flags: commandResult.flags,
            embeds: commandResult.embeds
          },
          { headers: { "Content-Type": "application/json" } }
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
async function handlePanel(req, res) {
  let body;
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
      const r = await axios3.get("https://discord.com/api/v10/users/@me/guilds", { headers });
      return res.json({ guilds: r.data });
    }
    if (action === "guildinfo") {
      const [guildRes, chanRes, memberRes, rolesRes] = await Promise.all([
        axios3.get(`https://discord.com/api/v10/guilds/${body.guildId}`, { headers }),
        axios3.get(`https://discord.com/api/v10/guilds/${body.guildId}/channels`, { headers }),
        axios3.get(`https://discord.com/api/v10/guilds/${body.guildId}/members?limit=1`, { headers }),
        axios3.get(`https://discord.com/api/v10/guilds/${body.guildId}/roles`, { headers })
      ]);
      const guild = guildRes.data;
      const ownerRes = await axios3.get(`https://discord.com/api/v10/users/${guild.owner_id}`, { headers });
      return res.json({
        name: guild.name,
        owner: ownerRes.data.global_name || ownerRes.data.username,
        memberCount: guild.approximate_member_count || guild.member_count || "?",
        channelCount: chanRes.data.length,
        roleCount: rolesRes.data.length,
        created: new Date(guild.id ? Number(BigInt(guild.id) >> 22n) + 14200704e5 : 0).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
        boostLevel: guild.premium_tier || 0,
        boostCount: guild.premium_subscription_count || 0
      });
    }
    if (action === "channels") {
      const r = await axios3.get(`https://discord.com/api/v10/guilds/${body.guildId}/channels`, { headers });
      return res.json({ channels: r.data });
    }
    if (action === "send") {
      await axios3.post(
        `https://discord.com/api/v10/channels/${body.channelId}/messages`,
        { content: body.content },
        { headers }
      );
      return res.json({ success: true });
    }
    if (action === "members") {
      const [memberRes, rolesRes] = await Promise.all([
        axios3.get(`https://discord.com/api/v10/guilds/${body.guildId}/members?limit=1000`, { headers }),
        axios3.get(`https://discord.com/api/v10/guilds/${body.guildId}/roles`, { headers })
      ]);
      return res.json({ members: memberRes.data, roles: rolesRes.data });
    }
    return res.status(400).json({ error: "Unknown action" });
  } catch (err) {
    return res.status(500).json({
      error: err.response?.data?.message || err.message || "Request failed"
    });
  }
}
export {
  handler as default
};
