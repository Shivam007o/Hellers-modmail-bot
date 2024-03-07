const Discord = require('discord.js')

async function modmail(client, options = []) {
  let { MessageButton, MessageActionRow } = require('discord.js')


let guild = client.guilds.cache.get(options.guildID);

if (!guild) throw new Error("No Guild!");



  client.on("messageCreate", async(message) => {

if (message.author.bot) return;
if (message.channel.type === "DM") {
    let mailName = `${message.author.id}`

let usersChannel = await guild.channels.cache.find(ch => ch.name === mailName.toLowerCase());



if (!usersChannel) {

  const createdEmbed = new Discord.MessageEmbed()
  .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
  .setTitle("No Mail Opened")
  .setDescription(message.content)
  .setColor(options.embedColor)



  let categ = guild.channels.cache.get(options.categoryID)



if (!categ) throw new Error("No Category!")


if (!options.staffRole) throw new Error("No Role!")


    let permissions = {
      id: options.staffRole,
      allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY']
    }


  guild.channels.create(`${message.author.id}`, {
    type: "text",
    parent: categ,
    permissionOverwrites: [
      {
        id: guild.roles.everyone,
        deny: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY'] //Deny permissions
      },
     permissions
    ],
  }).then(async (ch) => {


let role = ch.guild.roles.cache.find((r) => r.id == options.staffRole)


if (!role) throw new Error("No role!")


const openedUserEmbed = new Discord.MessageEmbed()
.setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
.setTitle(`${options.userOpenedTitle}`)
.setDescription(`${options.userOpenedMessage}`)
.setTimestamp()
.setColor(options.embedColor)
    message.author.send({ embeds: [openedUserEmbed] })


    let usersCreatedChannel = await guild.channels.cache.find(ch => ch.name === mailName.toLowerCase());



let delButton = new MessageButton()
.setStyle("DANGER")
.setLabel('Delete')
.setCustomId('close_mail')
.setEmoji(`${options.wrongEmoji}` || '❌')



let deleteRow = new MessageActionRow()
.addComponents([delButton])

const openedStaffEmbed = new Discord.MessageEmbed()
.setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
.setTitle(`${options.staffOpenedTitle}`)
.setDescription(`${options.staffOpenedMessage}\n**User: ${message.author.tag} (${message.author.id})**\n\n ${message.content}`)
.setTimestamp()
.setColor(options.embedColor)

usersCreatedChannel.send({ embeds: [openedStaffEmbed], components: [deleteRow] })
  })


} else {

    let usersHadChannel = await guild.channels.cache.find(ch => ch.name === mailName.toLowerCase());


const userHadEmbed = new Discord.MessageEmbed()
.setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
.setTitle(`${message.content}`)
.setTimestamp()
.setColor(options.embedColor)


usersHadChannel.send({ embeds: [userHadEmbed] })
}

// Sent In DM's //
} else {
  if (message.channel.type === "GUILD_TEXT") {

let categor = guild.channels.cache.get(options.categoryID)


    if (message.channel.parentId !== categor.id) return;

    const usertosend = message.guild.members.cache.find((user) => user.id == message.channel.name)

    if (!usertosend) return;

if (options.anonymousReply === true) {


    const staffSendEmbedA = new Discord.MessageEmbed()
    .setAuthor(`Staff Team`)
    .setTitle(`${message.content}`)
    .setTimestamp()
    .setColor(options.embedColor)

    usertosend.send({ embeds: [staffSendEmbedA] })

} else {
    const staffSendEmbed = new Discord.MessageEmbed()
    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
    .setTitle(`${message.content}`)
    .setTimestamp()
    .setColor(options.embedColor)

    usertosend.send({ embeds: [staffSendEmbed] })
}
  }
}
  })



// Channel Deleted //

client.on("channelDelete", (channel) => {

  let category = guild.channels.cache.get(options.categoryID)


if (channel.parentId !== category.id) return;

const user = channel.guild.members.cache.find((user) => user.id == channel.name)

if (!user) return;

const deletedEmbed = new Discord.MessageEmbed()
.setTitle(`${options.closedTitle}`)
.setDescription(`${options.closedMessage}`)
.setColor(options.embedColor)


user.send({ embeds: [deletedEmbed] })


});





// Delete Buttons //

  let confirmButton = new MessageButton()
.setStyle("SUCCESS")
.setLabel('Confirm')
.setCustomId('confirm_mail')
.setEmoji(`${options.rightEmoji}` || '✔️')


  let cancleButton = new MessageButton()
.setStyle("SECONDARY")
.setLabel('Cancle')
.setCustomId('cancle_mail')
.setEmoji(`${options.wrongEmoji}` || '❌')


let optionsRow = new MessageActionRow()
.addComponents([confirmButton])
.addComponents([cancleButton])


client.on('interactionCreate', interaction => {



if (interaction.customId === "close_mail") {
interaction.update({ components: [optionsRow]})

} else {

  if (interaction.customId === "cancle_mail") {

let delButton2 = new MessageButton()
.setStyle("DANGER")
.setLabel('Delete')
.setCustomId('close_mail')
.setEmoji('❌')



let deleteRow2 = new MessageActionRow()
.addComponents([delButton2])



interaction.update({ components: [deleteRow2]})


  } else {
    if (interaction.customId === "confirm_mail") {
      interaction.message.channel.delete();
    }
  }
} 

  });

}

  module.exports = modmail;