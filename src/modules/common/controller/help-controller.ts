import { Scenes } from 'telegraf';

const helpController = new Scenes.BaseScene<Scenes.SceneContext>('help');

helpController.enter((ctx) => {
    console.info('enter', ctx.session);
    ctx.reply('I will help you ////');
    return ctx.scene.leave();
})

/*helpController.on('text', (ctx) => {
    ctx.reply(ctx.message.text);
    return ctx.scene.leave();
})*/

/*helpController.leave((ctx) => {
    console.info('leave', ctx.session);
    ctx.reply('Thank you for your time!');
});*/


export {
    helpController
};
