import { Events } from 'discord.js';

export const name = Events.InteractionCreate;

export async function execute(interaction) {
  if (!interaction.isChatInputCommand()) return;
  const command = interaction.client.commands.get(interaction.commandName);
  if (!command) return;
  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(`Fehler im Befehl /${interaction.commandName}:`, error);
    const reply = { content: 'Beim Ausführen ist ein Fehler aufgetreten.', ephemeral: true };
    if (interaction.replied || interaction.deferred) await interaction.followUp(reply);
    else await interaction.reply(reply);
  }
}
