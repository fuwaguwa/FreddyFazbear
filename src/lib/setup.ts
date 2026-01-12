import { ApplicationCommandRegistries, RegisterBehavior } from "@sapphire/framework";
import "@sapphire/plugin-logger/register";
import "@sapphire/plugin-subcommands/register";
import { config } from "dotenv";

config({ path: `.env.${process.env.NODE_ENV}` });

// Validate required environment variables
const requiredEnvVars = [
  "NODE_ENV",
  "SOCKS_PROXY",
  "BOT_TOKEN",
  "MONGODB_URI",
  "GELBOORU_API_KEY",
  "GELBOORU_USER_ID",
  "RULE34_API_KEY",
  "RULE34_USER_ID",
] as const;

const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.error("❌ Missing required environment variables:");
  process.exit(1);
}

// Set default behavior for slash commands
ApplicationCommandRegistries.setDefaultBehaviorWhenNotIdentical(RegisterBehavior.BulkOverwrite);
