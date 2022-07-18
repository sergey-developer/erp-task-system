import { Modal, ModalProps, Select, Space, Typography } from 'antd'
import React, { FC, useState } from 'react'

import { TaskDetailsModel } from 'modules/tasks/taskView/models'
import { WorkGroupModel } from 'modules/workGroups/models'
import { workGroupListSelectFieldNames } from 'modules/workGroups/workGroupList/constants'
import { DEFAULT_MODAL_WIDTH } from 'shared/constants/components'
import { BUTTON_TEXT_CANCEL } from 'shared/constants/text'
import { MaybeNull } from 'shared/interfaces/utils'

const { Text, Link } = Typography

const TRANSFER_BUTTON_TEXT: string = 'Перевести заявку'

type TaskSecondLineModalProps = Pick<ModalProps, 'visible' | 'onCancel'> &
  Pick<TaskDetailsModel, 'id'> & {
    workGroupList: Array<WorkGroupModel>
    workGroupListLoading: boolean
    transferTaskIsLoading: boolean
    onTransfer: (value: WorkGroupModel['id']) => void
  }

const TaskSecondLineModal: FC<TaskSecondLineModalProps> = ({
  id,
  visible,
  workGroupList,
  workGroupListLoading,
  transferTaskIsLoading,
  onTransfer,
  onCancel,
}) => {
  const [selectedWorkGroup, setSelectedWorkGroup] =
    useState<MaybeNull<WorkGroupModel['id']>>(null)

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
        disabled: !selectedWorkGroup || transferTaskIsLoading,
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

        <Text type='secondary'>Рабочая группа</Text>

        <Select
          placeholder='Выберите рабочую группу'
          options={workGroupList}
          loading={workGroupListLoading}
          fieldNames={workGroupListSelectFieldNames}
          onSelect={setSelectedWorkGroup}
        />
      </Space>
    </Modal>
  )
}

export default TaskSecondLineModal
