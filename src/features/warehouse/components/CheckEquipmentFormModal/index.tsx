import { Col, Form, Input, InputNumber, Radio, Row, Select } from 'antd'
import { equipmentConditionOptions } from 'features/equipments/api/constants'
import { checkEquipmentCategoryIsConsumable } from 'features/equipments/helpers'
import { EquipmentCategoryDTO, NomenclatureListItemModel } from 'features/warehouse/models'
import isArray from 'lodash/isArray'
import { DefaultOptionType } from 'rc-select/lib/Select'
import React, { FC, useEffect, useMemo } from 'react'

import LoadingArea from 'components/LoadingArea'
import BaseModal from 'components/Modals/BaseModal'

import { SAVE_TEXT } from 'shared/constants/common'
import {
  idAndTitleSelectFieldNames,
  undefinedSelectOption,
  yesNoOptions,
} from 'shared/constants/selectField'
import { onlyRequiredRules, requiredStringRules } from 'shared/constants/validation'
import { IdType } from 'shared/types/common'
import { filterOptionBy } from 'shared/utils/common'

import { CheckEquipmentFormFields, CheckEquipmentFormModalProps } from './types'

const { TextArea } = Input

// todo: разделить форму как в моб.версии
const CheckEquipmentFormModal: FC<CheckEquipmentFormModalProps> = ({
  isCredited,

  isLoading,
  values,
  initialValues,

  categories,
  categoriesIsLoading,
  category,
  onChangeCategory,

  locations,
  locationsIsLoading,

  currencies,
  currenciesIsLoading,

  owners,
  ownersIsLoading,
  onChangeOwner,

  macroregions,
  macroregionsIsLoading,

  workTypes,
  workTypesIsLoading,

  nomenclature,
  nomenclatureIsLoading,

  nomenclatures,
  nomenclaturesIsLoading,
  onChangeNomenclature,

  onSubmit,

  ...props
}) => {
  const [form] = Form.useForm<CheckEquipmentFormFields>()
  const ownerFormValue = Form.useWatch('owner', form)

  const nomenclatureSelected = Boolean(nomenclature)

  const categorySelected = Boolean(category)
  const categoryIsConsumable = checkEquipmentCategoryIsConsumable(category?.code)

  useEffect(() => {
    if (values?.title) form.setFieldsValue({ title: values.title })
  }, [form, values?.title])

  const handleChangeCategory = (
    value: IdType,
    option: EquipmentCategoryDTO | EquipmentCategoryDTO[],
  ) => {
    if (!isArray(option)) {
      onChangeCategory(option)

      form.setFieldsValue({
        nomenclature: undefined,
        title: undefined,
        inventoryNumber: undefined,
        serialNumber: undefined,
        location: undefined,
        condition: undefined,
        quantity: undefined,
        price: undefined,
        currency: undefined,
        isNew: undefined,
        isWarranty: undefined,
        isRepaired: undefined,
        usageCounter: undefined,
        owner: undefined,
        macroregion: undefined,
        purpose: undefined,
        comment: undefined,
      })
    }
  }

  const onFinish = async (values: CheckEquipmentFormFields) => {
    await onSubmit(
      {
        ...values,
        title: values.title.trim(),
        comment: values.comment?.trim(),
        serialNumber: values.serialNumber?.trim(),
        inventoryNumber: values.inventoryNumber?.trim(),
      },
      form,
    )
  }

  const locationsOptions = useMemo(
    () =>
      locations.reduce<DefaultOptionType[]>((acc, loc, index) => {
        if (index === 0 && !categoryIsConsumable) acc.push(undefinedSelectOption)
        acc.push({ label: loc.title, value: loc.id })
        return acc
      }, []),
    [categoryIsConsumable, locations],
  )

  return (
    <BaseModal
      {...props}
      data-testid='check-equipment-form-modal'
      confirmLoading={isLoading}
      okText={SAVE_TEXT}
      onOk={form.submit}
    >
      <Form<CheckEquipmentFormFields>
        form={form}
        initialValues={initialValues}
        layout='vertical'
        onFinish={onFinish}
      >
        <Form.Item
          data-testid='category-form-item'
          label='Категория'
          name='category'
          rules={onlyRequiredRules}
        >
          <Select<IdType, EquipmentCategoryDTO>
            placeholder='Выберите категорию'
            fieldNames={idAndTitleSelectFieldNames}
            options={categories}
            loading={categoriesIsLoading}
            disabled={isLoading || categoriesIsLoading}
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
            options={nomenclatures}
            loading={nomenclaturesIsLoading}
            disabled={isLoading || nomenclaturesIsLoading}
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

              {!categoryIsConsumable && nomenclature?.equipmentHasSerialNumber && (
                <Form.Item
                  data-testid='serial-number-form-item'
                  label='Серийный номер'
                  name='serialNumber'
                  rules={requiredStringRules}
                >
                  <Input placeholder='Введите серийный номер' disabled={isLoading} />
                </Form.Item>
              )}

              <Form.Item
                data-testid='location-form-item'
                label='Местонахождение'
                name='location'
                rules={onlyRequiredRules}
              >
                <Select
                  placeholder='Выберите Местонахождение'
                  options={locationsOptions}
                  loading={locationsIsLoading}
                  disabled={isLoading || locationsIsLoading}
                  showSearch
                  filterOption={filterOptionBy('label')}
                />
              </Form.Item>

              <Form.Item
                data-testid='condition-form-item'
                label='Состояние'
                name='condition'
                rules={categoryIsConsumable || !isCredited ? onlyRequiredRules : undefined}
              >
                <Select
                  placeholder='Выберите состояние'
                  options={equipmentConditionOptions}
                  disabled={isLoading}
                />
              </Form.Item>

              {categoryIsConsumable && (
                <Form.Item>
                  <Row gutter={8}>
                    <Col span={12}>
                      <Form.Item
                        data-testid='quantity-form-item'
                        label='Количество'
                        name='quantity'
                        rules={onlyRequiredRules}
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
                        options={currencies}
                        loading={currenciesIsLoading}
                        disabled={isLoading || currenciesIsLoading}
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
                        rules={isCredited ? undefined : onlyRequiredRules}
                      >
                        <Radio.Group options={yesNoOptions} disabled={isLoading} />
                      </Form.Item>
                    </Col>

                    <Col span={8}>
                      <Form.Item
                        data-testid='is-warranty-form-item'
                        label='На гарантии'
                        name='isWarranty'
                        rules={isCredited ? undefined : onlyRequiredRules}
                      >
                        <Radio.Group options={yesNoOptions} disabled={isLoading} />
                      </Form.Item>
                    </Col>

                    <Col span={8}>
                      <Form.Item
                        data-testid='is-repaired-form-item'
                        label='Отремонтированное'
                        name='isRepaired'
                        rules={isCredited ? undefined : onlyRequiredRules}
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

              {!categoryIsConsumable && (
                <Form.Item data-testid='owner-form-item' label='Владелец оборудования' name='owner'>
                  <Select
                    placeholder='Выберите владельца оборудования'
                    fieldNames={idAndTitleSelectFieldNames}
                    options={owners}
                    loading={ownersIsLoading}
                    disabled={isLoading || ownersIsLoading}
                    showSearch
                    filterOption={filterOptionBy('title')}
                    onChange={onChangeOwner}
                  />
                </Form.Item>
              )}

              {ownerFormValue && (
                <Form.Item
                  data-testid='macroregion-form-item'
                  label='Макрорегион'
                  name='macroregion'
                  rules={onlyRequiredRules}
                >
                  <Select
                    placeholder='Выберите макрорегион'
                    fieldNames={idAndTitleSelectFieldNames}
                    options={macroregions}
                    loading={macroregionsIsLoading}
                    disabled={isLoading || macroregionsIsLoading}
                    showSearch
                    filterOption={filterOptionBy('title')}
                  />
                </Form.Item>
              )}

              <Form.Item
                data-testid='purpose-form-item'
                label='Назначение оборудования'
                name='purpose'
                rules={isCredited ? undefined : onlyRequiredRules}
              >
                <Select
                  placeholder='Выберите назначение оборудования'
                  fieldNames={idAndTitleSelectFieldNames}
                  options={workTypes}
                  loading={workTypesIsLoading}
                  disabled={isLoading || workTypesIsLoading}
                />
              </Form.Item>

              <Form.Item data-testid='comment-form-item' label='Комментарий' name='comment'>
                <TextArea placeholder='Добавьте комментарий' disabled={isLoading} />
              </Form.Item>
            </>
          )}
        </LoadingArea>
      </Form>
    </BaseModal>
  )
}

export default CheckEquipmentFormModal
