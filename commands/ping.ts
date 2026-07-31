import type {
  CommandData,
  CommandExecuteResult,
  SimplifiedInteraction,
} from "../utils/types";

export default {
  data: {
    name: "ping",
    description: "Checks if the bot is online and shows latency",
  } as CommandData,
  async execute(data: {
    interaction: SimplifiedInteraction;
  }): CommandExecuteResult {
    const start = Date.now();
    return {
      content: `Pong! Latency: **${Date.now() - start}ms**`,
    };
  },
};
