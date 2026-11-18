import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('info')
  .setDescription('Zeigt Informationen zu diesem Server');

export async function execute(interaction) {
  if (!interaction.inGuild()) {
    await interaction.reply({ content: 'Dieser Befehl funktioniert nur auf einem Server.', ephemeral: true });
    return;
  }
  const guild = interaction.guild;
  const embed = new EmbedBuilder()
    .setTitle(guild.name)
    .addFields(
      { name: 'Mitglieder', value: String(guild.memberCount), inline: true },
      { name: 'Erstellt', value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:D>`, inline: true },
    );
  await interaction.reply({ embeds: [embed] });
}
