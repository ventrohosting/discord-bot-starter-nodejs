import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('ping')
  .setDescription('Antwortet mit Pong und der Latenz');

export async function execute(interaction) {
  await interaction.reply(`Pong! ${Math.round(interaction.client.ws.ping)} ms`);
}
