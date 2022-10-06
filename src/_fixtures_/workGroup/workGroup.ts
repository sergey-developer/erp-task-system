import { generateId, generateName } from '_tests_/utils'
import { WorkGroupListItemModel } from 'modules/workGroup/features/WorkGroupList/models'

export const getWorkGroup = (
  props?: Partial<{
    seniorEngineerId: number
    groupLeadId: number
  }>,
): WorkGroupListItemModel => ({
  id: generateId(),
  name: generateName(),
  members: [{ id: generateId(), fullName: generateName() }],
  seniorEngineer: {
    id: props?.seniorEngineerId || generateId(),
    fullName: generateName(),
  },
  groupLead: {
    id: props?.groupLeadId || generateId(),
    fullName: generateName(),
  },
  engineers: [{ id: generateId(), fullName: generateName() }],
})
