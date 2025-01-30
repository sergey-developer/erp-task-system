import { Form, Select } from 'antd'
import isEmpty from 'lodash/isEmpty'
import React, { FC, useEffect } from 'react'

import { equipmentConditionOptions } from 'features/warehouse/constants/equipment'

import DrawerFilter from 'components/Filters/DrawerFilter'
import FilterBlock from 'components/Filters/DrawerFilter/FilterBlock'

import { idAndTitleSelectFieldNames } from 'shared/constants/selectField'
import { filterOptionBy } from 'shared/utils/common'

import {
  HistoryNomenclatureOperationsReportFilterFormFields,
  HistoryNomenclatureOperationsReportFilterProps,
} from './types'

const HistoryNomenclatureOperationsReportFilter: FC<
  HistoryNomenclatureOperationsReportFilterProps
> = ({
  values,
  initialValues,
  onApply,

  locations,
  locationsIsLoading,

  owners,
  ownersIsLoading,

  ...props
}) => {
  const [form] = Form.useForm<HistoryNomenclatureOperationsReportFilterFormFields>()

  useEffect(() => {
    if (isEmpty(values)) {
      form.setFieldsValue(initialValues)
    } else {
      form.setFieldsValue(values!)
    }
  }, [form, values, initialValues])

  const resetFields =
    (fields?: Array<keyof HistoryNomenclatureOperationsReportFilterFormFields>) => () => {
      if (isEmpty(fields)) {
        form.setFieldsValue(initialValues)
      } else {
        fields!.forEach((fieldKey) => {
          form.setFieldsValue({ [fieldKey]: initialValues[fieldKey] })
        })
      }
    }

  return (
    <DrawerFilter
      {...props}
      data-testid='history-nomenclature-operations-report-filter'
      onReset={resetFields()}
      onApply={form.submit}
    >
      <Form<HistoryNomenclatureOperationsReportFilterFormFields>
        preserve={false}
        layout='vertical'
        form={form}
        onFinish={onApply}
      >
        <FilterBlock
          data-testid='conditions-block'
          label='Состояние'
          onReset={resetFields(['conditions'])}
        >
          <Form.Item name='conditions'>
            <Select
              data-testid='conditions-select'
              mode='multiple'
              placeholder='Состояние'
              options={equipmentConditionOptions}
            />
          </Form.Item>
        </FilterBlock>

        <FilterBlock
          data-testid='locations-block'
          label='Местонахождение'
          onReset={resetFields(['locations'])}
        >
          <Form.Item name='locations'>
            <Select
              data-testid='locations-select'
              mode='multiple'
              placeholder='Местонахождение'
              options={locations}
              loading={locationsIsLoading}
              disabled={locationsIsLoading}
              fieldNames={idAndTitleSelectFieldNames}
              showSearch
              filterOption={filterOptionBy('title')}
            />
          </Form.Item>
        </FilterBlock>

        <FilterBlock
          data-testid='owners-block'
          label='Владелец оборудования'
          onReset={resetFields(['owners'])}
        >
          <Form.Item name='owners'>
            <Select
              data-testid='owners-select'
              mode='multiple'
              placeholder='Владелец оборудования'
              options={owners}
              loading={ownersIsLoading}
              disabled={ownersIsLoading}
              fieldNames={idAndTitleSelectFieldNames}
              showSearch
              filterOption={filterOptionBy('title')}
            />
          </Form.Item>
        </FilterBlock>
      </Form>
    </DrawerFilter>
  )
}

export default HistoryNomenclatureOperationsReportFilter
