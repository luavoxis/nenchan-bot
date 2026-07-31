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
    description: "Kicks a user from the server",
    options: [
      {
        name: "user",
        description: "The user to kick",
        type: ApplicationCommandOptionType.User,
        required: true,
      },
      {
        name: "reason",
        description: "Reason for the kick",
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
    const reason = interaction.data.options?.find((o) => o.name === "reason")?.value || "No reason provided";

    if (!userId) {
      return { content: "You must specify a user.", flags: MessageFlags.Ephemeral };
    }
    if (userId === interaction.member.user.id) {
      return { content: "You can't kick yourself.", flags: MessageFlags.Ephemeral };
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
        content: `**@${name}** was kicked from the server.\nReason: *${reason}*`,
        flags: MessageFlags.Ephemeral,
      };
    } catch (e: any) {
      if (e.status === 403) {
        return { content: "No permission to kick, or the target user has a higher role than you.", flags: MessageFlags.Ephemeral };
      }
      return { content: `Kick failed: ${e.message || e}`, flags: MessageFlags.Ephemeral };
    }
  },
};
