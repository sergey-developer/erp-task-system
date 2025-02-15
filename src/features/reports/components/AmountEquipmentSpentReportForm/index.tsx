import { Button, Col, Flex, Form, Popover, Row, Select, Typography } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { EquipmentNomenclatureDTO } from 'features/warehouses/api/dto'
import React, { FC } from 'react'

import DatePicker from 'components/DatePicker'
import { QuestionCircleIcon } from 'components/Icons'

import { LocationCatalogItemDTO } from 'shared/catalogs/api/dto/locations'
import { UPDATE_TEXT } from 'shared/constants/common'
import { idAndTitleSelectFieldNames } from 'shared/constants/selectField'
import { onlyRequiredRules } from 'shared/constants/validation'
import { filterOptionBy } from 'shared/utils/common'

import { AmountEquipmentSpentReportFormFields, AmountEquipmentSpentReportFormProps } from './types'

const { RangePicker } = DatePicker
const { Text } = Typography

const AmountEquipmentSpentReportForm: FC<AmountEquipmentSpentReportFormProps> = ({
  nomenclatures,
  nomenclaturesIsLoading,

  locations,
  locationsIsLoading,

  onSubmit,
}) => {
  const [form] = useForm<AmountEquipmentSpentReportFormFields>()
  const relocateFromFormValue = Form.useWatch('relocateFrom', form)
  const relocateToFormValue = Form.useWatch('relocateTo', form)

  return (
    <Form<AmountEquipmentSpentReportFormFields>
      data-testid='amount-equipment-spent-report-form'
      form={form}
      onFinish={onSubmit}
    >
      <Form.Item
        data-testid='nomenclature-form-item'
        name='nomenclature'
        label='Номенклатура'
        labelCol={{ span: 6 }}
        labelAlign='left'
        rules={onlyRequiredRules}
      >
        <Select<EquipmentNomenclatureDTO['id'], EquipmentNomenclatureDTO>
          data-testid='nomenclature-select'
          fieldNames={idAndTitleSelectFieldNames}
          disabled={nomenclaturesIsLoading}
          loading={nomenclaturesIsLoading}
          options={nomenclatures}
          placeholder='Выберите номенклатуру'
          showSearch
          filterOption={filterOptionBy('title')}
        />
      </Form.Item>

      <Form.Item
        data-testid='relocate-from-form-item'
        name='relocateFrom'
        label='Объект выбытия'
        labelCol={{ span: 6 }}
        labelAlign='left'
        rules={relocateToFormValue ? undefined : onlyRequiredRules}
        dependencies={['relocateTo']}
      >
        <Select<LocationCatalogItemDTO['id'], LocationCatalogItemDTO>
          data-testid='relocate-from-select'
          fieldNames={idAndTitleSelectFieldNames}
          disabled={locationsIsLoading}
          loading={locationsIsLoading}
          options={locations}
          placeholder='Выберите объект выбытия'
          allowClear
          showSearch
          filterOption={filterOptionBy('title')}
        />
      </Form.Item>

      <Form.Item
        data-testid='relocate-to-form-item'
        name='relocateTo'
        label='Объект прибытия'
        labelCol={{ span: 6 }}
        labelAlign='left'
        rules={relocateFromFormValue ? undefined : onlyRequiredRules}
        dependencies={['relocateFrom']}
      >
        <Select<LocationCatalogItemDTO['id'], LocationCatalogItemDTO>
          data-testid='relocate-to-select'
          fieldNames={idAndTitleSelectFieldNames}
          disabled={locationsIsLoading}
          loading={locationsIsLoading}
          options={locations}
          placeholder='Выберите объект прибытия'
          allowClear
          showSearch
          filterOption={filterOptionBy('title')}
        />
      </Form.Item>

      <Form.Item
        data-testid='period-form-item'
        label='Период'
        labelCol={{ span: 6 }}
        labelAlign='left'
      >
        <Flex gap={8} align='center'>
          <Form.Item name='period' noStyle>
            <RangePicker allowEmpty={[true, true]} />
          </Form.Item>

          <Popover
            placement='right'
            content={<Text>Фильтрует список операций по дате создания заявки</Text>}
          >
            <QuestionCircleIcon />
          </Popover>
        </Flex>
      </Form.Item>

      <Row justify='end'>
        <Col>
          <Button htmlType='submit'>{UPDATE_TEXT}</Button>
        </Col>
      </Row>
    </Form>
  )
}

export default AmountEquipmentSpentReportForm
