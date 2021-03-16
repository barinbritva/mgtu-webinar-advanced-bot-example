import { Scenes } from 'telegraf';
import {AppSceneContext} from '../../../app/interfaces/app-context';

function createHelpController(routePath: string) {
  const helpController = new Scenes.BaseScene<AppSceneContext>(routePath);

  helpController.enter((ctx) => {
      console.info('enter', ctx.session);
      return ctx.reply('I will help you 🚑').then(() => {
          return ctx.scene.leave();
      });
  });

  return helpController;
}

export {
  createHelpController
};
