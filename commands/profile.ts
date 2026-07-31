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

function avatarUrl(user: any): string {
  if (!user.avatar) {
    return `https://cdn.discordapp.com/embed/avatars/${Number(user.discriminator || 0) % 5}.png`;
  }
  const ext = user.avatar.startsWith("a_") ? "gif" : "png";
  return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${ext}?size=1024`;
}

export default {
  data: {
    name: "profile",
    description: "Bir kullanıcının profil fotoğrafını gösterir",
    options: [
      {
        name: "user",
        description: "Profilini görmek istediğin kullanıcı",
        type: ApplicationCommandOptionType.User,
        required: true,
      },
    ],
  } as CommandData,
  async execute(data: {
    interaction: SimplifiedInteraction;
  }): CommandExecuteResult {
    const userId = data.interaction.data.options?.find(
      (o) => o.name === "user",
    )?.value;

    if (!userId) {
      return {
        content: "Bir kullanıcı belirtmelisin.",
        flags: MessageFlags.Ephemeral,
      };
    }

    let user: any;
    try {
      user = await discordFetch(
        `https://discord.com/api/v10/users/${userId}`,
        { headers: discordHeaders },
      );
    } catch (e: any) {
      return {
        content: e.status === 404 ? "Kullanıcı bulunamadı." : `Profil alınamadı: ${e.message || e}`,
        flags: MessageFlags.Ephemeral,
      };
    }

    const resolved = data.interaction.data.resolved?.users?.[userId];
    const displayName = resolved?.username || user.global_name || user.username;

    return {
      embeds: [
        {
          color: user.accent_color || 0xC9A0DC,
          title: `${displayName} profil fotoğrafı`,
          fields: [
            { name: "Kullanıcı Adı", value: `@${user.username}`, inline: true },
            { name: "ID", value: `\`${user.id}\``, inline: true },
          ],
          image: { url: avatarUrl(user) },
          footer: user.bot ? { text: "Bot hesabı" } : undefined,
        },
      ],
    };
  },
};
