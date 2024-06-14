
type Locale = 'en' | 'en-US' | 'es-ES' | 'de-DE' | 'cs-CZ' | 'fr-FR' | 'it-IT' | 'ja-JP' | 'ko-KR' | 'pl-PL' | 'pt-BR' | 'ru-RU' | 'zh-Hans' | 'zh-Hant' | 'zh-CN' | 'zh-TW';
interface Window {
  setLocale: (value: Locale) => void,
  chrome?: {
    webview?: any;
  };
}
