import { ReportsStorageKeysEnum } from 'modules/reports/constants'

import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

export type AmountEquipmentSpentReportFiltersStorageType = Partial<{
  categories: IdType[]
}>

const getAmountEquipmentSpentReportFilters =
  (): MaybeNull<AmountEquipmentSpentReportFiltersStorageType> => {
    const state = localStorage.getItem(ReportsStorageKeysEnum.AmountEquipmentSpentReportFilters)
    return state ? JSON.parse(state) : null
  }

const setAmountEquipmentSpentReportFilters = (
  state: AmountEquipmentSpentReportFiltersStorageType,
) =>
  localStorage.setItem(
    ReportsStorageKeysEnum.AmountEquipmentSpentReportFilters,
    JSON.stringify(state),
  )

const deleteAmountEquipmentSpentReportFilters = (
  name: keyof AmountEquipmentSpentReportFiltersStorageType,
): boolean => {
  const state = getAmountEquipmentSpentReportFilters()

  if (state?.[name]) {
    delete state[name]
    setAmountEquipmentSpentReportFilters(state)
    return true
  }

  console.error(
    `Amount equipment spent report filter with name "${name}" not found in local storage`,
  )
  return false
}

const clearAmountEquipmentSpentReportFilters = () =>
  localStorage.removeItem(ReportsStorageKeysEnum.AmountEquipmentSpentReportFilters)

export const reportsLocalStorageService = {
  getAmountEquipmentSpentReportFilters,
  setAmountEquipmentSpentReportFilters,
  deleteAmountEquipmentSpentReportFilters,
  clearAmountEquipmentSpentReportFilters,
}
