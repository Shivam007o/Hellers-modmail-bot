# Chars Mod Mail
A package made with JavaScript to help you create an amazing discord mod mail bot!
Use s simple function to create a fully functional mod mal bot that has lots of options to change and make it custom for you!
# Setup
```
const Discord = require('discord.js');
const allIntents = new Discord.Intents(32767);
const client = new Discord.Client({
  messageCacheLifetime: 60,
  fetchAllMembers: false,
  messageCacheMaxSize: 10,
  restTimeOffset: 0,
  restWsBridgetimeout: 100,
  allowedMentions: {
    parse: ["roles", "users", "eveoryone"],
    repliedUser: true,
  },
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
  intents: allIntents,
});

client.login("TOKEN");


const charModMail = require('char-mod-mail');

client.on("ready", () => {
charModMail.ModMail(client, {
  guildID: "ID",
  categoryID: "ID",
  staffRole: "ID",
  embedColor: "HEX",
  anonymousReply: false/true,
  closedTitle: "Your Mod Mail Has Been Closed",
  closedMessage: "A Staff Member Has Deleted You Mod Mail!",
  staffOpenedTitle: "User Opened Mod Mail",
  staffOpenedMessage: "The User Opened A Mod Mail And Is Now Wait For A Reply!",
  userOpenedTitle: "Mod Mail Created",
  userOpenedMessage: "You Created A Mod Mail Ticket!",
  wrongEmoji: "EMOJI",
  rightEmoji: "EMOJI" 
})
});
```