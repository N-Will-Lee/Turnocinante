const { Client, MessageEmbed, VoiceChannel } = require('discord.js');
const { botIntents, commands, prefix } = require('./config/config');
const config = require('./config/token');

const client = new Client({
    intents: botIntents,
    partials: ['CHANNEL', 'MESSAGE'],
});

const turnTakingChannels = [];

client.on('ready', () => {
console.log('Logged in as ' + client.user.tag);
});

client.on('messageCreate', async (msg) => {
    if (msg.author.bot) return;

    // do nothing if command is not preceded with prefix
    if (!msg.content.startsWith(prefix)) return;

    const args = msg.content.slice(prefix.length).trim().split(' ');
    const userCmd = args.shift().toLowerCase();
    console.log('args: ',args)
    console.log(userCmd)


    if (userCmd === commands.getName) {
        msg.reply(msg.author.username);
    } 
    else if (userCmd === commands.tellJoke) {
        msg.channel.send('HTML bla bla bla');
    } 
    else if (userCmd === commands.addTurns) {
        addChannelToTurnsArr(args);
    } 
    else if (userCmd === commands.lastMsgs) {
        const reply = await getLastMsgs(msg);
        msg.channel.send({ embeds: reply });
    } 
    else {
        msg.reply('I do not understand your command');
    }
});


const addChannelToTurnsArr = (args) => {
    if (args.length >1) {
        msg.reply('Unlike your mother, this command accepts one input at a time.');
    } else {
        if (!turnTakingChannels.find(channel => channel === args[0])) {
            turnTakingChannels.push(args[0]);
            msg.channel.send(`You can now take turns in ${args[0]}`);
            // console.log('turn channels: ', turnTakingChannels)
        } else {
            msg.channel.send(`${args[0]} is already a turn taking channel.`)
        }
    }
}


const getLastMsgs = async (msg) => {
    // fetching the last 10 messages
    const res = await msg.channel.messages.fetch({ limit: 10 });

    const lastTenMsgs = res.map((message) => {
        return message.content;
    });
    console.log('last ten map: ', lastTenMsgs)

    const embeds = [];

    lastTenMsgs.forEach((msg, index) => {
        const embed = new MessageEmbed()
            .setColor('ORANGE') // can be hex like #3caf50
            .setTitle(`Message ${index + 1}`)
            .setDescription(`${msg}`);

        embeds.push(embed);
    });
    return embeds;

};

const startBot = () => {
    client.login(config.DISCORD_TOKEN);
};

module.exports = { startBot };