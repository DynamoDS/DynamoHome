import { getMessagesForLocale } from '../../src/localization/localization';

describe('getMessagesForLocale', () => {
  it('returns English messages for "en"', () => {
    const msgs = getMessagesForLocale('en');
    expect(msgs['title.text.recent']).toBe('Recent');
  });

  it('returns English messages for "en-US"', () => {
    const msgs = getMessagesForLocale('en-US');
    expect(msgs['title.text.recent']).toBe('Recent');
  });

  it('returns Spanish messages for "es-ES"', () => {
    const msgs = getMessagesForLocale('es-ES');
    expect(msgs).toBeDefined();
    expect(typeof msgs['title.text.recent']).toBe('string');
  });

  it('returns German messages for "de-DE"', () => {
    const msgs = getMessagesForLocale('de-DE');
    expect(msgs).toBeDefined();
    expect(typeof msgs['title.text.recent']).toBe('string');
  });

  it('returns Czech messages for "cs-CZ"', () => {
    const msgs = getMessagesForLocale('cs-CZ');
    expect(msgs).toBeDefined();
    expect(typeof msgs['title.text.recent']).toBe('string');
  });

  it('returns French messages for "fr-FR"', () => {
    const msgs = getMessagesForLocale('fr-FR');
    expect(msgs).toBeDefined();
    expect(typeof msgs['title.text.recent']).toBe('string');
  });

  it('returns Italian messages for "it-IT"', () => {
    const msgs = getMessagesForLocale('it-IT');
    expect(msgs).toBeDefined();
    expect(typeof msgs['title.text.recent']).toBe('string');
  });

  it('returns Japanese messages for "ja-JP"', () => {
    const msgs = getMessagesForLocale('ja-JP');
    expect(msgs).toBeDefined();
    expect(typeof msgs['title.text.recent']).toBe('string');
  });

  it('returns Korean messages for "ko-KR"', () => {
    const msgs = getMessagesForLocale('ko-KR');
    expect(msgs).toBeDefined();
    expect(typeof msgs['title.text.recent']).toBe('string');
  });

  it('returns Polish messages for "pl-PL"', () => {
    const msgs = getMessagesForLocale('pl-PL');
    expect(msgs).toBeDefined();
    expect(typeof msgs['title.text.recent']).toBe('string');
  });

  it('returns Portuguese (Brazil) messages for "pt-BR"', () => {
    const msgs = getMessagesForLocale('pt-BR');
    expect(msgs).toBeDefined();
    expect(typeof msgs['title.text.recent']).toBe('string');
  });

  it('returns Russian messages for "ru-RU"', () => {
    const msgs = getMessagesForLocale('ru-RU');
    expect(msgs).toBeDefined();
    expect(typeof msgs['title.text.recent']).toBe('string');
  });

  it('returns Simplified Chinese messages for "zh-Hans"', () => {
    const msgs = getMessagesForLocale('zh-Hans');
    expect(msgs).toBeDefined();
    expect(typeof msgs['title.text.recent']).toBe('string');
  });

  it('returns Simplified Chinese messages for "zh-CN"', () => {
    const msgs = getMessagesForLocale('zh-CN');
    expect(msgs).toBeDefined();
    expect(typeof msgs['title.text.recent']).toBe('string');
  });

  it('returns Traditional Chinese messages for "zh-Hant"', () => {
    const msgs = getMessagesForLocale('zh-Hant');
    expect(msgs).toBeDefined();
    expect(typeof msgs['title.text.recent']).toBe('string');
  });

  it('returns Traditional Chinese messages for "zh-TW"', () => {
    const msgs = getMessagesForLocale('zh-TW');
    expect(msgs).toBeDefined();
    expect(typeof msgs['title.text.recent']).toBe('string');
  });

  it('returns English as fallback for unknown locale', () => {
    const msgs = getMessagesForLocale('xx-XX' as Locale);
    expect(msgs['title.text.recent']).toBe('Recent');
  });

  it('zh-Hans and zh-CN return the same messages', () => {
    expect(getMessagesForLocale('zh-Hans')).toBe(getMessagesForLocale('zh-CN'));
  });

  it('zh-Hant and zh-TW return the same messages', () => {
    expect(getMessagesForLocale('zh-Hant')).toBe(getMessagesForLocale('zh-TW'));
  });
});
