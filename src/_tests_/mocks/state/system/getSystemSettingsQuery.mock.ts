import { SystemSettingsDTO } from 'shared/system/api/dto'

export const getSystemSettingsQueryMock = (data: Partial<SystemSettingsDTO>) => ({
  'getSystemSettings(undefined)': { data },
})
