import { Scenes } from 'telegraf';
import {AppContext} from '../../../core/interfaces/app-context';

const helpController = new Scenes.BaseScene<AppContext>('help');

helpController.enter((ctx) => {
    console.info('enter', ctx.session);
    return ctx.reply('I will help you 🚑').then(() => {
        return ctx.scene.leave();
    });
})

export {
    helpController
};
