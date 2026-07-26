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
    description: "Bir kullanıcının profil fotoğrafını gösterir",
    options: [
      {
        name: "kullanici",
        description: "Profilini görmek istediğin kullanıcı",
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
      (o) => o.name === "kullanici",
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
    const avatarUrl = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${ext}`;

    return {
      content: `## ${user.username}
**ID:** \`${user.id}\`
**Avatar:**
${avatarUrl}`,
    };
  },
};
