const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "help",
  description: "Информация о командах в боте",
  usage: "[команда]",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["command", "commands", "cmd"],
  /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {import("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
  run: async (client, message, args, { GuildDB }) => {
    let Commands = client.commands.map(
      (cmd) =>
        `\`${GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix}${
          cmd.name
        }${cmd.usage ? " " + cmd.usage : ""}\` - ${cmd.description}`
    );

    let Embed = new MessageEmbed()
      .setAuthor({
        name: `Команды для ${client.user.username}`,
        iconURL: client.botconfig.IconURL,
      })
      .setColor(client.botconfig.EmbedColor)
      .setFooter({
        text: `Чтобы получить информацию о каждом типе команды ${
          GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix
        }help [команда] | Хорошего дня!`,
      }).setDescription(`${Commands.join("\n")}
  
  Discord Music Bot Version: v${require("../package.json").version}
  [✨ Сервер Разработчиков](${
    client.botconfig.SupportServer
  }) | [GitHub](https://github.com/SudhanPlayz/Discord-MusicBot) | [Dashboard](${
      client.botconfig.Website
    }) | Создан [KOCMODECAHTHUK](https://github.com/KOCMODECAHTHUK) | Локализатор [Серега](https://github.com/KOCMODECAHTHUK)`);
    if (!args[0]) message.channel.send(Embed);
    else {
      let cmd =
        client.commands.get(args[0]) ||
        client.commands.find((x) => x.aliases && x.aliases.includes(args[0]));
      if (!cmd)
        return client.sendTime(
          message.channel,
          `❌ | Невозможно найти эту команду.`
        );

      let embed = new MessageEmbed()
        .setAuthor(`Команда: ${cmd.name}`, client.botconfig.IconURL)
        .setDescription(cmd.description)
        .setColor("GREEN")
        //.addField("Name", cmd.name, true)
        .addField("Псевдонимы", `\`${cmd.aliases.join(", ")}\``, true)
        .addField(
          "Аргумент",
          `\`${GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix}${
            cmd.name
          }${cmd.usage ? " " + cmd.usage : ""}\``,
          true
        )
        .addField(
          "Разрешения",
          "Пользователь: " +
            cmd.permissions.member.join(", ") +
            "\nБот: " +
            cmd.permissions.channel.join(", "),
          true
        )
        .setFooter(
          `Префикс - ${
            GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix
          }`
        );

      message.channel.send(embed);
    }
  },

  SlashCommand: {
    options: [
      {
        name: "command",
        description: "Get information on a specific command",
        value: "command",
        type: 3,
        required: false,
      },
    ],
    /**
     *
     * @param {import("../structures/DiscordMusicBot")} client
     * @param {import("discord.js").Message} message
     * @param {string[]} args
     * @param {*} param3
     */

    run: async (client, interaction, args, { GuildDB }) => {
      let Commands = client.commands.map(
        (cmd) =>
          `\`${GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix}${
            cmd.name
          }${cmd.usage ? " " + cmd.usage : ""}\` - ${cmd.description}`
      );

      let Embed = new MessageEmbed()
        .setAuthor(
          `Команды ${client.user.username}`,
          client.botconfig.IconURL
        )
        .setColor(client.botconfig.EmbedColor)
        .setFooter(
          `Для доплнительной информацию о каждой команде, введите ${
            GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix
          }help [команда] | Хорошего дня!`
        ).setDescription(`${Commands.join("\n")}
  
  Discord Music Bot Version: v${require("../package.json").version}
  [✨ Сервер Бота](${
    client.botconfig.SupportServer
  }) | [GitHub](https://github.com/SudhanPlayz/Discord-MusicBot) | [Dashboard](${
        client.botconfig.Website
      }) | Создан [KOCMODECAHTHUK](https://github.com/KOCMODECAHTHUK)`);
      if (!args) return interaction.send(Embed);
      else {
        let cmd =
          client.commands.get(args[0].value) ||
          client.commands.find(
            (x) => x.aliases && x.aliases.includes(args[0].value)
          );
        if (!cmd)
          return client.sendTime(
            interaction,
            `❌ | Невозможно найти эту команду.`
          );

        let embed = new MessageEmbed()
          .setAuthor(`Команда: ${cmd.name}`, client.botconfig.IconURL)
          .setDescription(cmd.description)
          .setColor("GREEN")
          //.addField("Name", cmd.name, true)
          .addField("Псевдонимы", cmd.aliases.join(", "), true)
          .addField(
            "Аргумент",
            `\`${GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix}${
              cmd.name
            }\`${cmd.usage ? " " + cmd.usage : ""}`,
            true
          )
          .addField(
            "Разрешения",
            "Пользователь: " +
              cmd.permissions.member.join(", ") +
              "\nБот: " +
              cmd.permissions.channel.join(", "),
            true
          )
          .setFooter(
            `Префикс - ${
              GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix
            }`
          );

        interaction.send(embed);
      }
    },
  },
};
