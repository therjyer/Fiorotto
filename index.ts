const { Client, fromMe, LocalAuth } = require('whatsapp-web.js');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: { headless: true }
});

client.initialize();

client.on('qr', (qr) => {
    console.log('Código recebido: ', qr);
});

client.on('authenticated', () => {
    console.log('Autenticado com sucesso!');
});

client.on('auth_failure', msg => {
    console.error('Falha na autenticação', msg);
});

client.on('ready', () => {
    console.log('Pronto!');
});

client.on('message', async msg => {
    console.log('Mensagem recebida: ', msg);

    // Teste de resposta
        if (msg.body === '.ping') {
            msg.reply('pong');

        };

    // Teste de condição
    if (msg.body === '!test') {
        await msg.reply('teste');

    };
});

client.on('call', async call => {
    if (fromMe === true)
        if (call.body === '!ping') {
            call.reply('pong');

        };

});