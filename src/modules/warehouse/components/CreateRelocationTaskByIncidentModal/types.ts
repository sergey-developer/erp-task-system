import { SelectProps } from 'antd'

import { TaskListItemModel, TaskListModel, TaskModel } from 'modules/task/models'

import { BaseModalProps } from 'components/Modals/BaseModal'

import { EmptyFn } from 'shared/types/utils'

export type CreateRelocationTaskByIncidentModalProps = BaseModalProps & {
  onFinish: EmptyFn

  incident?: Pick<
    TaskModel,
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
  onSearchIncident: SelectProps<TaskListItemModel['id'], TaskListItemModel>['onSearch']
  onChangeIncident: SelectProps<TaskListItemModel['id'], TaskListItemModel>['onChange']

  incidents: TaskListModel
  incidentsIsLoading: boolean
}

export type CreateRelocationTaskByIncidentFormFields = {
  incident: TaskListItemModel['id']
}
