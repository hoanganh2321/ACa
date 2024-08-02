const { SlashCommandBuilder } = require('@discordjs/builders');
const { AttachmentBuilder } = require('discord.js');
const qr = require('qrcode');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('generateqr')
        .setDescription('Generates a QR code for the provided text')
        .addStringOption(option =>
            option.setName('text')
                .setDescription('Text to encode into QR code')
                .setRequired(true)),

    async execute(interaction) {
        try {
            let textToEncode;

         
            if (interaction.isCommand && interaction.isCommand()) {
                textToEncode = interaction.options.getString('text');
            } else {
           
                const args = interaction.content.split(' ');
                args.shift(); 
                textToEncode = args.join(' ');
            }

         
            const qrCodeBuffer = await qr.toBuffer(textToEncode, { width: 500, height: 500 });

        
            const attachment = new AttachmentBuilder(qrCodeBuffer, { name : 'qrcode.png'});

           
            await interaction.reply({ files: [attachment] });
        } catch (error) {
            console.error('Error generating QR code:', error);
            await interaction.reply('Failed to generate QR code. Please try again.');
        }
    },
};


