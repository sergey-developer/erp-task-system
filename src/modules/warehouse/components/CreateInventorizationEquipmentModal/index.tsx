import { useBoolean } from 'ahooks'
import { Form, Select } from 'antd'
import { DefaultOptionType } from 'rc-select/lib/Select'
import React, { FC, useMemo } from 'react'

import { EquipmentCatalogListItemModel } from 'modules/warehouse/models'
import { makeEquipmentsCatalogSelectOptions } from 'modules/warehouse/utils/equipment'

import { SelectOptionButton } from 'components/Buttons/SelectOptionButton'
import BaseModal from 'components/Modals/BaseModal'
import Space from 'components/Space'

import { ADD_TEXT } from 'shared/constants/common'
import { idAndTitleSelectFieldNames } from 'shared/constants/selectField'
import { onlyRequiredRules } from 'shared/constants/validation'
import { filterOptionBy } from 'shared/utils/common'
import { makeSelectOption } from 'shared/utils/selectField'

import {
  CreateInventorizationEquipmentFormFields,
  CreateInventorizationEquipmentModalProps,
} from './types'

const CreateInventorizationEquipmentModal: FC<CreateInventorizationEquipmentModalProps> = ({
  isLoading,
  onSubmit,

  warehouses,

  equipmentCatalog,
  equipmentCatalogIsLoading,
  equipment,
  equipmentIsLoading,
  onChangeEquipment,
  onClickCreateEquipment,

  ...props
}) => {
  const [form] = Form.useForm<CreateInventorizationEquipmentFormFields>()
  const locationFactFormValue = Form.useWatch(['locationFact'], form)

  const [
    locationFactIsEmpty,
    { setTrue: setLocationFactIsEmpty, setFalse: setLocationFactIsNotEmpty },
  ] = useBoolean(false)

  const equipmentCatalogOptions = useMemo<DefaultOptionType[]>(
    () => makeEquipmentsCatalogSelectOptions(equipmentCatalog),
    [equipmentCatalog],
  )

  const onFinish = async (values: CreateInventorizationEquipmentFormFields) => {
    await onSubmit(values, form)
  }

  return (
    <BaseModal
      data-testid='create-inventorization-equipment-modal'
      title='Добавление оборудования'
      confirmLoading={isLoading}
      onOk={form.submit}
      okText={ADD_TEXT}
      {...props}
    >
      <Form<CreateInventorizationEquipmentFormFields>
        form={form}
        layout='vertical'
        onFinish={onFinish}
      >
        <Form.Item
          data-testid='equipment-form-item'
          name='equipment'
          label='Оборудование'
          rules={onlyRequiredRules}
        >
          <Select<EquipmentCatalogListItemModel['id']>
            dropdownRender={(menu) => (
              <Space $block direction='vertical'>
                <SelectOptionButton
                  type='link'
                  onClick={
                    locationFactFormValue ? onClickCreateEquipment(form) : setLocationFactIsEmpty
                  }
                >
                  Добавить оборудование
                </SelectOptionButton>

                {menu}
              </Space>
            )}
            placeholder='Оборудование'
            options={equipmentCatalogOptions}
            loading={equipmentCatalogIsLoading}
            disabled={equipmentCatalogIsLoading || isLoading}
            showSearch
            filterOption={filterOptionBy('label')}
            onChange={onChangeEquipment}
          />
        </Form.Item>

        <Form.Item data-testid='location-plan-form-item' label='Плановое местонахождение'>
          <Select
            placeholder='Плановое местонахождение'
            disabled
            loading={equipmentIsLoading}
            options={equipment?.location ? [makeSelectOption(equipment.location)] : []}
            value={equipment?.location?.id}
          />
        </Form.Item>

        <Form.Item
          data-testid='location-fact-form-item'
          name='locationFact'
          label='Фактическое местонахождение'
          rules={onlyRequiredRules}
          validateStatus={locationFactIsEmpty ? 'warning' : undefined}
        >
          <Select
            placeholder='Фактическое местонахождение'
            options={warehouses}
            disabled={isLoading}
            fieldNames={idAndTitleSelectFieldNames}
            showSearch
            filterOption={filterOptionBy('label')}
            onChange={setLocationFactIsNotEmpty}
          />
        </Form.Item>
      </Form>
    </BaseModal>
  )
}

export default CreateInventorizationEquipmentModal
