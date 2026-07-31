import { discordFetch, discordHeaders } from "./discordFetch";
import type { SimplifiedInteraction } from "./types";

export const Perm = {
  KickMembers: 1n << 1n,
  BanMembers: 1n << 2n,
  ManageMessages: 1n << 13n,
  ModerateMembers: 1n << 40n,
} as const;

export function hasPerm(permissions: string | bigint | undefined, perm: bigint): boolean {
  try {
    return (BigInt(permissions || 0) & perm) === perm;
  } catch {
    return false;
  }
}

const PERM_NAMES: Record<bigint, string> = {
  [Perm.KickMembers]: "Kick Members",
  [Perm.BanMembers]: "Ban Members",
  [Perm.ManageMessages]: "Manage Messages",
  [Perm.ModerateMembers]: "Moderate Members",
};

export function permName(perm: bigint): string {
  return PERM_NAMES[perm] || "Required Permission";
}

export async function getGuildPermissions(
  guildId: string,
  userId: string,
): Promise<bigint> {
  try {
    const [member, roles] = await Promise.all([
      discordFetch(`https://discord.com/api/v10/guilds/${guildId}/members/${userId}`, { headers: discordHeaders }),
      discordFetch(`https://discord.com/api/v10/guilds/${guildId}/roles`, { headers: discordHeaders }),
    ]);
    if (!Array.isArray(roles)) return 0n;
    let perms = 0n;
    const everyone = roles.find((r: any) => r.id === guildId);
    if (everyone) perms |= BigInt(everyone.permissions || 0);
    const memberRoleIds: string[] = Array.isArray(member?.roles) ? member.roles : [];
    for (const r of roles) {
      if (r.id !== guildId && memberRoleIds.includes(r.id)) {
        perms |= BigInt(r.permissions || 0);
      }
    }
    return perms;
  } catch {
    return 0n;
  }
}

export async function checkModPermission(
  interaction: SimplifiedInteraction,
  required: bigint,
): Promise<string | null> {
  if (!hasPerm(interaction.member.permissions, required)) {
    return `You need the **${permName(required)}** permission to do this.`;
  }
  const botPerms = await getGuildPermissions(interaction.guild_id, interaction.application_id);
  if (!hasPerm(botPerms, required)) {
    return `The bot is missing the **${permName(required)}** permission. Remove and re-invite the bot.`;
  }
  return null;
}

export function findTargetId(interaction: SimplifiedInteraction, optionName = "user"): string | undefined {
  return interaction.data.options?.find((o) => o.name === optionName)?.value;
}
