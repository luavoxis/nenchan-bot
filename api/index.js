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
.sidebar button{background:none;border:none;color:#888;font:11px monospace;padding:6px 8px;text-align:left;cursor:pointer;min-width:140px}
.sidebar button:hover{color:#fff;background:#111}
.sidebar button.active{color:#fff;background:#222}
.sidebar button .l{color:#555}
.sidebar button .r{color:#555}
#logoutBtn{margin-top:auto;color:#f44!important;border-top:1px solid #222;padding-top:8px!important}
.main{flex:1;padding:16px;max-width:800px}
.panel{display:none}
.panel.show{display:block}
h2{font-size:12px;color:#666;text-transform:uppercase;letter-spacing:1px;margin-bottom:12px;font-weight:400}
label{display:block;color:#666;font-size:10px;text-transform:uppercase;margin-bottom:2px;margin-top:6px}
input,textarea,select{width:100%;padding:4px 6px;border:1px solid #333;border-radius:0;background:#000;color:#ccc;font:12px monospace;margin-bottom:6px;outline:none}
input:focus,textarea:focus,select:focus{border-color:#fff}
button{padding:4px 10px;background:#fff;color:#000;border:none;border-radius:0;font:11px monospace;cursor:pointer}
button:hover{background:#888}
.flex{display:flex;gap:4px;margin-bottom:4px}
.flex button{flex:1}
.error{color:#f44;font-size:11px;margin-bottom:4px}
.success{color:#4f4;font-size:11px;margin-bottom:4px}
textarea{resize:vertical;min-height:50px;font:12px monospace}
select option{background:#000;color:#ccc}
.stat{background:#0a0a0a;border:1px solid #222;padding:10px;margin-bottom:6px}
.stat span{color:#666;font-size:10px;text-transform:uppercase;letter-spacing:.5px}
.stat p{color:#fff;font-size:13px;margin-top:2px}
table{width:100%;border-collapse:collapse;font-size:11px;margin-top:4px}
td,th{padding:4px 6px;text-align:left;border-bottom:1px solid #222;color:#aaa}
th{color:#666;font-size:10px;text-transform:uppercase;font-weight:400}
.member-row{cursor:pointer}
.member-row:hover{background:#111}
.modal{position:fixed;inset:0;background:rgba(0,0,0,.85);display:none;justify-content:center;align-items:center;z-index:100}
.modal.show{display:flex}
.modal-box{background:#111;border:1px solid #333;padding:16px;width:90%;max-width:400px}
.modal-box h3{font-size:12px;color:#fff;margin-bottom:8px}
.modal-box p{font-size:11px;color:#888;margin-bottom:6px}
.stat[onclick]{cursor:pointer}
.stat[onclick]:hover{background:#0e0e0e}
.role-toggle{cursor:pointer;user-select:none}
.role-toggle:hover{color:#fff}
.role-list{display:none;max-height:200px;overflow-y:auto;margin-top:4px;padding:4px 0;border-top:1px solid #222}
.role-list.show{display:block}
.role-item{display:flex;align-items:center;gap:6px;padding:3px 4px;font-size:10px;color:#aaa}
.role-item:hover{background:#111}
.role-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0}
</style>
</head>
<body>
<div id="sidebar" class="sidebar" style="display:none">
<h1>bot panel</h1>
<button class="active" onclick="switchTab('dashboard')"><span class=l>[</span> dashboard <span class=r>]</span></button>
<button onclick="switchTab('messages')"><span class=l>[</span> messages <span class=r>]</span></button>
<button onclick="switchTab('members')"><span class=l>[</span> members <span class=r>]</span></button>
<button id="logoutBtn" onclick="logout()">logout</button>
</div>
<div class="main">
<div id="loginOverlay" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,.85);z-index:99;justify-content:center;align-items:center">
<div style="background:#0a0a0a;border:1px solid #222;padding:24px;width:100%;max-width:280px;text-align:center">
<h2 style="margin-bottom:16px;color:#fff;font-size:13px;letter-spacing:2px;font-weight:400">bot panel</h2>
<div id="loginError" style="color:#f44;font-size:11px;margin-bottom:6px;min-height:16px"></div>
<input type="password" id="password" placeholder="password" style="text-align:center;margin-bottom:8px;width:100%;padding:4px 6px;border:1px solid #333;border-radius:0;background:#000;color:#ccc;font:12px monospace;outline:none" onkeydown="if(event.key==='Enter')login()"/>
<button onclick="login()" style="width:100%;padding:4px 10px;background:#fff;color:#000;border:none;border-radius:0;font:11px monospace;cursor:pointer">login</button>
</div>
</div>
<div id="panel-dashboard" class="panel">
<h2>dashboard</h2>
<div id="dashContent"><p style="color:#666">loading...</p></div>
</div>
<div id="panel-messages" class="panel">
<h2>messages</h2>
<label>channel</label>
<select id="msgChannel"><option value="">loading...</option></select>
<label>message</label>
<textarea id="msgInput" placeholder="message"></textarea>
<div class="flex">
<button onclick="sendMsg()">send</button>
<button onclick="g('msgInput').value=''" style="background:#555">clear</button>
</div>
<div id="msgStatus" style="color:#4f4;font-size:11px;margin-top:4px"></div>
</div>
<div id="panel-members" class="panel">
<h2>members</h2>
<div id="memberList"><p style="color:#666">loading...</p></div>
</div>
</div>
<div id="userModal" class="modal"><div class="modal-box"><h3 id="modalName"></h3><p id="modalId"></p><p id="modalJoined"></p><p id="modalRoles"></p><div class="flex" style="margin-top:8px"><button onclick="c()">close</button></div></div></div>
<script>
function g(i){return document.getElementById(i)}
function getCookie(n){const m=document.cookie.match(new RegExp("(^| )"+n+"=([^;]+)"));return m?decodeURIComponent(m[2]):null}
var token=getCookie("token"),allMembers=[],allRoles=[];

function login(){
  var pwd=g("password").value,err=g("loginError");
  err.textContent="";
  var x=new XMLHttpRequest();
  x.open("POST","/api",true);
  x.setRequestHeader("Content-Type","application/json");
  x.onload=function(){
    try{
      var d=JSON.parse(x.responseText);
      if(d.token){
        document.cookie="token="+encodeURIComponent(d.token)+";path=/;max-age=86400;SameSite=Lax";
        token=d.token;
        initPanel();
      }else{err.textContent=d.error||"wrong password"}
    }catch(e){err.textContent="invalid response"}
  };
  x.onerror=function(){err.textContent="connection error"};
  x.send(JSON.stringify({action:"login",password:pwd}));
}

function initPanel(){
  g("sidebar").style.display="flex";
  g("loginOverlay").style.display="none";
  g("panel-dashboard").classList.add("show");
  loadDashboard();loadMembers();loadMsgChannels();
}

function switchTab(name){
  document.querySelectorAll(".panel").forEach(function(e){e.classList.remove("show")});
  var el=g("panel-"+name);
  if(el)el.classList.add("show");
  document.querySelectorAll(".sidebar button").forEach(function(b){b.classList.remove("active")});
  var btns=document.querySelectorAll(".sidebar button");
  for(var i=0;i<btns.length;i++){if(btns[i].textContent.includes(name)){btns[i].classList.add("active");break}}
  if(name==="messages")loadMsgChannels();
  if(name==="members")loadMembers();
  if(name==="dashboard")loadDashboard();
}

function api(body,cb){
  var x=new XMLHttpRequest();
  x.open("POST","/api",true);
  x.setRequestHeader("Content-Type","application/json");
  x.onload=function(){try{cb(JSON.parse(x.responseText))}catch(e){cb({error:"parse error"})}};
  x.onerror=function(){cb({error:"connection error"})};
  body.token=token;
  x.send(JSON.stringify(body));
}

function loadDashboard(){
  api({action:"guildinfo"},function(d){
    if(d.error)return;
    var roleItems=d.roles.sort(function(a,b){return b.position-a.position}).map(function(r){
      var c=r.color?"#"+r.color.toString(16).padStart(6,"0"):"#666";
      return "<div class='role-item'><span class='role-dot' style='background:"+c+"'></span>"+esc(r.name)+"</div>";
    }).join("");
    g("dashContent").innerHTML="<div class='stat'><span>server</span><p>"+esc(d.name)+"</p></div>"+
      "<div class='stat'><span>owner</span><p>"+esc(d.owner)+"</p></div>"+
      "<div class='stat'><span>members</span><p>"+d.totalMembers+" total &middot; "+d.humans+" humans &middot; "+d.bots+" bots</p></div>"+
      "<div class='stat'><span>channels</span><p>"+d.channelCount+"</p></div>"+
      "<div class='stat' onclick='toggleRoles()'><span>roles</span><p class='role-toggle'>"+d.roleCount+" <span id='roleArrow' style='color:#666;font-size:10px'>&#9660;</span></p>"+
      "<div id='roleList' class='role-list'>"+roleItems+"</div></div>"+
      "<div class='stat'><span>created</span><p>"+d.created+"</p></div>"+
      "<div class='stat'><span>boost level</span><p>"+d.boostLevel+" ("+d.boostCount+" boosts)</p></div>";
  });
}

function toggleRoles(){g("roleList").classList.toggle("show");g("roleArrow").innerHTML=g("roleList").classList.contains("show")?"&#9650;":"&#9660;"}

function loadMsgChannels(){
  api({action:"channels"},function(d){
    if(d.error)return;
    var s=g("msgChannel");
    s.innerHTML="<option value=''>select channel</option>";
    for(var i=0;i<d.channels.length;i++){if(d.channels[i].type===0){var o=document.createElement("option");o.value=d.channels[i].id;o.textContent="#"+d.channels[i].name;s.appendChild(o)}}
  });
}

function sendMsg(){
  var c=g("msgChannel").value,m=g("msgInput").value;
  if(!c||!m){g("msgStatus").textContent="fill all fields";return}
  api({action:"send",channelId:c,content:m},function(d){
    g("msgStatus").textContent=d.success?"sent!":(d.error||"failed");
    if(d.success)g("msgInput").value="";
  });
}

function loadMembers(){
  api({action:"members"},function(d){
    if(d.error)return;
    allMembers=d.members;allRoles=d.roles;
    var tbl=document.createElement("table");
    tbl.innerHTML="<tr><th>name</th><th>id</th><th>joined</th><th>roles</th></tr>";
    for(var i=0;i<d.members.length;i++){
      var m=d.members[i],name=m.nick||(m.user.global_name||m.user.username);
      var joined=new Date(m.joined_at).toLocaleDateString("en-US",{month:"short",day:"numeric"});
      var tr=document.createElement("tr");tr.className="member-row";
      tr.onclick=function(id){return function(){showMember(id)}}(m.user.id);
      tr.innerHTML="<td>"+esc(name)+"</td><td style='color:#666'>"+m.user.id.slice(-4)+"</td><td>"+joined+"</td><td>"+m.roles.length+"</td>";
      tbl.appendChild(tr);
    }
    g("memberList").innerHTML="";
    g("memberList").appendChild(tbl);
  });
}

function showMember(id){
  var m=allMembers.find(function(x){return x.user.id===id});if(!m)return;
  var name=m.nick||(m.user.global_name||m.user.username);
  g("modalName").textContent=name;
  g("modalId").textContent="id: "+m.user.id;
  g("modalJoined").textContent="joined: "+new Date(m.joined_at).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"});
  var roles=m.roles.map(function(r){var role=allRoles.find(function(x){return x.id===r});return role?role.name:r}).join(", ")||"none";
  g("modalRoles").textContent="roles: "+roles;
  g("userModal").classList.add("show");
}
function c(){g("userModal").classList.remove("show")}
function esc(s){var d=document.createElement("div");d.appendChild(document.createTextNode(s));return d.innerHTML}
function logout(){document.cookie="token=;path=/;max-age=0";location.reload()}
if(token){initPanel()}else{g("sidebar").style.display="flex";g("panel-dashboard").classList.add("show");g("loginOverlay").style.display="flex";loadDashboard()}
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
    const rawBody = await getRawBody(req);
    if (!rawBody) return res.status(400).json({ error: "Missing body" });
    const bodyStr = rawBody.toString();
    const signature = req.headers["x-signature-ed25519"];
    const timestamp = req.headers["x-signature-timestamp"];
    if (typeof signature === "string" && typeof timestamp === "string") {
      return await handleDiscord(req, res, bodyStr, signature, timestamp);
    }
    return await handlePanel(res, bodyStr);
  } catch (error) {
    consola.error("Handler error", { error });
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
async function handlePanel(res, bodyStr) {
  let body;
  try {
    body = JSON.parse(bodyStr);
  } catch {
    return res.status(400).json({ error: "Invalid JSON" });
  }
  if (body.action === "login") {
    if (body.password === PANEL_PASSWORD) {
      return res.json({ token: authToken() });
    }
    return res.status(401).json({ error: "Wrong password" });
  }
  const reqToken = body.token || "";
  if (!verifyToken(reqToken)) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const headers = { Authorization: `Bot ${process.env.DISCORD_TOKEN}` };
  const guildId = process.env.GUILD_ID;
  try {
    if (body.action === "guildinfo") {
      const [guildRes, chanRes, rolesRes, memberRes] = await Promise.all([
        axios3.get(`https://discord.com/api/v10/guilds/${guildId}?with_counts=true`, { headers }),
        axios3.get(`https://discord.com/api/v10/guilds/${guildId}/channels`, { headers }),
        axios3.get(`https://discord.com/api/v10/guilds/${guildId}/roles`, { headers }),
        axios3.get(`https://discord.com/api/v10/guilds/${guildId}/members?limit=1000`, { headers })
      ]);
      const guild = guildRes.data;
      const ownerRes = await axios3.get(`https://discord.com/api/v10/users/${guild.owner_id}`, { headers });
      const members = memberRes.data;
      const bots = members.filter((m) => m.user?.bot).length;
      const humans = members.length - bots;
      return res.json({
        name: guild.name,
        owner: ownerRes.data.global_name || ownerRes.data.username,
        totalMembers: guild.approximate_member_count || guild.member_count || members.length,
        bots,
        humans,
        channelCount: chanRes.data.length,
        roleCount: rolesRes.data.length,
        roles: rolesRes.data.map((r) => ({ id: r.id, name: r.name, color: r.color, position: r.position })),
        created: new Date(Number(BigInt(guild.id) >> 22n) + 14200704e5).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
        boostLevel: guild.premium_tier || 0,
        boostCount: guild.premium_subscription_count || 0
      });
    }
    if (body.action === "channels") {
      const r = await axios3.get(`https://discord.com/api/v10/guilds/${guildId}/channels`, { headers });
      return res.json({ channels: r.data });
    }
    if (body.action === "send") {
      await axios3.post(
        `https://discord.com/api/v10/channels/${body.channelId}/messages`,
        { content: body.content },
        { headers }
      );
      return res.json({ success: true });
    }
    if (body.action === "members") {
      const [memberRes, rolesRes] = await Promise.all([
        axios3.get(`https://discord.com/api/v10/guilds/${guildId}/members?limit=1000`, { headers }),
        axios3.get(`https://discord.com/api/v10/guilds/${guildId}/roles`, { headers })
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
