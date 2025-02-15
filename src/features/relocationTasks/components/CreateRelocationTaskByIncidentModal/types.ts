import { SelectProps } from 'antd'
import { TaskDTO, TaskDetailDTO, TasksDTO } from 'features/tasks/api/dto'

import { BaseModalProps } from 'components/Modals/BaseModal'

import { EmptyFn } from 'shared/types/utils'

export type CreateRelocationTaskByIncidentModalProps = BaseModalProps & {
  onFinish: EmptyFn

  incident?: Pick<
    TaskDetailDTO,
    | 'id'
    | 'recordId'
    | 'title'
    | 'olaStatus'
    | 'olaNextBreachTime'
    | 'olaEstimatedTime'
    | 'name'
    | 'address'
    | 'shop'
    | 'assignee'
  >
  incidentIsLoading: boolean

  searchValue: string
  onSearchIncident: SelectProps<TaskDTO['id'], TaskDTO>['onSearch']
  onChangeIncident: SelectProps<TaskDTO['id'], TaskDTO>['onChange']

  incidents: TasksDTO
  incidentsIsLoading: boolean
}

export type CreateRelocationTaskByIncidentFormFields = {
  incident: TaskDTO['id']
}
