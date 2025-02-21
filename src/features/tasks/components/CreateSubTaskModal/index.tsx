import { Form, Input, Select, Typography } from 'antd'
import { useCreateSubTask } from 'features/tasks/hooks'
import { Rule } from 'rc-field-form/es/interface'
import React, { FC, useState } from 'react'

import BaseModal from 'components/Modals/BaseModal'

import { isBadRequestError, isErrorResponse } from 'shared/api/baseApi'
import { useGetSubTaskTemplatesCatalog } from 'shared/catalogs/subTaskTemplates/hooks'
import { idAndNameSelectFieldNames, idAndTitleSelectFieldNames } from 'shared/constants/selectField'
import {
  onlyRequiredRules,
  requiredStringRules,
  validationSizes,
} from 'shared/constants/validation'
import { SupportGroupDTO } from 'shared/supportGroups/api/dto'
import { useGetSupportGroups } from 'shared/supportGroups/hooks'
import { filterOptionBy } from 'shared/utils/common'
import { getFieldsErrors } from 'shared/utils/form'

import { CreateSubTaskFormFields, CreateSubTaskModalProps } from './types'

const { Text, Link } = Typography
const { TextArea } = Input

const titleRules: Rule[] = requiredStringRules.concat([{ max: validationSizes.string.short }])
const descriptionRules: Rule[] = requiredStringRules.concat([{ max: validationSizes.string.long }])

const CreateSubTaskModal: FC<CreateSubTaskModalProps> = ({ task, onCancel }) => {
  const [form] = Form.useForm<CreateSubTaskFormFields>()

  const [selectedSupportGroup, setSelectedSupportGroup] = useState<SupportGroupDTO['id']>()

  const modalTitle = (
    <Text>
      Задание по заявке <Link>{task.recordId}</Link>
    </Text>
  )

  const initialFormValues = { title: task.title, description: task.description }

  const { currentData: templates, isFetching: templatesIsFetching } = useGetSubTaskTemplatesCatalog(
    { type: task.type, supportGroup: selectedSupportGroup },
    { skip: !selectedSupportGroup },
  )

  const { currentData: supportGroups, isFetching: supportGroupsIsFetching } = useGetSupportGroups({
    hasTemplate: true,
  })

  const [createSubTask, { isLoading: createSubTaskIsLoading }] = useCreateSubTask()

  const onFinish = async ({ title, description, templateX5 }: CreateSubTaskFormFields) => {
    try {
      await createSubTask({
        taskId: task.id,
        title: title.trim(),
        description: description.trim(),
        templateX5,
      }).unwrap()

      onCancel()
    } catch (error) {
      if (isErrorResponse(error) && isBadRequestError(error)) {
        form.setFields(getFieldsErrors(error.data))
      }
    }
  }

  return (
    <BaseModal
      data-testid='create-sub-task-modal'
      open
      title={modalTitle}
      confirmLoading={createSubTaskIsLoading}
      onOk={form.submit}
      okText='Создать задание'
      onCancel={onCancel}
    >
      <Form<CreateSubTaskFormFields>
        form={form}
        initialValues={initialFormValues}
        layout='vertical'
        onFinish={onFinish}
      >
        <Form.Item
          data-testid='support-group-form-item'
          label='Группа поддержки'
          name='supportGroup'
          rules={onlyRequiredRules}
        >
          <Select<SupportGroupDTO['id'], SupportGroupDTO>
            placeholder='Доступные группы'
            loading={supportGroupsIsFetching}
            options={supportGroups}
            disabled={createSubTaskIsLoading}
            fieldNames={idAndNameSelectFieldNames}
            onChange={setSelectedSupportGroup}
            showSearch
            filterOption={filterOptionBy('name')}
          />
        </Form.Item>

        <Form.Item
          data-testid='service-form-item'
          label='Сервис'
          name='templateX5'
          rules={onlyRequiredRules}
        >
          <Select
            placeholder='Наименование сервиса'
            loading={templatesIsFetching}
            options={templates}
            disabled={createSubTaskIsLoading || !selectedSupportGroup}
            fieldNames={idAndTitleSelectFieldNames}
          />
        </Form.Item>

        <Form.Item
          data-testid='title-form-item'
          label='Краткое описание'
          name='title'
          rules={titleRules}
        >
          <Input
            placeholder='Опишите коротко задачу'
            allowClear
            disabled={createSubTaskIsLoading}
          />
        </Form.Item>

        <Form.Item
          data-testid='description-form-item'
          label='Подробное описание'
          name='description'
          rules={descriptionRules}
        >
          <TextArea
            placeholder='Расскажите подробнее о задаче'
            allowClear
            disabled={createSubTaskIsLoading}
            rows={3}
          />
        </Form.Item>
      </Form>
    </BaseModal>
  )
}

export default CreateSubTaskModal
