import { Modal, ModalProps, Select, Space, Typography } from 'antd'
import React, { FC, useState } from 'react'

import { TaskDetailsModel } from 'modules/task/components/TaskView/models'
import { workGroupListSelectFieldNames } from 'modules/workGroup/components/WorkGroupList/constants'
import { WorkGroupListItemModel } from 'modules/workGroup/components/WorkGroupList/models'
import { DEFAULT_MODAL_WIDTH } from 'shared/constants/components'
import { BUTTON_TEXT_CANCEL } from 'shared/constants/text'
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
    <Modal
      title={modalTitle}
      width={DEFAULT_MODAL_WIDTH}
      visible={visible}
      okText={TRANSFER_BUTTON_TEXT}
      cancelText={BUTTON_TEXT_CANCEL}
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

        <Space direction='vertical'>
          <Text type='secondary'>Рабочая группа</Text>

          <Select
            placeholder='Выберите рабочую группу'
            options={workGroupList}
            loading={workGroupListIsLoading}
            disabled={transferTaskIsLoading}
            fieldNames={workGroupListSelectFieldNames}
            onSelect={setSelectedWorkGroup}
          />
        </Space>
      </Space>
    </Modal>
  )
}

export default TaskSecondLineModal
