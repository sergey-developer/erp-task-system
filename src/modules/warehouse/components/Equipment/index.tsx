import { Col, Drawer, Row, Typography } from 'antd'
import React, { FC } from 'react'

import { equipmentConditionDict } from 'modules/warehouse/constants'

import LoadingArea from 'components/LoadingArea'
import Space from 'components/Space'

import { DATE_FORMAT } from 'shared/constants/dateTime'
import { getYesNo, valueOrHyphen } from 'shared/utils/common'
import { formatDate } from 'shared/utils/date'

import { EquipmentProps } from './types'

const { Text } = Typography

const Equipment: FC<EquipmentProps> = ({
  equipment,
  equipmentIsLoading,
  displayableFields,
  ...props
}) => {
  return (
    <Drawer data-testid='equipment' {...props} width={500}>
      <LoadingArea data-testid='equipment-loading' isLoading={equipmentIsLoading}>
        {equipment && (
          <Space $block direction='vertical' size='middle'>
            <Row data-testid='title'>
              <Col span={12}>
                <Text type='secondary'>Наименование:</Text>
              </Col>

              <Col span={12}>{equipment.title}</Col>
            </Row>

            <Row data-testid='category'>
              <Col span={12}>
                <Text type='secondary'>Категория:</Text>
              </Col>

              <Col span={12}>{equipment.category.title}</Col>
            </Row>

            <Row data-testid='nomenclature'>
              <Col span={12}>
                <Text type='secondary'>Номенклатура:</Text>
              </Col>

              <Col span={12}>{equipment.nomenclature.title}</Col>
            </Row>

            {displayableFields.includes('customerInventoryNumber') && (
              <Row data-testid='customer-inventory-number'>
                <Col span={12}>
                  <Text type='secondary'>Инвентарный номер заказчика:</Text>
                </Col>

                <Col span={12}>{valueOrHyphen(equipment.customerInventoryNumber)}</Col>
              </Row>
            )}

            {displayableFields.includes('inventoryNumber') && (
              <Row data-testid='inventory-number'>
                <Col span={12}>
                  <Text type='secondary'>Инвентарный номер:</Text>
                </Col>

                <Col span={12}>{valueOrHyphen(equipment.inventoryNumber)}</Col>
              </Row>
            )}

            {equipment.nomenclature.equipmentHasSerialNumber && (
              <Row data-testid='serial-number'>
                <Col span={12}>
                  <Text type='secondary'>Серийный номер:</Text>
                </Col>

                <Col span={12}>{valueOrHyphen(equipment.serialNumber)}</Col>
              </Row>
            )}

            <Row data-testid='warehouse'>
              <Col span={12}>
                <Text type='secondary'>Склад:</Text>
              </Col>

              <Col span={12}>{valueOrHyphen(equipment.warehouse?.title)}</Col>
            </Row>

            <Row data-testid='condition'>
              <Col span={12}>
                <Text type='secondary'>Состояние:</Text>
              </Col>

              <Col span={12}>{equipmentConditionDict[equipment.condition]}</Col>
            </Row>

            <Row data-testid='created-at'>
              <Col span={12}>
                <Text type='secondary'>Дата оприходования:</Text>
              </Col>

              <Col span={12}>{formatDate(equipment.createdAt, DATE_FORMAT)}</Col>
            </Row>

            <Row data-testid='created-by'>
              <Col span={12}>
                <Text type='secondary'>Кем оприходовано:</Text>
              </Col>

              <Col span={12}>{equipment.createdBy.fullName}</Col>
            </Row>

            <Row data-testid='quantity'>
              <Col span={7}>
                <Text type='secondary'>Количество:</Text>
              </Col>

              <Col span={17}>
                <Row gutter={16}>
                  <Col span={6}>{valueOrHyphen(equipment.quantity)}</Col>

                  <Col span={18}>
                    <Space>
                      <Text type='secondary'>Ед. измерения:</Text>
                      <Text>{equipment.measurementUnit.title}</Text>
                    </Space>
                  </Col>
                </Row>
              </Col>
            </Row>

            <Row data-testid='price'>
              <Col span={7}>
                <Text type='secondary'>Стоимость:</Text>
              </Col>

              <Col span={17}>
                <Row gutter={16}>
                  <Col span={6}>{valueOrHyphen(equipment.price)}</Col>

                  <Col span={18}>
                    <Space>
                      <Text type='secondary'>Валюта:</Text>
                      <Text>{valueOrHyphen(equipment.currency?.title)}</Text>
                    </Space>
                  </Col>
                </Row>
              </Col>
            </Row>

            {displayableFields.includes('isNew') && (
              <Row data-testid='is-new'>
                <Col span={12}>
                  <Text type='secondary'>Новое:</Text>
                </Col>

                <Col span={12}>{getYesNo(equipment.isNew)}</Col>
              </Row>
            )}

            {displayableFields.includes('isWarranty') && (
              <Row data-testid='is-warranty'>
                <Col span={12}>
                  <Text type='secondary'>На гарантии:</Text>
                </Col>

                <Col span={12}>{getYesNo(equipment.isWarranty)}</Col>
              </Row>
            )}

            {displayableFields.includes('isRepaired') && (
              <Row data-testid='is-repaired'>
                <Col span={12}>
                  <Text type='secondary'>Отремонтированное:</Text>
                </Col>

                <Col span={12}>{getYesNo(equipment.isRepaired)}</Col>
              </Row>
            )}

            {displayableFields.includes('usageCounter') && (
              <Row data-testid='usage-counter'>
                <Col span={12}>
                  <Text type='secondary'>Счётчик пробега текущий:</Text>
                </Col>

                <Col span={12}>{valueOrHyphen(equipment.usageCounter)}</Col>
              </Row>
            )}

            {displayableFields.includes('owner') && (
              <Row data-testid='owner'>
                <Col span={12}>
                  <Text type='secondary'>Владелец оборудования:</Text>
                </Col>

                <Col span={12}>{valueOrHyphen(equipment.owner?.title)}</Col>
              </Row>
            )}

            <Row data-testid='purpose'>
              <Col span={7}>
                <Text type='secondary'>Назначение оборудования:</Text>
              </Col>

              <Col span={17}>{equipment.purpose.title}</Col>
            </Row>

            <Row data-testid='comment'>
              <Col span={12}>
                <Text type='secondary'>Комментарий:</Text>
              </Col>

              <Col span={12}>{valueOrHyphen(equipment.comment)}</Col>
            </Row>
          </Space>
        )}
      </LoadingArea>
    </Drawer>
  )
}

export default Equipment
