import { ModalProps, Select, Space, Typography } from 'antd'
import React, { FC, useState } from 'react'

import LabeledData from 'components/LabeledData'
import BaseModal from 'components/Modals/BaseModal'
import { TaskDetailsModel } from 'modules/task/features/TaskView/models'
import { workGroupListSelectFieldNames } from 'modules/workGroup/features/WorkGroupList/constants/selectFieldNames'
import { WorkGroupListItemModel } from 'modules/workGroup/features/WorkGroupList/models'
import { MaybeNull } from 'shared/interfaces/utils'

const { Text, Link } = Typography

const TRANSFER_BUTTON_TEXT: string = 'Перевести заявку'

type TaskSecondLineModalProps = Pick<ModalProps, 'visible' | 'onCancel'> &
  Pick<TaskDetailsModel, 'id'> & {
    workGroupList: Array<WorkGroupListItemModel>
    workGroupListIsLoading: boolean

    transferTaskIsLoading: boolean
    onTransfer: (value: WorkGroupListItemModel['id']) => void
  }

const TaskSecondLineModal: FC<TaskSecondLineModalProps> = ({
  id,
  visible,
  onCancel,

  workGroupList,
  workGroupListIsLoading,

  onTransfer,
  transferTaskIsLoading,
}) => {
  const [selectedWorkGroup, setSelectedWorkGroup] =
    useState<MaybeNull<WorkGroupListItemModel['id']>>(null)

  const modalTitle = (
    <Text>
      Перевод заявки <Link>{id}</Link> на II линию
    </Text>
  )

  const handleClickTransfer = () => {
    selectedWorkGroup && onTransfer(selectedWorkGroup)
  }

  return (
    <BaseModal
      title={modalTitle}
      visible={visible}
      okText={TRANSFER_BUTTON_TEXT}
      onOk={handleClickTransfer}
      onCancel={onCancel}
      okButtonProps={{
        disabled: !selectedWorkGroup,
        loading: transferTaskIsLoading,
      }}
    >
      <Space direction='vertical' size='large'>
        <Space direction='vertical'>
          <Text>
            Выберите рабочую группу II линии, в которую хотите направить заявку
            для дальнейшей работы. Нажмите кнопку «{TRANSFER_BUTTON_TEXT}».
          </Text>

          <Text type='danger'>
            Заявка исчезнет из вашей очереди заявок. Просмотр заявки и работа с
            ней будут недоступны.
          </Text>
        </Space>

        <LabeledData label='Рабочая группа'>
          <Select
            virtual={false}
            placeholder='Выберите рабочую группу'
            options={workGroupList}
            loading={workGroupListIsLoading}
            disabled={transferTaskIsLoading}
            fieldNames={workGroupListSelectFieldNames}
            onSelect={setSelectedWorkGroup}
          />
        </LabeledData>
      </Space>
    </BaseModal>
  )
}

export default TaskSecondLineModal
