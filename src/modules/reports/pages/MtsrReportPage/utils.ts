import { MtsrReportLevelEnum } from './constants'

export const checkIsMacroregionsReportLevel = (level: MtsrReportLevelEnum): boolean =>
  level === MtsrReportLevelEnum.Macroregions

export const checkIsSupportGroupsReportLevel = (level: MtsrReportLevelEnum): boolean =>
  level === MtsrReportLevelEnum.SupportGroups

export const checkIsWorkGroupsReportLevel = (level: MtsrReportLevelEnum): boolean =>
  level === MtsrReportLevelEnum.WorkGroups

export const checkIsUsersReportLevel = (level: MtsrReportLevelEnum): boolean =>
  level === MtsrReportLevelEnum.Users
