import { SystemSettingsModel } from 'shared/models/system'

export const getSystemSettingsQueryMock = (data: Partial<SystemSettingsModel>) => ({
  'getSystemSettings(undefined)': { data },
})
