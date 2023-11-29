import { FC } from 'react'
import { useParams } from 'react-router-dom'

import LabeledData from 'components/LabeledData'
import LoadingArea from 'components/LoadingArea'
import Space from 'components/Space'

import { valueOrHyphen } from 'shared/utils/common'

import { useGetWarehouse } from '../../hooks/warehouse'
import { WrapperStyled } from './styles'

const WarehousePage: FC = () => {
  // todo: создать хук который будет возвращать распарсеные значения
  const params = useParams<'id'>()
  const warehouseId = Number(params?.id) || undefined

  const { currentData: warehouse, isFetching: warehouseIsFetching } = useGetWarehouse(
    warehouseId!,
    { skip: !warehouseId },
  )

  return (
    <WrapperStyled data-testid='warehouse-page'>
      <LoadingArea data-testid='warehouse-loading' isLoading={warehouseIsFetching}>
        {warehouse && (
          <Space $block direction='vertical'>
            <LabeledData label='Наименование объекта'>{warehouse.title}</LabeledData>

            <LabeledData label='Родительский склад'>
              {valueOrHyphen(warehouse.parent?.title)}
            </LabeledData>

            <LabeledData label='Юридическое лицо'>{warehouse.legalEntity.title}</LabeledData>

            <LabeledData label='Адрес'>{warehouse.address}</LabeledData>

            <LabeledData label='Договор'>{warehouse.contract}</LabeledData>

            <LabeledData label='Прочие данные'>{warehouse.notes}</LabeledData>
          </Space>
        )}
      </LoadingArea>
    </WrapperStyled>
  )
}

export default WarehousePage
