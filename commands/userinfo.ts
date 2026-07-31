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

function snowflakeToDate(id: string): string {
  const timestamp = Number(BigInt(id) >> 22n) + 1420070400000;
  return new Date(timestamp).toLocaleDateString("tr-TR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
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

export default {
  data: {
    name: "userinfo",
    description: "Bir kullanıcı hakkında detaylı bilgi gösterir",
    options: [
      {
        name: "user",
        description: "Bakılacak kullanıcı (varsayılan: sen)",
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
        content: e.status === 404 ? "Kullanıcı bulunamadı." : `Kullanıcı bilgisi alınamadı: ${e.message || e}`,
        flags: MessageFlags.Ephemeral,
      };
    }

    const fields: Array<{ name: string; value: string; inline: boolean }> = [
      { name: "Kullanıcı Adı", value: `@${user.username}`, inline: true },
      { name: "Görünen Ad", value: user.global_name || user.username, inline: true },
      { name: "ID", value: `\`${user.id}\``, inline: false },
      { name: "Bot", value: user.bot ? "Evet" : "Hayır", inline: true },
      { name: "Discord'a Katılış", value: snowflakeToDate(user.id), inline: true },
    ];

    if (user.accent_color) {
      fields.push({
        name: "Vurgu Rengi",
        value: `\`#${user.accent_color.toString(16).padStart(6, "0")}\``,
        inline: true,
      });
    }

    const badges: string[] = [];
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
    for (const [bit, label] of flagMap) {
      if (flags & (1 << bit)) badges.push(label);
    }
    if (badges.length) {
      fields.push({ name: "Rozetler", value: badges.join(", "), inline: false });
    }

    try {
      const member = await discordFetch(
        `https://discord.com/api/v10/guilds/${interaction.guild_id}/members/${targetId}`,
        { headers: discordHeaders },
      );

      fields.splice(2, 0, {
        name: "Takma Ad",
        value: member.nick || "Yok",
        inline: true,
      });
      fields.push({ name: "Sunucuya Katılış", value: formatDate(member.joined_at), inline: true });

      try {
        const allRoles = await discordFetch(
          `https://discord.com/api/v10/guilds/${interaction.guild_id}/roles`,
          { headers: discordHeaders },
        );
        const memberRoles = (Array.isArray(allRoles) ? allRoles : [])
          .filter((r: any) => (member.roles as string[]).includes(r.id))
          .sort((a: any, b: any) => b.position - a.position);

        fields.push({ name: "En Yüksek Rol", value: memberRoles[0]?.name || "Yok", inline: true });

        const roleMentions = memberRoles.slice(0, 10).map((r: any) => `<@&${r.id}>`).join(" ");
        const roleSummary =
          memberRoles.length > 10
            ? `${roleMentions} *+${memberRoles.length - 10} tane daha*`
            : roleMentions || "Yok";
        fields.push({ name: "Roller", value: roleSummary, inline: false });
      } catch {
        fields.push({ name: "Roller", value: "*Roller alınamadı*", inline: false });
      }
    } catch {
      fields.push({
        name: "Not",
        value: "*Sunucu üye verisi alınamadı - botun **Server Members Intent** özelliğinin açık olduğundan emin ol.*",
        inline: false,
      });
    }

    return {
      embeds: [
        {
          color: user.accent_color || 0xC9A0DC,
          thumbnail: { url: avatarUrl(user) },
          fields,
        },
      ],
    };
  },
};
