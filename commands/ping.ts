import type {
  CommandData,
  CommandExecuteResult,
  SimplifiedInteraction,
} from "../utils/types";

export default {
  data: {
    name: "ping",
    description: "Bot çevrimiçi mi ve gecikme ne kadar?",
  } as CommandData,
  async execute(data: {
    interaction: SimplifiedInteraction;
  }): CommandExecuteResult {
    const start = Date.now();
    return {
      content: `Pong! Gecikme: **${Date.now() - start}ms**`,
    };
  },
};
