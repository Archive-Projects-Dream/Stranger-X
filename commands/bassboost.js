const { MessageEmbed } = require("discord.js");
const { TrackUtils } = require("erela.js");
const levels = {
  нет: 0.0,
  низкий: 0.2,
  средний: 0.3,
  высокий: 0.35,
};
module.exports = {
  name: "bassboost",
  description: "Включает звуковой эффект усиления басов",
  usage: "<нет|низкий|средний|высокий>",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["bb", "bass"],
  /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {import("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
  run: async (client, message, args, { GuildDB }) => {
    let player = await client.Manager.get(message.guild.id);
    if (!player)
      return client.sendTime(
        message.channel,
        "❌ | **Прямо сейчас ничего не играет...**"
      );
    if (!message.member.voice.channel)
      return client.sendTime(
        message.channel,
        "❌ | **Вы должны быть в голосовом канале, чтобы использовать эту команду!**"
      );
    if (
      message.guild.me.voice.channel &&
      message.member.voice.channel.id !== message.guild.me.voice.channel.id
    )
      return client.sendTime(
        message.channel,
        "❌ | **Вы должны быть в том же голосовом канале, что и я, чтобы использовать эту команду!"
      );

    if (!args[0])
      return client.sendTime(
        message.channel,
        "**Пожалуйста, укажите уровень усиление басов. \nДоступные уровни:** `нет`, `низкий`, `средний`, `высокий`"
      ); //if the user do not provide args [arguments]

    let level = "нет";
    if (args.length && args[0].toLowerCase() in levels)
      level = args[0].toLowerCase();

    player.setEQ(
      ...new Array(3)
        .fill(null)
        .map((_, i) => ({ band: i, gain: levels[level] }))
    );

    return client.sendTime(
      message.channel,
      `✅ | **Уровень Bassboost установлен на** \`${level}\``
    );
  },
  SlashCommand: {
    options: [
      {
        name: "level",
        description: `Пожалуйста, укажите уровень усиление басов. Доступные уровни: низкий, средний, высокий, or нет`,
        value: "[уровень]",
        type: 3,
        required: true,
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
      const levels = {
        нет: 0.0,
        низкий: 0.2,
        средний: 0.3,
        высокий: 0.35,
      };

      let player = await client.Manager.get(interaction.guild_id);
      const guild = client.guilds.cache.get(interaction.guild_id);
      const member = guild.members.cache.get(interaction.member.user.id);
      const voiceChannel = member.voice.channel;
      if (!player)
        return client.sendTime(
          interaction,
          "❌ | **Прямо сейчас ничего не играет...**"
        );
      if (!member.voice.channel)
        return client.sendTime(
          interaction,
          "❌ | **Вы должны быть в голосовом канале, чтобы использовать эту команду.**"
        );
      if (
        guild.me.voice.channel &&
        !guild.me.voice.channel.equals(voiceChannel)
      )
        return client.sendTime(
          interaction,
          "❌ | **Вы должны быть в том же голосовом канале, что и я, чтобы использовать эту команду!"
        );
      if (!args)
        return client.sendTime(
          interaction,
          "**Пожалуйста, укажите уровень усиление басов. \nДоступные уровни:** `нет`, `низкий`, `средний`, `высокий`"
        ); //if the user do not provide args [arguments]

      let level = "нет";
      if (args.length && args[0].value in levels) level = args[0].value;

      player.setEQ(
        ...new Array(3)
          .fill(null)
          .map((_, i) => ({ band: i, gain: levels[level] }))
      );

      return client.sendTime(
        interaction,
        `✅ | **Устанавливаю уровень усиления басов на** \`${level}\``
      );
    },
  },
};
