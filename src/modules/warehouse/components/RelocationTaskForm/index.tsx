import { Col, Form, Input, Row, Select, SelectProps, Typography, Upload } from 'antd'
import React, { FC, useMemo, useState } from 'react'

import { TIME_PICKER_FORMAT } from 'lib/antd/constants/dateTimePicker'

import { renderUploadedFile } from 'modules/attachment/utils'
import {
  checkRelocationTaskTypeIsEnteringBalances,
  checkRelocationTaskTypeIsWriteOff,
  getRelocationTaskTypeOptions,
} from 'modules/warehouse/utils/relocationTask'

import UploadButton from 'components/Buttons/UploadButton'
import DatePicker from 'components/DatePicker'
import Space from 'components/Space'
import TimePicker from 'components/TimePicker'

import { filesFormItemProps } from 'shared/constants/form'
import { idAndFullNameSelectFieldNames } from 'shared/constants/selectField'
import { onlyNotEmptyStringRules, onlyRequiredRules } from 'shared/constants/validation'
import { IdType } from 'shared/types/common'
import { MaybeUndefined } from 'shared/types/utils'
import { filterOptionBy } from 'shared/utils/common'

import { RelocationTaskFormFields } from '../../types'
import {
  ExecutorOption,
  ExecutorOptionGroup,
  LocationOption,
  LocationOptionGroup,
  RelocationTaskFormProps,
} from './types'
import { collectUsersIds, makeLocationOptions } from './utils'
import { deadlineAtDateRules, deadlineAtTimeRules } from './validation'

const { TextArea } = Input
const { Text } = Typography

const RelocationTaskForm: FC<RelocationTaskFormProps> = ({
  authUser,
  permissions,
  isLoading,

  users,
  usersIsLoading,

  usersGroups,
  usersGroupsIsLoading,

  controllerIsRequired,

  onUploadImage,
  imageIsUploading,
  onDeleteImage,
  imageIsDeleting,
  imagesIsLoading,

  relocateFromLocationList,
  relocateFromLocationListIsLoading,
  relocateToLocationList,
  relocateToLocationListIsLoading,

  type,
  onChangeType,

  onChangeRelocateFrom,
  onChangeRelocateTo,
}) => {
  const form = Form.useFormInstance()

  const controllerFormValue: RelocationTaskFormFields['controller'] = Form.useWatch(
    'controller',
    form,
  )

  const executorsFormValue: MaybeUndefined<RelocationTaskFormFields['executors']> = Form.useWatch(
    'executors',
    form,
  )

  const [executors, setExecutors] = useState<ExecutorOption['value'][]>([])

  const typeIsWriteOff = checkRelocationTaskTypeIsWriteOff(type)
  const typeIsEnteringBalances = checkRelocationTaskTypeIsEnteringBalances(type)

  const relocateFromLocationOptions = useMemo(
    () => makeLocationOptions(relocateFromLocationList),
    [relocateFromLocationList],
  )

  const relocateToLocationOptions = useMemo(
    () => makeLocationOptions(relocateToLocationList),
    [relocateToLocationList],
  )

  const typeOptions = useMemo(
    () => (permissions ? getRelocationTaskTypeOptions(permissions) : []),
    [permissions],
  )

  const controllerOptions = useMemo(
    () => users.filter((usr) => usr.id !== authUser?.id && !executorsFormValue?.includes(usr.id)),
    [authUser?.id, executorsFormValue, users],
  )

  const executorsOptions: ExecutorOptionGroup[] = useMemo(() => {
    const usersOptions: ExecutorOption[] = users
      .filter((usr) => usr.id !== controllerFormValue)
      .map((usr) => ({ label: usr.fullName, value: usr.id }))

    const usersGroupsOptions: ExecutorOption[] = usersGroups.map((group) => ({
      label: group.title,
      users: group.users,
      value: `${group.id}-${group.title}`,
    }))

    const options = []
    if (usersOptions.length)
      options.push({ label: 'Пользователи', options: usersOptions, value: -1 })

    if (usersGroupsOptions.length)
      options.push({ label: 'Группы', options: usersGroupsOptions, value: -2 })

    return options
  }, [controllerFormValue, users, usersGroups])

  const onChangeExecutors: SelectProps<IdType | string, ExecutorOption>['onChange'] = async (
    value,
    option,
  ) => {
    if (Array.isArray(option)) {
      const usersIds = await collectUsersIds(option, [controllerFormValue])
      form.setFieldValue('executors', usersIds)
      setExecutors(usersIds)
    }
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
            loading={relocateFromLocationListIsLoading}
            disabled={typeIsEnteringBalances || isLoading || relocateFromLocationListIsLoading}
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
            loading={relocateToLocationListIsLoading}
            disabled={isLoading || typeIsWriteOff || relocateToLocationListIsLoading}
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
                <TimePicker disabled={isLoading} format={TIME_PICKER_FORMAT} placeholder='Время' />
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
          <Select<IdType | string, ExecutorOption>
            mode='multiple'
            dropdownRender={(menu) => <div data-testid='executors-select-dropdown'>{menu}</div>}
            loading={usersIsLoading || usersGroupsIsLoading}
            disabled={isLoading || usersIsLoading || usersGroupsIsLoading}
            options={executorsOptions}
            placeholder='Выберите исполнителя'
            showSearch
            filterOption={filterOptionBy('label')}
            onChange={onChangeExecutors}
            value={executors as any}
          />
        </Form.Item>

        <Form.Item
          data-testid='controller-form-item'
          label='Контролер'
          name='controller'
          rules={controllerIsRequired ? onlyRequiredRules : undefined}
        >
          <Select
            dropdownRender={(menu) => <div data-testid='controller-select-dropdown'>{menu}</div>}
            fieldNames={idAndFullNameSelectFieldNames}
            loading={usersIsLoading}
            disabled={isLoading || usersIsLoading}
            options={controllerOptions}
            placeholder='Выберите контролера'
            allowClear
            showSearch
            filterOption={filterOptionBy('fullName')}
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

      <Col span={6}>
        <Space direction='vertical'>
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
    </Row>
  )
}

export default RelocationTaskForm
