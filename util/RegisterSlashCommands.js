const fs = require("fs");
const path = require("path");

/**
 * Register slash commands for a guild
 * @param {require("../structures/DiscordMusicBot")} client
 * @param {string} guild
 */
module.exports = (client, guild) => {
  client.log("Регистрация слеш команд для " + guild);

  let commandsDir = path.join(__dirname, "..", "commands");

  fs.readdir(commandsDir, (err, files) => {
    if (err) throw err;
    files.forEach(async (file) => {
      let cmd = require(commandsDir + "/" + file);
      if (!cmd.SlashCommand || !cmd.SlashCommand.run) return;
      let dataStuff = {
        name: cmd.name,
        description: cmd.description,
        options: cmd.SlashCommand.options,
      };

      //Creating variables like this, So you might understand my code :)
      let ClientAPI = client.api.applications(client.user.id);
      let GuildAPI = ClientAPI.guilds(guild);

      client.log(
        "[Слеш Команда]: [Запрос] Сервер " +
          guild +
          ", Команда: " +
          dataStuff.name
      );
      try {
        await GuildAPI.commands.post({ data: dataStuff });
      } catch (e) {
        client.log(
          "[Слеш Команда]: [Запрос-Ошибка] Сервер " +
            guild +
            ", Команда: " +
            dataStuff.name
        );
        console.log(e);
      }
    });
  });
};
