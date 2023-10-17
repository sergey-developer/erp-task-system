import { Form, Input, Select, Typography } from 'antd'
import { Rule } from 'rc-field-form/es/interface'
import React, { FC, useState } from 'react'

import { useGetSupportGroupList } from 'modules/supportGroup/hooks'
import { SupportGroupListItemModel } from 'modules/supportGroup/models'
import { useCreateSubTask } from 'modules/task/hooks/subTask'

import BaseModal from 'components/Modals/BaseModal'

import { idAndNameSelectFieldNames, idAndTitleSelectFieldNames } from 'shared/constants/selectField'
import { validationSizes } from 'shared/constants/validation'
import { useGetSubTaskTemplateList } from 'shared/hooks/catalogs/subTaskTemplate'
import { isBadRequestError, isErrorResponse } from 'shared/services/baseApi'
import { MaybeUndefined } from 'shared/types/utils'
import { filterOption } from 'shared/utils/common'
import { getFieldsErrors } from 'shared/utils/form'

import { CreateSubTaskFormFields, CreateSubTaskModalProps } from './types'

const { Text, Link } = Typography
const { TextArea } = Input

const supportGroupValidationRules: Rule[] = [{ required: true }]
const templateX5ValidationRules: Rule[] = [{ required: true }]
const titleValidationRules: Rule[] = [
  {
    required: true,
    whitespace: true,
    max: validationSizes.string.short,
  },
]

const descriptionValidationRules: Rule[] = [
  {
    required: true,
    whitespace: true,
    max: validationSizes.string.long,
  },
]

const CreateSubTaskModal: FC<CreateSubTaskModalProps> = ({ task, onCancel }) => {
  const [form] = Form.useForm<CreateSubTaskFormFields>()

  const [selectedSupportGroup, setSelectedSupportGroup] =
    useState<MaybeUndefined<SupportGroupListItemModel['id']>>()

  const modalTitle = (
    <Text>
      Задание по заявке <Link>{task.recordId}</Link>
    </Text>
  )

  const initialFormValues = { title: task.title, description: task.description }

  const { currentData: templateList, isFetching: templateListIsFetching } =
    useGetSubTaskTemplateList(
      { type: task.type, supportGroup: selectedSupportGroup },
      { skip: !selectedSupportGroup },
    )

  const { currentData: supportGroupList, isFetching: supportGroupListIsFetching } =
    useGetSupportGroupList()

  const {
    fn: createSubTask,
    state: { isLoading: createSubTaskIsLoading },
  } = useCreateSubTask()

  const handleFinish = async ({ title, description, templateX5 }: CreateSubTaskFormFields) => {
    try {
      await createSubTask({
        taskId: task.id,
        title: title.trim(),
        description: description.trim(),
        templateX5,
      })

      onCancel()
    } catch (error) {
      if (isErrorResponse(error)) {
        if (isBadRequestError(error)) {
          form.setFields(getFieldsErrors(error.data))
        }
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
        onFinish={handleFinish}
        preserve={false}
      >
        <Form.Item
          data-testid='supportGroup'
          label='Группа поддержки'
          name='supportGroup'
          rules={supportGroupValidationRules}
        >
          <Select<SupportGroupListItemModel['id'], SupportGroupListItemModel>
            placeholder='Доступные группы'
            loading={supportGroupListIsFetching}
            options={supportGroupList}
            disabled={createSubTaskIsLoading}
            fieldNames={idAndNameSelectFieldNames}
            onChange={setSelectedSupportGroup}
            showSearch
            filterOption={filterOption('name')}
          />
        </Form.Item>

        <Form.Item
          data-testid='service'
          label='Сервис'
          name='templateX5'
          rules={templateX5ValidationRules}
        >
          <Select
            placeholder='Наименование сервиса'
            loading={templateListIsFetching}
            options={templateList}
            disabled={createSubTaskIsLoading || !selectedSupportGroup}
            fieldNames={idAndTitleSelectFieldNames}
          />
        </Form.Item>

        <Form.Item
          data-testid='title'
          label='Краткое описание'
          name='title'
          rules={titleValidationRules}
        >
          <Input
            placeholder='Опишите коротко задачу'
            allowClear
            disabled={createSubTaskIsLoading}
          />
        </Form.Item>

        <Form.Item
          data-testid='description'
          label='Подробное описание'
          name='description'
          rules={descriptionValidationRules}
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
