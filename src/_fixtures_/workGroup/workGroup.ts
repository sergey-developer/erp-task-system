import { generateId, generateName } from '_tests_/utils'
import { WorkGroupListItemModel } from 'modules/workGroup/features/WorkGroupList/models'

export const getWorkGroup = ({
  groupLeadId = generateId(),
  seniorEngineerId = generateId(),
}: Partial<{
  seniorEngineerId: number
  groupLeadId: number
}> = {}): WorkGroupListItemModel => ({
  id: generateId(),
  name: generateName(),
  members: [{ id: generateId(), fullName: generateName() }],
  seniorEngineer: { id: seniorEngineerId, fullName: generateName() },
  groupLead: { id: groupLeadId, fullName: generateName() },
  engineers: [{ id: generateId(), fullName: generateName() }],
})
