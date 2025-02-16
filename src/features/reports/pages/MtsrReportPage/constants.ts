import { GetMtsrReportBaseRequest } from 'features/reports/api/schemas'
import { MtsrReportFormFields } from 'features/reports/components/MtsrReportForm/types'
import moment from 'moment-timezone'

import { DATE_FORMAT } from 'shared/constants/dateTime'
import { IdType } from 'shared/types/common'
import { StringMap } from 'shared/types/utils'
import { formatDate } from 'shared/utils/date'

export enum MtsrReportLevelEnum {
  Macroregions = 'Macroregions',
  SupportGroups = 'SupportGroups',
  WorkGroups = 'WorkGroups',
  Users = 'Users',
}

export const mtsrReportFormInitialValues: MtsrReportFormFields = {
  period: [moment().set('date', 1), moment()],
}

export const initialLevelObjects: Partial<Record<MtsrReportLevelEnum, IdType[]>> = {
  [MtsrReportLevelEnum.Macroregions]: [],
  [MtsrReportLevelEnum.SupportGroups]: [],
  [MtsrReportLevelEnum.WorkGroups]: [],
  [MtsrReportLevelEnum.Users]: [],
}

export const getMtsrReportInitialRequest: Omit<GetMtsrReportBaseRequest, 'customers'> = {
  dateStart: formatDate(mtsrReportFormInitialValues.period[0], DATE_FORMAT),
  dateEnd: formatDate(mtsrReportFormInitialValues.period[1], DATE_FORMAT),
  ordering: '-average_execution_time',
}

export const mtsrReportLevelDict: StringMap<MtsrReportLevelEnum> = {
  [MtsrReportLevelEnum.Macroregions]: 'Макро',
  [MtsrReportLevelEnum.SupportGroups]: 'Группы поддержки',
  [MtsrReportLevelEnum.WorkGroups]: 'Рабочие группы',
  [MtsrReportLevelEnum.Users]: 'Пользователи',
}
