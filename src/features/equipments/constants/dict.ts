import { EquipmentConditionEnum } from '../api/constants'

export const equipmentConditionDict: Record<EquipmentConditionEnum, string> = {
  [EquipmentConditionEnum.Working]: 'Рабочее',
  [EquipmentConditionEnum.Broken]: 'Нерабочее',
  [EquipmentConditionEnum.NonRepairable]: 'Неремонтопригодное',
  [EquipmentConditionEnum.WrittenOff]: 'Списанное',
}
