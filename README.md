# Discord-Bot-Vorlage (Node.js, discord.js v14)

Solide Ausgangsbasis für einen eigenen Discord-Bot: Slash-Befehle, ein Command-Handler, der jede Datei in `src/commands` automatisch lädt, Event-Handler, Dockerfile und CI. MIT-Lizenz, deutsch dokumentiert.

*English: A small, clean discord.js v14 starter with slash commands, auto-loaded command and event handlers, Dockerfile and CI. German docs, MIT licensed.*

## Inhalt

- [Voraussetzungen](#voraussetzungen)
- [Schnellstart](#schnellstart)
- [Projektaufbau](#projektaufbau)
- [Eigenen Befehl hinzufügen](#eigenen-befehl-hinzufügen)
- [Mit Docker starten](#mit-docker-starten)
- [Rund um die Uhr online](#rund-um-die-uhr-online)
- [Häufige Fehler](#häufige-fehler)

## Voraussetzungen

- Node.js 22 oder neuer
- Eine Anwendung mit Bot im [Discord Developer Portal](https://discord.com/developers/applications)

## Schnellstart

1. Anwendung anlegen, unter **Bot** den Token zurücksetzen und kopieren.
2. Unter **OAuth2 › URL Generator** die Scopes `bot` und `applications.commands` wählen und den Bot auf deinen Server einladen.
3. Projekt holen und starten:

```bash
git clone https://github.com/ventrohosting/discord-bot-starter-nodejs.git
cd discord-bot-starter-nodejs
npm install
cp .env.example .env     # Token in .env eintragen
npm start
```

In der Konsole erscheint „Bot ist online als …“. Auf deinem Server funktionieren jetzt `/ping` und `/info`.

Der Token gehört nie in den Code und nie in ein öffentliches Repository. `.env` steht in der `.gitignore`.

## Projektaufbau

```
src/
  index.js              Start, lädt Befehle und Events
  commands/ping.js      Beispielbefehl /ping
  commands/info.js      Beispielbefehl /info mit Embed
  events/ready.js       Registriert die Slash-Befehle
  events/interactionCreate.js   Führt Befehle aus und fängt Fehler ab
```

## Eigenen Befehl hinzufügen

Lege eine neue Datei in `src/commands` an. Sie muss `data` und `execute` exportieren:

```js
import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('hallo')
  .setDescription('Sagt Hallo');

export async function execute(interaction) {
  await interaction.reply(`Hallo ${interaction.user.username}!`);
}
```

Nach einem Neustart registriert der Bot den Befehl automatisch.

## Mit Docker starten

```bash
docker build -t mein-bot .
docker run -d --name mein-bot --restart unless-stopped -e DISCORD_TOKEN=dein-token mein-bot
```

## Rund um die Uhr online

Auf dem eigenen PC ist der Bot nur online, solange der Rechner läuft. Für Dauerbetrieb brauchst du einen Rechner, der nie ausgeht: einen Raspberry Pi, einen eigenen Server oder einen Bot-Hoster. Die Vorlage läuft unverändert überall, wo Node.js 22 und die Umgebungsvariable `DISCORD_TOKEN` zur Verfügung stehen.

Offenlegung: Dieses Repository pflegt [VentroHosting](https://ventrohosting.com), ein Anbieter für Discord-Bot-Hosting. Die Vorlage ist unabhängig von jedem Anbieter nutzbar. Passende Anleitungen auf Deutsch:

- [Discord-Bot mit Node.js hosten](https://ventrohosting.com/anleitungen/discord-bot-nodejs-hosten)
- [Discord-Bot erstellen und einladen](https://ventrohosting.com/anleitungen/discord-bot-erstellen)
- [Discord-Bot kostenlos hosten: Möglichkeiten und Grenzen](https://ventrohosting.com/anleitungen/discord-bot-kostenlos-hosten)
- [Discord-Bot 24/7 online halten](https://ventrohosting.com/anleitungen/discord-bot-247-online)
- [Discord-Bot-Hosting vergleichen: Checkliste](https://ventrohosting.com/anleitungen/discord-bot-hosting-vergleichen)
- [Kostenloser Discord-Timestamp-Generator](https://ventrohosting.com/tools/discord-timestamp-generator) und [Embed-Generator](https://ventrohosting.com/tools/discord-embed-generator)

## Häufige Fehler

| Meldung | Ursache |
|---|---|
| `Kein Token gesetzt` | `DISCORD_TOKEN` fehlt in `.env` oder in der Umgebung. |
| `An invalid token was provided` | Der Token ist falsch oder wurde zurückgesetzt. |
| `Used disallowed intents` | Der Code nutzt einen Intent, der im Developer Portal unter **Bot** nicht aktiv ist. Diese Vorlage braucht nur `Guilds`. |
| Slash-Befehle erscheinen nicht | Nach der ersten Registrierung kurz warten, Discord neu laden und prüfen, ob der Bot mit `applications.commands` eingeladen wurde. |

Weitere Fehler und Lösungen: [Discord-Bot offline? Häufige Fehler](https://ventrohosting.com/anleitungen/discord-bot-offline-fehler).

Hinweis: VentroHosting ist ein unabhängiger Anbieter und nicht mit Discord Inc. verbunden.
