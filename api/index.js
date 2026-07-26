// index.ts
import axios3 from "axios";
import { InteractionResponseType, MessageFlags as MessageFlags5 } from "discord-api-types/v10";
import { InteractionType as InteractionType2, verifyKey } from "discord-interactions";
import getRawBody from "raw-body";

// commands/userinfo.ts
import {
  ApplicationCommandOptionType
} from "discord-api-types/v10";
import axios from "axios";
function snowflakeToDate(id) {
  const timestamp = Number(BigInt(id) >> 22n) + 14200704e5;
  return new Date(timestamp).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}
var userinfo_default = {
  data: {
    name: "userinfo",
    description: "Shows detailed information about a user",
    options: [
      {
        name: "user",
        description: "The user to inspect (defaults to you)",
        type: ApplicationCommandOptionType.User,
        required: false
      }
    ]
  },
  async execute(data) {
    const interaction = data.interaction;
    const targetId = interaction.data.options?.find((o) => o.name === "user")?.value || interaction.member.user.id;
    const headers = {
      Authorization: `Bot ${process.env.DISCORD_TOKEN}`
    };
    const userRes = await axios.get(
      `https://discord.com/api/v10/users/${targetId}`,
      { headers }
    );
    const user = userRes.data;
    const isAnimated = user.avatar?.startsWith("a_");
    const ext = isAnimated ? "gif" : "png";
    const avatarUrl = user.avatar ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${ext}?size=1024` : `https://cdn.discordapp.com/embed/avatars/${Number(user.discriminator) % 5}.png`;
    const fields = [
      { name: "Username", value: `@${user.username}`, inline: true },
      { name: "Display Name", value: user.global_name || user.username, inline: true },
      { name: "ID", value: `\`${user.id}\``, inline: false },
      { name: "Bot", value: user.bot ? "Yes" : "No", inline: true },
      { name: "Joined Discord", value: snowflakeToDate(user.id), inline: true }
    ];
    if (user.accent_color) {
      fields.push({
        name: "Accent Color",
        value: `\`#${user.accent_color.toString(16).padStart(6, "0")}\``,
        inline: true
      });
    }
    const badges = [];
    const flags = user.public_flags ?? 0;
    if (flags & 1 << 0) badges.push("Discord Staff");
    if (flags & 1 << 1) badges.push("Partner");
    if (flags & 1 << 2) badges.push("HypeSquad Events");
    if (flags & 1 << 3) badges.push("Bug Hunter Lv1");
    if (flags & 1 << 6) badges.push("HypeSquad Bravery");
    if (flags & 1 << 7) badges.push("HypeSquad Brilliance");
    if (flags & 1 << 8) badges.push("HypeSquad Balance");
    if (flags & 1 << 9) badges.push("Early Supporter");
    if (flags & 1 << 10) badges.push("Team User");
    if (flags & 1 << 14) badges.push("Bug Hunter Lv2");
    if (flags & 1 << 16) badges.push("Verified Bot Dev");
    if (flags & 1 << 17) badges.push("Certified Moderator");
    if (flags & 1 << 18) badges.push("Bot HTTP Interactions");
    if (flags & 1 << 19) badges.push("Active Developer");
    if (badges.length) {
      fields.push({ name: "Badges", value: badges.join(", "), inline: false });
    }
    try {
      const memberRes = await axios.get(
        `https://discord.com/api/v10/guilds/${interaction.guild_id}/members/${targetId}`,
        { headers }
      );
      const member = memberRes.data;
      fields.splice(2, 0, {
        name: "Nickname",
        value: member.nick || "None",
        inline: true
      });
      const joinedAt = new Date(member.joined_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
      fields.push({ name: "Joined Server", value: joinedAt, inline: true });
      try {
        const rolesRes = await axios.get(
          `https://discord.com/api/v10/guilds/${interaction.guild_id}/roles`,
          { headers }
        );
        const allRoles = rolesRes.data;
        const memberRoleIds = member.roles;
        const memberRoles = allRoles.filter((r) => memberRoleIds.includes(r.id)).sort(
          (a, b) => b.position - a.position
        );
        fields.push({
          name: "Top Role",
          value: memberRoles[0]?.name || "None",
          inline: true
        });
        const roleMentions = memberRoles.slice(0, 10).map((r) => `<@&${r.id}>`).join(" ");
        const roleSummary = memberRoles.length > 10 ? `${roleMentions} *+${memberRoles.length - 10} more*` : roleMentions || "None";
        fields.push({ name: "Roles", value: roleSummary, inline: false });
      } catch {
        fields.push({
          name: "Roles",
          value: "*Could not fetch roles*",
          inline: false
        });
      }
    } catch {
      fields.push({ name: "Note", value: "*Server member details unavailable (enable Server Members Intent in Discord Developer Portal)*", inline: false });
    }
    return {
      embeds: [
        {
          color: user.accent_color || 5793266,
          thumbnail: { url: avatarUrl },
          fields
        }
      ]
    };
  }
};

// commands/profile.ts
import {
  ApplicationCommandOptionType as ApplicationCommandOptionType2,
  MessageFlags as MessageFlags2
} from "discord-api-types/v10";
var profile_default = {
  data: {
    name: "profile",
    description: "Shows a user's profile picture",
    options: [
      {
        name: "user",
        description: "The user you want to see the profile of",
        type: ApplicationCommandOptionType2.User,
        required: true
      }
    ]
  },
  async execute(data) {
    const interaction = data.interaction;
    const userId = interaction.data.options?.find(
      (o) => o.name === "user"
    )?.value;
    if (!userId) {
      return {
        content: "Bir kullan\u0131c\u0131 belirtmelisin.",
        flags: MessageFlags2.Ephemeral
      };
    }
    const user = interaction.data.resolved?.users?.[userId];
    if (!user) {
      return {
        content: "Kullan\u0131c\u0131 bulunamad\u0131.",
        flags: MessageFlags2.Ephemeral
      };
    }
    const isAnimated = user.avatar.startsWith("a_");
    const ext = isAnimated ? "gif" : "png";
    const avatarUrl = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${ext}?size=1024`;
    return {
      embeds: [
        {
          color: 5793266,
          fields: [
            { name: "Username", value: `@${user.username}`, inline: true },
            { name: "ID", value: `\`${user.id}\``, inline: true }
          ],
          image: { url: avatarUrl }
        }
      ]
    };
  }
};

// commands/ping.ts
var ping_default = {
  data: {
    name: "ping",
    // The name of the command
    description: "Check if the bot is online"
    // The description of the command
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(data) {
    return {
      content: "Pong from Vercel!"
      // The message content
    };
  }
};

// commands/chat.ts
import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  ApplicationCommandOptionType as ApplicationCommandOptionType3,
  ApplicationCommandType,
  MessageFlags as MessageFlags3
} from "discord-api-types/v10";
var chat_default = {
  data: {
    name: "chat",
    // The name of the command
    description: "Chat with Gemini AI",
    // The description of the command
    options: [
      {
        name: "prompt",
        // The name of the prompt option
        description: "The prompt for the AI",
        // The description of the prompt option
        type: ApplicationCommandOptionType3.String,
        required: true
      },
      {
        name: "image",
        // The name of the image option
        description: "Optional image to include in the prompt",
        // The description of the image option
        type: ApplicationCommandOptionType3.Attachment,
        required: false
      }
    ]
  },
  async execute(data) {
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || "");
    const model = genAI.getGenerativeModel({
      model: process.env.GOOGLE_AI_MODEL || "gemini-1.5-flash"
    });
    const interaction = data.interaction;
    if (interaction.data.type !== ApplicationCommandType.ChatInput) {
      return {
        content: "This command can only be used as a chat input (slash) command.",
        flags: MessageFlags3.Ephemeral
        // Make the response visible only to the user
      };
    }
    const chatInteraction = interaction;
    const promptOption = chatInteraction.data.options?.find(
      (option) => option.name === "prompt"
    );
    const imageOption = chatInteraction.data.options?.find(
      (option) => option.name === "image"
    );
    const prompt = promptOption?.value || "";
    const imageAttachment = chatInteraction.data.resolved?.attachments?.[imageOption?.value || ""];
    if (prompt.length > 2e3) {
      return {
        content: "Prompt must be less than 2000 characters.",
        flags: MessageFlags3.Ephemeral
      };
    }
    try {
      let parts = [prompt];
      if (imageAttachment) {
        const imageBuffer = await (await fetch(imageAttachment.url)).arrayBuffer();
        const imageBase64 = Buffer.from(imageBuffer).toString("base64");
        const image = {
          inlineData: {
            data: imageBase64,
            // The base64 encoded image data
            mimeType: imageAttachment.content_type
            // The MIME type of the image
          }
        };
        parts = [prompt, image];
      }
      const result = await model.generateContent(parts);
      const response = result.response.text();
      const truncatedResponse = response.length > 1900 ? response.slice(0, 1900) + "\n...[truncated to keep below 2000 characters]" : response;
      return {
        content: truncatedResponse
      };
    } catch (error) {
      console.error("Error during AI chat:", error);
      return {
        content: "An error occurred while processing your request.",
        flags: MessageFlags3.Ephemeral
      };
    }
  }
};

// commands/banner.ts
import {
  ApplicationCommandOptionType as ApplicationCommandOptionType4,
  MessageFlags as MessageFlags4
} from "discord-api-types/v10";
import axios2 from "axios";
var banner_default = {
  data: {
    name: "banner",
    description: "Shows a user's banner",
    options: [
      {
        name: "user",
        description: "The user you want to see the banner of",
        type: ApplicationCommandOptionType4.User,
        required: true
      }
    ]
  },
  async execute(data) {
    const userId = data.interaction.data.options?.find(
      (o) => o.name === "user"
    )?.value;
    if (!userId) {
      return {
        content: "You must specify a user.",
        flags: MessageFlags4.Ephemeral
      };
    }
    const res = await axios2.get(
      `https://discord.com/api/v10/users/${userId}`,
      {
        headers: {
          Authorization: `Bot ${process.env.DISCORD_TOKEN}`
        }
      }
    );
    const user = res.data;
    if (!user.banner) {
      return {
        content: "This user doesn't have a banner.",
        flags: MessageFlags4.Ephemeral
      };
    }
    const isAnimated = user.banner.startsWith("a_");
    const ext = isAnimated ? "gif" : "png";
    const bannerUrl = `https://cdn.discordapp.com/banners/${user.id}/${user.banner}.${ext}?size=1024`;
    return {
      embeds: [
        {
          color: 5793266,
          image: { url: bannerUrl }
        }
      ]
    };
  }
};

// .discraft/commands/index.ts
var commands_default = {
  userinfo: userinfo_default,
  profile: profile_default,
  ping: ping_default,
  chat: chat_default,
  banner: banner_default
};

// utils/logger.ts
import consola from "consola";

// utils/types.ts
import "discord-interactions";

// index.ts
async function handler(req, res) {
  try {
    consola.debug("Request received", { method: req.method, url: req.url });
    if (req.method !== "POST") {
      consola.warn("Method not allowed", { method: req.method });
      return res.status(405).send({ error: "Method Not Allowed" });
    }
    const signature = req.headers["x-signature-ed25519"];
    const timestamp = req.headers["x-signature-timestamp"];
    if (!signature || !timestamp || typeof signature !== "string" || typeof timestamp !== "string") {
      consola.error("Invalid request headers", { signature, timestamp });
      return res.status(401).send({ error: "Invalid request headers" });
    }
    if (!process.env.DISCORD_PUBLIC_KEY) {
      consola.error("DISCORD_PUBLIC_KEY environment variable not set");
      return res.status(500).send({ error: "Internal server configuration error" });
    }
    const rawBody = await getRawBody(req);
    if (!rawBody) {
      consola.error("Missing request body");
      return res.status(400).send({ error: "Missing request body" });
    }
    let isValidRequest = false;
    try {
      isValidRequest = await verifyKey(
        rawBody,
        signature,
        timestamp,
        process.env.DISCORD_PUBLIC_KEY
      );
    } catch (err) {
      consola.error("Signature verification failed", {
        error: err,
        signature,
        timestamp
      });
      return res.status(401).send({ error: "Invalid request signature" });
    }
    if (!isValidRequest) {
      consola.error("Invalid request signature", { signature, timestamp });
      return res.status(401).send({ error: "Invalid request signature" });
    }
    const message = JSON.parse(rawBody.toString());
    consola.debug("Parsed message", { message });
    if (message.type === InteractionType2.PING) {
      consola.debug("Handling Ping request");
      return res.status(200).json({ type: InteractionResponseType.Pong });
    } else if (message.type === InteractionType2.APPLICATION_COMMAND) {
      const commandName = message.data.name.toLowerCase();
      consola.debug("Handling application command", { commandName });
      const command = commands_default[commandName];
      if (command) {
        try {
          await axios3.post(
            `https://discord.com/api/v10/interactions/${message.id}/${message.token}/callback`,
            {
              type: InteractionResponseType.DeferredChannelMessageWithSource,
              data: {
                flags: command.data.initialEphemeral ? MessageFlags5.Ephemeral : 0
              }
            },
            {
              headers: { "Content-Type": "application/json" }
            }
          );
        } catch (deferError) {
          consola.error("Failed to defer command", { deferError });
          return res.status(500).json({ error: "Failed to defer command" });
        }
        let commandResult;
        try {
          commandResult = await command.execute({ interaction: message });
          consola.debug("Command executed successfully", { commandName });
        } catch (error) {
          consola.error("Error executing command", {
            commandName,
            error
          });
          const errMsg = error instanceof Error ? error.message : "Unknown error";
          commandResult = {
            flags: MessageFlags5.Ephemeral,
            embeds: [
              {
                color: 15548997,
                title: "Command Error",
                fields: [
                  { name: "Command", value: `/${commandName}`, inline: true },
                  {
                    name: "Error",
                    value: `\`\`\`
${errMsg.length > 1e3 ? errMsg.slice(0, 1e3) + "..." : errMsg}
\`\`\``,
                    inline: false
                  }
                ]
              }
            ]
          };
        }
        try {
          await axios3.patch(
            `https://discord.com/api/v10/webhooks/${message.application_id}/${message.token}/messages/@original`,
            {
              content: commandResult.content ?? "",
              flags: commandResult.flags,
              embeds: commandResult.embeds
            },
            {
              headers: {
                "Content-Type": "application/json"
              }
            }
          );
          consola.debug("Original response edited successfully");
          return res.status(200).end();
        } catch (patchError) {
          consola.error("Failed to edit original response", {
            patchError
          });
          return res.status(500).json({ error: "Failed to update the message." });
        }
      }
      consola.warn("Unknown command", { commandName });
      return res.status(400).json({ error: "Unknown Command" });
    } else {
      consola.warn("Unknown Interaction Type", { type: message.type });
      return res.status(400).json({ error: "Unknown Interaction Type" });
    }
  } catch (error) {
    consola.error("Error processing request", {
      error
    });
    return res.status(500).json({
      error: "Failed to process request",
      details: error instanceof Error ? error.message : "Unknown error"
    });
  }
}
export {
  handler as default
};
