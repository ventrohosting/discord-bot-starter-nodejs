import { Client, Collection, GatewayIntentBits } from 'discord.js';
import { readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

// Lokal kann eine .env-Datei genutzt werden; auf einem Server kommt der Token aus der Umgebung.
try { process.loadEnvFile(); } catch { /* keine .env-Datei, das ist in Ordnung */ }

const token = process.env.DISCORD_TOKEN;
if (!token) {
  console.error('Kein Token gesetzt: Die Umgebungsvariable DISCORD_TOKEN fehlt.');
  process.exit(1);
}

const here = path.dirname(fileURLToPath(import.meta.url));

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();

// Alle Dateien eines Ordners laden: jede exportiert ein Modul.
async function modulesIn(folder) {
  const dir = path.join(here, folder);
  const files = readdirSync(dir).filter((f) => f.endsWith('.js'));
  return Promise.all(files.map((f) => import(pathToFileURL(path.join(dir, f)).href)));
}

for (const mod of await modulesIn('commands')) {
  client.commands.set(mod.data.name, mod);
}

for (const mod of await modulesIn('events')) {
  if (mod.once) client.once(mod.name, (...args) => mod.execute(...args));
  else client.on(mod.name, (...args) => mod.execute(...args));
}

await client.login(token);
