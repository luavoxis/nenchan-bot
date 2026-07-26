// index.ts
import axios from "axios";
import { InteractionResponseType, MessageFlags as MessageFlags3 } from "discord-api-types/v10";
import { InteractionType as InteractionType2, verifyKey } from "discord-interactions";
import getRawBody from "raw-body";

// commands/profile.ts
import {
  ApplicationCommandOptionType,
  MessageFlags
} from "discord-api-types/v10";
var profile_default = {
  data: {
    name: "profile",
    description: "Shows a user's profile picture",
    options: [
      {
        name: "user",
        description: "The user you want to see the profile of",
        type: ApplicationCommandOptionType.User,
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
        flags: MessageFlags.Ephemeral
      };
    }
    const user = interaction.data.resolved?.users?.[userId];
    if (!user) {
      return {
        content: "Kullan\u0131c\u0131 bulunamad\u0131.",
        flags: MessageFlags.Ephemeral
      };
    }
    const isAnimated = user.avatar.startsWith("a_");
    const ext = isAnimated ? "gif" : "png";
    const avatarUrl = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${ext}?size=1024`;
    return {
      embeds: [
        {
          title: user.global_name ?? user.username,
          color: 5793266,
          thumbnail: { url: avatarUrl },
          fields: [
            { name: "Username", value: `@${user.username}`, inline: true },
            { name: "ID", value: `\`${user.id}\``, inline: true }
          ],
          image: { url: avatarUrl },
          footer: { text: "Discord Profile" }
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
  ApplicationCommandOptionType as ApplicationCommandOptionType2,
  ApplicationCommandType,
  MessageFlags as MessageFlags2
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
        type: ApplicationCommandOptionType2.String,
        required: true
      },
      {
        name: "image",
        // The name of the image option
        description: "Optional image to include in the prompt",
        // The description of the image option
        type: ApplicationCommandOptionType2.Attachment,
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
        flags: MessageFlags2.Ephemeral
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
        flags: MessageFlags2.Ephemeral
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
        flags: MessageFlags2.Ephemeral
      };
    }
  }
};

// .discraft/commands/index.ts
var commands_default = {
  profile: profile_default,
  ping: ping_default,
  chat: chat_default
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
          await axios.post(
            `https://discord.com/api/v10/interactions/${message.id}/${message.token}/callback`,
            {
              type: InteractionResponseType.DeferredChannelMessageWithSource,
              data: {
                flags: command.data.initialEphemeral ? MessageFlags3.Ephemeral : 0
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
          commandResult = {
            content: "An error occurred while processing your request.",
            flags: MessageFlags3.Ephemeral
          };
        }
        try {
          await axios.patch(
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
