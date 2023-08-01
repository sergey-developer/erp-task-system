import { Form, Select, Space, Typography, Input } from 'antd'
import isEqual from 'lodash/isEqual'
import React, { FC, useEffect } from 'react'

import { useGetWorkGroupList } from 'modules/workGroup/hooks'
import { WorkGroupTypeEnum } from 'modules/workGroup/models'

import BaseModal from 'components/Modals/BaseModal'

import { validationRules } from 'shared/constants/validation'

import {
  TaskSecondLineFormFields,
  TaskSecondLineModalProps,
} from './interfaces'
import { OptionTextStyled, SelectStyled } from './styles'

const { Text, Link } = Typography
const { TextArea } = Input

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
        isEqual(
          workGroup.priority?.type,
          WorkGroupTypeEnum.AssociatedWithSapId,
        ) ||
        isEqual(
          workGroup.priority?.type,
          WorkGroupTypeEnum.DefaultForSupportGroup,
        ),
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
              {workGroupList.map(({ id, name, priority }) => (
                <Select.Option
                  data-testid={`select-option-${id}`}
                  key={id}
                  value={id}
                  title={priority?.description}
                >
                  <OptionTextStyled
                    $isBold={priority ? priority.value < 4 : false}
                  >
                    {name}
                  </OptionTextStyled>
                </Select.Option>
              ))}
            </SelectStyled>
          </Form.Item>

          <Form.Item
            data-testid='comment-form-item'
            label='Комментарий'
            name='comment'
          >
            <TextArea placeholder='Добавьте комментарий' disabled={isLoading} />
          </Form.Item>
        </Form>
      </Space>
    </BaseModal>
  )
}

export default TaskSecondLineModal
