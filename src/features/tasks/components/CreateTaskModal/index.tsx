import { useBoolean } from 'ahooks'
import {
  Checkbox,
  Col,
  Flex,
  Form,
  Input,
  Popover,
  Radio,
  Row,
  Select,
  SelectProps,
  Space,
  Upload,
} from 'antd'
import { CheckboxChangeEvent } from 'antd/lib/checkbox/Checkbox'
import { TaskTypeEnum } from 'features/tasks/api/constants'
import stubFalse from 'lodash/stubFalse'
import React, { FC } from 'react'

import UploadButton from 'components/Buttons/UploadButton'
import DatePicker from 'components/DatePicker'
import Expandable from 'components/Expandable'
import BaseModal from 'components/Modals/BaseModal'
import TimePicker from 'components/TimePicker'

import { LocationCatalogItemDTO } from 'shared/catalogs/locations/api/dto'
import { filesFormItemProps } from 'shared/constants/form'
import {
  idAndFullNameSelectFieldNames,
  idAndNameSelectFieldNames,
  idAndTitleSelectFieldNames,
} from 'shared/constants/selectField'
import { onlyRequiredRules, requiredStringRules } from 'shared/constants/validation'
import { filterOptionBy } from 'shared/utils/common'

import { formItemNoMarginBottom, overlayInnerStyle } from './styles'
import { CreateTaskFormFields, CreateTaskModalProps } from './types'
import {
  addressRules,
  contactTypeRules,
  emailRules,
  olaNextBreachDateRules,
  olaNextBreachTimeRules,
  titleRules,
  typeRules,
} from './validation'

const { TextArea } = Input

export const firstLineOptionValue = -1

const initialValues: Partial<CreateTaskFormFields> = {
  isPrivate: false,
}

const CreateTaskModal: FC<CreateTaskModalProps> = ({
  onSubmit,
  confirmLoading,

  permissions,

  onChangeType,

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

  customers,
  customersIsLoading,

  locations,
  locationsIsLoading,

  ...modalProps
}) => {
  const [form] = Form.useForm<CreateTaskFormFields>()
  const typeFormValue = Form.useWatch('type', form)
  const isPrivateFormValue = Form.useWatch('isPrivate', form)
  const workGroupFormValue = Form.useWatch('workGroup', form)
  const assigneeFormValue = Form.useWatch('assignee', form)

  const [additionalParamsExpanded, { toggle: toggleAdditionalParams }] = useBoolean(false)

  const workGroupsOptions = [{ id: firstLineOptionValue, name: 'I линия' }, ...workGroups]

  const onFinish = async (values: CreateTaskFormFields) => {
    await onSubmit(values, form)
  }

  const onChangeIsPrivate = (event: CheckboxChangeEvent) => {
    form.setFieldsValue({ isPrivate: event.target.checked })
  }

  const onChangeSapId: SelectProps<
    LocationCatalogItemDTO['id'],
    LocationCatalogItemDTO
  >['onChange'] = (value, option) => {
    if (!Array.isArray(option) && option.address) form.setFieldValue('address', option.address)
  }

  return (
    <BaseModal
      {...modalProps}
      confirmLoading={confirmLoading}
      data-testid='create-task-modal'
      title='Создание заявки'
      onOk={form.submit}
      okText='Создать заявку'
    >
      <Form<CreateTaskFormFields>
        form={form}
        layout='vertical'
        initialValues={initialValues}
        onFinish={onFinish}
      >
        <Form.Item data-testid='type-form-item' label='Тип заявки' name='type' rules={typeRules}>
          <Radio.Group
            disabled={confirmLoading}
            onChange={(event) => onChangeType(event.target.value)}
          >
            <Space direction='vertical'>
              <Radio value={TaskTypeEnum.Request}>Заявка на обслуживание (ЗНО)</Radio>
              <Radio value={TaskTypeEnum.Incident}>Инцидент (ИНЦ)</Radio>
            </Space>
          </Radio.Group>
        </Form.Item>

        <Form.Item data-testid='ola-next-breach-form-item' label='Выполнить до'>
          <Row justify='space-between' gutter={24}>
            <Col span={12}>
              <Form.Item
                data-testid='ola-next-breach-date-form-item'
                name='olaNextBreachDate'
                rules={olaNextBreachDateRules}
              >
                <DatePicker disabled={confirmLoading} allowClear={false} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                data-testid='ola-next-breach-time-form-item'
                name='olaNextBreachTime'
                dependencies={['olaNextBreachDate']}
                rules={olaNextBreachTimeRules}
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
            mode='multiple'
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
            mode='multiple'
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
              !typeFormValue ||
              workTypesIsLoading ||
              confirmLoading
            }
            fieldNames={idAndTitleSelectFieldNames}
          />
        </Form.Item>

        <Form.Item data-testid='customer-form-item' label='Клиент' name='customer'>
          <Select
            placeholder='Выберите из списка'
            loading={customersIsLoading}
            options={customers}
            disabled={customersIsLoading || confirmLoading}
            fieldNames={idAndTitleSelectFieldNames}
          />
        </Form.Item>

        <Expandable
          data-testid='create-task-additional-params'
          btnText='Дополнительные параметры'
          btnTextType='secondary'
          btnTextUnderline
          gap='middle'
          expanded={additionalParamsExpanded}
          onClick={toggleAdditionalParams}
        >
          <Form.Item
            data-testid='contact-type-form-item'
            name='contactType'
            label='Формат магазина (завода)'
            rules={contactTypeRules}
          >
            <Input placeholder='Введите формат' disabled={confirmLoading} />
          </Form.Item>

          <Form.Item
            data-testid='email-form-item'
            name='email'
            label='Электронная почта'
            rules={emailRules}
          >
            <Input placeholder='Введите почту' disabled={confirmLoading} />
          </Form.Item>

          <Form.Item data-testid='sap-id-form-item' label='SAP ID объекта' name='shopId'>
            <Select<LocationCatalogItemDTO['id'], LocationCatalogItemDTO>
              placeholder='Выберите из списка'
              loading={locationsIsLoading}
              options={locations}
              disabled={locationsIsLoading || confirmLoading}
              fieldNames={idAndTitleSelectFieldNames}
              showSearch
              filterOption={filterOptionBy('title')}
              onChange={onChangeSapId}
            />
          </Form.Item>

          <Form.Item
            data-testid='address-form-item'
            name='address'
            label='Адрес магазина'
            rules={addressRules}
            dependencies={['sapId']}
          >
            <Input placeholder='Введите адрес' disabled={confirmLoading} />
          </Form.Item>
        </Expandable>
      </Form>
    </BaseModal>
  )
}

export default CreateTaskModal
