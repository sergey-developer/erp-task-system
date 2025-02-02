import { SystemSettingsDTO } from 'shared/system/api/dto/systemSettings'

export const getSystemSettingsQueryMock = (data: Partial<SystemSettingsDTO>) => ({
  'getSystemSettings(undefined)': { data },
})
