import { Form, Input, Select } from 'antd'
import isArray from 'lodash/isArray'
import { FC, useState } from 'react'

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

  nomenclatureList,
  nomenclatureListIsLoading,
  onChangeNomenclature,

  onSubmit,

  ...props
}) => {
  const [form] = Form.useForm<EquipmentModalFormFields>()

  const [selectedCategory, setSelectedCategory] = useState<EquipmentCategoryListItemModel>()
  // const isConsumableCategory = selectedCategory?.code ===

  const handleFinish = async (values: EquipmentModalFormFields) => {
    await onSubmit(values, form.setFields)
  }
  console.log(selectedCategory)
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
            onChange={(_, option) => {
              if (!isArray(option)) {
                setSelectedCategory(option)
              }
            }}
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
          <Input placeholder='Введите наименование' />
        </Form.Item>
      </Form>
    </BaseModal>
  )
}

export default EquipmentModal
