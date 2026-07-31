import {
  ApplicationCommandOptionType,
  MessageFlags,
} from "discord-api-types/v10";
import { discordFetch, discordHeaders } from "../utils/discordFetch";
import { Perm, checkModPermission } from "../utils/permissions";
import type {
  CommandData,
  CommandExecuteResult,
  SimplifiedInteraction,
} from "../utils/types";

export default {
  data: {
    name: "clear",
    description: "Kanalda belirli sayıda mesajı siler",
    options: [
      {
        name: "amount",
        description: "Silinecek mesaj sayısı (1-100)",
        type: ApplicationCommandOptionType.Integer,
        required: true,
        min_value: 1,
        max_value: 100,
      },
      {
        name: "user",
        description: "Sadece bu kullanıcının mesajlarını sil",
        type: ApplicationCommandOptionType.User,
        required: false,
      },
    ],
  } as CommandData,
  async execute(data: {
    interaction: SimplifiedInteraction;
  }): CommandExecuteResult {
    const interaction = data.interaction;
    const amount = Number(
      interaction.data.options?.find((o) => o.name === "amount")?.value || 0,
    );
    const filterUserId = interaction.data.options?.find((o) => o.name === "user")?.value;
    const channelId = interaction.channel_id;

    if (amount < 1 || amount > 100) {
      return { content: "Mesaj sayısı 1-100 arasında olmalı.", flags: MessageFlags.Ephemeral };
    }

    const denied = await checkModPermission(interaction, Perm.ManageMessages);
    if (denied) return { content: denied, flags: MessageFlags.Ephemeral };

    try {
      const messages = await discordFetch(
        `https://discord.com/api/v10/channels/${channelId}/messages?limit=${Math.min(amount * 2, 100)}`,
        { headers: discordHeaders },
      );

      if (!Array.isArray(messages) || messages.length === 0) {
        return { content: "Silinecek mesaj bulunamadı.", flags: MessageFlags.Ephemeral };
      }

      let toDelete = filterUserId
        ? messages.filter((m: any) => m.author.id === filterUserId)
        : messages;

      if (!filterUserId) {
        toDelete = messages.slice(0, amount);
      }

      if (toDelete.length === 0) {
        return { content: "Bu kullanıcının silinecek mesajı bulunamadı.", flags: MessageFlags.Ephemeral };
      }

      if (toDelete.length > 100) toDelete = toDelete.slice(0, 100);

      await discordFetch(
        `https://discord.com/api/v10/channels/${channelId}/messages/bulk-delete`,
        {
          method: "POST",
          headers: discordHeaders,
          body: JSON.stringify({ messages: toDelete.map((m: any) => m.id) }),
        },
      );

      return {
        content: `${toDelete.length} mesaj silindi${filterUserId ? " (filtrelenmiş)" : ""}.`,
        flags: MessageFlags.Ephemeral,
      };
    } catch (e: any) {
      if (e.status === 403) {
        return { content: "Mesaj silme yetkisi yok.", flags: MessageFlags.Ephemeral };
      }
      return { content: `Silme başarısız: ${e.message || e}`, flags: MessageFlags.Ephemeral };
    }
  },
};
