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

function formatMinutes(min: number): string {
  if (min < 60) return `${min} dakika`;
  if (min < 1440) return `${Math.floor(min / 60)} saat ${min % 60 ? (min % 60) + " dakika" : ""}`;
  return `${Math.floor(min / 1440)} gün ${min % 1440 ? Math.floor((min % 1440) / 60) + " saat" : ""}`;
}

export default {
  data: {
    name: "timeout",
    description: "Bir kullanıcıyı belirli bir süre susturur",
    options: [
      {
        name: "user",
        description: "Susturulacak kullanıcı",
        type: ApplicationCommandOptionType.User,
        required: true,
      },
      {
        name: "minutes",
        description: "Süre (dakika, 1-40320 yani 28 gün)",
        type: ApplicationCommandOptionType.Integer,
        required: true,
        min_value: 1,
        max_value: 40320,
      },
      {
        name: "reason",
        description: "Susturma sebebi",
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
    const minutes = Number(
      interaction.data.options?.find((o) => o.name === "minutes")?.value || 0,
    );
    const reason = interaction.data.options?.find((o) => o.name === "reason")?.value || "Sebep belirtilmedi";

    if (!userId) {
      return { content: "Bir kullanıcı belirtmelisin.", flags: MessageFlags.Ephemeral };
    }
    if (minutes < 1) {
      return { content: "Süre en az 1 dakika olmalı.", flags: MessageFlags.Ephemeral };
    }
    if (userId === interaction.member.user.id) {
      return { content: "Kendini susturamazsın.", flags: MessageFlags.Ephemeral };
    }

    const denied = await checkModPermission(interaction, Perm.ModerateMembers);
    if (denied) return { content: denied, flags: MessageFlags.Ephemeral };

    const until = new Date(Date.now() + minutes * 60_000).toISOString();

    try {
      const resolved = interaction.data.resolved?.users?.[userId];
      await discordFetch(
        `https://discord.com/api/v10/guilds/${interaction.guild_id}/members/${userId}`,
        {
          method: "PATCH",
          headers: { ...discordHeaders, "X-Audit-Log-Reason": reason },
          body: JSON.stringify({ communication_disabled_until: until }),
        },
      );
      const name = resolved?.username || userId;
      return {
        content: `**@${name}** **${formatMinutes(minutes)}** süreyle susturuldu.\nSebep: *${reason}*`,
        flags: MessageFlags.Ephemeral,
      };
    } catch (e: any) {
      if (e.status === 403) {
        return { content: "Susturma yetkisi yok veya hedef kullanıcı senden daha yüksek bir role sahip.", flags: MessageFlags.Ephemeral };
      }
      return { content: `Susturma başarısız: ${e.message || e}`, flags: MessageFlags.Ephemeral };
    }
  },
};
