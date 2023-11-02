import { generatePath } from 'react-router-dom'

import { appendSlashAtEnd } from './string'

// todo: переиспользовать везде
export const generateApiPath: typeof generatePath = (...args) =>
  appendSlashAtEnd(generatePath(...args))
