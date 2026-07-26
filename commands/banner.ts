import {
  ApplicationCommandOptionType,
  MessageFlags,
} from "discord-api-types/v10";
import axios from "axios";
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
        description: "The user you want to see the banner of",
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

    const res = await axios.get(
      `https://discord.com/api/v10/users/${userId}`,
      {
        headers: {
          Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
        },
      },
    );

    const user = res.data;

    if (!user.banner) {
      return {
        content: "This user doesn't have a banner.",
        flags: MessageFlags.Ephemeral,
      };
    }

    const isAnimated = user.banner.startsWith("a_");
    const ext = isAnimated ? "gif" : "png";
    const bannerUrl = `https://cdn.discordapp.com/banners/${user.id}/${user.banner}.${ext}?size=1024`;

    return {
      embeds: [
        {
          color: 0xC9A0DC,
          image: { url: bannerUrl },
        },
      ],
    };
  },
};
