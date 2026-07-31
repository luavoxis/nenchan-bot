export async function discordFetch(url: string, opts: any = {}): Promise<any> {
  const u = new URL(url);
  const mod = u.protocol === "https:" ? await import("https") : await import("http");
  const options: any = {
    hostname: u.hostname,
    port: u.port || (u.protocol === "https:" ? 443 : 80),
    path: u.pathname + u.search,
    method: opts.method || "GET",
    headers: { "Content-Type": "application/json", ...opts.headers },
  };
  return new Promise((resolve, reject) => {
    const req = mod.request(options, (res: any) => {
      let body = "";
      res.on("data", (chunk: any) => (body += chunk));
      res.on("end", () => {
        if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
          try { resolve(JSON.parse(body)); } catch { resolve(body); }
        } else {
          let msg = `HTTP ${res.statusCode}`;
          try { const d = JSON.parse(body); msg = d.message || msg; } catch {}
          const err: any = new Error(msg);
          err.status = res.statusCode;
          reject(err);
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

export const discordHeaders = {
  Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
};
