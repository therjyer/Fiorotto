// Conexão
const { Client, fromMe, LocalAuth, NoAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Utilitários
const fs = require('fs')

// Módulos
const setting = JSON.parse(fs.readFileSync('./data/json/settings.json'))

const client = new Client({
    authStrategy: new LocalAuth(),
    //puppeteer: { headless: false }
});
  
const prefix = setting.prefix

client.initialize();

client.on('qr', (qr) => {
    qrcode.generate(qr, {small: true});
    console.log('Código recebido: ', qr);
});

client.on('authenticated', () => {
    console.log('Autenticado com sucesso!');
});

client.on('auth_failure', msg => {
    console.error('Falha na autenticação', msg);
});

client.on('ready', () => {
    console.log('Pronto para começar!');
});

client.on('message', async msg => {
    console.log('Mensagem recebida: ', msg);

        if (msg.body === `${prefix}ping`) {
            (msg.reply('*pong*') || msg.reply('*pong2*'));
        };

        if(msg.hasMedia === true && msg.body === `${prefix}fig`) {
            const media = await msg.downloadMedia();
            msg.reply(media);
            // do something with the media data here
        }

        if (msg.body === `${prefix}exit`) {
            msg.reply('_Desligando..._')
            client.stop(); 
    };
});

