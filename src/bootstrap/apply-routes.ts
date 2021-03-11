import {helpController} from '../modules/common/controller/help-controller';
import {Telegraf, Scenes} from 'telegraf';
import {AppContext} from '../core/interfaces/app-context';

function isItScene(controller: unknown): boolean {
  return controller instanceof Scenes.BaseScene;
}

export function applyRoutes(bot: Telegraf<AppContext>) {
  const stage = new Scenes.Stage<AppContext>();
  const routes = {
    help: {
      type: 'command',
      path: 'help',
      controller: helpController
    },
    hi: {
      type: 'hears',
      path: 'hi',
      controller: (ctx: AppContext) => {
        console.info('???', ctx.session);
        return ctx.reply('Nice to see you!!');
      }
    }
  };

  const routesKeys = Object.keys(routes)

  routesKeys.forEach((routeKey) => {
    const route = routes[routeKey];

    if (!isItScene(route.controller)) {
      return;
    }

    stage.register(route.controller);
  })

  bot.use(stage.middleware());

  routesKeys.forEach((routeKey) => {
    const route = routes[routeKey];
    const handler = isItScene(route.controller) ? Scenes.Stage.enter(route.path) : route.controller

    bot[route.type](`${route.path}`, handler);
  })

  return routes
}
