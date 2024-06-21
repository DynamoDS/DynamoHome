
declare module "*.module.css";
type Locale = 'en' | 'en-US' | 'es-ES' | 'de-DE' | 'cs-CZ' | 'fr-FR' | 'it-IT' | 'ja-JP' | 'ko-KR' | 'pl-PL' | 'pt-BR' | 'ru-RU' | 'zh-Hans' | 'zh-Hant' | 'zh-CN' | 'zh-TW';
type SidebarCommand = 'open-file' | 'open-template' | 'open-backup-locations' | 'workspace' | 'custom-node';
type SidebarItem = 'Recent' | 'Samples' | 'Learning';
type HomePageSetting = { recentPageViewMode: 'grid' | 'list' | undefined, samplesViewMode: 'grid' | 'list' | undefined }
interface Window {
  setLocale: (value: Locale) => void;
  setShowStartPageChanged: (showStartPage: boolean) => void;
  setHomePageSettings: (settingsJson: any) => void;
  receiveInteractiveGuidesDataFromDotNet: (jsonData: any) => void;
  chrome?: {
    webview?: any;
  };
}
