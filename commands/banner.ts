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

export default {
  data: {
    name: "banner",
    description: "Shows a user's banner",
    options: [
      {
        name: "user",
        description: "The user whose banner you want to see",
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
        content: "You must specify a user.",
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
        content: e.status === 404 ? "User not found." : `Could not fetch banner: ${e.message || e}`,
        flags: MessageFlags.Ephemeral,
      };
    }

    if (!user.banner) {
      const displayName = user.global_name || user.username;
      return {
        content: `**@${displayName}** doesn't have a banner.`,
        flags: MessageFlags.Ephemeral,
      };
    }

    const ext = user.banner.startsWith("a_") ? "gif" : "png";
    const bannerUrl = `https://cdn.discordapp.com/banners/${user.id}/${user.banner}.${ext}?size=1024`;

    return {
      embeds: [
        {
          color: user.accent_color || 0xC9A0DC,
          title: `${user.global_name || user.username}'s banner`,
          image: { url: bannerUrl },
        },
      ],
    };
  },
};
