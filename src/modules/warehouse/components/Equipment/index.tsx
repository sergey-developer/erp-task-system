import { Col, Drawer, Row, Typography } from 'antd'
import React, { FC } from 'react'

import Space from 'components/Space'

import { DATE_FORMAT } from 'shared/constants/dateTime'
import { getYesNo, valueOrHyphen } from 'shared/utils/common'
import { formatDate } from 'shared/utils/date'

import { EquipmentProps } from './types'

const { Text } = Typography

const Equipment: FC<EquipmentProps> = ({
  equipment,
  displayableFields,
  ...props
}) => {
  return (
    <Drawer {...props} width={500}>
      <Space $block direction='vertical' size='middle'>
        <Row>
          <Col span={12}>
            <Text type='secondary'>Наименование:</Text>
          </Col>

          <Col span={12}>{equipment.title}</Col>
        </Row>

        <Row>
          <Col span={12}>
            <Text type='secondary'>Категория:</Text>
          </Col>

          <Col span={12}>{equipment.category.title}</Col>
        </Row>

        <Row>
          <Col span={12}>
            <Text type='secondary'>Номенклатура:</Text>
          </Col>

          <Col span={12}>{equipment.nomenclature.title}</Col>
        </Row>

        {displayableFields.includes('customerInventoryNumber') && (
          <Row>
            <Col span={12}>
              <Text type='secondary'>Инвентарный номер заказчика:</Text>
            </Col>

            <Col span={12}>
              {valueOrHyphen(equipment.customerInventoryNumber)}
            </Col>
          </Row>
        )}

        {displayableFields.includes('inventoryNumber') && (
          <Row>
            <Col span={12}>
              <Text type='secondary'>Инвентарный номер:</Text>
            </Col>

            <Col span={12}>{valueOrHyphen(equipment.inventoryNumber)}</Col>
          </Row>
        )}

        {!equipment.nomenclature.equipmentHasSerialNumber && (
          <Row>
            <Col span={12}>
              <Text type='secondary'>Серийный номер:</Text>
            </Col>

            <Col span={12}>{valueOrHyphen(equipment.serialNumber)}</Col>
          </Row>
        )}

        <Row>
          <Col span={12}>
            <Text type='secondary'>Склад:</Text>
          </Col>

          <Col span={12}>{equipment.warehouse.title}</Col>
        </Row>

        <Row>
          <Col span={12}>
            <Text type='secondary'>Состояние:</Text>
          </Col>

          <Col span={12}>{equipment.condition}</Col>
        </Row>

        <Row>
          <Col span={12}>
            <Text type='secondary'>Дата оприходования:</Text>
          </Col>

          <Col span={12}>{formatDate(equipment.createdAt, DATE_FORMAT)}</Col>
        </Row>

        <Row>
          <Col span={12}>
            <Text type='secondary'>Кем оприходовано:</Text>
          </Col>

          <Col span={12}>{equipment.createdBy.fullName}</Col>
        </Row>

        <Row>
          <Col span={12}>
            <Text type='secondary'>Количество:</Text>
          </Col>

          <Col span={12}>
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

        <Row>
          <Col span={12}>
            <Text type='secondary'>Стоимость:</Text>
          </Col>

          <Col span={12}>
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
          <Row>
            <Col span={12}>
              <Text type='secondary'>Новое:</Text>
            </Col>

            <Col span={12}>{getYesNo(equipment.isNew)}</Col>
          </Row>
        )}

        {displayableFields.includes('isWarranty') && (
          <Row>
            <Col span={12}>
              <Text type='secondary'>На гарантии:</Text>
            </Col>

            <Col span={12}>{getYesNo(equipment.isWarranty)}</Col>
          </Row>
        )}

        {displayableFields.includes('isRepaired') && (
          <Row>
            <Col span={12}>
              <Text type='secondary'>Отремонтированное:</Text>
            </Col>

            <Col span={12}>{getYesNo(equipment.isRepaired)}</Col>
          </Row>
        )}

        {displayableFields.includes('usageCounter') && (
          <Row>
            <Col span={12}>
              <Text type='secondary'>Счётчик пробега текущий:</Text>
            </Col>

            <Col span={12}>{valueOrHyphen(equipment.usageCounter)}</Col>
          </Row>
        )}

        {displayableFields.includes('owner') && (
          <Row>
            <Col span={12}>
              <Text type='secondary'>Владелец оборудования:</Text>
            </Col>

            <Col span={12}>{valueOrHyphen(equipment.owner?.title)}</Col>
          </Row>
        )}

        <Row>
          <Col span={12}>
            <Text type='secondary'>Назначение оборудования:</Text>
          </Col>

          <Col span={12}>{equipment.purpose.title}</Col>
        </Row>

        <Row>
          <Col span={12}>
            <Text type='secondary'>Комментарий:</Text>
          </Col>

          <Col span={12}>{valueOrHyphen(equipment.comment)}</Col>
        </Row>
      </Space>
    </Drawer>
  )
}

export default Equipment
