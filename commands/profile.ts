import {
  ApplicationCommandOptionType,
  MessageFlags,
} from "discord-api-types/v10";
import type {
  CommandData,
  CommandExecuteResult,
  SimplifiedInteraction,
} from "../utils/types";

export default {
  data: {
    name: "profile",
    description: "Shows a user's profile picture",
    options: [
      {
        name: "user",
        description: "The user you want to see the profile of",
        type: ApplicationCommandOptionType.User,
        required: true,
      },
    ],
  } as CommandData,
  async execute(data: {
    interaction: SimplifiedInteraction;
  }): CommandExecuteResult {
    const interaction = data.interaction;
    const userId = interaction.data.options?.find(
      (o) => o.name === "user",
    )?.value;

    if (!userId) {
      return {
        content: "Bir kullanıcı belirtmelisin.",
        flags: MessageFlags.Ephemeral,
      };
    }

    const user = interaction.data.resolved?.users?.[userId];
    if (!user) {
      return {
        content: "Kullanıcı bulunamadı.",
        flags: MessageFlags.Ephemeral,
      };
    }

    const isAnimated = user.avatar.startsWith("a_");
    const ext = isAnimated ? "gif" : "png";
    const avatarUrl = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${ext}?size=1024`;

    return {
      embeds: [
        {
          color: 0x5865F2,
          fields: [
            { name: "Username", value: `@${user.username}`, inline: true },
            { name: "ID", value: `\`${user.id}\``, inline: true },
          ],
          image: { url: avatarUrl },
        },
      ],
    };
  },
};
