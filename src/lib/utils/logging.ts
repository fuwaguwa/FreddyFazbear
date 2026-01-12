import {
  type ChatInputCommandSuccessPayload,
  type Command,
  type ContextMenuCommandSuccessPayload,
  container,
  type MessageCommandSuccessPayload,
} from "@sapphire/framework";
import type {
  ChatInputCommandSubcommandMappingMethod,
  ChatInputSubcommandSuccessPayload,
} from "@sapphire/plugin-subcommands";
import { type Guild, InteractionContextType, type User } from "discord.js";

/**
 * Log successful command execution
 */
export function logSuccessfulCommand(
  payload:
    | ContextMenuCommandSuccessPayload
    | ChatInputCommandSuccessPayload
    | MessageCommandSuccessPayload
    | ChatInputSubcommandSuccessPayload,
  subcommand?: ChatInputCommandSubcommandMappingMethod
): void {
  let guild: Guild | null;
  let user: User;
  let command: Command;
  let contextInfo: string;

  if ("interaction" in payload) {
    guild = payload.interaction.guild;
    user = payload.interaction.user;
    command = payload.command;

    const context = payload.interaction.context;
    if (context === InteractionContextType.Guild && guild) {
      contextInfo = `${guild.name} (${guild.id})`;
    } else if (context === InteractionContextType.BotDM) {
      contextInfo = "Bot DM";
    } else if (context === InteractionContextType.PrivateChannel) {
      contextInfo = "Private Channel (User Install)";
    } else if (guild) {
      contextInfo = `${guild.name} (${guild.id})`;
    } else {
      contextInfo = "DM";
    }
  } else {
    guild = payload.message.guild;
    user = payload.message.author;
    command = payload.command;
    contextInfo = guild ? `${guild.name} (${guild.id})` : "DM";
  }

  const shardId = guild?.shardId ?? 0;
  const subcommandName = subcommand ? ` ${subcommand.name}` : "";

  container.logger.info(
    `[Shard ${shardId}] ${command.name}${subcommandName} | ${user.username} (${user.id}) | ${contextInfo}`
  );
}
