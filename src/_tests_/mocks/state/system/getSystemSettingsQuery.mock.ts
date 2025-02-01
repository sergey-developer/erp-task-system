import { SystemSettingsModel } from 'shared/system/api/dto'

export const getSystemSettingsQueryMock = (data: Partial<SystemSettingsModel>) => ({
  'getSystemSettings(undefined)': { data },
})
