import {
  Col,
  Flex,
  Form,
  Input,
  Popover,
  PopoverProps,
  Row,
  Select,
  SelectProps,
  Tooltip,
  Typography,
  Upload,
} from 'antd'
import sortBy from 'lodash/sortBy'
import { DefaultOptionType } from 'rc-select/lib/Select'
import React, { FC, useCallback, useMemo } from 'react'

import { renderUploadedFile } from 'features/attachment/utils'
import { inventorizationTypeOptions } from 'features/warehouse/constants/inventorization'
import { WarehouseListItemModel } from 'features/warehouse/models'

import UploadButton from 'components/Buttons/UploadButton'
import DatePicker from 'components/DatePicker'
import { QuestionCircleIcon } from 'components/Icons'
import BaseModal, { BaseModalProps } from 'components/Modals/BaseModal'
import TimePicker from 'components/TimePicker'

import { CREATE_TEXT } from 'shared/constants/common'
import { filesFormItemProps } from 'shared/constants/form'
import {
  idAndFullNameSelectFieldNames,
  idAndTitleSelectFieldNames,
} from 'shared/constants/selectField'
import { onlyRequiredRules } from 'shared/constants/validation'
import { useSelectAll } from 'shared/catalogs/hooks/useSelectAll'
import { IdType } from 'shared/types/common'
import { filterOptionBy } from 'shared/utils/common'

import {
  CreateInventorizationRequestFormFields,
  CreateInventorizationRequestModalProps,
} from './types'
import { deadlineAtDateRules, deadlineAtTimeRules } from './validation'

const { TextArea } = Input
const { Text } = Typography

export const nomenclaturesPopoverContent =
  'Если не выбрать ни одну номенклатуру, то при создании поручения автоматически будет выбрана вся номенклатура, имеющаяся на выбранных складах'

const nomenclaturesPopoverOverlayInnerStyles: PopoverProps['overlayInnerStyle'] = { maxWidth: 400 }

const maxTagPlaceholderNomenclaturesSelect: SelectProps['maxTagPlaceholder'] = (omittedValues) => (
  <Tooltip
    placement='left'
    overlayStyle={{ pointerEvents: 'none' }}
    title={omittedValues.map(({ label }) => label).join(', ')}
  >
    +{omittedValues.length}...
  </Tooltip>
)

const CreateInventorizationRequestModal: FC<CreateInventorizationRequestModalProps> = ({
  onSubmit,

  nomenclatures,
  nomenclaturesIsLoading,

  warehouses,
  warehousesIsLoading,
  onChangeWarehouses,

  executors,
  executorsIsLoading,

  onCreateAttachment,
  attachmentIsCreating,
  onDeleteAttachment,
  attachmentIsDeleting,

  ...props
}) => {
  const { confirmLoading: isLoading } = props

  const [form] = Form.useForm<CreateInventorizationRequestFormFields>()
  const nomenclaturesFormValue: CreateInventorizationRequestFormFields['nomenclatures'] =
    Form.useWatch('nomenclatures', form)

  const equipmentNomenclatures = useMemo(
    () =>
      sortBy(
        nomenclatures
          .reduce<DefaultOptionType[]>((acc, nom) => {
            const optionGroup = acc.find((item) => item.label === nom.group.title)
            const option = { label: nom.title, value: nom.id }

            optionGroup
              ? optionGroup.options!.push(option)
              : acc.push({ title: nom.group.title, label: nom.group.title, options: [option] })

            return acc
          }, [])
          .map((group) => ({ ...group, options: sortBy(group.options, 'label') })),
        'label',
      ),
    [nomenclatures],
  )

  const onChangeNomenclatures = useCallback<NonNullable<SelectProps['onChange']>>(
    (value: CreateInventorizationRequestFormFields['nomenclatures']) =>
      form.setFieldValue('nomenclatures', value),
    [form],
  )

  const nomenclaturesSelectProps = useSelectAll({
    showSelectAll: true,
    value: nomenclaturesFormValue,
    onChange: onChangeNomenclatures,
    options: equipmentNomenclatures,
  })

  const onFinish = async ({ description, ...values }: CreateInventorizationRequestFormFields) => {
    await onSubmit({ ...values, description: description?.trim() }, form.setFields)
  }

  const handleChangeWarehouses = (value: IdType[]) => {
    form.setFieldsValue({ nomenclatures: undefined, executor: undefined })
    onChangeWarehouses(value)
  }

  const okButtonProps: BaseModalProps['okButtonProps'] = useMemo(
    () => ({ disabled: attachmentIsCreating || attachmentIsDeleting }),
    [attachmentIsCreating, attachmentIsDeleting],
  )

  return (
    <BaseModal
      {...props}
      data-testid='create-inventorization-request-modal'
      title='Создать поручение на инвентаризацию'
      okText={CREATE_TEXT}
      onOk={form.submit}
      okButtonProps={okButtonProps}
    >
      <Form<CreateInventorizationRequestFormFields>
        layout='vertical'
        form={form}
        onFinish={onFinish}
      >
        <Form.Item data-testid='type-form-item' name='type' label='Тип' rules={onlyRequiredRules}>
          <Select
            placeholder='Выберите тип'
            options={inventorizationTypeOptions}
            disabled={isLoading}
          />
        </Form.Item>

        <Form.Item data-testid='description-form-item' name='description' label='Описание'>
          <TextArea placeholder='Укажите описание' disabled={isLoading} />
        </Form.Item>

        <Form.Item
          data-testid='attachments-form-item'
          name='attachments'
          label='Вложения'
          {...filesFormItemProps}
        >
          <Upload
            multiple
            disabled={isLoading || attachmentIsDeleting}
            customRequest={onCreateAttachment}
            onRemove={onDeleteAttachment}
            itemRender={renderUploadedFile()}
          >
            <UploadButton label='Добавить вложение' disabled={isLoading} />
          </Upload>
        </Form.Item>

        <Form.Item
          data-testid='warehouses-form-item'
          name='warehouses'
          label='Склады'
          rules={onlyRequiredRules}
        >
          <Select<IdType[], WarehouseListItemModel>
            mode='multiple'
            placeholder='Выберите склад'
            options={warehouses}
            loading={warehousesIsLoading}
            disabled={isLoading || warehousesIsLoading}
            fieldNames={idAndTitleSelectFieldNames}
            onChange={handleChangeWarehouses}
          />
        </Form.Item>

        <Form.Item
          data-testid='nomenclatures-form-item'
          name='nomenclatures'
          label={
            <Flex gap='small' justify='center'>
              <Text type='secondary'>Номенклатура</Text>

              <Popover
                overlayInnerStyle={nomenclaturesPopoverOverlayInnerStyles}
                content={nomenclaturesPopoverContent}
                placement='right'
              >
                <QuestionCircleIcon $size='large' />
              </Popover>
            </Flex>
          }
        >
          <Select
            {...nomenclaturesSelectProps}
            maxTagCount={15}
            maxTagPlaceholder={maxTagPlaceholderNomenclaturesSelect}
            mode='multiple'
            placeholder='Выберите номенклатуру'
            loading={nomenclaturesIsLoading}
            disabled={isLoading || nomenclaturesIsLoading}
            filterOption={filterOptionBy('label')}
          />
        </Form.Item>

        <Form.Item data-testid='deadline-at-form-item' label='Срок выполнения'>
          <Row justify='space-between'>
            <Col span={15}>
              <Form.Item
                data-testid='deadline-at-date-form-item'
                name='deadlineAtDate'
                rules={deadlineAtDateRules}
              >
                <DatePicker disabled={isLoading} />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                data-testid='deadline-at-time-form-item'
                name='deadlineAtTime'
                dependencies={['deadlineAtDate']}
                rules={deadlineAtTimeRules}
              >
                <TimePicker disabled={isLoading} />
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>

        <Form.Item
          data-testid='executor-form-item'
          name='executor'
          label='Исполнитель'
          rules={onlyRequiredRules}
        >
          <Select
            placeholder='Выберите исполнителя'
            options={executors}
            loading={executorsIsLoading}
            disabled={isLoading || executorsIsLoading}
            fieldNames={idAndFullNameSelectFieldNames}
          />
        </Form.Item>
      </Form>
    </BaseModal>
  )
}

export default CreateInventorizationRequestModal
