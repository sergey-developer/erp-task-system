import { Col, Form, Input, InputNumber, Radio, Row, Select } from 'antd'
import isArray from 'lodash/isArray'
import { FC, useEffect, useState } from 'react'

import { conditionOptions, EquipmentCategoryEnum } from 'modules/warehouse/constants'
import {
  EquipmentCategoryListItemModel,
  NomenclatureListItemModel,
  WarehouseListItemModel,
} from 'modules/warehouse/models'

import BaseModal from 'components/Modals/BaseModal'

import { idAndTitleSelectFieldNames, yesNoOptions } from 'shared/constants/selectField'
import { IdType } from 'shared/types/common'

import { EquipmentModalProps, EquipmentModalFormFields } from './types'

const { TextArea } = Input

const EquipmentModal: FC<EquipmentModalProps> = ({
  isLoading,
  initialValues,

  categoryList,
  categoryListIsLoading,

  warehouseList,
  warehouseListIsLoading,

  currencyList,
  currencyListIsFetching,

  ownerList,
  ownerListIsFetching,

  workTypeList,
  workTypeListIsFetching,

  nomenclature,
  nomenclatureList,
  nomenclatureListIsLoading,
  onChangeNomenclature,

  onSubmit,

  ...props
}) => {
  const [form] = Form.useForm<EquipmentModalFormFields>()
  const isResponsibleStorageFormValue = Form.useWatch('isResponsibleStorage', form)

  const [selectedCategory, setSelectedCategory] = useState<EquipmentCategoryListItemModel>()
  const isConsumableCategory = selectedCategory?.code === EquipmentCategoryEnum.Consumable

  useEffect(() => {
    if (nomenclature) {
      form.setFieldsValue({ title: nomenclature.title })
    }
  }, [form, nomenclature])

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

        <Form.Item data-testid='warehouse' label='Склад' name='warehouse'>
          <Select<IdType, WarehouseListItemModel>
            data-testid='warehouse-select'
            placeholder='Выберите склад'
            fieldNames={idAndTitleSelectFieldNames}
            options={warehouseList}
            loading={warehouseListIsLoading}
          />
        </Form.Item>

        <Form.Item data-testid='condition' label='Состояние' name='condition'>
          <Select
            data-testid='condition-select'
            placeholder='Выберите состояние'
            options={conditionOptions}
          />
        </Form.Item>

        {!isConsumableCategory && (
          <Form.Item>
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item data-testid='quantity' label='Количество' name='quantity'>
                  <InputNumber min={1} />
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item data-testid='measurement-unit' label='Ед.измерения'>
                  {nomenclature?.measurementUnit.title}
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>
        )}

        <Form.Item>
          <Row gutter={8}>
            <Col span={12}>
              <Form.Item data-testid='price' label='Стоимость' name='price'>
                <InputNumber min={0} />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item data-testid='currency' label='Валюта' name='currency'>
                <Select
                  data-testid='currency-select'
                  placeholder='Выберите валюту'
                  fieldNames={idAndTitleSelectFieldNames}
                  options={currencyList}
                  loading={currencyListIsFetching}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>

        {!isConsumableCategory && (
          <Form.Item>
            <Row>
              <Col span={8}>
                <Form.Item data-testid='is-new' label='Новое' name='isNew'>
                  <Radio.Group options={yesNoOptions} />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item data-testid='is-warranty ' label='На гарантии' name='isWarranty '>
                  <Radio.Group options={yesNoOptions} />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item data-testid='is-repaired' label='Отремонтированное' name='isRepaired '>
                  <Radio.Group options={yesNoOptions} />
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>
        )}

        {!isConsumableCategory && (
          <Form.Item
            data-testid='usage-counter'
            label='Счетчик пробега текущий'
            name='usageCounter'
          >
            <InputNumber min={0} />
          </Form.Item>
        )}

        {!isConsumableCategory && (
          <Form.Item
            data-testid='is-responsible-storage'
            label='Ответственное хранение'
            name='isResponsibleStorage'
          >
            <Radio.Group options={yesNoOptions} />
          </Form.Item>
        )}

        {!isConsumableCategory && isResponsibleStorageFormValue !== false && (
          <Form.Item data-testid='owner' label='Владелец оборудования' name='owner'>
            <Select
              data-testid='owner-select'
              placeholder='Выберите владельца оборудования'
              fieldNames={idAndTitleSelectFieldNames}
              options={ownerList}
              loading={ownerListIsFetching}
            />
          </Form.Item>
        )}

        <Form.Item data-testid='purpose' label='Назначение оборудования' name='purpose'>
          <Select
            data-testid='purpose-select'
            placeholder='Выберите назначение оборудования'
            fieldNames={idAndTitleSelectFieldNames}
            options={workTypeList}
            loading={workTypeListIsFetching}
          />
        </Form.Item>

        <Form.Item data-testid='comment' label='Комментарий' name='comment'>
          <TextArea placeholder='Добавьте комментарий' />
        </Form.Item>
      </Form>
    </BaseModal>
  )
}

export default EquipmentModal
