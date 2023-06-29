export const userApiMessages = {
  getMe: {
    commonError: 'Не удалось получить профиль пользователя',
  },
  updateUser: {
    commonError: 'Ошибка обновления пользователя',
  },
  updateUserTimeZone: {
    commonError: 'Ошибка обновления временной зоны пользователя',
  },
} as const

// todo: переделать по этому примеру
export const getUserStatusListErrorMessages = {
  commonError: 'Ошибка получения статусов пользователя',
} as const
