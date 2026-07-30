import {
  ApplicationCommandOptionType,
  MessageFlags,
} from "discord-api-types/v10";
import type {
  CommandData,
  CommandExecuteResult,
  SimplifiedInteraction,
} from "../utils/types";

async function discordFetch(url: string, opts: any = {}): Promise<any> {
  const u = new URL(url);
  const mod = u.protocol === "https:" ? await import("https") : await import("http");
  return new Promise((resolve, reject) => {
    const req = mod.request(u, {
      method: opts.method || "GET",
      headers: { "Content-Type": "application/json", ...opts.headers },
    }, (res: any) => {
      let body = "";
      res.on("data", (chunk: any) => body += chunk);
      res.on("end", () => {
        if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
          try { resolve(JSON.parse(body)); } catch { resolve(body); }
        } else {
          let msg = `HTTP ${res.statusCode}`;
          try { const d = JSON.parse(body); msg = d.message || msg; } catch {}
          const err = new Error(msg) as any;
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

function snowflakeToDate(id: string): string {
  const timestamp = Number(BigInt(id) >> 22n) + 1420070400000;
  return new Date(timestamp).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default {
  data: {
    name: "userinfo",
    description: "Shows detailed information about a user",
    options: [
      {
        name: "user",
        description: "The user to inspect (defaults to you)",
        type: ApplicationCommandOptionType.User,
        required: false,
      },
    ],
  } as CommandData,
  async execute(data: {
    interaction: SimplifiedInteraction;
  }): CommandExecuteResult {
    const interaction = data.interaction;
    const targetId =
      interaction.data.options?.find((o) => o.name === "user")?.value ||
      interaction.member.user.id;

    const headers = {
      Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
    };

    const user = await discordFetch(
      `https://discord.com/api/v10/users/${targetId}`,
      { headers },
    );

    const isAnimated = user.avatar?.startsWith("a_");
    const ext = isAnimated ? "gif" : "png";
    const avatarUrl = user.avatar
      ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${ext}?size=1024`
      : `https://cdn.discordapp.com/embed/avatars/${Number(user.discriminator) % 5}.png`;

    const fields: Array<{ name: string; value: string; inline: boolean }> = [
      { name: "Username", value: `@${user.username}`, inline: true },
      { name: "Display Name", value: user.global_name || user.username, inline: true },
      { name: "ID", value: `\`${user.id}\``, inline: false },
      { name: "Bot", value: user.bot ? "Yes" : "No", inline: true },
      { name: "Joined Discord", value: snowflakeToDate(user.id), inline: true },
    ];

    if (user.accent_color) {
      fields.push({
        name: "Accent Color",
        value: `\`#${user.accent_color.toString(16).padStart(6, "0")}\``,
        inline: true,
      });
    }

    const badges: string[] = [];
    const flags = user.public_flags ?? 0;
    if (flags & (1 << 0)) badges.push("Discord Staff");
    if (flags & (1 << 1)) badges.push("Partner");
    if (flags & (1 << 2)) badges.push("HypeSquad Events");
    if (flags & (1 << 3)) badges.push("Bug Hunter Lv1");
    if (flags & (1 << 6)) badges.push("HypeSquad Bravery");
    if (flags & (1 << 7)) badges.push("HypeSquad Brilliance");
    if (flags & (1 << 8)) badges.push("HypeSquad Balance");
    if (flags & (1 << 9)) badges.push("Early Supporter");
    if (flags & (1 << 10)) badges.push("Team User");
    if (flags & (1 << 14)) badges.push("Bug Hunter Lv2");
    if (flags & (1 << 16)) badges.push("Verified Bot Dev");
    if (flags & (1 << 17)) badges.push("Certified Moderator");
    if (flags & (1 << 18)) badges.push("Bot HTTP Interactions");
    if (flags & (1 << 19)) badges.push("Active Developer");
    if (badges.length) {
      fields.push({ name: "Badges", value: badges.join(", "), inline: false });
    }

    try {
      const member = await discordFetch(
        `https://discord.com/api/v10/guilds/${interaction.guild_id}/members/${targetId}`,
        { headers },
      );

      fields.splice(2, 0, {
        name: "Nickname",
        value: member.nick || "None",
        inline: true,
      });

      const joinedAt = new Date(member.joined_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      fields.push({ name: "Joined Server", value: joinedAt, inline: true });

      try {
        const allRoles = await discordFetch(
          `https://discord.com/api/v10/guilds/${interaction.guild_id}/roles`,
          { headers },
        );
        const memberRoleIds = member.roles as string[];
        const memberRoles = allRoles
          .filter((r: { id: string }) => memberRoleIds.includes(r.id))
          .sort(
            (a: { position: number }, b: { position: number }) =>
              b.position - a.position,
          );

        fields.push({
          name: "Top Role",
          value: memberRoles[0]?.name || "None",
          inline: true,
        });

        const roleMentions = memberRoles
          .slice(0, 10)
          .map((r: { id: string }) => `<@&${r.id}>`)
          .join(" ");
        const roleSummary =
          memberRoles.length > 10
            ? `${roleMentions} *+${memberRoles.length - 10} more*`
            : roleMentions || "None";
        fields.push({ name: "Roles", value: roleSummary, inline: false });
      } catch {
        fields.push({
          name: "Roles",
          value: "*Could not fetch roles*",
          inline: false,
        });
      }
    } catch (err: any) {
      const status = err.message?.match(/HTTP (\d+)/)?.[1] || "?";
      fields.push({ name: "Note", value: `*Could not fetch member data (HTTP ${status}) - make sure the bot has Server Members Intent enabled and try re-inviting with \`guilds.members.read\` scope*`, inline: false });
    }

    return {
      embeds: [
        {
          color: user.accent_color || 0xC9A0DC,
          thumbnail: { url: avatarUrl },
          fields,
        },
      ],
    };
  },
};
