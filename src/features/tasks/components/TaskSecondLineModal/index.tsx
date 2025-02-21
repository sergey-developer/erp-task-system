import { Checkbox, Form, Input, Select, Space, Typography } from 'antd'
import { CheckboxChangeEvent } from 'antd/lib/checkbox/Checkbox'
import isEqual from 'lodash/isEqual'
import React, { FC, useEffect } from 'react'

import BaseModal from 'components/Modals/BaseModal'

import { useGetWorkTypesCatalog } from 'shared/catalogs/workTypes/hooks'
import { idAndTitleSelectFieldNames } from 'shared/constants/selectField'
import { onlyRequiredRules } from 'shared/constants/validation'
import { filterOptionBy } from 'shared/utils/common'
import { WorkGroupTypeEnum } from 'shared/workGroups/api/constants'
import { useGetWorkGroups } from 'shared/workGroups/hooks'

import { WorkGroupFormItem } from './styles'
import { TaskSecondLineFormFields, TaskSecondLineModalProps } from './types'

const { Text, Link } = Typography
const { TextArea } = Input

const okBtnText = 'Перевести заявку'

const TaskSecondLineModal: FC<TaskSecondLineModalProps> = ({
  id,
  type,
  recordId,
  isLoading,
  permissions,
  onSubmit,
  onCancel,
}) => {
  const [form] = Form.useForm<TaskSecondLineFormFields>()
  const markDefaultGroupValue = Form.useWatch('markAsDefault', form)

  // todo: вынести в TaskDetails
  const { data: workGroups = [], isFetching: workGroupsIsFetching } = useGetWorkGroups({
    taskId: id,
  })

  const { currentData: workTypes = [], isFetching: workTypesIsFetching } = useGetWorkTypesCatalog(
    { taskType: type },
    { skip: !permissions.classificationOfWorkTypes },
  )

  useEffect(() => {
    if (!workGroups.length) return

    const workGroup = workGroups.find(
      (wg) =>
        isEqual(wg.priority?.type, WorkGroupTypeEnum.AssociatedWithSapId) ||
        isEqual(wg.priority?.type, WorkGroupTypeEnum.DefaultForSupportGroup),
    )

    if (workGroup) {
      form.setFieldsValue({ workGroup: workGroup.id })
    }
  }, [form, workGroups])

  const modalTitle = (
    <Text>
      Перевод заявки <Link>{recordId}</Link> на II линию
    </Text>
  )

  const onFinish = async (values: TaskSecondLineFormFields) => {
    await onSubmit(values, form.setFields)
  }

  const onChangeMarkDefaultGroup = (event: CheckboxChangeEvent) => {
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

        <Form<TaskSecondLineFormFields> form={form} layout='vertical' onFinish={onFinish}>
          <WorkGroupFormItem
            data-testid='work-group-form-item'
            name='workGroup'
            label='Рабочая группа'
            rules={onlyRequiredRules}
          >
            <Select
              placeholder='Выберите рабочую группу'
              loading={workGroupsIsFetching}
              disabled={isLoading}
              showSearch
              filterOption={filterOptionBy('title')}
            >
              {workGroups.map(({ id, name, priority }) => (
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
            <Checkbox onChange={onChangeMarkDefaultGroup} checked={markDefaultGroupValue}>
              Установить выбранную Рабочую группу по умолчанию для данного SAP ID
            </Checkbox>
          </Form.Item>

          <Form.Item data-testid='work-type-form-item' name='workType' label='Тип работ'>
            <Select
              placeholder='Выберите тип работ'
              loading={workTypesIsFetching}
              options={workTypes}
              disabled={!permissions.classificationOfWorkTypes || isLoading || workTypesIsFetching}
              fieldNames={idAndTitleSelectFieldNames}
            />
          </Form.Item>

          <Form.Item data-testid='taskComment-form-item' label='Комментарий' name='comment'>
            <TextArea placeholder='Добавьте комментарий' disabled={isLoading} />
          </Form.Item>
        </Form>
      </Space>
    </BaseModal>
  )
}

export default TaskSecondLineModal
