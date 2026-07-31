import {
  ApplicationCommandOptionType,
  MessageFlags,
} from "discord-api-types/v10";
import { discordFetch, discordHeaders } from "../utils/discordFetch";
import { Perm, checkModPermission, findTargetId } from "../utils/permissions";
import type {
  CommandData,
  CommandExecuteResult,
  SimplifiedInteraction,
} from "../utils/types";

export default {
  data: {
    name: "kick",
    description: "Bir kullanıcıyı sunucudan atar",
    options: [
      {
        name: "user",
        description: "Atılacak kullanıcı",
        type: ApplicationCommandOptionType.User,
        required: true,
      },
      {
        name: "reason",
        description: "Atma sebebi",
        type: ApplicationCommandOptionType.String,
        required: false,
      },
    ],
  } as CommandData,
  async execute(data: {
    interaction: SimplifiedInteraction;
  }): CommandExecuteResult {
    const interaction = data.interaction;
    const userId = findTargetId(interaction);
    const reason = interaction.data.options?.find((o) => o.name === "reason")?.value || "Sebep belirtilmedi";

    if (!userId) {
      return { content: "Bir kullanıcı belirtmelisin.", flags: MessageFlags.Ephemeral };
    }
    if (userId === interaction.member.user.id) {
      return { content: "Kendini atamazsın.", flags: MessageFlags.Ephemeral };
    }

    const denied = await checkModPermission(interaction, Perm.KickMembers);
    if (denied) return { content: denied, flags: MessageFlags.Ephemeral };

    try {
      const resolved = interaction.data.resolved?.users?.[userId];
      await discordFetch(
        `https://discord.com/api/v10/guilds/${interaction.guild_id}/members/${userId}`,
        {
          method: "DELETE",
          headers: { ...discordHeaders, "X-Audit-Log-Reason": reason },
        },
      );
      const name = resolved?.username || userId;
      return {
        content: `**@${name}** sunucudan atıldı.\nSebep: *${reason}*`,
        flags: MessageFlags.Ephemeral,
      };
    } catch (e: any) {
      if (e.status === 403) {
        return { content: "Atma yetkisi yok veya hedef kullanıcı senden daha yüksek bir role sahip.", flags: MessageFlags.Ephemeral };
      }
      return { content: `Atma başarısız: ${e.message || e}`, flags: MessageFlags.Ephemeral };
    }
  },
};
