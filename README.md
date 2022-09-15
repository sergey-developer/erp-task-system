# ITSM
[Репозиторий](https://gitlab.benovate.ru/obermeister/itsm/frontend)

## Технологии
- [Typescript](https://www.typescriptlang.org)
- [React](https://reactjs.org) single page application
- Routing [React Router](https://reactrouter.com/docs/en/v6)
- State management [Redux Toolkit](https://redux-toolkit.js.org), [RTK Query](https://redux-toolkit.js.org/rtk-query/overview)
- UI library [Ant Design](https://ant.design)
- Styles [styled-components](https://styled-components.com)
- HTTP Client [axios](https://axios-http.com/docs/intro)
- Testing [jest](https://jestjs.io), [react-testing-library](https://testing-library.com)

---
Приложение создано с помощью [create-react-app](https://github.com/facebook/create-react-app)

## Команды
- `yarn install:dev` Установка зависимостей для dev режима
  - `husky install` нужен для настройки [husky](https://typicode.github.io/husky/#/?id=usage)
- [yarn start](https://create-react-app.dev/docs/getting-started/#npm-start-or-yarn-start) Запускает приложение локально в dev режиме, по умолчанию на http://localhost:3000
- [yarn test](https://create-react-app.dev/docs/getting-started/#npm-test-or-yarn-test) Запускает тесты используя watch mode
- [yarn build](https://create-react-app.dev/docs/production-build/) Собирает production версию приложения
- [yarn eject](https://create-react-app.dev/docs/available-scripts/#npm-run-eject) Команда из create-react-app

## Настройка проекта

### Переменные окружения
Хранятся в `.env.*` файле. Пример файла можно найти в репозитории, он называется `env.example`. Префикс `REACT_APP_` обязателен.

- development: `.env.development`
- production: `.env.production`
- test: `.env.test`

Подробнее про добавление переменных в `create-react-app` можно прочесть [здесь](https://create-react-app.dev/docs/adding-custom-environment-variables).

###### REACT_APP_ENVIRONMENT
- Имеет значения: `development` `production` `test`
- Используется вместо `NODE_ENV` для указания окружения т.к. `create-react-app` не позволяет самостоятельно установить `NODE_ENV`.
Переопределить `NODE_ENV` понадобилось, например для того, чтобы удалять атрибут `data-testid` для production, а для остальных окружений оставить.

### Environment config
После добавления новой переменной в `.env.*` файл, её нужно добавить в `env.config.ts` который находится в папке `src/configs/env`

## Запуск проекта
### Development
1. Перейти в корень проекта
2. Создать файл `.env.development`
   - `REACT_APP_API_URL={url}`
   - `REACT_APP_ENVIRONMENT=development`
3. Установить зависимости `yarn install:dev`
4. Запустить приложение `yarn start`
5. Приложение запускается по умолчанию на `http://localhost:3000`

### Production
1. Перейти в корень проекта
2. Создать файл `.env.production`
   - `REACT_APP_API_URL={url}`
   - `REACT_APP_ENVIRONMENT=production`
3. Установить зависимости `yarn install`
4. Собрать приложение `yarn build`
5. В папке `build` будет лежать `index.html` в котором будут ссылки на всё необходимое 

### Testing
1. Перейти в корень проекта
2. Создать файл `.env.test`
   - `REACT_APP_API_URL=http://localhost:3000`
   - `REACT_APP_ENVIRONMENT=test`
3. Установить зависимости `yarn install`
4. Запустить тесты `yarn test`

## Архитектура
- `.husky` Создаётся при запуске команды `husky install` вместе с папкой `_`
  - `pre-commit` Содержит команды которые запускаются перед командой `git commit`
- `public` Создана при инициализации проекта с помощью `create-react-app`.
В ней лежит файл `index.html`
- `src` Код приложения
  - `_fixtures_` Содержит фикстуры которые могут приходится не только в тестах.
1-й уровень вложенности папок частично копируется из папки `modules`  
  - `_tests_` Содержит всё что может понадобится в любом из тестов
    - `constants` Общие константы для тестов
    - `mocks` Общие моки для тестов
    - `utils` Общие утилиты для тестов
  - `app`
    - `App` Главный компонент приложения
    - `AppProvider` Обёртка для `App.tsx`, содержит `Provider(ы)` других библиотек, а также собственные
  - `components` Общие компоненты
  - `configs` Содержит различные конфиги
  - `lib` Содержит код относящийся только к какой-либо библиотеке
  - `modules` Модули приложения, созданные для группировки функционала приложения на отдельные смысловые группы
    - `{module name}` Содержит код только данного модуля
      - `features` Фичи данного модуля
        - `{feature name}` Содержит код только данной фичи.
        Может не содержать нижеперечисленного если это просто компонент
          - `components` Компоненты данной фичи
          - `permissions` Настройки пермишенов данной фичи
          - `interfaces` Типы данной фичи не относящиеся к контрактам с API
          - `constants` Константы фичи
          - `models` Типы контрактов с API данной фичи
          - `utils` Утилиты данной фичи
          - `hooks` Хуки данной фичи
      - `constants` Общие константы модуля
      - `utils` Общие утилиты модуля
      - `hooks` Общие хуки модуля
      - `models` Общие типы контрактов с API данного модуля
      - `services` Сервисы модуля
      - `interfaces` Может быть папкой или файлом, в зависимости от размера.
      Содержит типы данного модуля не относящиеся к контрактам с API
      - `authSlice` Содержит кусок состояние приложения, созданный с помощью функции `createSlice`
      - `selectors` Может быть папкой или файлом, в зависимости от размера.
      Содержит селекторы состояния данного модуля
  - shared
  - state
  - styles

## State management

## Permissions

## Тесты
- Общая папка для тестов лежит в `src/_tests_`.
Содержит всё что может понадобится в любом из тестов
  - Название `_tests_` используется вместо `__tests__` чтобы на эту папку не реагировал `jest` иначе тесты завершатся с ошибками.
Вместо этого `jest` будет искать тесты только в файлах с названием `*.test.*` `*.spec.*`
- Файлы с тестами создаются в
  1. Папке где лежит сам файл для которого пишутся тесты
  2. Папке `_tests_` которая создаётся рядом с файлом для которого пишутся тесты.
Данная папка может содержать помимо файла с тестами:
     1. `mocks.ts` - моки `api` например
     2. `utils.ts` - утилиты для тестов
     3. `constants.ts` - константы для тестов

## Сборка проекта
Этим занимается [webpack](https://webpack.js.org/), конфиг которого настраивается с помощью [craco](https://www.npmjs.com/package/@craco/craco), файл `craco.config.ts`.

## Стили
- При необходимости `Ant Design` кастомизируется с помощью `styled-components`
- Дефолтная тема `Ant Design` кастомизируется с помощью [craco-antd](https://www.npmjs.com/package/craco-antd) в конфиге `craco.config.ts`
- Файлы для кастомизации стилей находятся в папке `src/styles`
  - Кастомизация темы `antd` - `src/styles/customTheme.less`

## Code style
1. Используется `prettier` настройки которого в файле `.prettierrc.json` 
   - Пакет для автоматической сортировки импортов [prettier-plugin-sorted](https://github.com/ifiokjr/prettier-plugin-sorted). Настройки прописаны в `package.json/importSort` 
2. Используется встроенный в CRA `eslint`
3. Для автоматического запуска линтеров используется [lint-staged](https://github.com/okonet/lint-staged), который запускается с помощью [husky](https://typicode.github.io/husky/#/?id=usage) на этапе `pre-commit` только для изменённых файлов. Запуск прописан в файле `.husky/pre-commit`

### Наименования типов

### Наименования файлов


## CI/CD
### Testing
Сборка и запуск приложения описаны в пункте `Запуск проекта / Testing`.
Только нужно добавить переменную окружения [CI=true](https://create-react-app.dev/docs/advanced-configuration)
