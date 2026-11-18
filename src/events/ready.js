import { Events } from 'discord.js';

export const name = Events.ClientReady;
export const once = true;

export async function execute(client) {
  // Registriert alle Slash-Befehle global. Neue Befehle erscheinen in Discord nach kurzer Zeit.
  await client.application.commands.set(client.commands.map((c) => c.data.toJSON()));
  console.log(`Bot ist online als ${client.user.tag}`);
}
