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
    description: "Shows a user's profile picture",
    options: [
      {
        name: "user",
        description: "The user whose profile you want to see",
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
        content: e.status === 404 ? "User not found." : `Could not fetch profile: ${e.message || e}`,
        flags: MessageFlags.Ephemeral,
      };
    }

    return {
      embeds: [
        {
          color: user.accent_color || 0xC9A0DC,
          image: { url: avatarUrl(user) },
        },
      ],
    };
  },
};
