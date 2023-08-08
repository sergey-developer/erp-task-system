import { Form, Select, Space, Typography, Input, Checkbox } from 'antd'
import { CheckboxChangeEvent } from 'antd/lib/checkbox/Checkbox'
import isEqual from 'lodash/isEqual'
import React, { FC, useEffect } from 'react'

import { useGetWorkGroupList } from 'modules/workGroup/hooks'
import { WorkGroupTypeEnum } from 'modules/workGroup/models'

import BaseModal from 'components/Modals/BaseModal'

import { OptionTextStyled, WorkGroupFormItem } from './styles'
import { TaskSecondLineFormFields, TaskSecondLineModalProps } from './types'
import { workGroupValidationRules } from './validation'

const { Text, Link } = Typography
const { TextArea } = Input

const okBtnText: string = 'Перевести заявку'

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
  const markDefaultGroupValue = Form.useWatch('markAsDefault', form)

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

  const handleChangeMarkDefaultGroup = (event: CheckboxChangeEvent) => {
    form.setFieldsValue({ markAsDefault: event.target.checked })
  }

  return (
    <BaseModal
      data-testid='task-second-line-modal'
      visible
      title={modalTitle}
      confirmLoading={isLoading}
      okText={okBtnText}
      onOk={form.submit}
      onCancel={onCancel}
    >
      <Space direction='vertical' size='large'>
        <Space direction='vertical'>
          <Text>
            Выберите рабочую группу II линии, в которую хотите направить заявку
            для дальнейшей работы. Нажмите кнопку «{okBtnText}».
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
          <WorkGroupFormItem
            data-testid='work-group-form-item'
            name='workGroup'
            label='Рабочая группа'
            rules={workGroupValidationRules}
          >
            <Select
              placeholder='Выберите рабочую группу'
              loading={workGroupListIsFetching}
              disabled={isLoading}
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
                  <OptionTextStyled
                    $isBold={priority ? priority.value < 4 : false}
                  >
                    {name}
                  </OptionTextStyled>
                </Select.Option>
              ))}
            </Select>
          </WorkGroupFormItem>

          <Form.Item
            data-testid='mark-default-group-form-item'
            name='markAsDefault'
          >
            <Checkbox
              onChange={handleChangeMarkDefaultGroup}
              checked={markDefaultGroupValue}
            >
              Установить выбранную Рабочую группу по умолчанию для данного SAP
              ID
            </Checkbox>
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
