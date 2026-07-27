import type { VercelRequest, VercelResponse } from "@vercel/node";
import { InteractionResponseType, MessageFlags } from "discord-api-types/v10";
import { InteractionType, verifyKey } from "discord-interactions";
import crypto from "crypto";
import commands from "./.discraft/commands/index";
import {
  type Command,
  type CommandExecuteUnpromised,
  type SimplifiedInteraction,
} from "./utils/types";

const DISCORD_OWNER_ID = process.env.DISCORD_OWNER_ID || "";
const DISCORD_APP_ID = process.env.DISCORD_APP_ID || "";
const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET || "";
const HMAC_SECRET = process.env.DISCORD_CLIENT_SECRET || process.env.DISCORD_TOKEN || "";
const OAUTH_REDIRECT = "https://nenchan.vercel.app/api";

async function discordFetch(url: string, opts: any = {}): Promise<any> {
  const u = new URL(url);
  const mod = u.protocol === "https:" ? await import("https") : await import("http");
  return new Promise((resolve, reject) => {
    const req = mod.request(u, {
      method: opts.method || "GET",
      headers: opts.body ? { "Content-Type": "application/json", ...opts.headers } : { ...opts.headers },
    }, (res: any) => {
      let body = "";
      res.on("data", (chunk: any) => body += chunk);
      res.on("end", () => {
        if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
          try { resolve(JSON.parse(body)); } catch { resolve(body); }
        } else {
          let msg = `HTTP ${res.statusCode}`;
          try { const d = JSON.parse(body); msg = d.message || msg; } catch {}
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

function signToken(userId: string): string {
  const sig = crypto.createHmac("sha256", HMAC_SECRET).update(userId).digest("hex");
  return Buffer.from(userId).toString("base64") + "." + sig;
}

function verifyToken(token: string): boolean {
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

function getTokenFromRequest(req: VercelRequest): string | null {
  const cookie = req.headers.cookie;
  if (cookie) {
    const match = cookie.match(/token=([^;]+)/);
    if (match) return match[1];
  }
  const auth = req.headers.authorization;
  if (auth?.startsWith("Bearer ")) return auth.slice(7);
  return null;
}

const SNOWFLAKE_RE = /^\d{17,20}$/;
function isValidSnowflake(id: string): boolean {
  return typeof id === "string" && SNOWFLAKE_RE.test(id);
}

function htmlEscape(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

function html(): string {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>nenchan v1.0</title>
<style>
@font-face{font-family:'Space Grotesk';font-style:normal;font-weight:300 700;src:url('/fonts/space-grotesk-latin.woff2') format('woff2')}
*{box-sizing:border-box;margin:0;padding:0}
body{font:15px/1.4 'Space Grotesk',monospace;background:#000;color:#ccc;min-height:100vh;display:flex}
.sidebar{width:160px;background:#0a0a0a;border-right:1px solid #222;padding:12px;display:flex;flex-direction:column;gap:1px;min-height:100vh}
.sidebar h1{font-size:12px;color:#666;text-transform:uppercase;letter-spacing:1px;margin-bottom:12px;padding:0;text-align:center}
.sidebar button{background:none;border:none;color:#666;font:14px 'Space Grotesk',monospace;padding:7px 10px;text-align:left;cursor:pointer;border-radius:4px;transition:all .15s;display:flex;align-items:center;gap:8px}
.sidebar button:hover{color:#ccc;background:#111}
.sidebar button.active{color:#fff;background:#181818;border-left:2px solid #fff;padding-left:8px}
.sidebar button img{width:14px;height:14px;opacity:.4;filter:grayscale(1)}
.sidebar button:hover img{opacity:.7}
.sidebar button.active img{opacity:1;filter:none}
#logoutBtn{margin-top:auto;color:#f44!important;border-top:1px solid #222;padding-top:8px!important;padding-left:10px!important;border-radius:4px}
#logoutBtn:hover{background:#1a0000!important}
#logoutBtn img{opacity:.6;filter:none}
.bocchi-wrap{text-align:center;padding:12px 0 8px}
.bocchi-wrap img{width:90px;height:auto;opacity:.85}
.main{flex:1;padding:16px;max-width:800px}
.panel{display:none}
.panel.show{display:block}
h2{font-size:13px;color:#666;text-transform:uppercase;letter-spacing:1px;margin-bottom:12px;font-weight:400}
label{display:block;color:#666;font-size:11px;text-transform:uppercase;margin-bottom:2px;margin-top:6px;font-weight:600}
input,textarea,select{width:100%;padding:4px 6px;border:1px solid #333;border-radius:0;background:#000;color:#ccc;font:14px 'Space Grotesk',monospace;margin-bottom:6px;outline:none}
input:focus,textarea:focus,select:focus{border-color:#fff}
button{padding:4px 10px;background:#fff;color:#000;border:none;border-radius:0;font:15px 'Space Grotesk',monospace;cursor:pointer}
button:hover{background:#888}
.flex{display:flex;gap:4px;margin-bottom:4px}
.flex button{flex:1}
.error{color:#f44;font-size:12px;margin-bottom:4px}
.success{color:#4f4;font-size:12px;margin-bottom:4px}
textarea{resize:vertical;min-height:50px;font:14px 'Space Grotesk',monospace}
select option{background:#000;color:#ccc}
.stat{background:#0a0a0a;border:1px solid #1a1a1a;padding:10px;margin-bottom:4px;border-radius:4px;transition:border-color .15s}
.stat:hover{border-color:#333}
.stat span{color:#666;font-size:11px;text-transform:uppercase;letter-spacing:.5px;font-weight:600}
.stat p{color:#fff;font-size:14px;margin-top:2px}
.dash-banner{height:120px;background:#0a0a0a;border:1px solid #1a1a1a;border-radius:8px;margin-bottom:8px;overflow:hidden;display:flex;align-items:center;justify-content:center;color:#333;font-size:12px;text-transform:uppercase;letter-spacing:1px}
.dash-header{display:flex;align-items:center;gap:14px;padding:16px;background:#0a0a0a;border:1px solid #1a1a1a;margin-bottom:8px;border-radius:8px;transition:border-color .15s}
.dash-header:hover{border-color:#333}
.dash-icon{width:64px;height:64px;border-radius:18px;flex-shrink:0;background:#111;border:1px solid #222;overflow:hidden}
.dash-icon img{width:100%;height:100%;object-fit:cover}
.dash-info{flex:1;min-width:0}
.dash-name{color:#fff;font-size:17px;font-weight:600;margin:0}
.dash-id{color:#555;font-size:11px;margin-top:2px;font-weight:600}
.dash-grid{display:grid;grid-template-columns:1fr 1fr;gap:4px;margin-bottom:6px}
@media(max-width:600px){.dash-grid{grid-template-columns:1fr}}
.dash-card{background:#0a0a0a;border:1px solid #1a1a1a;padding:10px;display:flex;align-items:center;gap:10px;border-radius:8px;transition:border-color .15s}
.dash-card:hover{border-color:#333}
.dash-card-icon{width:32px;height:32px;background:#fff;display:flex;align-items:center;justify-content:center;flex-shrink:0;border-radius:8px}
.dash-card-icon img{width:16px;height:16px}
.dash-card-label{color:#666;font-size:10px;text-transform:uppercase;letter-spacing:.5px;font-weight:600}
.dash-card-val{color:#fff;font-size:15px;margin-top:1px}
.dash-card-sub{color:#555;font-size:10px;margin-top:1px;font-weight:600}
.dash-roles-wrap{background:#0a0a0a;border:1px solid #1a1a1a;border-radius:8px;overflow:hidden;margin-bottom:8px}
.dash-roles-header{display:flex;justify-content:space-between;align-items:center;padding:10px 12px;cursor:pointer}
.dash-roles-header span{color:#666;font-size:11px;text-transform:uppercase;letter-spacing:.5px;font-weight:600}
.dash-roles-header .role-arrow{color:#555;font-size:10px;transition:transform .2s}
.dash-roles-list{display:none;border-top:1px solid #1a1a1a;padding:6px 8px}
.dash-roles-list.show{display:block}
.dash-roles-list::-webkit-scrollbar{width:4px}
.dash-roles-list::-webkit-scrollbar-thumb{background:#333;border-radius:2px}
table{width:100%;border-collapse:collapse;font-size:12px;margin-top:4px}
td,th{padding:4px 6px;text-align:left;border-bottom:1px solid #222;color:#aaa}
th{color:#666;font-size:11px;text-transform:uppercase;font-weight:600}
.member-row{cursor:pointer}
.member-row:hover{background:#111}
.modal{position:fixed;inset:0;background:rgba(0,0,0,.85);display:none;justify-content:center;align-items:center;z-index:100}
.modal.show{display:flex}
.modal-box{background:#111;border:1px solid #333;padding:16px;width:90%;max-width:400px}
.modal-box h3{font-size:13px;color:#fff;margin-bottom:8px}
.modal-box p{font-size:12px;color:#888;margin-bottom:6px}
.stat[onclick]{cursor:pointer}
.stat[onclick]:hover{background:#0e0e0e}
.role-toggle{cursor:pointer;user-select:none}
.role-toggle:hover{color:#fff}
.role-list{display:none;max-height:200px;overflow-y:auto;margin-top:4px;padding:4px 0;border-top:1px solid #222}
.role-list.show{display:block}
.role-item{display:flex;align-items:center;gap:6px;padding:4px 6px;font-size:11px;color:#aaa;border-radius:4px}
.role-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0;border:1px solid rgba(255,255,255,.05)}
#msgHistory{scrollbar-width:none;-ms-overflow-style:none}
#msgHistory::-webkit-scrollbar{display:none}
.msg-row{display:flex;gap:8px;padding:6px 4px;border-bottom:1px solid #111;position:relative}
.msg-row:hover{background:#0a0a0a}
.msg-row:last-child{border-bottom:none}
.msg-avatar{width:28px;height:28px;border-radius:50%;flex-shrink:0;margin-top:1px}
.msg-body{flex:1;min-width:0}
.msg-author{font-size:12px;font-weight:600;color:#4af}
.msg-author .msg-time{font-weight:400;color:#444;font-size:10px;margin-left:6px}
.msg-content{color:#ccc;font-size:12px;line-height:1.5;margin-top:1px;word-wrap:break-word}
.msg-ref{margin:3px 0;padding:2px 8px;border-left:2px solid #444;color:#666;font-size:10px;font-weight:600}
.msg-embed{margin:4px 0;padding:6px 8px;border-left:3px solid #444;background:#0d0d0d;border-radius:2px}
.msg-embed-title{color:#59f;font-weight:bold;font-size:12px}
.msg-embed-desc{color:#bbb;font-size:11px;margin-top:2px}
.msg-embed-author{color:#888;font-size:10px;font-weight:600}
.msg-embed-field-name{color:#888;font-size:10px;margin-top:3px;font-weight:600}
.msg-embed-field-val{color:#bbb;font-size:10px}
.msg-reactions{display:flex;gap:3px;flex-wrap:wrap;margin-top:3px}
.msg-reaction{display:inline-flex;align-items:center;gap:3px;padding:1px 5px;background:#111;border-radius:3px;font-size:12px;cursor:default}
.msg-reaction-count{font-size:10px;color:#888}
.msg-del{flex-shrink:0;color:#555;cursor:pointer;font-size:11px;padding-top:3px;opacity:0}
.msg-row:hover .msg-del{opacity:1}
.msg-del:hover{color:#f44}
.msg-img{max-width:200px;max-height:120px;margin-top:4px;border:1px solid #222;border-radius:2px}
.msg-sticker{max-width:80px;max-height:80px}
.msg-video{max-width:200px;max-height:120px;margin-top:4px}
.msg-audio{width:200px;margin-top:4px}
.msg-file-link{color:#59f;font-size:11px}
.msg-edited{color:#555;font-size:9px;margin-left:4px}
.drop-zone{border:1px dashed #333;padding:12px;text-align:center;color:#555;font-size:11px;cursor:pointer;transition:all .15s;margin-bottom:6px}
.drop-zone:hover,.drop-zone.dragover{border-color:#555;color:#888;background:#0a0a0a}
.drop-zone.has-file{border-color:#59f;color:#59f}
.msg-input-row{display:flex;gap:4px;align-items:stretch}
.msg-input-row textarea{flex:1;margin:0;min-height:36px;resize:none}
.msg-input-row button{padding:4px 12px;font-size:12px;white-space:nowrap}
.msg-bar{display:flex;gap:4px;margin-bottom:4px}
.msg-bar select{margin:0;flex:1}
.menu-toggle{display:none;position:fixed;top:8px;left:8px;z-index:50;background:#0a0a0a;border:1px solid #222;color:#888;width:32px;height:32px;font:15px 'Space Grotesk',monospace;cursor:pointer}
.menu-toggle:hover{color:#fff;border-color:#444}
.sidebar-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:9}
@media(max-width:600px){
  .sidebar{position:fixed;top:0;left:0;z-index:10;height:100vh;transform:translateX(-100%);transition:transform .2s ease;padding-top:48px}
  .sidebar.open{transform:translateX(0)}
  .sidebar-overlay.show{display:block}
  .menu-toggle{display:block}
  .main{padding:16px 12px 16px 48px}
}
.member-grid{display:flex;flex-direction:column;gap:4px;max-height:calc(100vh - 180px);overflow-y:auto;scrollbar-width:none;-ms-overflow-style:none}
.member-grid::-webkit-scrollbar{display:none}
.member-card{display:flex;align-items:center;gap:10px;padding:8px 10px;background:#0a0a0a;border:1px solid #1a1a1a;cursor:pointer;transition:border-color .15s}
.member-card:hover{border-color:#444}
.member-avatar{width:32px;height:32px;border-radius:50%;flex-shrink:0}
.member-info{flex:1;min-width:0}
.member-name{color:#ddd;font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.member-name span{color:#555;font-size:11px;font-weight:400}
.member-username{color:#555;font-size:11px}
.member-badges{display:flex;gap:3px;margin-top:2px}
.member-badge{font-size:9px;padding:1px 4px;border-radius:2px;font-weight:600;text-transform:uppercase;letter-spacing:.3px}
.badge-boost{background:#f47fff;color:#fff}
.member-roles{display:flex;gap:3px;flex-wrap:wrap;margin-top:3px}
.role-badge{font-size:10px;padding:1px 5px;border-radius:2px;background:#1a1a1a;color:#888;border:1px solid #222;white-space:nowrap;font-weight:600}
.role-group-header{font-size:11px;color:#555;text-transform:uppercase;letter-spacing:.5px;padding:12px 4px 4px;border-bottom:1px solid #1a1a1a;margin-top:4px;font-weight:600}
.role-group-header:first-child{margin-top:0}
.role-group-count{color:#333;font-weight:400}
.member-joined{color:#444;font-size:10px;flex-shrink:0;font-weight:600}
.member-search{width:100%;padding:6px 8px;border:1px solid #222;background:#0a0a0a;color:#ccc;font:14px 'Space Grotesk',monospace;margin-bottom:8px;outline:none}
.member-search:focus{border-color:#555}
.member-stats{display:flex;gap:6px;margin-bottom:8px}
.member-stat{flex:1;text-align:center;padding:6px;background:#0a0a0a;border:1px solid #1a1a1a}
.member-stat span{display:block;font-size:10px;color:#555;text-transform:uppercase;letter-spacing:.5px;font-weight:600}
.member-stat p{font-size:15px;color:#fff;margin-top:2px}
.modal-box{background:#111;border:1px solid #333;padding:0;width:90%;max-width:360px;overflow:hidden}
.modal-banner{height:80px;background-size:cover;background-position:center}
.modal-banner-color{height:8px}
.modal-header{display:flex;align-items:center;gap:12px;padding:16px;border-bottom:1px solid #222;background:#0d0d0d}
.modal-header img{width:48px;height:48px;border-radius:50%}
.modal-header-info h3{font-size:14px;color:#fff;margin:0}
.modal-header-info p{font-size:11px;color:#555;margin:2px 0 0}
.modal-body{padding:12px 16px}
.modal-section{margin-bottom:10px}
.modal-section-label{font-size:10px;color:#555;text-transform:uppercase;letter-spacing:.5px;margin-bottom:4px;font-weight:600}
.modal-roles{display:flex;flex-wrap:wrap;gap:4px}
.modal-role{display:flex;align-items:center;gap:4px;font-size:11px;color:#aaa;padding:3px 6px;background:#0d0d0d;border:1px solid #222}
.modal-role-dot{width:6px;height:6px;border-radius:50%;flex-shrink:0}
.file-picker{position:relative;display:flex;align-items:center;gap:4px}
.file-picker input[type=file]{position:absolute;inset:0;opacity:0;cursor:pointer;width:100%}
.file-label{flex:1;padding:5px 8px;background:#0a0a0a;border:1px solid #222;color:#555;font:15px 'Space Grotesk',monospace;cursor:pointer;display:flex;align-items:center;gap:6px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}
.file-label:hover{border-color:#444;color:#888}
.file-label.has-file{color:#ccc;border-color:#333}
.modal-footer{padding:10px 16px;border-top:1px solid #222;text-align:right}
.modal-footer button{background:#222;color:#aaa;border:1px solid #333;padding:4px 16px;font:15px 'Space Grotesk',monospace;cursor:pointer}
.modal-footer button:hover{background:#333;color:#fff}
.modal-actions{display:flex;gap:4px;padding:8px 16px;border-top:1px solid #222;background:#0d0d0d}
.modal-actions button{flex:1;padding:5px 8px;font-size:11px;border:1px solid #333;background:#111;color:#aaa;cursor:pointer;font-family:'Space Grotesk',monospace}
.modal-actions button:hover{background:#1a1a1a;color:#fff}
.btn-ban{border-color:#f444 !important;color:#f44 !important}
.btn-ban:hover{background:#f44 !important;color:#fff !important}
.btn-kick{border-color:#fa0 !important;color:#fa0 !important}
.btn-kick:hover{background:#fa0 !important;color:#000 !important}
.btn-timeout{border-color:#ff0 !important;color:#ff0 !important}
.btn-timeout:hover{background:#ff0 !important;color:#000 !important}
.confirm-overlay{position:fixed;inset:0;background:rgba(0,0,0,.85);display:none;justify-content:center;align-items:center;z-index:200}
.confirm-overlay.show{display:flex}
.confirm-box{background:#111;border:1px solid #333;padding:0;width:90%;max-width:320px;overflow:hidden}
.confirm-title{padding:12px 16px;font-size:13px;color:#fff;border-bottom:1px solid #222}
.confirm-body{padding:12px 16px}
.confirm-body label{display:block;color:#666;font-size:10px;text-transform:uppercase;margin-bottom:2px;margin-top:8px;font-weight:600}
.confirm-body label:first-child{margin-top:0}
.confirm-body input,.confirm-body select,.confirm-body textarea{width:100%;padding:5px 8px;border:1px solid #333;background:#000;color:#ccc;font:14px 'Space Grotesk',monospace;outline:none;margin:0}
.confirm-body input:focus,.confirm-body textarea:focus{border-color:#fff}
.confirm-footer{display:flex;gap:4px;padding:8px 16px;border-top:1px solid #222}
.confirm-footer button{flex:1;padding:5px 10px;font-size:12px;border:1px solid #333;background:#111;color:#aaa;cursor:pointer;font-family:'Space Grotesk',monospace}
.confirm-footer button:hover{background:#222;color:#fff}
.confirm-footer .confirm-danger{border-color:#f44;color:#f44}
.confirm-footer .confirm-danger:hover{background:#f44;color:#fff}
.dm-channel{display:flex;align-items:center;gap:10px;padding:8px 10px;background:#0a0a0a;border:1px solid #1a1a1a;cursor:pointer;transition:border-color .15s;margin-bottom:4px}
.dm-channel:hover{border-color:#444}
.dm-channel img{width:32px;height:32px;border-radius:50%;flex-shrink:0}
.dm-channel-name{color:#ddd;font-size:12px}
.dm-channel-preview{color:#555;font-size:11px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.dm-channel-time{color:#555;font-size:10px;flex-shrink:0;margin-left:auto;font-weight:600}
.mention-list{display:none;position:absolute;top:100%;left:0;right:0;background:#0a0a0a;border:1px solid #222;border-top:none;max-height:180px;overflow-y:auto;z-index:10;scrollbar-width:none}
.mention-list::-webkit-scrollbar{display:none}
.mention-list.show{display:block}
.mention-item{display:flex;align-items:center;gap:8px;padding:5px 8px;cursor:pointer;font-size:12px;color:#ccc}
.mention-item:hover{background:#1a1a1a}
.mention-item img{width:20px;height:20px;border-radius:50%;flex-shrink:0}
.mention-item .m-name{flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.mention-item .m-bot{color:#5865F2;font-size:9px;text-transform:uppercase;font-weight:600;margin-left:4px}
.ban-card{display:flex;align-items:center;gap:10px;padding:8px 10px;background:#0a0a0a;border:1px solid #1a1a1a;cursor:pointer;transition:border-color .15s}
.ban-card:hover{border-color:#444}
.ban-card img{width:32px;height:32px;border-radius:50%;flex-shrink:0}
.ban-info{flex:1;min-width:0}
.ban-name{color:#ddd;font-size:12px;font-weight:600}
.ban-name span{color:#555;font-size:11px;font-weight:400}
.ban-username{color:#555;font-size:11px}
.ban-reason{color:#f44;font-size:11px;margin-top:2px;font-weight:600}
.ban-reason::before{content:"reason: "}
.ban-unban-btn{padding:3px 10px;font-size:11px;border:1px solid #f44;background:#111;color:#f44;cursor:pointer;font-family:'Space Grotesk',monospace;flex-shrink:0;font-weight:600}
.ban-unban-btn:hover{background:#f44;color:#fff}
.timeout-card{display:flex;align-items:center;gap:10px;padding:8px 10px;background:#0a0a0a;border:1px solid #2a2200;cursor:pointer;transition:border-color .15s}
.timeout-card:hover{border-color:#665500}
.timeout-card img{width:32px;height:32px;border-radius:50%;flex-shrink:0}
.timeout-info{flex:1;min-width:0}
.timeout-name{color:#ddd;font-size:12px;font-weight:600}
.timeout-name span{color:#555;font-size:11px;font-weight:400}
.timeout-username{color:#555;font-size:11px}
.timeout-detail{font-size:11px;margin-top:2px}
.timeout-expiry{color:#ff0;font-weight:600}
.timeout-remaining{color:#aa0;font-size:10px}
.timeout-reason{color:#fa0;font-weight:600}
.timeout-reason::before{content:"reason: "}
.timeout-remove{padding:3px 10px;font-size:11px;border:1px solid #ff0;background:#111;color:#ff0;cursor:pointer;font-family:'Space Grotesk',monospace;flex-shrink:0;font-weight:600}
.timeout-remove:hover{background:#ff0;color:#000}
.mod-section-title{font-size:11px;color:#555;text-transform:uppercase;letter-spacing:.5px;padding:10px 4px 6px;border-bottom:1px solid #1a1a1a;margin-top:4px;font-weight:600;display:flex;align-items:center;gap:6px}
.mod-section-title .count{color:#333;font-weight:400}
.mod-section-title .dot{width:6px;height:6px;border-radius:50%;flex-shrink:0}
.mod-section{margin-bottom:4px}
</style>
</head>
<body>
<button class="menu-toggle" id="menuToggle" onclick="toggleMenu()">&#9776;</button>
<div class="sidebar-overlay" id="menuOverlay" onclick="toggleMenu()"></div>
<div id="sidebar" class="sidebar" style="display:none">
<h1>nenchan v1.0</h1>
<button class="active" data-tab="dashboard" onclick="switchTab('dashboard')"><img src="/icons/dashboard.png" alt="">dashboard</button>
<button data-tab="members" onclick="switchTab('members')"><img src="/icons/members.png" alt="">members</button>
<button data-tab="bans" onclick="switchTab('bans')"><img src="/icons/sanctions.png" alt="">sanctions</button>
<button data-tab="messages" onclick="switchTab('messages')"><img src="/icons/messages.png" alt="">messages</button>
<button data-tab="dms" onclick="switchTab('dms')"><img src="/icons/whispers.png" alt="">whispers</button>
<div class="bocchi-wrap"><img src="/icons/bocchi-rotate.gif" alt=""/></div>
<button id="logoutBtn" onclick="logout()"><img src="/icons/logout.png" alt="">logout</button>
</div>
<div class="main">
<div id="loginOverlay" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,.9);z-index:99;justify-content:center;align-items:center">
<div style="background:#0d0d0d;border:1px solid #1a1a1a;padding:32px 28px;width:100%;max-width:300px;text-align:center;border-radius:6px">
<div style="width:48px;height:48px;margin:0 auto 16px;background:#181818;border-radius:50%;display:flex;align-items:center;justify-content:center;border:1px solid #222">
<img src="/icons/dashboard.png" alt="" style="width:22px;height:22px;opacity:.5"/>
</div>
<h2 style="margin-bottom:4px;color:#eee;font-size:15px;letter-spacing:1px;font-weight:500">nenchan</h2>
<p style="color:#555;font-size:11px;margin-bottom:20px;text-transform:uppercase;letter-spacing:1.5px">admin panel</p>
<div id="loginError" style="color:#f44;font-size:12px;margin-bottom:8px;min-height:16px"></div>
<button onclick="loginDiscord()" style="width:100%;padding:10px 12px;background:#5865F2;color:#fff;border:none;border-radius:4px;font:15px 'Space Grotesk',monospace;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;transition:background .15s" onmouseover="this.style.background='#4752c4'" onmouseout="this.style.background='#5865F2'"><img src="/icons/discord.png" alt="" style="width:18px;height:18px"/>Login with Discord</button>
<p style="color:#333;font-size:10px;margin-top:12px">authorized users only</p>
</div>
</div>
<div id="panel-dashboard" class="panel">
<div id="dashContent"><p style="color:#666">loading...</p></div>
</div>
<div id="panel-messages" class="panel">
<div class="msg-bar">
<select id="msgChannel" onchange="loadMsgHistory(this.value)"><option value="">select channel</option></select>
</div>
<div style="position:relative;margin-bottom:4px">
<input type="text" id="mentionSearch" placeholder="@mention - search members..." oninput="filterMentions(this.value)" onfocus="showMentionList()" style="margin:0;width:100%;padding:4px 8px;border:1px solid #222;background:#0a0a0a;color:#ccc;font:14px 'Space Grotesk',monospace;outline:none"/>
<div id="mentionList" class="mention-list"></div>
</div>
<div id="msgHistory" style="max-height:380px;overflow-y:auto;margin-bottom:6px;background:#0a0a0a;border:1px solid #1a1a1a;padding:4px;font-size:11px;line-height:1.5">
<p style="color:#555;text-align:center;padding:20px 0">select a channel</p>
</div>
<div class="drop-zone" id="dropZone" onclick="g('msgFile').click()" ondragover="event.preventDefault();this.classList.add('dragover')" ondragleave="this.classList.remove('dragover')" ondrop="handleDrop(event)">
<span id="dropLabel">drop file or click to attach</span>
</div>
<input type="file" id="msgFile" style="display:none" onchange="updateDropLabel(this)"/>
<div class="msg-input-row">
<textarea id="msgInput" placeholder="message..." onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();sendMsg()}"></textarea>
<button onclick="sendMsg()">send</button>
</div>
<div id="msgStatus" style="font-size:11px;margin-top:4px;min-height:14px"></div>
</div>
<div id="panel-members" class="panel">
<input type="text" class="member-search" id="memberSearch" placeholder="search members..." oninput="filterMembers(this.value)"/>
<div id="memberStats" class="member-stats"></div>
<div id="memberList" class="member-grid"><p style="color:#666;text-align:center;padding:20px 0">loading...</p></div>
</div>
<div id="panel-dms" class="panel">
<div id="dmStart">
<p style="color:#555;font-size:11px;margin-bottom:6px">enter a user id to open dm</p>
<div style="display:flex;gap:4px">
<input type="text" id="dmUserId" placeholder="user id" style="flex:1;margin:0"/>
<button onclick="startDmById()" style="margin:0;padding:4px 12px">open</button>
</div>
</div>
<div id="dmChat" style="display:none">
<div style="display:flex;align-items:center;gap:8px;padding-bottom:6px;border-bottom:1px solid #1a1a1a;margin-bottom:6px">
<button onclick="dmClose()" style="margin:0;padding:2px 8px;background:#1a1a1a;color:#888;border:1px solid #333;font-size:12px">close</button>
<span id="dmChatName" style="color:#fff;font-size:13px"></span>
</div>
<div id="dmHistory" style="max-height:380px;overflow-y:auto;margin-bottom:6px;background:#0a0a0a;border:1px solid #1a1a1a;padding:4px;font-size:11px;line-height:1.5">
<p style="color:#555;text-align:center;padding:20px 0">loading...</p>
</div>
<div class="msg-input-row">
<textarea id="dmInput" placeholder="message..." onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();sendDm()}" style="min-height:36px;resize:none"></textarea>
<button onclick="sendDm()">send</button>
</div>
<div id="dmStatus" style="font-size:11px;margin-top:4px;min-height:14px"></div>
</div>
</div>
<div id="panel-bans" class="panel">
<input type="text" class="member-search" id="banSearch" placeholder="search timeouts & bans..." oninput="filterBans(this.value)"/>
<div id="banStats" class="member-stats"></div>
<div id="banTimeouts" class="mod-section"></div>
<div id="banBans" class="mod-section"></div>
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
    var iconHtml=d.icon?"<img class='dash-icon' src='"+d.icon+"' alt=''/>":"<div class='dash-icon' style='display:flex;align-items:center;justify-content:center;color:#555;font-size:23px'>"+esc(d.name.charAt(0))+"</div>";
    var rolesSorted=d.roles.slice().sort(function(a,b){return b.position-a.position});
    var hoisted=rolesSorted.filter(function(r){return r.hoist});
    var roleItems=rolesSorted.map(function(r){
      var c=r.color?"#"+r.color.toString(16).padStart(6,"0"):"#666";
      return "<div class='role-item'><span class='role-dot' style='background:"+c+"'></span>"+esc(r.name)+"</div>";
    }).join("");
    var h="<div class='dash-banner' id='dashBanner'></div>";
    h+="<div class='dash-header'>";
    h+=iconHtml;
    h+="<div class='dash-info'><p class='dash-name'>"+esc(d.name)+"</p><div class='dash-id'>"+esc(d.created)+"</div></div>";
    h+="</div>";
    h+="<div class='dash-grid'>";
    h+="<div class='dash-card'><div class='dash-card-icon'><img src='/icons/users.png' alt=''/></div><div><div class='dash-card-label'>members</div><div class='dash-card-val'>"+d.totalMembers+"</div><div class='dash-card-sub'>"+d.humans+" humans &middot; "+d.bots+" bots</div></div></div>";
    h+="<div class='dash-card'><div class='dash-card-icon'><img src='/icons/channels.png' alt=''/></div><div><div class='dash-card-label'>channels</div><div class='dash-card-val'>"+d.channelCount+"</div><div class='dash-card-sub'>"+d.textChannels+" text &middot; "+d.voiceChannels+" voice &middot; "+d.categories+" categories</div></div></div>";
    h+="<div class='dash-card'><div class='dash-card-icon'><img src='/icons/owner.png' alt=''/></div><div><div class='dash-card-label'>owner</div><div class='dash-card-val'>"+esc(d.owner)+"</div><div class='dash-card-sub'>"+d.ownerId+"</div></div></div>";
    h+="<div class='dash-card'><div class='dash-card-icon'><img src='/icons/boost.png' alt=''/></div><div><div class='dash-card-label'>boosts</div><div class='dash-card-val'>"+d.boostCount+" boosts</div><div class='dash-card-sub'>tier "+d.boostLevel+" &middot; "+Math.max(0,14-d.boostCount)+" to next tier</div></div></div>";
    h+="</div>";
    h+="<div class='dash-roles-wrap'>";
    h+="<div class='dash-roles-header' onclick='toggleDashRoles()'><span>roles ("+d.roleCount+")</span><span class='role-arrow' id='dashRoleArrow'>&#9660;</span></div>";
    h+="<div id='dashRoleList' class='dash-roles-list'>"+roleItems+"</div>";
    h+="</div>";
    g("dashContent").innerHTML=h;
  });
}

function toggleDashRoles(){g("dashRoleList").classList.toggle("show");g("dashRoleArrow").innerHTML=g("dashRoleList").classList.contains("show")?"&#9650;":"&#9660;"}

var allModData={timeouts:[],bans:[]};
function loadModerations(){
  g("banTimeouts").innerHTML="";
  g("banBans").innerHTML="";
  g("banStats").innerHTML="";
  g("banTimeouts").innerHTML="<p style='color:#666;font-size:11px'>loading...</p>";
  api({action:"moderations"},function(d){
    if(d.error){g("banTimeouts").innerHTML="";g("banBans").innerHTML="<p style='color:#f44;font-size:11px'>"+esc(d.error)+"</p>";return}
    var timeouts=d.timeouts||[];
    var bans=d.bans||[];
    allModData={timeouts:timeouts,bans:bans};
    g("banStats").innerHTML="<div class='member-stat'><span>timeout</span><p>"+timeouts.length+"</p></div>"+
      "<div class='member-stat'><span>banned</span><p>"+bans.length+"</p></div>";
    renderTimeouts(timeouts);
    renderBans(bans);
  });
}

function renderTimeouts(timeouts){
  var h="";
  if(timeouts.length){
    h+="<div class='mod-section-title'><span class='dot' style='background:#ff0'></span>timed out</div>";
  }
  for(var i=0;i<timeouts.length;i++){
    var m=timeouts[i],u=m.user;
    var avatar=u.avatar?"https://cdn.discordapp.com/avatars/"+u.id+"/"+u.avatar+(u.avatar.startsWith("a_")?".gif":".png"):"https://cdn.discordapp.com/embed/avatars/"+(parseInt(u.discriminator||"0")%5)+".png";
    var name=u.global_name||u.username;
    var until=new Date(m.communication_disabled_until);
    var now=new Date();
    var remaining=until-now;
    var remStr="";
    if(remaining<=0){remStr="expired"}
    else if(remaining>86400000){remStr=Math.floor(remaining/86400000)+"d "+Math.floor((remaining%86400000)/3600000)+"h left"}
    else if(remaining>3600000){remStr=Math.floor(remaining/3600000)+"h "+Math.floor((remaining%3600000)/60000)+"m left"}
    else{remStr=Math.floor(remaining/60000)+"m left"}
    var expiryStr=until.toLocaleString("en-US",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"});
    h+="<div class='timeout-card'>";
    h+="<img src='"+avatar+"' alt='' loading='lazy'/>";
    h+="<div class='timeout-info'>";
    h+="<div class='timeout-name'>"+esc(name)+(u.bot?" <span>bot</span>":"")+"</div>";
    h+="<div class='timeout-username'>"+esc(u.username)+" &middot; "+u.id+"</div>";
    h+="<div class='timeout-detail'>";
    h+="<span class='timeout-expiry'>expires: "+expiryStr+"</span> ";
    h+="<span class='timeout-remaining'>"+remStr+"</span>";
    h+="</div>";
    h+="</div>";
    h+="<button class='timeout-remove' data-uid='"+u.id+"' data-name='"+esc(name)+"' onclick='event.stopPropagation();removeTimeout(this)'>remove</button>";
    h+="</div>";
  }
  if(!timeouts.length)h+="<div class='mod-section-title'><span class='dot' style='background:#ff0'></span>timed out</div><p style='color:#555;font-size:11px;padding:6px 0'>no active timeouts</p>";
  g("banTimeouts").innerHTML=h;
}

function renderBans(bans){
  var h="";
  if(bans.length){
    h+="<div class='mod-section-title'><span class='dot' style='background:#f44'></span>banned</div>";
  }
  for(var i=0;i<bans.length;i++){
    var b=bans[i],u=b.user;
    var avatar=u.avatar?"https://cdn.discordapp.com/avatars/"+u.id+"/"+u.avatar+(u.avatar.startsWith("a_")?".gif":".png"):"https://cdn.discordapp.com/embed/avatars/"+(parseInt(u.discriminator||"0")%5)+".png";
    var name=u.global_name||u.username;
    h+="<div class='ban-card'>";
    h+="<img src='"+avatar+"' alt='' loading='lazy'/>";
    h+="<div class='ban-info'>";
    h+="<div class='ban-name'>"+esc(name)+(u.bot?" <span>bot</span>":"")+"</div>";
    h+="<div class='ban-username'>"+esc(u.username)+" &middot; "+u.id+"</div>";
    if(b.reason)h+="<div class='ban-reason'>"+esc(b.reason)+"</div>";
    h+="</div>";
    h+="<button class='ban-unban-btn' data-uid='"+u.id+"' data-name='"+esc(name)+"' onclick='event.stopPropagation();confirmUnban(this)'>unban</button>";
    h+="</div>";
  }
  if(!bans.length)h+="<div class='mod-section-title'><span class='dot' style='background:#f44'></span>banned</div><p style='color:#555;font-size:11px;padding:6px 0'>no banned users</p>";
  g("banBans").innerHTML=h;
}

function filterBans(q){
  q=q.toLowerCase();
  if(!q){renderTimeouts(allModData.timeouts);renderBans(allModData.bans);return}
  var ft=allModData.timeouts.filter(function(m){
    var u=m.user;
    var name=(u.global_name||u.username).toLowerCase();
    return name.indexOf(q)!==-1||u.username.toLowerCase().indexOf(q)!==-1||u.id.indexOf(q)!==-1;
  });
  var fb=allModData.bans.filter(function(b){
    var u=b.user;
    var name=(u.global_name||u.username).toLowerCase();
    return name.indexOf(q)!==-1||u.username.toLowerCase().indexOf(q)!==-1||u.id.indexOf(q)!==-1;
  });
  renderTimeouts(ft);
  renderBans(fb);
}

function confirmUnban(el){
  var uid=el.dataset.uid,name=el.dataset.name;
  g("confirmTitle").textContent="unban "+name;
  g("confirmBody").innerHTML="<p style='color:#888;font-size:12px'>are you sure you want to unban <b style='color:#fff'>"+esc(name)+"</b>?</p>";
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
  g("confirmBody").innerHTML="<p style='color:#888;font-size:12px'>remove timeout for <b style='color:#fff'>"+esc(name)+"</b>?</p>";
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

function loadMsgChannels(){
  api({action:"channels"},function(d){
    if(d.error){g("msgChannel").innerHTML="<option value=''>error: "+esc(d.error)+"</option>";return}
    var s=g("msgChannel");
    s.innerHTML="<option value=''>select channel</option>";
    var count=0;
    for(var i=0;i<d.channels.length;i++){
      if(d.channels[i].type===0){
        var o=document.createElement("option");o.value=d.channels[i].id;o.textContent="#"+d.channels[i].name;s.appendChild(o);count++;
      }
    }
    if(!count){s.innerHTML="<option value=''>no text channels</option>";return}
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

var mentionVisible=false;
function showMentionList(){
  mentionVisible=true;
  var el=g("mentionList");
  if(!el.children.length)filterMentions("");
  el.classList.add("show");
}
function hideMentionList(){mentionVisible=false;setTimeout(function(){g("mentionList").classList.remove("show")},150)}
function filterMentions(q){
  q=q.toLowerCase();
  var el=g("mentionList");
  var h="";
  var count=0;
  for(var i=0;i<allMembers.length&&count<20;i++){
    var m=allMembers[i],name=m.nick||(m.user.global_name||m.user.username);
    if(q&&name.toLowerCase().indexOf(q)===-1&&m.user.username.indexOf(q)===-1&&m.user.id.indexOf(q)===-1)continue;
    var avatar=m.user.avatar?"https://cdn.discordapp.com/avatars/"+m.user.id+"/"+m.user.avatar+(m.user.avatar.startsWith("a_")?".gif":".png"):"https://cdn.discordapp.com/embed/avatars/"+(parseInt(m.user.discriminator||"0")%5)+".png";
    h+="<div class='mention-item' data-uid='"+m.user.id+"' data-name='"+esc(name)+"' onclick='pickMention(this)'>";
    h+="<img src='"+avatar+"' alt='' loading='lazy'/>";
    h+="<span class='m-name'>"+esc(name)+(m.user.bot?"<span class='m-bot'>bot</span>":"")+"</span>";
    h+="</div>";
    count++;
  }
  if(!count)h="<div class='mention-item' style='color:#555;cursor:default'>no results</div>";
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

function loadMsgHistory(cid){
  if(!cid){g("msgHistory").innerHTML="<p style='color:#555;text-align:center;padding:20px 0'>select a channel</p>";return}
  g("msgHistory").innerHTML="<p style='color:#666;text-align:center;padding:20px 0'>loading...</p>";
  api({action:"messages",channelId:cid,limit:30},function(d){
    if(d.error){g("msgHistory").innerHTML="<p style='color:#f44;text-align:center;padding:20px 0'>"+esc(d.error)+"</p>";return}
    if(!d.messages||!d.messages.length){g("msgHistory").innerHTML="<p style='color:#555;text-align:center;padding:20px 0'>no message found.</p>";return}
    if(!Array.isArray(d.messages)){g("msgHistory").innerHTML="<p style='color:#f44;text-align:center;padding:20px 0'>invalid response: messages is not an array</p>";return}
    var h="";
    try{
      for(var i=d.messages.length-1;i>=0;i--){
        var msg=d.messages[i],u=msg.author;
        if(!u||!u.bot)continue;
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
              h+="<img class='msg-img' src='"+a.url+"' alt='' loading='lazy'/>";
            }else if(a.content_type&&a.content_type.startsWith("video/")){
              h+="<video class='msg-video' src='"+a.url+"' controls></video>";
            }else if(a.content_type&&a.content_type.startsWith("audio/")){
              h+="<audio class='msg-audio' src='"+a.url+"' controls></audio>";
            }else{
              h+="<div><a class='msg-file-link' href='"+a.url+"'>"+esc(a.filename)+"</a></div>"
            }
          }
        }
        if(msg.embeds&&msg.embeds.length){
          for(var j=0;j<msg.embeds.length;j++){
            var e=msg.embeds[j];
            if(e.type=="image"&&e.thumbnail&&e.thumbnail.url){
              h+="<img class='msg-img' src='"+e.thumbnail.url+"' alt='' loading='lazy'/>";
              continue;
            }
            var bg=e.color?"#"+("000000"+e.color.toString(16)).slice(-6):"#444";
            h+="<div class='msg-embed' style='border-left-color:"+bg+"'>";
            if(e.author&&e.author.name) h+="<div class='msg-embed-author'>"+esc(e.author.name)+"</div>";
            if(e.title){
              if(e.url) h+="<a class='msg-embed-title' href='"+e.url+"' style='text-decoration:none'>"+esc(e.title)+"</a>";
              else h+="<div class='msg-embed-title'>"+esc(e.title)+"</div>";
            }
            if(e.description) h+="<div class='msg-embed-desc'>"+fmt(e.description||"")+"</div>";
            if(e.fields&&e.fields.length){
              for(var k=0;k<e.fields.length;k++){
                var f=e.fields[k];
                h+="<div><div class='msg-embed-field-name'>"+esc(f.name)+"</div><div class='msg-embed-field-val'>"+fmt(f.value||"")+"</div></div>";
              }
            }
            if(e.image&&e.image.url) h+="<img class='msg-img' src='"+e.image.url+"' alt='' loading='lazy'/>";
            if(e.thumbnail&&e.thumbnail.url) h+="<img class='msg-img' src='"+e.thumbnail.url+"' alt='' loading='lazy' style='max-width:80px;max-height:80px;float:right;margin:2px'/>";
            if(e.footer&&e.footer.text) h+="<div style='color:#555;font-size:9px;margin-top:3px'>"+esc(e.footer.text)+"</div>";
            h+="</div>";
          }
        }
        if(msg.reactions&&msg.reactions.length){
          h+="<div class='msg-reactions'>";
          for(var j=0;j<msg.reactions.length;j++){
            var r=msg.reactions[j],emo=r.emoji;
            if(emo.id){
              h+="<span class='msg-reaction'><img src='https://cdn.discordapp.com/emojis/"+emo.id+".png' style='width:14px;height:14px' alt=''/> <span class='msg-reaction-count'>"+r.count+"</span></span>";
            }else{
              h+="<span class='msg-reaction'>"+esc(emo.name)+" <span class='msg-reaction-count'>"+r.count+"</span></span>";
            }
          }
          h+="</div>";
        }
        h+="</div>";
        h+="<span class='msg-del' data-cid='"+cid+"' data-mid='"+msg.id+"' onclick='deleteMsg(this.dataset.cid,this.dataset.mid)' title='delete'>&#10005;</span>";
        h+="</div>";
      }
    }catch(e){
      h+="<p style='color:#f44;font-size:11px;margin-top:8px'>render error: "+esc(e.message)+"</p>";
    }
    g("msgHistory").innerHTML=h;
    g("msgHistory").scrollTop=g("msgHistory").scrollHeight;
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
      g("msgInput").value="";g("msgFile").value="";updateFileLabel(g("msgFile"));
      loadMsgHistory(cid);
    }else{
      g("msgStatus").style.color="#f44";g("msgStatus").textContent=d.error||"failed";
    }
  });
}

function deleteMsg(cid,mid){
  if(!confirm("delete this message?"))return;
  api({action:"delete",channelId:cid,messageId:mid},function(d){
    if(d.success){loadMsgHistory(cid)}
    else{alert(d.error||"failed to delete")}
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
  if(!members.length)h="<p style='color:#555;text-align:center;padding:20px 0'>no members found</p>";
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
  g("modalBox").innerHTML="<div class='modal-header'><img src='"+avatar+"' alt='' /><div class='modal-header-info'><h3>"+esc(name)+"</h3><p>"+esc(m.user.username)+(m.user.bot?" &middot; bot":"")+"</p></div></div>"+
    "<div class='modal-body'>"+
    "<div id='modalBadges'></div>"+
    "<div class='modal-section'><div class='modal-section-label'>id</div><p style='color:#aaa;font-size:12px'>"+m.user.id+"</p></div>"+
    "<div class='modal-section'><div class='modal-section-label'>joined</div><p style='color:#aaa;font-size:12px'>"+joined+"</p></div>"+
    (m.premium_since?"<div class='modal-section'><div class='modal-section-label'>boosting since</div><p style='color:#aaa;font-size:12px'>"+new Date(m.premium_since).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"})+"</p></div>":"")+
    "<div class='modal-section'><div class='modal-section-label'>roles</div><div class='modal-roles'>"+(rolesHtml||"<span style='color:#555;font-size:11px'>no roles</span>")+"</div></div>"+
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
    if(badgesEl&&flagsList.length)badgesEl.innerHTML="<div class='modal-section'><div class='modal-section-label'>badges</div><div style='display:flex;flex-wrap:wrap;gap:3px'>"+flagsList.map(function(fl){return "<span style='font-size:10px;padding:2px 6px;background:#1a1a1a;border:1px solid #222;border-radius:2px;color:#888'>"+fl+"</span>"}).join("")+"</div></div>";
  });
}
function c(){g("userModal").classList.remove("show")}
function esc(s){var d=document.createElement("div");d.appendChild(document.createTextNode(s));return d.innerHTML}
function fmt(s){
  return esc(s)
    .replace(new RegExp("&lt;:([^:]+):(\\\\d+)&gt;","g"),"<img src='https://cdn.discordapp.com/emojis/$2.png' style='width:18px;height:18px;vertical-align:middle' alt=':$1:'>")
    .replace(new RegExp("&lt;a:([^:]+):(\\\\d+)&gt;","g"),"<img src='https://cdn.discordapp.com/emojis/$2.gif' style='width:18px;height:18px;vertical-align:middle' alt=':$1:'>");
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
  g("dmHistory").innerHTML="<p style='color:#666;text-align:center;padding:20px 0'>opening dm...</p>";
  g("dmInput").value="";
  g("dmStatus").textContent="";
  api({action:"dm_send",userId:uid,content:""},function(d){
    if(d.error){g("dmHistory").innerHTML="<p style='color:#f44;text-align:center;padding:20px 0'>"+esc(d.error)+"</p>";return}
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
  g("dmHistory").innerHTML="<p style='color:#666;text-align:center;padding:20px 0'>loading...</p>";
  api({action:"dm_messages",channelId:cid,limit:50},function(d){
    if(d.error){g("dmHistory").innerHTML="<p style='color:#f44;text-align:center;padding:20px 0'>"+esc(d.error)+"</p>";return}
    if(!d.messages||!d.messages.length){g("dmHistory").innerHTML="<p style='color:#555;text-align:center;padding:20px 0'>no messages</p>";return}
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
            h+="<img class='msg-img' src='"+a.url+"' alt='' loading='lazy'/>";
          }else if(a.content_type&&a.content_type.startsWith("video/")){
            h+="<video class='msg-video' src='"+a.url+"' controls></video>";
          }else if(a.content_type&&a.content_type.startsWith("audio/")){
            h+="<audio class='msg-audio' src='"+a.url+"' controls></audio>";
          }else{
            h+="<div><a class='msg-file-link' href='"+a.url+"'>"+esc(a.filename)+"</a></div>"
          }
        }
      }
      h+="</div>";
      h+="<span class='msg-del' data-cid='"+cid+"' data-mid='"+msg.id+"' onclick='deleteDmMsg(this.dataset.cid,this.dataset.mid)' title='delete'>&#10005;</span>";
      h+="</div>";
    }
    g("dmHistory").innerHTML=h;
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
  g("memberList").innerHTML="<p style='color:#666;text-align:center;padding:20px 0'>executing "+action+"...</p>";
  api(body,function(d){
    if(d.success){
      loadMembers();
    }else{
      alert(d.error||"failed to "+action);
      loadMembers();
    }
  });
}
document.addEventListener("click",function(e){if(!e.target.closest("#mentionSearch")&&!e.target.closest("#mentionList"))hideMentionList()});
api({action:"guildinfo"},function(d){
  if(d.error&&d.error==="Unauthorized"){g("sidebar").style.display="flex";g("panel-dashboard").classList.add("show");g("loginOverlay").style.display="flex"}
  else{initPanel()}
});
</script>
</body>
</html>`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method === "GET") {
      const code = req.query.code as string | undefined;
      if (code) {
        return await handleOAuthCallback(req, res, code);
      }
      const oauthError = req.query.error as string | undefined;
      if (oauthError) {
        const desc = (req.query.error_description as string) || "Login was denied.";
        res.setHeader("Content-Type", "text/html; charset=utf-8");
        return res.status(403).send("<html><body style='background:#000;color:#f44;font-family:monospace;display:flex;justify-content:center;align-items:center;height:100vh'><div style='text-align:center'><h1>Access Denied</h1><p style='color:#888'>" + htmlEscape(desc) + "</p><a href='/api' style='color:#59f'>&larr; back</a></div></body></html>");
      }
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      return res.status(200).send(html());
    }

    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method Not Allowed" });
    }

    const signature = req.headers["x-signature-ed25519"];
    const timestamp = req.headers["x-signature-timestamp"];

    let body: any = req.body;
    if (!body) {
      try {
        const chunks: Buffer[] = [];
        let totalSize = 0;
        const MAX_BODY_SIZE = 1024 * 1024; // 1MB
        for await (const chunk of req) {
          totalSize += chunk.length;
          if (totalSize > MAX_BODY_SIZE) {
            return res.status(413).json({ error: "Request body too large" });
          }
          chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
        }
        const raw = Buffer.concat(chunks).toString();
        if (raw) body = JSON.parse(raw);
      } catch {}
    }
    if (!body || typeof body !== "object") {
      return res.status(400).json({ error: "Invalid body" });
    }

    if (typeof signature === "string" && typeof timestamp === "string") {
      return await handleDiscord(req, res, JSON.stringify(body), signature, timestamp);
    }

    return await handlePanel(res, body, req);
  } catch (error) {
    console.error("Handler error", error);
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
        await discordFetch(
          `https://discord.com/api/v10/interactions/${message.id}/${message.token}/callback`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              type: InteractionResponseType.DeferredChannelMessageWithSource,
              data: { flags: command.data.initialEphemeral ? MessageFlags.Ephemeral : 0 },
            }),
          },
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
        await discordFetch(
          `https://discord.com/api/v10/webhooks/${message.application_id}/${message.token}/messages/@original`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              content: commandResult.content ?? "",
              flags: commandResult.flags,
              embeds: commandResult.embeds,
            }),
          },
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

async function handleOAuthCallback(req: VercelRequest, res: VercelResponse, code: string) {
  try {
    const params = new URLSearchParams({
      client_id: DISCORD_APP_ID,
      client_secret: DISCORD_CLIENT_SECRET,
      grant_type: "authorization_code",
      code,
      redirect_uri: OAUTH_REDIRECT,
    });

    const tokenRes = await discordFetch("https://discord.com/api/v10/oauth2/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });

    const userRes = await discordFetch("https://discord.com/api/v10/users/@me", {
      headers: { Authorization: `Bearer ${tokenRes.access_token}` },
    });

    if (userRes.id !== DISCORD_OWNER_ID) {
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      return res.status(403).send("<html><body style='background:#000;color:#f44;font-family:monospace;display:flex;justify-content:center;align-items:center;height:100vh'><div style='text-align:center'><h1>Access Denied</h1><p style='color:#888'>This account is not authorized.</p><a href='/api' style='color:#59f'>← back</a></div></body></html>");
    }

    res.setHeader("Set-Cookie", `token=${signToken(userRes.id)}; Path=/; Max-Age=86400; SameSite=Strict; HttpOnly; Secure`);
    res.setHeader("Location", "/api");
    return res.status(302).end();
  } catch (err: any) {
    console.error("OAuth callback error:", err.message);
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    return res.status(500).send("<html><body style='background:#000;color:#f44;font-family:monospace;display:flex;justify-content:center;align-items:center;height:100vh'><div style='text-align:center'><h1>OAuth Error</h1><p style='color:#888'>" + htmlEscape(err.message || "Unknown error") + "</p><a href='/api' style='color:#59f'>← back</a></div></body></html>");
  }
}

async function handlePanel(res: VercelResponse, body: any, req: VercelRequest) {
  if (body.action === "oauth_url") {
    const url = `https://discord.com/api/oauth2/authorize?client_id=${DISCORD_APP_ID}&redirect_uri=${encodeURIComponent(OAUTH_REDIRECT)}&response_type=code&scope=identify`;
    return res.json({ url });
  }

  if (body.action === "logout") {
    res.setHeader("Set-Cookie", "token=; Path=/; Max-Age=0; SameSite=Strict; HttpOnly; Secure");
    return res.json({ success: true });
  }

  // token check — read from HttpOnly cookie or Authorization header only
  const reqToken = getTokenFromRequest(req) || "";
  if (!verifyToken(reqToken)) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const headers = { Authorization: `Bot ${process.env.DISCORD_TOKEN}` };

  const guildId = process.env.GUILD_ID;

  try {
    if (body.action === "guildinfo") {
      const [guildRes, chanRes, rolesRes] = await Promise.all([
        discordFetch(`https://discord.com/api/v10/guilds/${guildId}?with_counts=true`, { headers }),
        discordFetch(`https://discord.com/api/v10/guilds/${guildId}/channels`, { headers }),
        discordFetch(`https://discord.com/api/v10/guilds/${guildId}/roles`, { headers }),
      ]);
      const guild = guildRes;
      const ownerRes = await discordFetch(`https://discord.com/api/v10/users/${guild.owner_id}`, { headers });
      let bots = 0, humans = 0, totalMembers = guild.approximate_member_count || guild.member_count || "?";
      try {
        const members = await discordFetch(`https://discord.com/api/v10/guilds/${guildId}/members?limit=1000`, { headers });
        bots = members.filter((m: any) => m.user?.bot).length;
        humans = members.length - bots;
        totalMembers = guild.approximate_member_count || guild.member_count || members.length;
      } catch {}
      let textCh = 0, voiceCh = 0, categoryCh = 0;
      for (const ch of chanRes as any[]) {
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
        roles: rolesRes.map((r: any) => ({ id: r.id, name: r.name, color: r.color, position: r.position, hoist: r.hoist })),
        created: new Date(Number(BigInt(guild.id) >> 22n) + 1420070400000).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) + " · " + new Date(Number(BigInt(guild.id) >> 22n) + 1420070400000).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
        createdTs: Number(BigInt(guild.id) >> 22n) + 1420070400000,
        boostLevel: guild.premium_tier || 0,
        boostCount: guild.premium_subscription_count || 0,
        features: guild.features || [],
      });
    }

    if (body.action === "channels") {
      const channels = await discordFetch(`https://discord.com/api/v10/guilds/${guildId}/channels`, { headers });
      return res.json({ channels });
    }

    if (body.action === "send") {
      if (!isValidSnowflake(body.channelId)) return res.status(400).json({ error: "Invalid channel ID" });
      const form = new FormData();
      form.append("content", body.content || "");
      if (body.fileData && body.fileName) {
        const buf = Buffer.from(body.fileData, "base64");
        const blob = new Blob([buf], { type: body.fileType || "application/octet-stream" });
        form.append("file", blob, body.fileName);
      }
      const response = await fetch(`https://discord.com/api/v10/channels/${body.channelId}/messages`, {
        method: "POST",
        headers: { ...headers },
        body: form,
      });
      if (!response.ok) {
        let msg = `HTTP ${response.status}`;
        try { const d = await response.json(); msg = d.message || msg; } catch {}
        throw new Error(msg);
      }
      return res.json({ success: true });
    }

    if (body.action === "messages") {
      if (!isValidSnowflake(body.channelId)) return res.status(400).json({ error: "Invalid channel ID" });
      try {
        const messages = await discordFetch(
          `https://discord.com/api/v10/channels/${body.channelId}/messages?limit=${body.limit || 30}`,
          { headers },
        );
        return res.json({ messages });
      } catch (e: any) {
        throw e;
      }
    }

    if (body.action === "delete") {
      if (!isValidSnowflake(body.channelId)) return res.status(400).json({ error: "Invalid channel ID" });
      if (!isValidSnowflake(body.messageId)) return res.status(400).json({ error: "Invalid message ID" });
      await discordFetch(
        `https://discord.com/api/v10/channels/${body.channelId}/messages/${body.messageId}`,
        { method: "DELETE", headers },
      );
      return res.json({ success: true });
    }

    if (body.action === "members") {
      const [memberRes, rolesRes] = await Promise.all([
        discordFetch(`https://discord.com/api/v10/guilds/${guildId}/members?limit=1000`, { headers }),
        discordFetch(`https://discord.com/api/v10/guilds/${guildId}/roles`, { headers }),
      ]);
      const members = Array.isArray(memberRes) ? memberRes : [];
      return res.json({ members, roles: rolesRes });
    }

    if (body.action === "userinfo") {
      if (!isValidSnowflake(body.userId)) return res.status(400).json({ error: "Invalid user ID" });
      const userRes = await discordFetch(`https://discord.com/api/v10/users/${body.userId}`, { headers });
      return res.json(userRes);
    }

    if (body.action === "dm_channels") {
      const channels = await discordFetch(`https://discord.com/api/v10/users/@me/channels`, { headers });
      return res.json({ channels });
    }

    if (body.action === "dm_messages") {
      if (!isValidSnowflake(body.channelId)) return res.status(400).json({ error: "Invalid channel ID" });
      const messages = await discordFetch(
        `https://discord.com/api/v10/channels/${body.channelId}/messages?limit=${body.limit || 50}`,
        { headers },
      );
      return res.json({ messages });
    }

    if (body.action === "dm_send") {
      let channelId = body.channelId;
      if (!channelId && body.userId) {
        if (!isValidSnowflake(body.userId)) return res.status(400).json({ error: "Invalid user ID" });
        const ch = await discordFetch(`https://discord.com/api/v10/users/@me/channels`, {
          method: "POST",
          headers,
          body: JSON.stringify({ recipient_id: body.userId }),
        });
        channelId = ch.id;
      }
      if (!channelId) return res.status(400).json({ error: "No channel or user specified" });
      if (channelId && !isValidSnowflake(channelId)) return res.status(400).json({ error: "Invalid channel ID" });
      if (body.content || body.fileData) {
        const form = new FormData();
        form.append("content", body.content || "");
        if (body.fileData && body.fileName) {
          const buf = Buffer.from(body.fileData, "base64");
          const blob = new Blob([buf], { type: body.fileType || "application/octet-stream" });
          form.append("file", blob, body.fileName);
        }
        const response = await fetch(`https://discord.com/api/v10/channels/${channelId}/messages`, {
          method: "POST",
          headers: { ...headers },
          body: form,
        });
        if (!response.ok) {
          let msg = `HTTP ${response.status}`;
          try { const d = await response.json(); msg = d.message || msg; } catch {}
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
        const banHeaders: any = { ...headers, "Content-Type": "application/json" };
        if (body.reason) banHeaders["X-Audit-Log-Reason"] = encodeURIComponent(body.reason);
        const banBody: any = {};
        if (body.deleteDays) banBody.delete_message_seconds = (body.deleteDays || 1) * 86400;
        await discordFetch(
          `https://discord.com/api/v10/guilds/${guildId}/bans/${userId}`,
          { method: "PUT", headers: banHeaders, body: JSON.stringify(banBody) },
        );
        return res.json({ success: true });
      } catch (e: any) {
        return res.status(500).json({ error: e.message || "Failed to ban user" });
      }
    }

    if (body.action === "kick") {
      const userId = body.userId;
      if (!userId) return res.status(400).json({ error: "No user specified" });
      if (!isValidSnowflake(userId)) return res.status(400).json({ error: "Invalid user ID" });
      try {
        const kickHeaders: any = { ...headers };
        if (body.reason) kickHeaders["X-Audit-Log-Reason"] = encodeURIComponent(body.reason);
        await discordFetch(
          `https://discord.com/api/v10/guilds/${guildId}/members/${userId}`,
          { method: "DELETE", headers: kickHeaders },
        );
        return res.json({ success: true });
      } catch (e: any) {
        return res.status(500).json({ error: e.message || "Failed to kick user" });
      }
    }

    if (body.action === "timeout") {
      const userId = body.userId;
      if (!userId) return res.status(400).json({ error: "No user specified" });
      if (!isValidSnowflake(userId)) return res.status(400).json({ error: "Invalid user ID" });
      try {
        const timeoutValue = body.minutes > 0 ? new Date(Date.now() + body.minutes * 60 * 1000).toISOString() : null;
        const timeoutHeaders: any = { ...headers, "Content-Type": "application/json" };
        if (body.reason) timeoutHeaders["X-Audit-Log-Reason"] = encodeURIComponent(body.reason);
        await discordFetch(
          `https://discord.com/api/v10/guilds/${guildId}/members/${userId}`,
          { method: "PATCH", headers: timeoutHeaders, body: JSON.stringify({ communication_disabled_until: timeoutValue }) },
        );
        return res.json({ success: true });
      } catch (e: any) {
        return res.status(500).json({ error: e.message || "Failed to timeout user" });
      }
    }

    if (body.action === "moderations") {
      try {
        const [bans, members] = await Promise.all([
          discordFetch(`https://discord.com/api/v10/guilds/${guildId}/bans?limit=1000`, { headers }).catch(() => []),
          discordFetch(`https://discord.com/api/v10/guilds/${guildId}/members?limit=1000`, { headers }).catch(() => []),
        ]);
        const now = new Date().toISOString();
        const timeouts = (Array.isArray(members) ? members : []).filter((m: any) => m.communication_disabled_until && m.communication_disabled_until > now);
        return res.json({
          bans: Array.isArray(bans) ? bans : [],
          timeouts: timeouts.map((m: any) => ({ user: m.user, communication_disabled_until: m.communication_disabled_until, nick: m.nick })),
        });
      } catch (e: any) {
        return res.json({ bans: [], timeouts: [], error: e.message || "Failed to fetch moderations" });
      }
    }

    if (body.action === "bans") {
      try {
        const bans = await discordFetch(
          `https://discord.com/api/v10/guilds/${guildId}/bans?limit=1000`,
          { headers },
        );
        return res.json({ bans: Array.isArray(bans) ? bans : [] });
      } catch (e: any) {
        return res.json({ bans: [], error: e.message || "Failed to fetch bans" });
      }
    }

    if (body.action === "unban") {
      const userId = body.userId;
      if (!userId) return res.status(400).json({ error: "No user specified" });
      if (!isValidSnowflake(userId)) return res.status(400).json({ error: "Invalid user ID" });
      try {
        await discordFetch(
          `https://discord.com/api/v10/guilds/${guildId}/bans/${userId}`,
          { method: "DELETE", headers },
        );
        return res.json({ success: true });
      } catch (e: any) {
        return res.status(500).json({ error: e.message || "Failed to unban" });
      }
    }

    return res.status(400).json({ error: "Unknown action" });
  } catch (err: any) {
    return res.status(500).json({
      error: err.message || "Request failed",
    });
  }
}
