const { MessageEmbed } = require("discord.js");
require("moment-duration-format");
const cpuStat = require("cpu-stat");
const moment = require("moment");

module.exports = {
  name: "stats",
  description: "Дает информацию о боте",
  usage: "",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["about", "ping", "info"],
  /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {import("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
  run: async (client, message) => {
    const { version } = require("discord.js");
    cpuStat.usagePercent(async function (err, percent, seconds) {
      if (err) {
        return console.log(err);
      }
      const duration = moment
        .duration(message.client.uptime)
        .format(" D[д], H[ч], m[м]");

      const embed = new MessageEmbed();
      embed.setColor(client.botconfig.EmbedColor);
      embed.setTitle(`Статистика от \`${client.user.username}\``);
      embed.addFields(
        {
          name: ":ping_pong: Пинг",
          value: `┕\`${Math.round(client.ws.ping)}ms\``,
          inline: true,
        },
        {
          name: ":clock1: Время работы",
          value: `┕\`${duration}\``,
          inline: true,
        },
        {
          name: ":file_cabinet: Память",
          value: `┕\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(
            2
          )}mb\``,
          inline: true,
        }
      );

      embed.addFields(
        {
          name: ":homes: Серверов",
          value: `┕\`${client.guilds.cache.size}\``,
          inline: true,
        },
        {
          name: ":busts_in_silhouette: Пользователей",
          value: `┕\`${client.users.cache.size}\``,
          inline: true,
        },
        {
          name: ":control_knobs: API Latency",
          value: `┕\`${message.client.ws.ping}ms\``,
          inline: true,
        }
      );
      embed.addFields(
        {
          name: ":robot: Версия",
          value: `┕\`v${require("../package.json").version}\``,
          inline: true,
        },
        {
          name: ":blue_book: Discord.js",
          value: `┕\`v${version}\``,
          inline: true,
        },
        {
          name: ":green_book: Node",
          value: `┕\`${process.version}\``,
          inline: true,
        }
      );

      return message.channel.send(embed);
    });
  },
  SlashCommand: {
    /**
     *
     * @param {import("../structures/DiscordMusicBot")} client
     * @param {import("discord.js").Message} message
     * @param {string[]} args
     * @param {*} param3
     */
    run: async (client, interaction) => {
      const { version } = require("discord.js");
      cpuStat.usagePercent(async function (err, percent, seconds) {
        if (err) {
          return console.log(err);
        }
        const duration = moment
          .duration(client.uptime)
          .format(" D[д], H[ч], m[м]");

        const embed = new MessageEmbed();
        embed.setColor(client.botconfig.EmbedColor);
        embed.setTitle(`Stats from \`${client.user.username}\``);
        embed.addFields(
          {
            name: ":ping_pong: Пинг",
            value: `┕\`${Math.round(client.ws.ping)}ms\``,
            inline: true,
          },
          {
            name: ":clock1: Время работы",
            value: `┕\`${duration}\``,
            inline: true,
          },
          {
            name: ":file_cabinet: Память",
            value: `┕\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(
              2
            )}mb\``,
            inline: true,
          }
        );

        embed.addFields(
          {
            name: ":homes: Серверов",
            value: `┕\`${client.guilds.cache.size}\``,
            inline: true,
          },
          {
            name: ":busts_in_silhouette: Users",
            value: `┕\`${client.users.cache.size}\``,
            inline: true,
          },
          {
            name: ":control_knobs: API Latency",
            value: `┕\`${client.ws.ping}ms\``,
            inline: true,
          }
        );
        embed.addFields(
          {
            name: ":robot: Версия",
            value: `┕\`v${require("../package.json").version}\``,
            inline: true,
          },
          {
            name: ":blue_book: Discord.js",
            value: `┕\`v${version}\``,
            inline: true,
          },
          {
            name: ":green_book: Node",
            value: `┕\`${process.version}\``,
            inline: true,
          }
        );

        return interaction.send(embed);
      });
    },
  },
};
