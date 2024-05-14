import CzechMessages from './../locales/cs.json';
import GermanMessages from './../locales/de.json';
import EnglishMessages from './../locales/en.json';
import SpanishMessages from './../locales/es.json';
import FrenchMessages from './../locales/fr.json';
import ItalianMessages from './../locales/it.json';
import JapaneseMessages from './../locales/ja.json';
import KoreanMessages from './../locales/ko.json';
import PolishMessages from './../locales/pl.json';
import PortugueseBrazilMessages from './../locales/pt-BR.json';
import RussianMessages from './../locales/ru.json';
import SimplifiedChineseMessages from './../locales/zh-Hans.json';
import TraditionalChineseMessages from './../locales/zh-Hant.json';

export const getMessagesForLocale = (locale) => {
  switch (locale) {
  case 'en':
    return EnglishMessages;
  case 'en-US':
    return EnglishMessages;
  case 'es-ES':
    return SpanishMessages;
  case 'cs-CZ':
    return CzechMessages;
  case 'de-DE':
    return GermanMessages;
  case 'fr-FR':
    return FrenchMessages;
  case 'it-IT':
    return ItalianMessages;
  case 'ja-JP':
    return JapaneseMessages;
  case 'ko-KR':
    return KoreanMessages;
  case 'pl-PL':
    return PolishMessages;
  case 'pt-BR':
    return PortugueseBrazilMessages;
  case 'ru-RU':
    return RussianMessages;
  case 'zh-Hans':
    return SimplifiedChineseMessages;
  case 'zh-Hant':
    return TraditionalChineseMessages;
  case 'zh-CN':
    return SimplifiedChineseMessages;
  case 'zh-TW':
    return TraditionalChineseMessages;
  default:
    return EnglishMessages;
  }
};
