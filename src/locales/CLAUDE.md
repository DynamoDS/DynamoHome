All 14 locale files must stay in sync. When you add, rename, or remove a key in any file, apply the same change to all of these:

```
en.json       cs.json    de.json    en-GB.json
es.json       fr.json    it.json    ja.json
ko.json       pl.json    pt-BR.json ru.json
zh-Hans.json  zh-Hant.json
```

`en.json` is the source of truth. Use the English value as a placeholder when a translation is not available yet. Never leave a key missing in any file — it throws at runtime for users of that locale.
