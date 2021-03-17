import { Scenes, Markup,  } from 'telegraf';
import {AppWizardContext} from '../../../app/interfaces/app-context';
import {MessageHelper} from '../../../app/services/message-helper';

export function createProfileController(routePath: string) {
  const profileController = new Scenes.WizardScene<AppWizardContext>(routePath,
    async (ctx) => {
      const getNameFromContact = (): string => {
        const message: any = ctx.message;
        let name = '';
        if (message.contact != null) {
          if (message.contact.first_name) {
            name += message.contact.first_name;
          }

          if (message.contact.last_name) {
            name += ' ' + message.contact.last_name;
          }
        }

        return name;
      }

      let input = MessageHelper.getUserInput(ctx);
      let contactInput = getNameFromContact();

      if (MessageHelper.isInputEqualToCommnad(ctx, routePath)) {
        return ctx.reply('Введите имя', Markup.keyboard([Markup.button.contactRequest('Взять из профиля')]).oneTime().resize());
      }

      if (input === '' && contactInput === '') {
        return ctx.reply('Убедитесь в корректности ввода');
      }

      await ctx.reply(`${input || contactInput}, рад знакомству!`, Markup.removeKeyboard());
      await ctx.reply('Выберите пол', Markup.inlineKeyboard(
        [Markup.button.callback('🚹 мужской', '🚹'), Markup.button.callback('🚺 женский', '🚺')],
        {columns: 2}
      ));

      return ctx.wizard.next();
    },
    async (ctx) => {
      const input = MessageHelper.getUserInput(ctx);

      if (input !== '🚹' && input !== '🚺') {
        return ctx.reply('Убедитесь в корректности ввода');
      }

      await ctx.reply(
        'Укажите ваш город, передайте местоположение или используейте автокомплит\n' +
        `@meallogbot`,
        Markup.keyboard([Markup.button.locationRequest('Передать местоположение')]).oneTime().resize()
      )

      return ctx.wizard.next();
    },
    async (ctx) => {
      const input = MessageHelper.getUserInput(ctx);
      const message: any = ctx?.message;
      console.log('city', JSON.stringify(input), message?.location);

      await ctx.reply('Ok', Markup.removeKeyboard());

      return ctx.scene.leave();
    }
  );

  return profileController;
}
