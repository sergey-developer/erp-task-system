import { ModalProps, Select, Space, Typography } from 'antd'
import React, { FC, useState } from 'react'

import LabeledData from 'components/LabeledData'
import BaseModal from 'components/Modals/BaseModal'
import { TaskDetailsModel } from 'modules/task/features/TaskView/models'
import { workGroupListSelectFieldNames } from 'modules/workGroup/features/WorkGroupList/constants/selectFieldNames'
import { WorkGroupListItemModel } from 'modules/workGroup/features/WorkGroupList/models'
import { MaybeNull } from 'shared/interfaces/utils'

const { Text, Link } = Typography

const OK_BUTTON_TEXT: string = 'Перевести заявку'

export type TaskSecondLineModalProps = Pick<TaskDetailsModel, 'id'> & {
  workGroupList: Array<WorkGroupListItemModel>
  workGroupListIsLoading: boolean

  isLoading: boolean
  onSubmit: (value: WorkGroupListItemModel['id']) => Promise<void>
  onCancel: NonNullable<ModalProps['onCancel']>
}

const TaskSecondLineModal: FC<TaskSecondLineModalProps> = ({
  id,

  workGroupList,
  workGroupListIsLoading,

  isLoading,
  onSubmit,
  onCancel,
}) => {
  const [selectedWorkGroup, setSelectedWorkGroup] =
    useState<MaybeNull<WorkGroupListItemModel['id']>>(null)

  const modalTitle = (
    <Text>
      Перевод заявки <Link>{id}</Link> на II линию
    </Text>
  )

  const handleFinish = () => {
    selectedWorkGroup && onSubmit(selectedWorkGroup)
  }

  return (
    <BaseModal
      data-testid='task-second-line-modal'
      visible
      title={modalTitle}
      confirmLoading={isLoading}
      okText={OK_BUTTON_TEXT}
      onOk={handleFinish}
      onCancel={onCancel}
      okButtonProps={{
        disabled: !selectedWorkGroup,
      }}
    >
      <Space direction='vertical' size='large'>
        <Space direction='vertical'>
          <Text>
            Выберите рабочую группу II линии, в которую хотите направить заявку
            для дальнейшей работы. Нажмите кнопку «{OK_BUTTON_TEXT}».
          </Text>

          <Text type='danger'>
            Заявка исчезнет из вашей очереди заявок. Просмотр заявки и работа с
            ней будут недоступны.
          </Text>
        </Space>

        <LabeledData data-testid='work-group' label='Рабочая группа'>
          <Select
            placeholder='Выберите рабочую группу'
            options={workGroupList}
            loading={workGroupListIsLoading}
            disabled={isLoading}
            fieldNames={workGroupListSelectFieldNames}
            onSelect={setSelectedWorkGroup}
          />
        </LabeledData>
      </Space>
    </BaseModal>
  )
}

export default TaskSecondLineModal
