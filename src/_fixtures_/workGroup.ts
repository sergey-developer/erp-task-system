import { generateId } from '_tests_/utils'
import { WorkGroupListItemModel } from 'modules/workGroup/features/WorkGroupList/models'

export const getWorkGroup = ({
  groupLeadId = generateId(),
  seniorEngineerId = generateId(),
}: Partial<{
  seniorEngineerId: number
  groupLeadId: number
}> = {}): WorkGroupListItemModel => ({
  id: generateId(),
  name: '',
  members: [{ id: generateId(), fullName: '' }],
  seniorEngineer: { id: seniorEngineerId, fullName: '' },
  groupLead: { id: groupLeadId, fullName: '' },
  engineers: [{ id: generateId(), fullName: '' }],
})
