import {Telegraf, Scenes} from 'telegraf';
import {createHelpController} from '../../modules/common/controllers/help-controller';
import {AppContext} from '../../app/interfaces/app-context';

export class Router {
  public applyRoutes(bot: Telegraf<AppContext>) {
    const stage = new Scenes.Stage<AppContext>();
    const routes = {
      help: {
        type: 'command',
        path: 'help',
        controller: createHelpController('help')
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

    const routesKeys = Object.keys(routes);

    routesKeys.forEach((routeKey) => {
      const route = routes[routeKey];

      if (!this.isItScene(route.controller)) {
        return;
      }

      stage.register(route.controller);
    })

    bot.use(stage.middleware());

    routesKeys.forEach((routeKey) => {
      const route = routes[routeKey];
      const handler = this.isItScene(route.controller) ? Scenes.Stage.enter(route.path) : route.controller;

      bot[route.type](`${route.path}`, handler);
    })

    return routes;
  }

  private isItScene(controller: unknown): boolean {
    return controller instanceof Scenes.BaseScene;
  }
}
