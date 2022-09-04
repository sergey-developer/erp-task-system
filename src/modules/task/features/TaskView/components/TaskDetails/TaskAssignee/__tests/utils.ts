import { generateId, screen } from '__tests/utils'
import { WorkGroupListItemModel } from 'modules/workGroup/features/WorkGroupList/models'

export const getTakeTaskButton = () => screen.getByTestId('btn-takeTask')
export const queryTakeTaskButton = () => screen.queryByTestId('btn-takeTask')

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
