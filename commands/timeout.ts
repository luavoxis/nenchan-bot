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
  if (min < 60) return `${min} minute${min === 1 ? "" : "s"}`;
  if (min < 1440) return `${Math.floor(min / 60)} hour${Math.floor(min / 60) === 1 ? "" : "s"}${min % 60 ? ` ${min % 60} minute${min % 60 === 1 ? "" : "s"}` : ""}`;
  return `${Math.floor(min / 1440)} day${Math.floor(min / 1440) === 1 ? "" : "s"}${min % 1440 ? ` ${Math.floor((min % 1440) / 60)} hour${Math.floor((min % 1440) / 60) === 1 ? "" : "s"}` : ""}`;
}

export default {
  data: {
    name: "timeout",
    description: "Times out a user for a specified duration",
    options: [
      {
        name: "user",
        description: "The user to timeout",
        type: ApplicationCommandOptionType.User,
        required: true,
      },
      {
        name: "minutes",
        description: "Duration in minutes (1-40320, i.e. 28 days)",
        type: ApplicationCommandOptionType.Integer,
        required: true,
        min_value: 1,
        max_value: 40320,
      },
      {
        name: "reason",
        description: "Reason for the timeout",
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
    const reason = interaction.data.options?.find((o) => o.name === "reason")?.value || "No reason provided";

    if (!userId) {
      return { content: "You must specify a user.", flags: MessageFlags.Ephemeral };
    }
    if (minutes < 1) {
      return { content: "Duration must be at least 1 minute.", flags: MessageFlags.Ephemeral };
    }
    if (userId === interaction.member.user.id) {
      return { content: "You can't timeout yourself.", flags: MessageFlags.Ephemeral };
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
        content: `**@${name}** was timed out for **${formatMinutes(minutes)}**.\nReason: *${reason}*`,
        flags: MessageFlags.Ephemeral,
      };
    } catch (e: any) {
      if (e.status === 403) {
        return { content: "No permission to timeout, or the target user has a higher role than you.", flags: MessageFlags.Ephemeral };
      }
      return { content: `Timeout failed: ${e.message || e}`, flags: MessageFlags.Ephemeral };
    }
  },
};
