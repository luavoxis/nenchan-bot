import {
  ApplicationCommandOptionType,
  MessageFlags,
} from "discord-api-types/v10";
import { discordFetch, discordHeaders } from "../utils/discordFetch";
import type {
  CommandData,
  CommandExecuteResult,
  SimplifiedInteraction,
} from "../utils/types";

function snowflakeTimestamp(id: string): number {
  return Number(BigInt(id) >> 22n) + 1420070400000;
}

function relative(ms: number): string {
  return `<t:${Math.floor(ms / 1000)}:R>`;
}

function formatDate(iso: string): string {
  try {
    return relative(new Date(iso).getTime());
  } catch {
    return iso;
  }
}

function avatarUrl(user: any): string {
  if (!user.avatar) {
    return `https://cdn.discordapp.com/embed/avatars/${Number(user.discriminator || 0) % 5}.png`;
  }
  const ext = user.avatar.startsWith("a_") ? "gif" : "png";
  return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${ext}?size=1024`;
}

const ACCENT = 0xC9A0DC;
const separator = () => ({ name: "\u200b", value: "\u200b", inline: false });

function getBadges(user: any): string[] {
  const flags = user.public_flags ?? 0;
  const flagMap: Array<[number, string]> = [
    [0, "Discord Staff"],
    [1, "Partner"],
    [2, "HypeSquad Events"],
    [3, "Bug Hunter Lv1"],
    [6, "HypeSquad Bravery"],
    [7, "HypeSquad Brilliance"],
    [8, "HypeSquad Balance"],
    [9, "Early Supporter"],
    [10, "Team User"],
    [14, "Bug Hunter Lv2"],
    [16, "Verified Bot Dev"],
    [17, "Certified Moderator"],
    [18, "Bot HTTP Interactions"],
    [19, "Active Developer"],
  ];
  const badges: string[] = [];
  for (const [bit, label] of flagMap) {
    if (flags & (1 << bit)) badges.push(label);
  }
  return badges;
}

export default {
  data: {
    name: "userinfo",
    description: "Shows detailed information about a user",
    options: [
      {
        name: "user",
        description: "The user to look up (defaults to you)",
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

    let user: any;
    try {
      user = await discordFetch(
        `https://discord.com/api/v10/users/${targetId}`,
        { headers: discordHeaders },
      );
    } catch (e: any) {
      return {
        content: e.status === 404 ? "User not found." : `Could not fetch user info: ${e.message || e}`,
        flags: MessageFlags.Ephemeral,
      };
    }

    const displayName = user.global_name || user.username;
    const badges = getBadges(user);
    const color = user.accent_color || ACCENT;

    const fields: Array<{ name: string; value: string; inline: boolean }> = [];

    fields.push({ name: "Username", value: `@${user.username}`, inline: true });
    fields.push({ name: "Display Name", value: displayName, inline: true });
    fields.push({ name: "Bot", value: user.bot ? "Yes" : "No", inline: true });

    fields.push({ name: "User ID", value: `\`${user.id}\``, inline: true });
    fields.push({ name: "Created", value: relative(snowflakeTimestamp(user.id)), inline: true });
    fields.push({
      name: "Accent Color",
      value: `\`#${(user.accent_color || ACCENT).toString(16).padStart(6, "0")}\``,
      inline: true,
    });

    if (badges.length) {
      fields.push(separator());
      fields.push({ name: "Badges", value: badges.join(", "), inline: false });
    }

    try {
      const member = await discordFetch(
        `https://discord.com/api/v10/guilds/${interaction.guild_id}/members/${targetId}`,
        { headers: discordHeaders },
      );

      fields.push(separator());

      fields.push({ name: "Nickname", value: member.nick || "None", inline: true });
      fields.push({ name: "Joined Server", value: formatDate(member.joined_at), inline: true });

      const allRoles = await discordFetch(
        `https://discord.com/api/v10/guilds/${interaction.guild_id}/roles`,
        { headers: discordHeaders },
      );
      const memberRoles = (Array.isArray(allRoles) ? allRoles : [])
        .filter((r: any) => (member.roles as string[]).includes(r.id))
        .sort((a: any, b: any) => b.position - a.position);

      fields.push({
        name: "Highest Role",
        value: memberRoles[0] ? `<@&${memberRoles[0].id}>` : "None",
        inline: true,
      });

      const roleMentions = memberRoles.slice(0, 10).map((r: any) => `<@&${r.id}>`).join(" ");
      const roleSummary =
        memberRoles.length > 10
          ? `${roleMentions} *+${memberRoles.length - 10} more*`
          : roleMentions || "None";
      fields.push({ name: "Roles", value: roleSummary, inline: false });
    } catch (e: any) {
      if (e.status !== 404) {
        fields.push(separator());
        fields.push({
          name: "Note",
          value: "*Could not fetch server member data - make sure the bot has the **Server Members Intent** enabled.*",
          inline: false,
        });
      }
    }

    return {
      embeds: [
        {
          color,
          author: { name: `@${user.username}`, icon_url: avatarUrl(user) },
          thumbnail: { url: avatarUrl(user) },
          fields,
          footer: { text: `User ID: ${user.id}` },
          timestamp: new Date().toISOString(),
        },
      ],
    };
  },
};
