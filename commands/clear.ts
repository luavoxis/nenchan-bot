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
    description: "Deletes a number of messages in the channel",
    options: [
      {
        name: "amount",
        description: "Number of messages to delete (1-100)",
        type: ApplicationCommandOptionType.Integer,
        required: true,
        min_value: 1,
        max_value: 100,
      },
      {
        name: "user",
        description: "Only delete this user's messages",
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
      return { content: "Message count must be between 1-100.", flags: MessageFlags.Ephemeral };
    }

    const denied = await checkModPermission(interaction, Perm.ManageMessages);
    if (denied) return { content: denied, flags: MessageFlags.Ephemeral };

    try {
      const messages = await discordFetch(
        `https://discord.com/api/v10/channels/${channelId}/messages?limit=${Math.min(amount * 2, 100)}`,
        { headers: discordHeaders },
      );

      if (!Array.isArray(messages) || messages.length === 0) {
        return { content: "No messages found to delete.", flags: MessageFlags.Ephemeral };
      }

      let toDelete = filterUserId
        ? messages.filter((m: any) => m.author.id === filterUserId)
        : messages;

      if (!filterUserId) {
        toDelete = messages.slice(0, amount);
      }

      if (toDelete.length === 0) {
        return { content: "No messages from this user found to delete.", flags: MessageFlags.Ephemeral };
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
        content: `${toDelete.length} message${toDelete.length === 1 ? "" : "s"} deleted${filterUserId ? " (filtered)" : ""}.`,
        flags: MessageFlags.Ephemeral,
      };
    } catch (e: any) {
      if (e.status === 403) {
        return { content: "No permission to delete messages.", flags: MessageFlags.Ephemeral };
      }
      return { content: `Delete failed: ${e.message || e}`, flags: MessageFlags.Ephemeral };
    }
  },
};
