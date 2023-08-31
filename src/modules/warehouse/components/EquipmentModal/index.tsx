import { Form, Input, Select } from 'antd'
import isArray from 'lodash/isArray'
import { FC, useState } from 'react'

import { EquipmentCategoryEnum } from 'modules/warehouse/constants'
import { EquipmentCategoryListItemModel, NomenclatureListItemModel } from 'modules/warehouse/models'

import BaseModal from 'components/Modals/BaseModal'

import { idAndTitleSelectFieldNames } from 'shared/constants/selectField'
import { IdType } from 'shared/types/common'

import { EquipmentModalProps, EquipmentModalFormFields } from './types'

const EquipmentModal: FC<EquipmentModalProps> = ({
  isLoading,
  initialValues,

  categoryList,
  categoryListIsLoading,

  nomenclature,
  nomenclatureList,
  nomenclatureListIsLoading,
  onChangeNomenclature,

  onSubmit,

  ...props
}) => {
  const [form] = Form.useForm<EquipmentModalFormFields>()

  const [selectedCategory, setSelectedCategory] = useState<EquipmentCategoryListItemModel>()
  const isConsumableCategory = selectedCategory?.code === EquipmentCategoryEnum.Consumable

  const handleChangeCategory = (
    value: IdType,
    option: EquipmentCategoryListItemModel | EquipmentCategoryListItemModel[],
  ) => {
    if (!isArray(option)) {
      setSelectedCategory(option)
    }
  }

  const handleFinish = async (values: EquipmentModalFormFields) => {
    await onSubmit(values, form.setFields)
  }

  return (
    <BaseModal
      data-testid='equipment-modal'
      confirmLoading={isLoading}
      onOk={form.submit}
      {...props}
    >
      <Form<EquipmentModalFormFields>
        form={form}
        initialValues={initialValues}
        layout='vertical'
        onFinish={handleFinish}
        preserve={false}
      >
        <Form.Item data-testid='category' label='Категория' name='category'>
          <Select<IdType, EquipmentCategoryListItemModel>
            data-testid='category-select'
            placeholder='Выберите категорию'
            fieldNames={idAndTitleSelectFieldNames}
            options={categoryList}
            loading={categoryListIsLoading}
            onChange={handleChangeCategory}
          />
        </Form.Item>

        <Form.Item data-testid='nomenclature' label='Номенклатура' name='nomenclature'>
          <Select<IdType, NomenclatureListItemModel>
            data-testid='nomenclature-select'
            virtual
            placeholder='Выберите номенклатуру'
            fieldNames={idAndTitleSelectFieldNames}
            options={nomenclatureList}
            loading={nomenclatureListIsLoading}
            onChange={onChangeNomenclature}
          />
        </Form.Item>

        <Form.Item data-testid='title' label='Наименование' name='title'>
          <Input placeholder='Введите наименование' disabled={isConsumableCategory} />
        </Form.Item>

        {!isConsumableCategory && (
          <Form.Item
            data-testid='customer-inventory-number'
            label='Инвентарный номер заказчика'
            name='customerInventoryNumber'
          >
            <Input placeholder='Введите инвентарный номер заказчика' />
          </Form.Item>
        )}

        {nomenclature?.equipmentHasSerialNumber && (
          <Form.Item data-testid='serial-number' label='Серийный номер' name='serialNumber'>
            <Input placeholder='Введите серийный номер' />
          </Form.Item>
        )}
      </Form>
    </BaseModal>
  )
}

export default EquipmentModal
