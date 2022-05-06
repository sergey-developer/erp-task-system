# ITSM

## Технологии
- [Typescript](https://www.typescriptlang.org/)
- [React](https://reactjs.org/) single page application
- Routing [React Router](https://reactrouter.com/docs/en/v6)
- State management [Redux Toolkit](https://redux-toolkit.js.org/)
- UI library [Ant Design](https://ant.design/)
- Styles [styled-components](https://styled-components.com/)
- HTTP Client [Axios](https://axios-http.com/docs/intro)

---
Приложение создано с помощью [create-react-app](https://github.com/facebook/create-react-app)

## Команды
- [yarn start](https://create-react-app.dev/docs/getting-started/#npm-start-or-yarn-start): Запускает приложение локально в development режиме, по умолчанию на http://localhost:3000
- [yarn test](https://create-react-app.dev/docs/getting-started/#npm-test-or-yarn-test): Запускает тесты используя watch mode
- [yarn build](https://create-react-app.dev/docs/production-build/): Собирает production версию приложения
- [yarn eject](https://create-react-app.dev/docs/available-scripts/#npm-run-eject): Команда из create-react-app

## Настройка проекта

### Переменные окружения
Хранятся в `.env.*` файле. Пример файла можно найти в [репозитории](https://gitlab.benovate.ru/obermeister/itsm/frontend), он называется `env.example`. Префикс `REACT_APP_` обязателен.

- development: `.env.development`
- production: `.env.production`
- test: `.env.test`

Подробнее про добавление переменных в `create-react-app` можно прочесть [здесь](https://create-react-app.dev/docs/adding-custom-environment-variables).

### Environment config
После добавления новой переменной в `.env.*` файл, её нужно добавить в `env.config.ts` который находится в папке `src/configs/env`

### Development
1. Склонировать [репозиторий](https://gitlab.benovate.ru/obermeister/itsm/frontend) и перейти в корень проекта
2. Создать файл `.env.development` и добавить нужные переменные
3. Установить зависимости `yarn install`
4. Запустить приложение `yarn start`
5. Открыть браузер на http://localhost:3000

### Production
1. Перейти в корень проекта
2. Создать файл `.env.production` и добавить нужные переменные
3. Установить зависимости `yarn install`
4. Собрать приложение `yarn build`
5. В папке `build` будет лежать `index.html` в котором будут ссылки на всё необходимое 

## Архитектура

TODO

## Автоматическая генерация типов и методов АПИ
производится командой `yarn genapi` на основе OpenApi схемы
URL схемы необходимо задать в локальном .env, переменная REACT_APP_SWAGGER_SCHEMA_URL

## Сборка проекта
Этим занимается [webpack](https://webpack.js.org/), конфиг которого настраивается с помощью [craco](https://www.npmjs.com/package/@craco/craco), файл `craco.config.ts`.

## Стили
- Библиотека компонентов `Ant Design`
- Кастомизация `Ant Design` с помощью `styled-components`
- Дефолтная тема `Ant Design` кастомизируется с помощью [craco-antd](https://www.npmjs.com/package/craco-antd) в конфиге `craco.config.ts`
- Файлы для кастомизации стилей находятся в папке `src/styles`

## Code style
### Prettier
TODO

### Авто сортировка импортов
TODO

## Testing
TODO

## Routing
TODO

## State management
TODO

## CI/CD
TODO

## Deployment
TODO
