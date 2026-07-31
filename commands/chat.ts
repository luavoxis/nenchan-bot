import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  type APIApplicationCommandOption,
  ApplicationCommandOptionType,
  ApplicationCommandType,
  MessageFlags,
} from "discord-api-types/v10";
import type {
  CommandData,
  CommandExecuteResult,
  SimplifiedInteraction,
} from "../utils/types";

export default {
  data: {
    name: "chat",
    description: "Gemini AI ile sohbet et",
    options: [
      {
        name: "prompt",
        description: "AI'ya soracağın şey",
        type: ApplicationCommandOptionType.String,
        required: true,
      },
      {
        name: "image",
        description: "Prompt'a eklenecek görsel (opsiyonel)",
        type: ApplicationCommandOptionType.Attachment,
        required: false,
      },
    ],
  } as CommandData,
  async execute(data: {
    interaction: SimplifiedInteraction;
  }): CommandExecuteResult {
    const apiKey = process.env.GOOGLE_AI_API_KEY;
    if (!apiKey) {
      return {
        content: "Bu komut şu anda ayarlanmamış (GOOGLE_AI_API_KEY eksik). Sunucu sahibiyle iletişime geç.",
        flags: MessageFlags.Ephemeral,
      };
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: process.env.GOOGLE_AI_MODEL || "gemini-1.5-flash",
    });

    const interaction = data.interaction;

    if (interaction.data.type !== ApplicationCommandType.ChatInput) {
      return {
        content: "Bu komut sadece slash (chat input) komutu olarak kullanılabilir.",
        flags: MessageFlags.Ephemeral,
      };
    }

    const promptOption = interaction.data.options?.find(
      (option) => option.name === "prompt",
    ) as (APIApplicationCommandOption & { value: string }) | undefined;
    const imageOption = interaction.data.options?.find(
      (option) => option.name === "image",
    ) as (APIApplicationCommandOption & { value: string }) | undefined;
    const prompt = promptOption?.value || "";
    const imageAttachment =
      interaction.data.resolved?.attachments?.[imageOption?.value || ""];

    if (prompt.length > 2000) {
      return {
        content: "Prompt 2000 karakterden kısa olmalı.",
        flags: MessageFlags.Ephemeral,
      };
    }

    try {
      let parts: any[] = [prompt];
      if (imageAttachment) {
        const imageBuffer = await (
          await fetch(imageAttachment.url)
        ).arrayBuffer();
        parts = [
          prompt,
          {
            inlineData: {
              data: Buffer.from(imageBuffer).toString("base64"),
              mimeType: imageAttachment.content_type,
            },
          },
        ];
      }

      const result = await model.generateContent(parts);
      const response = result.response.text();

      const truncated =
        response.length > 1900
          ? response.slice(0, 1900) + "\n...[2000 karakter sınırı için kısaltıldı]"
          : response;

      return { content: truncated };
    } catch (error) {
      console.error("Error during AI chat:", error);
      return {
        content: "İstek işlenirken bir hata oluştu.",
        flags: MessageFlags.Ephemeral,
      };
    }
  },
};
