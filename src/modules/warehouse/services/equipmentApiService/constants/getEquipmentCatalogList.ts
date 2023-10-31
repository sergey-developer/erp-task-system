import { EquipmentConditionEnum } from 'modules/warehouse/constants/equipment'
import { RelocationTaskTypeEnum } from 'modules/warehouse/constants/relocationTask'

export const conditionsParamByRelocationTaskType: Partial<
  Record<RelocationTaskTypeEnum, EquipmentConditionEnum[]>
> = {
  [RelocationTaskTypeEnum.Relocation]: [
    EquipmentConditionEnum.Working,
    EquipmentConditionEnum.Broken,
    EquipmentConditionEnum.NonRepairable,
  ],
  [RelocationTaskTypeEnum.Warranty]: [
    EquipmentConditionEnum.Working,
    EquipmentConditionEnum.Broken,
    EquipmentConditionEnum.NonRepairable,
  ],
  [RelocationTaskTypeEnum.Repair]: [
    EquipmentConditionEnum.Working,
    EquipmentConditionEnum.Broken,
    EquipmentConditionEnum.NonRepairable,
  ],
  [RelocationTaskTypeEnum.WriteOff]: [EquipmentConditionEnum.WrittenOff],
}
