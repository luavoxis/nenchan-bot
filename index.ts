import type { VercelRequest, VercelResponse } from "@vercel/node";
import axios from "axios";
import FormData from "form-data";
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
<button class="active" onclick="switchTab('dashboard')"><span class=l>[</span><span class=m>&nbsp;dashboard&nbsp;</span><span class=r>]</span></button>
<button onclick="switchTab('messages')"><span class=l>[</span><span class=m>&nbsp;messages&nbsp;&nbsp;</span><span class=r>]</span></button>
<button onclick="switchTab('members')"><span class=l>[</span><span class=m>&nbsp;members&nbsp;&nbsp;&nbsp;</span><span class=r>]</span></button>
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
<select id="msgChannel" onchange="loadMsgHistory(this.value)"><option value="">loading...</option></select>
<div id="msgHistory" style="max-height:280px;overflow-y:auto;margin-bottom:6px;background:#0a0a0a;border:1px solid #222;padding:8px;font-size:10px;line-height:1.5">
<p style="color:#555;text-align:center;padding:20px 0">select a channel</p>
</div>
<div style="display:flex;gap:4px;margin-bottom:4px">
<input type="file" id="msgFile" style="flex:1;color:#888;font:11px monospace;padding:3px;background:#000;border:1px solid #333" />
<button onclick="g('msgFile').value=''" style="background:#555;padding:3px 8px;font-size:10px">clear</button>
</div>
<div style="display:flex;gap:4px;margin-bottom:4px">
<select id="msgMention" style="flex:1" onchange="insertMention()"><option value="">@mention</option></select>
</div>
<label>message</label>
<textarea id="msgInput" placeholder="message" style="min-height:60px"></textarea>
<div class="flex">
<button onclick="sendMsg()">send</button>
<button onclick="g('msgInput').value='';g('msgFile').value=''" style="background:#555">clear</button>
</div>
<div id="msgStatus" style="font-size:10px;margin-top:4px;min-height:14px"></div>
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
    for(var i=0;i<d.channels.length;i++){
      if(d.channels[i].type===0){
        var o=document.createElement("option");o.value=d.channels[i].id;o.textContent="#"+d.channels[i].name;s.appendChild(o);
      }
    }
    api({action:"members"},function(md){
      if(md.error)return;
      var sel=g("msgMention");
      for(var i=0;i<md.members.length;i++){
        var m=md.members[i],name=m.nick||(m.user.global_name||m.user.username);
        var o=document.createElement("option");o.value="<@"+m.user.id+">";o.textContent="@"+name;sel.appendChild(o);
      }
    });
  });
}

function insertMention(){
  var sel=g("msgMention");
  if(sel.value){g("msgInput").value+=sel.value+" ";sel.value=""}
}

function loadMsgHistory(cid){
  if(!cid){g("msgHistory").innerHTML="<p style='color:#555;text-align:center;padding:20px 0'>select a channel</p>";return}
  api({action:"messages",channelId:cid,limit:30},function(d){
    if(d.error){g("msgHistory").innerHTML="<p style='color:#f44;text-align:center;padding:20px 0'>"+esc(d.error)+"</p>";return}
    var h="";
    for(var i=0;i<d.messages.length;i++){
      var msg=d.messages[i],u=msg.author;
      var name=u.global_name||u.username;
      var time=new Date(msg.timestamp).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"});
      var color=u.bot?"#4af":"#888";
      h+="<div style='margin-bottom:4px;border-bottom:1px solid #111;padding-bottom:4px'>";
      h+="<span style='color:"+color+"'>"+esc(name)+"</span> <span style='color:#444;font-size:9px'>"+time+"</span><br>";
      h+="<span style='color:#ccc'>"+esc(msg.content||"")+"</span>";
      if(msg.attachments&&msg.attachments.length){
        for(var j=0;j<msg.attachments.length;j++){
          var a=msg.attachments[j];
          if(a.content_type&&a.content_type.startsWith("image/")){
            h+="<br><img src='"+a.url+"' style='max-width:200px;max-height:120px;margin-top:3px;border:1px solid #222' loading='lazy'/>";
          }else{h+="<br><a href='"+a.url+"' style='color:#59f;font-size:10px'>"+esc(a.filename)+"</a>"}
        }
      }
      h+="</div>";
    }
    g("msgHistory").innerHTML=h||"<p style='color:#555;text-align:center;padding:20px 0'>no messages</p>";
  });
}

function sendMsg(){
  var c=g("msgChannel").value,m=g("msgInput").value,file=g("msgFile").files[0];
  if(!c){g("msgStatus").textContent="select a channel";g("msgStatus").style.color="#f44";return}
  if(!m&&!file){g("msgStatus").textContent="enter a message or pick a file";g("msgStatus").style.color="#f44";return}
  g("msgStatus").style.color="#aaa";g("msgStatus").textContent="sending...";
  var body={action:"send",channelId:c,content:m};
  if(file){
    var reader=new FileReader();
    reader.onload=function(e){
      body.fileData=e.target.result.split(",")[1];
      body.fileName=file.name;
      body.fileType=file.type;
      doSend(body,c);
    };
    reader.readAsDataURL(file);
  }else{doSend(body,c)}
}

function doSend(body,cid){
  api(body,function(d){
    if(d.success){
      g("msgStatus").style.color="#4f4";g("msgStatus").textContent="sent!";
      g("msgInput").value="";g("msgFile").value="";
      loadMsgHistory(cid);
    }else{
      g("msgStatus").style.color="#f44";g("msgStatus").textContent=d.error||"failed";
    }
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
if(token){initPanel()}else{g("sidebar").style.display="flex";g("panel-dashboard").classList.add("show");g("loginOverlay").style.display="flex"}
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
    logger.error("Handler error", { error });
    return res.status(500).json({ error: "Internal error" });
  }
}

async function handleDiscord(req: VercelRequest, res: VercelResponse, rawBody: string, signature: string, timestamp: string) {
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

  const message: SimplifiedInteraction = JSON.parse(rawBody);

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

async function handlePanel(res: VercelResponse, bodyStr: string) {
  let body: any;
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

  // token check for non-login actions
  // token comes from Authorization header or cookie, sent by client
  // but since this is a serverless function, we'll trust the token in the body too
  const reqToken = body.token || "";
  if (!verifyToken(reqToken)) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const headers = { Authorization: `Bot ${process.env.DISCORD_TOKEN}` };

  const guildId = process.env.GUILD_ID;

  try {
    if (body.action === "guildinfo") {
      const [guildRes, chanRes, rolesRes] = await Promise.all([
        axios.get(`https://discord.com/api/v10/guilds/${guildId}?with_counts=true`, { headers }),
        axios.get(`https://discord.com/api/v10/guilds/${guildId}/channels`, { headers }),
        axios.get(`https://discord.com/api/v10/guilds/${guildId}/roles`, { headers }),
      ]);
      const guild = guildRes.data;
      const ownerRes = await axios.get(`https://discord.com/api/v10/users/${guild.owner_id}`, { headers });
      let bots = 0, humans = 0, totalMembers = guild.approximate_member_count || guild.member_count || "?";
      try {
        const memberRes = await axios.get(`https://discord.com/api/v10/guilds/${guildId}/members?limit=1000`, { headers });
        const members = memberRes.data;
        bots = members.filter((m: any) => m.user?.bot).length;
        humans = members.length - bots;
        totalMembers = guild.approximate_member_count || guild.member_count || members.length;
      } catch {}
      return res.json({
        name: guild.name,
        owner: ownerRes.data.global_name || ownerRes.data.username,
        totalMembers,
        bots,
        humans,
        channelCount: chanRes.data.length,
        roleCount: rolesRes.data.length,
        roles: rolesRes.data.map((r: any) => ({ id: r.id, name: r.name, color: r.color, position: r.position })),
        created: new Date(Number(BigInt(guild.id) >> 22n) + 1420070400000).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
        boostLevel: guild.premium_tier || 0,
        boostCount: guild.premium_subscription_count || 0,
      });
    }

    if (body.action === "channels") {
      const r = await axios.get(`https://discord.com/api/v10/guilds/${guildId}/channels`, { headers });
      return res.json({ channels: r.data });
    }

    if (body.action === "send") {
      const form = new FormData();
      form.append("content", body.content || "");
      if (body.fileData && body.fileName) {
        const buf = Buffer.from(body.fileData, "base64");
        form.append("file", buf, { filename: body.fileName, contentType: body.fileType || "application/octet-stream" });
      }
      await axios.post(
        `https://discord.com/api/v10/channels/${body.channelId}/messages`,
        form,
        { headers: { ...headers, ...form.getHeaders() } },
      );
      return res.json({ success: true });
    }

    if (body.action === "messages") {
      const r = await axios.get(
        `https://discord.com/api/v10/channels/${body.channelId}/messages?limit=${body.limit || 30}`,
        { headers },
      );
      return res.json({ messages: r.data });
    }

    if (body.action === "members") {
      const [memberRes, rolesRes] = await Promise.all([
        axios.get(`https://discord.com/api/v10/guilds/${guildId}/members?limit=1000`, { headers }),
        axios.get(`https://discord.com/api/v10/guilds/${guildId}/roles`, { headers }),
      ]);
      return res.json({ members: memberRes.data, roles: rolesRes.data });
    }

    return res.status(400).json({ error: "Unknown action" });
  } catch (err: any) {
    return res.status(500).json({
      error: err.response?.data?.message || err.message || "Request failed",
    });
  }
}
