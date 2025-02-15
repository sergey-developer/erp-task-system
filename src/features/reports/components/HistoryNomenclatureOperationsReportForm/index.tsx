import { Button, Col, Flex, Form, Popover, Row, Select, Typography } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { EquipmentNomenclatureDTO } from 'features/warehouses/api/dto'
import React, { FC } from 'react'

import DatePicker from 'components/DatePicker'
import { QuestionCircleIcon } from 'components/Icons'

import { UPDATE_TEXT } from 'shared/constants/common'
import { idAndTitleSelectFieldNames } from 'shared/constants/selectField'
import { onlyRequiredRules } from 'shared/constants/validation'
import { filterOptionBy } from 'shared/utils/common'

import {
  HistoryNomenclatureOperationsReportFormFields,
  HistoryNomenclatureOperationsReportFormProps,
} from './types'

const { RangePicker } = DatePicker
const { Text } = Typography

const HistoryNomenclatureOperationsReportForm: FC<HistoryNomenclatureOperationsReportFormProps> = ({
  nomenclatures,
  nomenclaturesIsLoading,

  onSubmit,
}) => {
  const [form] = useForm<HistoryNomenclatureOperationsReportFormFields>()

  return (
    <Form<HistoryNomenclatureOperationsReportFormFields>
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

export default HistoryNomenclatureOperationsReportForm
