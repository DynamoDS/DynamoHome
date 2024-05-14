# DynamoHome

[![License](https://img.shields.io/npm/l/@dynamods/dynamo-home)](https://github.com/DynamoDS/DynamoHome/blob/master/LICENSE)
[![version](https://img.shields.io/npm/v/@dynamods/dynamo-home?logo=npm&label=version)](https://www.npmjs.com/package/@dynamods/dynamo-home)
[![Build](https://github.com/DynamoDS/DynamoHome/actions/workflows/build.yml/badge.svg)](https://github.com/DynamoDS/DynamoHome/actions/workflows/build.yml)
[![Publish](https://github.com/DynamoDS/DynamoHome/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/DynamoDS/DynamoHome/actions/workflows/npm-publish.yml)

A react-based app to serve as Dynamo landing page.
This application is specific to Dynamo and utilizes several specific endpoints to work as intended.

## Introduction

### Layout

The sidebar contains links to the 3 main modules:

- `Recent` - lists of recently opened files (the number of recent files can be changed by the user in Dynamo preferences window)
- `Samples` - lists Sample files. e.g "%ProgramData%\Autodesk\RVT 2025\Samples"
- `Learning` - a one-stop-shop for Dynamo learning resources

#### Recent module

![recent](https://github.com/dnenov/DynamoHomePage/assets/5354594/d47687b6-dd91-46eb-a9a3-f97eb44a7ddb)

#### Samples module

![samples](https://github.com/dnenov/DynamoHomePage/assets/5354594/21279b42-3a55-4f22-8872-e084035598ba)

#### Learning module

![learning](https://github.com/dnenov/DynamoHomePage/assets/5354594/c4cc53c7-8d3d-4d16-bd82-19530169c313)

## Development

### Requirements

- [git](https://git-scm.com/)
- [Node.js](https://nodejs.org/)

### Install

```shell
git clone https://github.com/DynamoDS/DynamoHome.git
cd DynamoHome
npm install --force
```

### Running the project

```shell
npm start
```

### Build for development

```shell
npm run build
```

### Create a distribution bundle

```shell
npm run bundle
```

### Lint

We use [ESlint](https://eslint.org/) to analyze and find problems. It has [integrations](https://eslint.org/docs/latest/user-guide/integrations) for various editors and other tools.

```shell
npm run lint:check  # To find problems
npm run lint:fix    # To fix problems
```

### Test

We use [jest](https://jestjs.io/) and [playwright](https://playwright.dev/) to run our tests.

```shell
npm run test:unit   # To run unit test
npm run test:e2e    # To run e2e test
npm run test        # To runs all tests
```

### Bump Version

```shell
npm run version:patch   # To bump patch version
```

### Localization

Localization is done via [`react-intl`](https://www.npmjs.com/package/react-intl) library. The current setup relies on the combination of these 2 elements:

- localization files stored inside the [`src/locales`](src/locales) folder (add as many localization files as needed)
- adding new locales to the switch statement inside the [`src/localization/localization.js`](src/localization/localization.js) file:

```javascript
export const getMessagesForLocale = (locale) => {
  switch(locale) {
    case 'en':
      return EnglishMessages;
    default:
      return EnglishMessages;
  }
}
```

### 3rd party libraries and dependencies

The use of 3rd party libraries was kept to the bare minimum, where developing native elements would have resulted in exceptional time overhead.

- [`react-intl`](https://www.npmjs.com/package/react-intl) - library used for localization
- [`react-split-pane`](https://www.npmjs.com/package/react-split-pane) - allows resizable (draggable) panel (used in the SidePanel)
- [`react-table`](https://www.npmjs.com/package/react-table) - a lightweight headless react table

### Generate Third Party License Info

- To generate about box html files use `npm run license`, this will output alternative about box files to [license_output](license_output). One will contain the full transitive production dep list, the other will contain the direct production deps.
- These files will be packed into the released npm package
