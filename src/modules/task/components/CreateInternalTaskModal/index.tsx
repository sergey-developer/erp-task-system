import { Checkbox, Col, Flex, Form, Input, Popover, Row, Select, Upload } from 'antd'
import { CheckboxChangeEvent } from 'antd/lib/checkbox/Checkbox'
import stubFalse from 'lodash/stubFalse'
import React, { FC } from 'react'

import {
  formItemNoMarginBottom,
  overlayInnerStyle,
} from 'modules/task/components/CreateTaskModal/styles'
import { titleRules } from 'modules/task/components/CreateTaskModal/validation'

import UploadButton from 'components/Buttons/UploadButton'
import DatePicker from 'components/DatePicker'
import BaseModal from 'components/Modals/BaseModal'
import TimePicker from 'components/TimePicker'

import { filesFormItemProps } from 'shared/constants/form'
import {
  idAndFullNameSelectFieldNames,
  idAndNameSelectFieldNames,
  idAndTitleSelectFieldNames,
} from 'shared/constants/selectField'
import { onlyRequiredRules, requiredStringRules } from 'shared/constants/validation'
import { filterOptionBy } from 'shared/utils/common'

import { CreateInternalTaskFormFields, CreateInternalTaskModalProps } from './types'
import { olaNextBreachDateRules, olaNextBreachTimeRules } from './validation'

const { TextArea } = Input

export const firstLineOptionValue = -1

const initialValues: Partial<CreateInternalTaskFormFields> = {
  isPrivate: false,
}

const CreateInternalTaskModal: FC<CreateInternalTaskModalProps> = ({
  onSubmit,
  confirmLoading,

  permissions,

  recordId,
  olaNextBreachTime,

  workGroupsIsLoading,
  workGroups,
  onChangeWorkGroup,

  workTypes,
  workTypesIsLoading,

  users,
  usersIsLoading,

  observers,
  observersIsLoading,

  executors,
  executorsIsLoading,

  ...modalProps
}) => {
  const [form] = Form.useForm<CreateInternalTaskFormFields>()
  const isPrivateFormValue = Form.useWatch('isPrivate', form)
  const workGroupFormValue = Form.useWatch('workGroup', form)
  const assigneeFormValue = Form.useWatch('assignee', form)

  const workGroupsOptions = [{ id: firstLineOptionValue, name: 'I линия' }, ...workGroups]

  const onFinish = async (values: CreateInternalTaskFormFields) => {
    await onSubmit(values, form)
  }

  const onChangeIsPrivate = (event: CheckboxChangeEvent) => {
    form.setFieldsValue({ isPrivate: event.target.checked })
  }

  return (
    <BaseModal
      {...modalProps}
      confirmLoading={confirmLoading}
      data-testid='create-internal-task-modal'
      title='Создание заявки'
      onOk={form.submit}
      okText='Создать заявку'
    >
      <Form<CreateInternalTaskFormFields>
        form={form}
        layout='vertical'
        initialValues={initialValues}
        onFinish={onFinish}
      >
        <Form.Item data-testid='external-task-form-item' label='Внешняя заявка'>
          <Input disabled value={recordId} />
        </Form.Item>

        <Form.Item data-testid='ola-next-breach-form-item' label='Выполнить до'>
          <Row justify='space-between' gutter={24}>
            <Col span={12}>
              <Form.Item
                data-testid='ola-next-breach-date-form-item'
                name='olaNextBreachDate'
                rules={olaNextBreachDateRules({ maxDate: olaNextBreachTime })}
              >
                <DatePicker disabled={confirmLoading} allowClear={false} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                data-testid='ola-next-breach-time-form-item'
                name='olaNextBreachTime'
                dependencies={['olaNextBreachDate']}
                rules={olaNextBreachTimeRules({ maxDate: olaNextBreachTime })}
              >
                <TimePicker disabled={confirmLoading} allowClear={false} />
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>

        <Form.Item noStyle>
          <Row justify='space-between' gutter={24}>
            <Col span={12}>
              <Form.Item
                data-testid='work-group-form-item'
                label='Рабочая группа'
                name='workGroup'
                rules={assigneeFormValue ? undefined : onlyRequiredRules}
                dependencies={['assignee']}
              >
                <Select
                  placeholder='Выберите рабочую группу'
                  loading={workGroupsIsLoading}
                  options={workGroupsOptions}
                  disabled={workGroupsIsLoading || confirmLoading}
                  fieldNames={idAndNameSelectFieldNames}
                  allowClear
                  showSearch
                  filterOption={filterOptionBy('name')}
                  onChange={onChangeWorkGroup}
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Flex vertical gap='small'>
                <Form.Item
                  style={formItemNoMarginBottom}
                  data-testid='assignee-form-item'
                  label='Исполнитель'
                  name='assignee'
                  rules={workGroupFormValue ? undefined : onlyRequiredRules}
                  dependencies={['workGroup']}
                >
                  <Select
                    placeholder='Выберите исполнителя'
                    loading={workGroupFormValue ? executorsIsLoading : usersIsLoading}
                    options={workGroupFormValue ? executors : users}
                    disabled={
                      (workGroupFormValue ? executorsIsLoading : usersIsLoading) || confirmLoading
                    }
                    fieldNames={idAndFullNameSelectFieldNames}
                    showSearch
                    filterOption={filterOptionBy('fullName')}
                  />
                </Form.Item>

                <Popover
                  overlayInnerStyle={overlayInnerStyle}
                  content='Приватные заявки могут просматривать только инициатор, исполнитель, соисполнители и наблюдатели'
                >
                  <Form.Item data-testid='is-private-form-item' name='isPrivate'>
                    <Checkbox
                      onChange={onChangeIsPrivate}
                      checked={isPrivateFormValue}
                      disabled={!assigneeFormValue || confirmLoading}
                    >
                      Приватная заявка
                    </Checkbox>
                  </Form.Item>
                </Popover>
              </Flex>
            </Col>
          </Row>
        </Form.Item>

        <Form.Item data-testid='title-form-item' name='title' label='Тема' rules={titleRules}>
          <Input placeholder='Опишите коротко задачу' disabled={confirmLoading} />
        </Form.Item>

        <Form.Item
          data-testid='description-form-item'
          style={formItemNoMarginBottom}
          name='description'
          label='Описание'
          rules={requiredStringRules}
        >
          <TextArea placeholder='Расскажите подробнее о задаче' disabled={confirmLoading} />
        </Form.Item>

        <Form.Item data-testid='attachments-form-item' name='attachments' {...filesFormItemProps}>
          <Upload beforeUpload={stubFalse} multiple disabled={confirmLoading}>
            <UploadButton label='Добавить вложение' disabled={confirmLoading} />
          </Upload>
        </Form.Item>

        <Form.Item data-testid='co-executors-form-item' label='Соисполнители' name='coExecutors'>
          <Select
            placeholder='Выберите из списка'
            loading={workGroupFormValue ? executorsIsLoading : usersIsLoading}
            options={workGroupFormValue ? executors : users}
            disabled={
              !assigneeFormValue ||
              (workGroupFormValue ? executorsIsLoading : usersIsLoading) ||
              confirmLoading
            }
            fieldNames={idAndFullNameSelectFieldNames}
            showSearch
            filterOption={filterOptionBy('fullName')}
          />
        </Form.Item>

        <Form.Item data-testid='observers-form-item' label='Наблюдатели' name='observers'>
          <Select
            placeholder='Выберите из списка'
            loading={workGroupFormValue ? observersIsLoading : usersIsLoading}
            options={workGroupFormValue ? observers : users}
            disabled={(workGroupFormValue ? observersIsLoading : usersIsLoading) || confirmLoading}
            fieldNames={idAndFullNameSelectFieldNames}
            showSearch
            filterOption={filterOptionBy('fullName')}
          />
        </Form.Item>

        <Form.Item data-testid='work-type-form-item' label='Тип работ' name='workType'>
          <Select
            placeholder='Выберите из списка'
            loading={workTypesIsLoading}
            options={workTypes}
            disabled={
              !permissions.classificationOfWorkTypes ||
              !workGroupFormValue ||
              workTypesIsLoading ||
              confirmLoading
            }
            fieldNames={idAndTitleSelectFieldNames}
          />
        </Form.Item>
      </Form>
    </BaseModal>
  )
}

export default CreateInternalTaskModal
