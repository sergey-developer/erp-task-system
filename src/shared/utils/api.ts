import { generatePath } from 'react-router-dom'

import { appendSlashAtEnd } from './string'

// todo: переиспользовать везде
/* Используется вместе с appendSlashAtEnd т.к. generatePath обрезает слэш в конце который нужен для корректного запроса */
export const generateApiPath: typeof generatePath = (...args) =>
  appendSlashAtEnd(generatePath(...args))
