import { Col, Form, Input, InputNumber, Radio, Row, Select, Upload } from 'antd'
import isArray from 'lodash/isArray'
import isEmpty from 'lodash/isEmpty'
import React, { FC, useEffect, useMemo } from 'react'

import { equipmentConditionOptions } from 'modules/warehouse/constants/equipment'
import {
  EquipmentCategoryListItemModel,
  NomenclatureListItemModel,
  WarehouseListItemModel,
} from 'modules/warehouse/models'
import { checkEquipmentCategoryIsConsumable } from 'modules/warehouse/utils/equipment'

import UploadButton from 'components/Buttons/UploadButton'
import LoadingArea from 'components/LoadingArea'
import BaseModal from 'components/Modals/BaseModal'

import { filesFormItemProps } from 'shared/constants/form'
import { idAndTitleSelectFieldNames, yesNoOptions } from 'shared/constants/selectField'
import { onlyRequiredRules, requiredStringRules } from 'shared/constants/validation'
import { IdType } from 'shared/types/common'
import { filterOptionBy, isFalse, isTrue } from 'shared/utils/common'
import { getFieldsErrors } from 'shared/utils/form'

import { EquipmentFormFields, EquipmentFormModalProps } from './types'

const { TextArea } = Input

const EquipmentFormModal: FC<EquipmentFormModalProps> = ({
  mode,

  isLoading,
  values,
  initialValues,
  errors,

  onUploadImage,
  imageIsUploading,
  onDeleteImage,
  imageIsDeleting,

  categoryList,
  categoryListIsLoading,
  category,
  onChangeCategory,

  warehouseList,
  warehouseListIsLoading,

  currencyList,
  currencyListIsLoading,

  ownerList,
  ownerListIsLoading,

  workTypeList,
  workTypeListIsLoading,

  nomenclature,
  nomenclatureIsLoading,

  nomenclatureList,
  nomenclatureListIsLoading,
  onChangeNomenclature,

  onSubmit,

  ...props
}) => {
  const [form] = Form.useForm<EquipmentFormFields>()
  const ownerIsObermeisterFormValue = Form.useWatch('ownerIsObermeister', form)

  const nomenclatureSelected = Boolean(nomenclature)

  const categorySelected = Boolean(category)
  const categoryIsConsumable = checkEquipmentCategoryIsConsumable(category?.code)

  useEffect(() => {
    if (values?.title) form.setFieldsValue({ title: values.title })
  }, [form, values?.title])

  useEffect(() => {
    if (values?.images?.length) form.setFieldsValue({ images: values.images })
  }, [form, values?.images])

  useEffect(() => {
    if (!isEmpty(errors) && nomenclatureSelected && categorySelected) {
      form.setFields(getFieldsErrors(errors!))
    }
  }, [categorySelected, errors, form, nomenclatureSelected])

  const handleChangeCategory = (
    value: IdType,
    option: EquipmentCategoryListItemModel | EquipmentCategoryListItemModel[],
  ) => {
    if (!isArray(option)) {
      onChangeCategory(option)

      form.setFieldsValue({
        nomenclature: undefined,
        title: undefined,
        inventoryNumber: undefined,
        serialNumber: undefined,
        warehouse: undefined,
        condition: undefined,
        quantity: undefined,
        price: undefined,
        currency: undefined,
        isNew: undefined,
        isWarranty: undefined,
        isRepaired: undefined,
        usageCounter: undefined,
        owner: undefined,
        ownerIsObermeister: undefined,
        purpose: undefined,
        comment: undefined,
      })
    }
  }

  const handleFinish = async ({ ownerIsObermeister, ...values }: EquipmentFormFields) => {
    await onSubmit(
      {
        ...values,
        title: values.title.trim(),
        comment: values.comment?.trim(),
        serialNumber: values.serialNumber?.trim(),
        inventoryNumber: values.inventoryNumber?.trim(),
      },
      form.setFields,
    )
  }

  const okButtonProps = useMemo(
    () => ({ loading: isLoading, disabled: imageIsUploading || imageIsDeleting }),
    [imageIsDeleting, imageIsUploading, isLoading],
  )

  return (
    <BaseModal
      {...props}
      data-testid='equipment-form-modal'
      okButtonProps={okButtonProps}
      onOk={form.submit}
    >
      <Form<EquipmentFormFields>
        form={form}
        initialValues={initialValues}
        layout='vertical'
        onFinish={handleFinish}
      >
        <Form.Item
          data-testid='category-form-item'
          label='Категория'
          name='category'
          rules={onlyRequiredRules}
        >
          <Select<IdType, EquipmentCategoryListItemModel>
            placeholder='Выберите категорию'
            fieldNames={idAndTitleSelectFieldNames}
            options={categoryList}
            loading={categoryListIsLoading}
            disabled={isLoading || categoryListIsLoading}
            onChange={handleChangeCategory}
          />
        </Form.Item>

        <Form.Item
          data-testid='nomenclatures-form-item'
          label='Номенклатура'
          name='nomenclature'
          rules={onlyRequiredRules}
        >
          <Select<IdType, NomenclatureListItemModel>
            virtual
            placeholder='Выберите номенклатуру'
            fieldNames={idAndTitleSelectFieldNames}
            options={nomenclatureList}
            loading={nomenclatureListIsLoading}
            disabled={isLoading || nomenclatureListIsLoading}
            onChange={onChangeNomenclature}
            showSearch
            filterOption={filterOptionBy('title')}
          />
        </Form.Item>

        <LoadingArea
          data-testid='nomenclature-loading'
          isLoading={nomenclatureIsLoading}
          tip='Загрузка номенклатуры...'
        >
          {categorySelected && nomenclatureSelected && (
            <>
              <Form.Item
                data-testid='title-form-item'
                label='Наименование'
                name='title'
                rules={requiredStringRules}
              >
                <Input
                  placeholder='Введите наименование'
                  disabled={categoryIsConsumable || isLoading}
                />
              </Form.Item>

              {!categoryIsConsumable && (
                <Form.Item
                  data-testid='inventory-number-form-item'
                  label='Инвентарный номер'
                  name='inventoryNumber'
                >
                  <Input placeholder='Введите инвентарный номер' disabled={isLoading} />
                </Form.Item>
              )}

              {nomenclature?.equipmentHasSerialNumber && (
                <Form.Item
                  data-testid='serial-number-form-item'
                  label='Серийный номер'
                  name='serialNumber'
                  rules={requiredStringRules}
                >
                  <Input placeholder='Введите серийный номер' disabled={isLoading} />
                </Form.Item>
              )}

              {mode === 'edit' && (
                <Form.Item
                  data-testid='warehouse-form-item'
                  label='Склад'
                  name='warehouse'
                  rules={onlyRequiredRules}
                >
                  <Select<IdType, WarehouseListItemModel>
                    placeholder='Выберите склад'
                    fieldNames={idAndTitleSelectFieldNames}
                    options={warehouseList}
                    loading={warehouseListIsLoading}
                    disabled={isLoading || warehouseListIsLoading}
                  />
                </Form.Item>
              )}

              <Form.Item
                data-testid='condition-form-item'
                label='Состояние'
                name='condition'
                rules={onlyRequiredRules}
              >
                <Select
                  placeholder='Выберите состояние'
                  options={equipmentConditionOptions}
                  disabled={isLoading}
                />
              </Form.Item>

              {mode === 'create' && categoryIsConsumable && (
                <Form.Item>
                  <Row gutter={8}>
                    <Col span={12}>
                      <Form.Item
                        data-testid='quantity-form-item'
                        label='Количество'
                        name='quantity'
                      >
                        <InputNumber
                          min={1}
                          placeholder='Введите количество'
                          disabled={isLoading}
                        />
                      </Form.Item>
                    </Col>

                    <Col span={6}>
                      <Form.Item data-testid='measurement-unit-form-item' label='Ед.измерения'>
                        {nomenclature?.measurementUnit.title}
                      </Form.Item>
                    </Col>
                  </Row>
                </Form.Item>
              )}

              {mode === 'edit' && (
                <Form.Item>
                  <Row gutter={8}>
                    <Col span={12}>
                      <Form.Item
                        data-testid='quantity-form-item'
                        label='Количество'
                        name='quantity'
                      >
                        <InputNumber disabled />
                      </Form.Item>
                    </Col>

                    {categoryIsConsumable && (
                      <Col span={6}>
                        <Form.Item data-testid='measurement-unit-form-item' label='Ед.измерения'>
                          {nomenclature?.measurementUnit.title}
                        </Form.Item>
                      </Col>
                    )}
                  </Row>
                </Form.Item>
              )}

              <Form.Item>
                <Row gutter={8}>
                  <Col span={12}>
                    <Form.Item data-testid='price-form-item' label='Стоимость' name='price'>
                      <InputNumber min={0} placeholder='Введите стоимость' disabled={isLoading} />
                    </Form.Item>
                  </Col>

                  <Col span={6}>
                    <Form.Item data-testid='currency-form-item' label='Валюта' name='currency'>
                      <Select
                        placeholder='Выберите валюту'
                        fieldNames={idAndTitleSelectFieldNames}
                        options={currencyList}
                        loading={currencyListIsLoading}
                        disabled={isLoading || currencyListIsLoading}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Form.Item>

              {!categoryIsConsumable && (
                <Form.Item>
                  <Row>
                    <Col span={8}>
                      <Form.Item
                        data-testid='is-new-form-item'
                        label='Новое'
                        name='isNew'
                        rules={onlyRequiredRules}
                      >
                        <Radio.Group options={yesNoOptions} disabled={isLoading} />
                      </Form.Item>
                    </Col>

                    <Col span={8}>
                      <Form.Item
                        data-testid='is-warranty-form-item'
                        label='На гарантии'
                        name='isWarranty'
                        rules={onlyRequiredRules}
                      >
                        <Radio.Group options={yesNoOptions} disabled={isLoading} />
                      </Form.Item>
                    </Col>

                    <Col span={8}>
                      <Form.Item
                        data-testid='is-repaired-form-item'
                        label='Отремонтированное'
                        name='isRepaired'
                        rules={onlyRequiredRules}
                      >
                        <Radio.Group options={yesNoOptions} disabled={isLoading} />
                      </Form.Item>
                    </Col>
                  </Row>
                </Form.Item>
              )}

              {!categoryIsConsumable && (
                <Form.Item
                  data-testid='usage-counter-form-item'
                  label='Счетчик пробега текущий'
                  name='usageCounter'
                >
                  <InputNumber min={0} placeholder='Введите значение' disabled={isLoading} />
                </Form.Item>
              )}

              <Form.Item
                data-testid='owner-is-obermeister-form-item'
                label='Владелец оборудования - Obermeister'
                name='ownerIsObermeister'
              >
                <Radio.Group options={yesNoOptions} />
              </Form.Item>

              {categoryIsConsumable || isTrue(ownerIsObermeisterFormValue) ? null : (
                <Form.Item
                  data-testid='owner-form-item'
                  label='Владелец оборудования'
                  name='owner'
                  rules={isFalse(ownerIsObermeisterFormValue) ? onlyRequiredRules : undefined}
                >
                  <Select
                    placeholder='Выберите владельца оборудования'
                    fieldNames={idAndTitleSelectFieldNames}
                    options={ownerList}
                    loading={ownerListIsLoading}
                    disabled={isLoading || ownerListIsLoading}
                    showSearch
                    filterOption={filterOptionBy('title')}
                  />
                </Form.Item>
              )}

              <Form.Item
                data-testid='purpose-form-item'
                label='Назначение оборудования'
                name='purpose'
                rules={onlyRequiredRules}
              >
                <Select
                  placeholder='Выберите назначение оборудования'
                  fieldNames={idAndTitleSelectFieldNames}
                  options={workTypeList}
                  loading={workTypeListIsLoading}
                  disabled={isLoading || workTypeListIsLoading}
                />
              </Form.Item>

              <Form.Item data-testid='comment-form-item' label='Комментарий' name='comment'>
                <TextArea placeholder='Добавьте комментарий' disabled={isLoading} />
              </Form.Item>

              <Form.Item
                data-testid='images-form-item'
                label='Изображения оборудования'
                name='images'
                {...filesFormItemProps}
              >
                <Upload
                  listType='picture'
                  multiple
                  disabled={isLoading || imageIsDeleting}
                  itemRender={(originNode, file) => (file.error ? null : originNode)}
                  customRequest={onUploadImage}
                  onRemove={onDeleteImage}
                  defaultFileList={values?.images}
                >
                  <UploadButton label='Добавить фото' disabled={isLoading} />
                </Upload>
              </Form.Item>
            </>
          )}
        </LoadingArea>
      </Form>
    </BaseModal>
  )
}

export default EquipmentFormModal
