import { Form, Select, Space, Typography } from 'antd'
import React, { FC, useEffect } from 'react'

import BaseModal from 'components/Modals/BaseModal'
import { useGetWorkGroupList } from 'modules/workGroup/hooks'
import { WorkGroupTypeEnum } from 'modules/workGroup/models'
import { validationRules } from 'shared/constants/validation'
import { isEqual } from 'shared/utils/common'

import {
  TaskSecondLineFormFields,
  TaskSecondLineModalProps,
} from './interfaces'
import { OptionTextStyled, SelectStyled } from './styles'

const { Text, Link } = Typography

const OK_BUTTON_TEXT: string = 'Перевести заявку'

const TaskSecondLineModal: FC<TaskSecondLineModalProps> = ({
  id,
  recordId,
  isLoading,
  onSubmit,
  onCancel,
}) => {
  const { data: workGroupList = [], isFetching: workGroupListIsFetching } =
    useGetWorkGroupList({ taskId: id })

  const [form] = Form.useForm<TaskSecondLineFormFields>()

  useEffect(() => {
    if (!workGroupList.length) return

    const workGroup = workGroupList.find(
      (workGroup) =>
        isEqual(workGroup.type, WorkGroupTypeEnum.AssociatedWithSapId) ||
        isEqual(workGroup.type, WorkGroupTypeEnum.DefaultForSupportGroup),
    )

    if (workGroup) {
      form.setFieldsValue({ workGroup: workGroup.id })
    }
  }, [form, workGroupList])

  const modalTitle = (
    <Text>
      Перевод заявки <Link>{recordId}</Link> на II линию
    </Text>
  )

  const handleFinish = async (values: TaskSecondLineFormFields) => {
    await onSubmit(values, form.setFields)
  }

  return (
    <BaseModal
      data-testid='task-second-line-modal'
      visible
      title={modalTitle}
      confirmLoading={isLoading}
      okText={OK_BUTTON_TEXT}
      onOk={form.submit}
      onCancel={onCancel}
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

        <Form<TaskSecondLineFormFields>
          form={form}
          layout='vertical'
          onFinish={handleFinish}
          preserve={false}
        >
          <Form.Item
            data-testid='work-group'
            name='workGroup'
            label='Рабочая группа'
            rules={[validationRules.required]}
          >
            <SelectStyled
              placeholder='Выберите рабочую группу'
              loading={workGroupListIsFetching}
              disabled={isLoading}
            >
              {workGroupList.map(({ id, name, priority, description }) => (
                <Select.Option key={id} value={id} title={description}>
                  <OptionTextStyled $isBold={priority ? priority < 4 : false}>
                    {name}
                  </OptionTextStyled>
                </Select.Option>
              ))}
            </SelectStyled>
          </Form.Item>
        </Form>
      </Space>
    </BaseModal>
  )
}

export default TaskSecondLineModal
