module.exports = (client) => {
    console.log(`Logged in as ${client.user.tag}!`);
    console.log(`Flame Discord client By Edgewurth`);
    console.log(`serving ${client.guilds.cache.size} servers`);
    client.user.setPresence({
        status: 'available',
        activity: {
            name: 'Playing with flames',
            type: 'STREAMING',
            url: 'https://www.youtube.com/watch?v=iik25wqIuFo'
        }
    })
};
