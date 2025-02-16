import { Col, Form, Input, Row, Select, SelectProps, Typography, Upload } from 'antd'
import { renderUploadedFile } from 'features/attachments/helpers'
import {
  checkRelocationTaskTypeIsEnteringBalances,
  checkRelocationTaskTypeIsWriteOff,
  getRelocationTaskTypeOptions,
} from 'features/relocationTasks/helpers'
import React, { useMemo } from 'react'

import UploadButton from 'components/Buttons/UploadButton'
import DatePicker from 'components/DatePicker'
import Space from 'components/Space'
import TimePicker from 'components/TimePicker'

import { filesFormItemProps } from 'shared/constants/form'
import { onlyNotEmptyStringRules, onlyRequiredRules } from 'shared/constants/validation'
import { IdType } from 'shared/types/common'
import { MaybeUndefined } from 'shared/types/utils'
import { filterOptionBy } from 'shared/utils/common'

import {
  BaseRelocationTaskFormFields,
  LocationOption,
  LocationOptionGroup,
  RelocationTaskFormProps,
  UserGroupOption,
} from './types'
import { collectUsersIds, makeLocationOptions } from './utils'
import { deadlineAtDateRules, deadlineAtTimeRules } from './validation'

const { TextArea } = Input
const { Text } = Typography

const RelocationTaskForm = <FormFields extends BaseRelocationTaskFormFields>({
  permissions,
  isLoading,

  controllersOptions,
  controllersIsLoading,

  executorsOptions,
  executorsIsLoading,

  disabledFields,
  controllerIsRequired,

  showUploadImages = true,
  onUploadImage,
  imageIsUploading,
  onDeleteImage,
  imageIsDeleting,
  imagesIsLoading,

  relocateFromLocations,
  relocateFromLocationsIsLoading,
  relocateToLocations,
  relocateToLocationsIsLoading,

  type,
  onChangeType,

  onChangeRelocateFrom,
  onChangeRelocateTo,
}: RelocationTaskFormProps<FormFields>) => {
  const form = Form.useFormInstance<FormFields>()
  const executorsFormValue: MaybeUndefined<IdType[]> = Form.useWatch('executors', form)
  const controllersFormValue: MaybeUndefined<IdType> = Form.useWatch('controller', form)

  const typeIsWriteOff = checkRelocationTaskTypeIsWriteOff(type)
  const typeIsEnteringBalances = checkRelocationTaskTypeIsEnteringBalances(type)

  const relocateFromLocationOptions = useMemo(
    () => makeLocationOptions(relocateFromLocations),
    [relocateFromLocations],
  )

  const relocateToLocationOptions = useMemo(
    () => makeLocationOptions(relocateToLocations),
    [relocateToLocations],
  )

  const typeOptions = useMemo(
    () => (permissions ? getRelocationTaskTypeOptions(permissions) : []),
    [permissions],
  )

  const onChangeExecutors: SelectProps<IdType[], UserGroupOption>['onChange'] = async (
    _,
    option,
  ) => {
    if (!Array.isArray(option)) return
    const usersIds = await collectUsersIds(option)
    form.setFieldValue('executors', usersIds)
  }

  const onChangeControllers: SelectProps<IdType, UserGroupOption>['onChange'] = async (
    _,
    option,
  ) => {
    if (!Array.isArray(option)) return
    const usersIds = await collectUsersIds(option)
    form.setFieldValue('controllers', usersIds)
  }

  return (
    <Row data-testid='relocation-task-form' gutter={90}>
      <Col span={6}>
        <Form.Item
          data-testid='type-form-item'
          label='Тип заявки'
          name='type'
          rules={onlyRequiredRules}
        >
          <Select
            options={typeOptions}
            placeholder='Выберите тип'
            value={type}
            onChange={onChangeType}
            disabled={isLoading}
          />
        </Form.Item>

        <Form.Item
          data-testid='relocate-from-form-item'
          label='Объект выбытия'
          name='relocateFrom'
          rules={typeIsEnteringBalances ? undefined : onlyRequiredRules}
        >
          <Select<IdType, LocationOptionGroup>
            dropdownRender={(menu) => <div data-testid='relocate-from-select-dropdown'>{menu}</div>}
            loading={relocateFromLocationsIsLoading}
            disabled={typeIsEnteringBalances || isLoading || relocateFromLocationsIsLoading}
            options={relocateFromLocationOptions}
            placeholder='Выберите объект'
            onChange={(value, option) => {
              if (!Array.isArray(option))
                onChangeRelocateFrom(value, option as unknown as LocationOption)
            }}
            showSearch
            filterOption={filterOptionBy('label')}
          />
        </Form.Item>

        <Form.Item data-testid='relocate-to-form-item' label='Объект прибытия' name='relocateTo'>
          <Select<IdType, LocationOptionGroup>
            dropdownRender={(menu) => <div data-testid='relocate-to-select-dropdown'>{menu}</div>}
            loading={relocateToLocationsIsLoading}
            disabled={isLoading || typeIsWriteOff || relocateToLocationsIsLoading}
            options={relocateToLocationOptions}
            placeholder='Выберите объект'
            onChange={(value, option) => {
              if (!Array.isArray(option)) onChangeRelocateTo(option as unknown as LocationOption)
            }}
            showSearch
            filterOption={filterOptionBy('label')}
          />
        </Form.Item>
      </Col>

      <Col span={6}>
        <Form.Item data-testid='deadline-at-form-item' label='Срок выполнения'>
          <Row justify='space-between'>
            <Col span={15}>
              <Form.Item
                data-testid='deadline-at-date-form-item'
                name='deadlineAtDate'
                rules={deadlineAtDateRules}
              >
                <DatePicker disabled={isLoading || disabledFields?.includes('deadlineAtDate')} />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                data-testid='deadline-at-time-form-item'
                name='deadlineAtTime'
                dependencies={['deadlineAtDate']}
                rules={deadlineAtTimeRules}
              >
                <TimePicker disabled={isLoading || disabledFields?.includes('deadlineAtTime')} />
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>

        <Form.Item
          data-testid='executors-form-item'
          label='Исполнитель'
          name='executors'
          rules={onlyRequiredRules}
        >
          <Select<IdType[], UserGroupOption>
            mode='multiple'
            dropdownRender={(menu) => <div data-testid='executors-select-dropdown'>{menu}</div>}
            loading={executorsIsLoading}
            disabled={isLoading || executorsIsLoading}
            options={executorsOptions}
            placeholder='Выберите исполнителя'
            showSearch
            filterOption={filterOptionBy('label')}
            onChange={onChangeExecutors}
            value={executorsFormValue}
          />
        </Form.Item>

        <Form.Item
          data-testid='controller-form-item'
          label='Контролер'
          name='controller'
          rules={controllerIsRequired ? onlyRequiredRules : undefined}
        >
          <Select<IdType, UserGroupOption>
            dropdownRender={(menu) => <div data-testid='controller-select-dropdown'>{menu}</div>}
            loading={controllersIsLoading}
            disabled={isLoading || controllersIsLoading}
            options={controllersOptions}
            placeholder='Выберите контролера'
            allowClear
            showSearch
            filterOption={filterOptionBy('label')}
            onChange={onChangeControllers}
            value={controllersFormValue}
          />
        </Form.Item>
      </Col>

      <Col span={6}>
        <Form.Item
          data-testid='comment-form-item'
          label='Комментарий'
          name='comment'
          rules={onlyNotEmptyStringRules}
        >
          <TextArea placeholder='Добавьте комментарий' disabled={isLoading} />
        </Form.Item>
      </Col>

      {showUploadImages && (
        <Col span={6}>
          <Space data-testid='attachments' direction='vertical'>
            <Text type='secondary'>Общие фотографии к перемещению (до 10 штук)</Text>

            <Form.Item name='images' {...filesFormItemProps}>
              <Upload
                multiple
                listType='picture'
                customRequest={onUploadImage}
                onRemove={onDeleteImage}
                itemRender={renderUploadedFile()}
                disabled={isLoading || imageIsUploading || imageIsDeleting || imagesIsLoading}
                maxCount={10}
              >
                <UploadButton
                  label='Добавить фото'
                  loading={imagesIsLoading}
                  disabled={isLoading || imageIsUploading || imageIsDeleting}
                />
              </Upload>
            </Form.Item>
          </Space>
        </Col>
      )}
    </Row>
  )
}

export default RelocationTaskForm
