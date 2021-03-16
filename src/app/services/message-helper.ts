import Context from 'telegraf/typings/context';

export abstract class MessageHelper {
  public static getUserInput(ctx: Context): string {
    let input = '';

    const callbackQuery = ctx.callbackQuery;
    if (callbackQuery != null && ('data' in callbackQuery)) {
      input = callbackQuery.data;
      
      ctx.answerCbQuery().catch((error) => {
        console.warn('Failed to answer callback.', error);
      });
    }

    const message = ctx.message
    if (input === '' && message != null && ('text' in message)) {
      input = message.text;
    }

    return input;
  }

  public static isInputEqualToCommnad(ctx: Context, text: string): boolean {
    const input = MessageHelper.getUserInput(ctx);

    if (input[0] !== '/') {
      return false
    }

    return input.substr(1) === text;
  }
}
