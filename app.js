// Load up the discord.js library
const Discord = require("discord.js");

// This is your client. Some people call it `bot`, some people call it `self`, 
// some might call it `cootchie`. Either way, when you see `client.something`, or `bot.something`,
// this is what we're refering to. Your client.
const client = new Discord.Client();

// Here we load the config.json file that contains our token and our prefix values. 
const config = require("./config.json");
// config.token contains the bot's token
// config.prefix contains the message prefix.

client.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`Gotów do jebania Disa`); 
  // Example of changing the bot's playing game to something useful. `client.user` is what the
  // docs refer to as the "ClientUser".
  client.user.setActivity(`Jebanie Disa`);
});

client.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setActivity(`Jebanie Disa`);
});

client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`Jebanie Disa`);
});


client.on("message", async message => {
  // This event will run on every single message received, from any channel or DM.
  
  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  if(message.author.bot) return;
  
  // Also good practice to ignore any message that does not start with our prefix, 
  // which is set in the configuration file.
  if(message.content.indexOf(config.prefix) !== 0) return;
  
  // Here we separate our "command" name, and our "arguments" for the command. 
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  // Let's go with a few common example commands! Feel free to delete or change those.
  
  if(command === "ping") {
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Opóźnienie wynosi ${m.createdTimestamp - message.createdTimestamp}ms. Opóźnienie API wynosi ${Math.round(client.ping)}ms`);
  }
  
  if(command === "j") {
    const m = await message.channel.send("Disa.");
  }
  
  if(command === "jezu") {
    const m = await message.channel.send("Chryste.");
  }
  
  if(command === "help") {
    const m = await message.channel.send("+J, +ping, +Jezu, +Kiara, +Wyjebka, +Topór, +Korki");
  }
  
  if(command === "kiara") {
    const m = await message.channel.send("Nie wali mu pały, Dis na hajs jest ruchany.")
  }
  if(command === "wyjebka") {
    const m = await message.channel.send("Firmóweczka")
  }
    if(command === "topór") {
    const m = await message.channel.send("KURWAAAAAAAAAAAAAAAAAAA TOPÓR AAAAAAAAAAAAAAAAAA WIKING KURWAAAAAAAAAAAAAA")
  }

if(command === "korki") {
const m = await message.channel.send("Zgaś te korki to nie lowkicka masz takiego na noge ze to do tydzien do pracy nie pójdziesz jak chuj.")
}
  if(command === "purge") {
    // This command removes all messages from all users in the channel, up to 100.
    
    // get the delete count, as an actual number.
    const deleteCount = parseInt(args[0], 10);
    
    // Ooooh nice, combined conditions. <3
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");
    
    // So we get our messages, and delete them. Simple enough, right?
    const fetched = await message.channel.fetchMessages({count: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
  }
});

client.login(config.token);
           