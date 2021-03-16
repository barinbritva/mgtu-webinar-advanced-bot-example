import { InlineQueryResultLocation } from 'telegraf/typings/telegram-types';
import { AppSceneContext } from '../../../app/interfaces/app-context';

export function createCityAutocompleteController () {
  return (ctx: AppSceneContext) => {
    const query: string = ctx.inlineQuery!.query;

    const cities: InlineQueryResultLocation[] = [
      {
        type: 'location',
        id: 'msk',
        title: 'Москва',
        latitude: 55.75222,
        longitude: 37.61556,
        input_message_content: {
          message_text: 'Москва',
        }
      },
      {
        type: 'location',
        id: 'spb',
        title: 'Санкт-Петербург',
        latitude: 59.89444,
        longitude: 30.26417,
        input_message_content: {
          message_text: 'Санкт-Петербург',
        }
      },
      {
        type: 'location',
        id: 'ekb',
        title: 'Екатеринбург',
        latitude: 56.8575,
        longitude: 60.6125,
        input_message_content: {
          message_text: 'Екатеринбург',
        }
      },
      {
        type: 'location',
        id: 'samara',
        title: 'Самара',
        latitude: 53.20006,
        longitude: 50.15,
        input_message_content: {
          message_text: 'Самара',
        }
      },
      {
        type: 'location',
        id: 'samarkand',
        title: 'Самарканд',
        latitude: 39.65417,
        longitude: 66.95972,
        input_message_content: {
          message_text: 'Самарканд',
        }
      },
      {
        type: 'location',
        id: 'sanfran',
        title: 'Сан-Франциско',
        latitude: 37.77493,
        longitude: 37.77493,
        input_message_content: {
          message_text: 'Сан-Франциско',
        }
      }
    ];

    console.log('query', typeof query, query);

    let results;
    if (query.length > 0) {
      results = cities.filter((city) => {
        return city.title.toLowerCase().includes(query.toLowerCase())
      });
    } else {
      results = cities.slice(0, 3);
    }

    return ctx.answerInlineQuery(results, {cache_time: 0});
  };
}
