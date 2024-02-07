import { Col, Form, Input, Row, Select, Typography, Upload } from 'antd'
import React, { FC, useMemo } from 'react'

import { TIME_PICKER_FORMAT } from 'lib/antd/constants/dateTimePicker'

import { renderUploadedFile } from 'modules/attachment/utils'
import { relocationTaskTypeOptions } from 'modules/warehouse/constants/relocationTask'
import { RelocationTaskFormFields } from 'modules/warehouse/types'
import { checkRelocationTaskTypeIsWriteOff } from 'modules/warehouse/utils/relocationTask'

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

import { LocationOption, LocationOptionGroup, RelocationTaskFormProps } from './types'
import { makeLocationOptions } from './utils'
import { deadlineAtDateRules, deadlineAtTimeRules } from './validation'

const { TextArea } = Input
const { Text } = Typography

const RelocationTaskForm: FC<RelocationTaskFormProps> = ({
  isLoading,

  onUploadImage,
  imageIsUploading,
  onDeleteImage,
  imageIsDeleting,
  imagesIsLoading,

  userList,
  userListIsLoading,

  relocateFromLocationList,
  relocateFromLocationListIsLoading,
  relocateToLocationList,
  relocateToLocationListIsLoading,

  type,
  onChangeType,

  onChangeRelocateFrom,
  onChangeRelocateTo,
}) => {
  const form = Form.useFormInstance<RelocationTaskFormFields>()

  const relocateFromFormValue: MaybeUndefined<RelocationTaskFormFields['relocateFrom']> =
    Form.useWatch('relocateFrom', form)

  const typeIsWriteOff = checkRelocationTaskTypeIsWriteOff(type)

  const relocateFromLocationOptions = useMemo(
    () => makeLocationOptions(relocateFromLocationList),
    [relocateFromLocationList],
  )

  const relocateToLocationOptions = useMemo(
    () => makeLocationOptions(relocateToLocationList),
    [relocateToLocationList],
  )

  return (
    <Row data-testid='relocation-task-form' gutter={90}>
      <Col span={8}>
        <Form.Item
          data-testid='type-form-item'
          label='Тип заявки'
          name='type'
          rules={onlyRequiredRules}
        >
          <Select
            options={relocationTaskTypeOptions}
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
          rules={onlyRequiredRules}
        >
          <Select<IdType, LocationOptionGroup>
            dropdownRender={(menu) => <div data-testid='relocate-from-select-dropdown'>{menu}</div>}
            loading={relocateFromLocationListIsLoading}
            disabled={isLoading || relocateFromLocationListIsLoading}
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
            disabled={
              isLoading ||
              !relocateFromFormValue ||
              typeIsWriteOff ||
              relocateToLocationListIsLoading
            }
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

      <Col span={8}>
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
          data-testid='executor-form-item'
          label='Исполнитель'
          name='executor'
          rules={onlyRequiredRules}
        >
          <Select
            fieldNames={idAndFullNameSelectFieldNames}
            loading={userListIsLoading}
            disabled={isLoading || userListIsLoading}
            options={userList}
            placeholder='Выберите исполнителя'
            showSearch
            filterOption={filterOptionBy('fullName')}
          />
        </Form.Item>

        <Form.Item
          data-testid='controller-form-item'
          label='Контролер'
          name='controller'
          rules={onlyRequiredRules}
        >
          <Select
            fieldNames={idAndFullNameSelectFieldNames}
            loading={userListIsLoading}
            disabled={isLoading || userListIsLoading}
            options={userList}
            placeholder='Выберите контролера'
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

      <Col span={8}>
        <Space direction='vertical'>
          <Text type='secondary'>Общие фотографии к перемещению (до 10 штук)</Text>

          <Form.Item name='images' {...filesFormItemProps}>
            <Upload
              multiple
              listType='picture'
              customRequest={onUploadImage}
              onRemove={onDeleteImage}
              itemRender={renderUploadedFile}
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
