import { FC } from 'react'
import { useParams } from 'react-router-dom'

import { useGetWarehouse } from 'modules/warehouse/hooks/warehouse'

import Label from 'components/Label'
import LoadingArea from 'components/LoadingArea'
import Space from 'components/Space'

import { valueOrHyphen } from 'shared/utils/common'

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
            <Label label='Наименование объекта'>{warehouse.title}</Label>

            <Label label='Родительский склад'>{valueOrHyphen(warehouse.parent?.title)}</Label>

            <Label label='Юридическое лицо'>{warehouse.legalEntity.title}</Label>

            <Label label='Адрес'>{warehouse.address}</Label>

            <Label label='Договор'>{warehouse.contract}</Label>

            <Label label='Прочие данные'>{warehouse.notes}</Label>
          </Space>
        )}
      </LoadingArea>
    </WrapperStyled>
  )
}

export default WarehousePage
