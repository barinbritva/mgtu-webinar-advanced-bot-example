import dotenv from 'dotenv';
import {Configuration} from './app/services/configuration';
import { AppLauncher } from './app/bootstrap/app-launcher';

dotenv.config();

const config = new Configuration();
const appLauncher = new AppLauncher(config);

appLauncher.start()
  .then((bot) => {
    bot.on('text', (ctx) => {
      return ctx.reply(ctx.message.text);
    });

    console.info('App started.');

    process.once('SIGINT', () => {
      appLauncher.stop('SIGINT');
    })
    process.once('SIGTERM', () => {
      appLauncher.stop('SIGTERM');
    })
  })
  .catch((error) => {
    console.error('Failed to start app.', error);
})

// show buttons/inline buttons
// bot.command('/profile', (ctx) => {

// })

// // @autocomplete
// bot.command('/ingredients', (ctx) => {

// })
