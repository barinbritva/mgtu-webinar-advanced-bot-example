import {Telegraf, Scenes} from 'telegraf';
import {AppSceneContext} from '../../app/interfaces/app-context';
import {createHelpController} from '../../modules/common/controllers/help-controller';
import { createCityAutocompleteController } from '../../modules/profile/controllers/city-autocomplete-controller';
import { createProfileController } from './../../modules/profile/controllers/profile-controller';

export class Router {
  public applyRoutes(bot: Telegraf<AppSceneContext>) {
    const stage = new Scenes.Stage<AppSceneContext>();
    const routes = {
      profile: {
        type: 'command',
        path: 'profile',
        controller: createProfileController('profile')
      },
      help: {
        type: 'command',
        path: 'help',
        controller: createHelpController('help')
      },
      autocomplete: {
        type: 'on',
        path: 'inline_query',
        controller: createCityAutocompleteController()
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
