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
  - `husky install` Нужен для настройки [husky](https://typicode.github.io/husky/#/?id=usage)
- [yarn start](https://create-react-app.dev/docs/getting-started/#npm-start-or-yarn-start) Запускает приложение локально в dev режиме, по умолчанию на http://localhost:3000
- `yarn test` Запускает тесты в обычном режиме
- [yarn test:watch](https://create-react-app.dev/docs/getting-started/#npm-test-or-yarn-test) Запускает тесты в watch режиме
- `yarn test:cov` Запускает тесты в обычном режиме с последующем выводом coverage отчёта
- [yarn build](https://create-react-app.dev/docs/production-build/) Собирает production версию приложения
- [yarn eject](https://create-react-app.dev/docs/available-scripts/#npm-run-eject) Команда из create-react-app
- `yarn lint` Запускает встроенный в CRA линтер

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
После добавления новой переменной в `.env.*` файл, её нужно добавить в `env.config.ts` который находится в папке `src/configs/env`.

Данный конфиг нужен для удобства чтения переменных окружения в приложении.

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
4. Запустить тесты `yarn test` или `yarn test:watch`

## Архитектура
- `.husky` Создаётся при запуске команды `husky install` вместе с папкой `_`
  - `pre-commit` Содержит команды которые запускаются перед командой `git commit`
- `public` Создана при инициализации проекта с помощью `create-react-app`.
В ней лежит файл `index.html`
- `src` Код приложения
  - `index.tsx` Файл в котором React рендерит приложение. Входная точка для `webpack`
  - `fixtures` Содержит фикстуры которые могут приходится не только в тестах.
1-й уровень вложенности папок частично копируется из папки `modules`  
  - `_tests_` Содержит всё что может понадобится в любом из тестов
    - `constants` Общие константы для тестов
    - `mocks` Общие моки для тестов
    - `utils` Общие утилиты для тестов
  - `app`
    - `App` Главный компонент приложения. Содержит импорты всех нужных стилей, некоторые настройки и т.п.
    - `AppProvider` Обёртка для `App.tsx`, содержит `Provider(ы)` других библиотек, а также собственные
  - `components` Общие компоненты
  - `configs` Содержит различные конфиги
    - `env` Конфиги переменных окружения
    - `httpClient` Конфиг для http client
    - `navMenu` Конфиг меню навигации
    - `routes` Конфиги роутинга
  - `lib` Содержит код относящийся только к какой-либо библиотеке
  - `modules` Модули приложения, созданные для группировки функционала приложения на отдельные смысловые группы
    - `{module name}` Содержит код только данного модуля
      - `features` Фичи данного модуля
        - `{feature name}` Содержит код только данной фичи.
        Может не содержать нижеперечисленного если это просто компонент
          - `components` Компоненты данной фичи
          - `permissions` Конфиги пермишенов данной фичи
          - `interfaces` Типы данной фичи не относящиеся к контрактам с API
          - `constants` Константы фичи
          - `models` Типы контрактов с API данной фичи
          - `utils` Утилиты данной фичи
          - `hooks` Хуки данной фичи
      - `permissions` Конфиги пермишенов данного модуля, которые являются общими и могут использоваться в разных фичах
      - `constants` Общие константы модуля
      - `utils` Общие утилиты модуля
      - `hooks` Общие хуки модуля
      - `models` Общие типы контрактов с API данного модуля
      - `services` Сервисы модуля
      - `interfaces` Может быть папкой или файлом, в зависимости от размера.
      Содержит типы данного модуля не относящиеся к контрактам с API
      - `*.slice` Содержит кусок состояние приложения, созданный с помощью функции `createSlice`
      - `selectors` Может быть папкой или файлом, в зависимости от размера.
      Содержит селекторы состояния данного модуля
  - `shared` Содержит общий функционал который может потребоваться в любом месте
    - `constants` Общие константы
    - `hooks` Общие хуки
    - `models` Общие типы контрактов с API
    - `interfaces` Общие типы не относящиеся к контрактам с API
    - `services` Общие сервисы
    - `utils` Общие утилиты
  - `state` Функционал глобального состояния
    - `rootReducer`
    - `store`
  - `styles` Глобальные стили приложения
    - `customize.antd` Кастомизация стилей `antd`
    - `customTheme` Переопределение переменных `antd`
    - `table` Стили таблиц
    - `theme` Тема `styled-components`
    - `index` Содержит все нужные стили которые применяются в компоненте `App`

## Работа с API
### http client
С API названия полей приходят и принимаются в `snake_case`,
поэтому в конфиг `axios` добавлен функционал перевода `snake_case` в `camelCase`,
чтобы не делать это самостоятельно и вовсе не использовать `snake_case` в проекте.
Это также относится к `query params`.

Так как для обмена данными с API используется `json` формат,
добавлен функционал автоматического перевода данных в этот формат
при отправке запросов и наоборот, парсинга данных, при получении.

### hooks
Все запросы делаются с помощью хуков которые генерирует `rtk-query`,
затем они оборачиваются в касмотные хуки, в основном для:
- Ограничения запросов по ролям
- Обработки ошибок

### types
Прописываются вручную. Ранее подключалась [библиотека](https://github.com/reduxjs/redux-toolkit/tree/master/packages/rtk-query-codegen-openapi) для автогенерации типов из `OpenAPi schema`,
но от неё пришлось отказаться т.к. она:
- Не умеет трансформировать названия полей из `snake_case` в `camelCase`
- Не корректно генерировала `enum`

## State management
Для работы с состоянием разных модулей используется [injectEndpoints](https://redux-toolkit.js.org/rtk-query/usage/code-splitting).
Данный функционал применяется в сервисе работы с API конкретного модуля, например `authApi.service`.
Это нужно не только для `code splitting` но и для разделения ответственности.

### Типы кастомных хуков
Ранее существовала такая проблема:
RTK query не умеет правильно доставать ReturnType из сгенерированного useQuery хука.
Хак, который исправляет проблему взят [отсюда](https://github.com/reduxjs/redux-toolkit/issues/1363),
открытый [issue](https://github.com/reduxjs/redux-toolkit/issues/1937) по проблеме,
[пулл реквест](https://github.com/reduxjs/redux-toolkit/pull/2276) за которым нужно следить.

Появилось решения и для описания возвращаемого типа можно использовать типы `TypedUse*****Result`.

## Permissions
Пермишены ролей реализованы на фронте.

- Перечисленны в `UIPermissionsEnum`, `CRUDPermissionsEnum`
- Конфиги описываются в файле `*.permissions.ts`
- Хук `useUserPermissions` для получения пермишенов в зависимости от роли пользователя
- Функция `getPermissionsMap` для получения пермишенов вне хука `useUserPermissions`

## Тесты
- Общая папка для тестов лежит в `src/_tests_`.
Содержит всё что может понадобится в любом из тестов
  - Название `_tests_` используется вместо `__tests__` чтобы на эту папку не реагировал `jest` иначе тесты завершатся с ошибками.
Вместо этого `jest` будет искать тесты только в файлах с названием `*.test.*` `*.spec.*`
- Файлы с тестами создаются в
  - Папке где лежит сам файл для которого пишутся тесты
  - Папке `_tests_` которая создаётся рядом с файлом для которого пишутся тесты.
Данная папка может содержать помимо файла с тестами:
     - `mocks.ts` моки `api`
     - `utils.ts` утилиты для тестов
     - `constants.ts` константы для тестов
- Для удобства нахождения элементов, к ним добавляется
дата атрибут `data-testid`, он используется для написания `unit-tests`
с помощью `react-testing-library` и для `e2e-tests`, которые пишутся тестировщиком.
  - В `production` окружении данный атрибут удаляется
с помощью babel плагина `babel-plugin-jsx-remove-data-test-id`

## Сборка проекта
Этим занимается [webpack](https://webpack.js.org/), конфиг которого настраивается с помощью [craco](https://www.npmjs.com/package/@craco/craco), файл `craco.config.ts`.

## Стили
- При необходимости `Ant Design` кастомизируется с помощью `styled-components`
- Дефолтная тема `Ant Design` кастомизируется с помощью [craco-antd](https://www.npmjs.com/package/craco-antd) в конфиге `craco.config.ts`
- Кастомизация темы `antd` - `src/styles/customTheme.less`
---
### Адаптивность
Для определения размеров экрана используется хук `useBreakpoint` из `antd`,
результат которого передаётся в `styled component`,
где уже в зависимости от размера экрана добавляются нужные стили,
для этого можно использовать функцию `applyBreakpointStyles`.

## Code style
- Используется `prettier`
  - Конфиг `.prettierrc.json` 
  - Пакет для автоматической сортировки импортов [prettier-plugin-sorted](https://github.com/ifiokjr/prettier-plugin-sorted). Настройки прописаны в `package.json/importSort` 
- Используется встроенный в CRA `eslint`
- Для автоматического запуска линтеров используется [lint-staged](https://github.com/okonet/lint-staged), который запускается с помощью [husky](https://typicode.github.io/husky/#/?id=usage) на этапе `pre-commit` только для изменённых файлов. Запуск прописан в файле `.husky/pre-commit`
---
### Наименования типов
- Имена моделей оканчиваются на `Model`
- Имена `enum` оканчиваются на `Enum`

### Наименования файлов
- `*.model.ts` файл моделей
- `*.permissions.ts` файл пермишенов
- `*.service.ts` файл сервиса
- `*.slice` файл состояния, созданного с помощью функции `createSlice`

## CI/CD
### Testing
- Сборка и запуск приложения описаны в пункте `Запуск проекта / Testing`, но в 4-м пункте команда меняется на - `yarn test:cov`
- Прокинуть переменную окружения [CI=true](https://create-react-app.dev/docs/advanced-configuration)

После запуска тестов, в корне проекта появится папка `coverage`
