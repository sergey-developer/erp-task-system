import { Button, Col, Flex, Form, Popover, Row, Select, Typography } from 'antd'
import { useForm } from 'antd/es/form/Form'
import React, { FC } from 'react'

import { EquipmentNomenclatureListItemModel } from 'modules/warehouse/models'

import DatePicker from 'components/DatePicker'
import QuestionCircleIconStyled from 'components/Icons/QuestionCircleIcon'

import { idAndTitleSelectFieldNames } from 'shared/constants/selectField'
import { onlyRequiredRules } from 'shared/constants/validation'
import { LocationListItemModel } from 'shared/models/catalogs/location'
import { filterOptionBy } from 'shared/utils/common'

import { SpentEquipmentAmountReportFormFields, SpentEquipmentAmountReportFormProps } from './types'

const { RangePicker } = DatePicker
const { Text } = Typography

const SpentEquipmentAmountReportForm: FC<SpentEquipmentAmountReportFormProps> = ({
  nomenclatures,
  nomenclaturesIsLoading,

  locations,
  locationsIsLoading,

  onSubmit,
}) => {
  const [form] = useForm<SpentEquipmentAmountReportFormFields>()
  const relocateFromFormValue = Form.useWatch('relocateFrom', form)
  const relocateToFormValue = Form.useWatch('relocateTo', form)

  return (
    <Form<SpentEquipmentAmountReportFormFields>
      data-testid='spent-equipment-amount-report-form'
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
        <Select<EquipmentNomenclatureListItemModel['id'], EquipmentNomenclatureListItemModel>
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
      >
        <Select<LocationListItemModel['id'], LocationListItemModel>
          data-testid='relocate-from-select'
          fieldNames={idAndTitleSelectFieldNames}
          disabled={locationsIsLoading}
          loading={locationsIsLoading}
          options={locations}
          placeholder='Выберите объект выбытия'
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
      >
        <Select<LocationListItemModel['id'], LocationListItemModel>
          data-testid='relocate-to-select'
          fieldNames={idAndTitleSelectFieldNames}
          disabled={locationsIsLoading}
          loading={locationsIsLoading}
          options={locations}
          placeholder='Выберите объект прибытия'
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

          <Popover content={<Text>Фильтрует список операций по дате создания заявки</Text>}>
            <QuestionCircleIconStyled />
          </Popover>
        </Flex>
      </Form.Item>

      <Row justify='end'>
        <Col>
          <Button htmlType='submit'>Обновить</Button>
        </Col>
      </Row>
    </Form>
  )
}

export default SpentEquipmentAmountReportForm
