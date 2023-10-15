import { Form, Select, Space, Typography, Input, Checkbox } from 'antd'
import { CheckboxChangeEvent } from 'antd/lib/checkbox/Checkbox'
import isEqual from 'lodash/isEqual'
import React, { FC, useEffect } from 'react'

import { useGetWorkGroupList } from 'modules/workGroup/hooks'
import { WorkGroupTypeEnum } from 'modules/workGroup/models'

import BaseModal from 'components/Modals/BaseModal'

import { onlyRequiredRules } from 'shared/constants/validation'

import { WorkGroupFormItem } from './styles'
import { TaskSecondLineFormFields, TaskSecondLineModalProps } from './types'

const { Text, Link } = Typography
const { TextArea } = Input

const okBtnText = 'Перевести заявку'

const TaskSecondLineModal: FC<TaskSecondLineModalProps> = ({
  id,
  recordId,
  isLoading,
  onSubmit,
  onCancel,
}) => {
  const [form] = Form.useForm<TaskSecondLineFormFields>()
  const markDefaultGroupValue = Form.useWatch('markAsDefault', form)

  const { data: workGroupList = [], isFetching: workGroupListIsFetching } = useGetWorkGroupList({
    taskId: id,
  })

  useEffect(() => {
    if (!workGroupList.length) return

    const workGroup = workGroupList.find(
      (workGroup) =>
        isEqual(workGroup.priority?.type, WorkGroupTypeEnum.AssociatedWithSapId) ||
        isEqual(workGroup.priority?.type, WorkGroupTypeEnum.DefaultForSupportGroup),
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

  const handleChangeMarkDefaultGroup = (event: CheckboxChangeEvent) => {
    form.setFieldsValue({ markAsDefault: event.target.checked })
  }

  return (
    <BaseModal
      data-testid='task-second-line-modal'
      open
      title={modalTitle}
      confirmLoading={isLoading}
      okText={okBtnText}
      onOk={form.submit}
      onCancel={onCancel}
    >
      <Space direction='vertical' size='large'>
        <Space direction='vertical'>
          <Text>
            Выберите рабочую группу II линии, в которую хотите направить заявку для дальнейшей
            работы. Нажмите кнопку «{okBtnText}».
          </Text>

          <Text type='danger'>
            Заявка исчезнет из вашей очереди заявок. Просмотр заявки и работа с ней будут
            недоступны.
          </Text>
        </Space>

        <Form<TaskSecondLineFormFields>
          form={form}
          layout='vertical'
          onFinish={handleFinish}
          preserve={false}
        >
          <WorkGroupFormItem
            data-testid='work-group-form-item'
            name='workGroup'
            label='Рабочая группа'
            rules={onlyRequiredRules}
          >
            <Select
              placeholder='Выберите рабочую группу'
              loading={workGroupListIsFetching}
              showSearch
              filterOption={(input, option) =>
                option?.title.toLowerCase().includes(input.toLowerCase())
              }
            >
              {workGroupList.map(({ id, name, priority }) => (
                <Select.Option
                  data-testid={`select-option-${id}`}
                  key={id}
                  value={id}
                  title={priority?.description}
                >
                  <Text strong={!!priority && priority.value < 4}>{name}</Text>
                </Select.Option>
              ))}
            </Select>
          </WorkGroupFormItem>

          <Form.Item data-testid='mark-default-group-form-item' name='markAsDefault'>
            <Checkbox onChange={handleChangeMarkDefaultGroup} checked={markDefaultGroupValue}>
              Установить выбранную Рабочую группу по умолчанию для данного SAP ID
            </Checkbox>
          </Form.Item>

          <Form.Item data-testid='comment-form-item' label='Комментарий' name='comment'>
            <TextArea placeholder='Добавьте комментарий' />
          </Form.Item>
        </Form>
      </Space>
    </BaseModal>
  )
}

export default TaskSecondLineModal
