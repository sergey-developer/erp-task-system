import defaultTo from 'lodash/defaultTo'
import { FC, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { getWarehouseMessages } from 'modules/warehouse/constants'
import { useGetWarehouseQuery } from 'modules/warehouse/services/warehouseApiService'

import LabeledData from 'components/LabeledData'
import LoadingArea from 'components/LoadingArea'
import Space from 'components/Space'

import { isErrorResponse, isNotFoundError } from 'shared/services/baseApi'
import { valueOrHyphen } from 'shared/utils/common'
import { showErrorNotification } from 'shared/utils/notifications'

import { WrapperStyled } from './styles'

const WarehousePage: FC = () => {
  const params = useParams<'id'>()
  const warehouseId = defaultTo(Number(params?.id), undefined)

  const {
    currentData: warehouse,
    isFetching: warehouseIsFetching,
    error: getWarehouseError,
  } = useGetWarehouseQuery(warehouseId!, { skip: !warehouseId })

  useEffect(() => {
    if (isErrorResponse(getWarehouseError)) {
      if (isNotFoundError(getWarehouseError) && getWarehouseError.data.detail) {
        showErrorNotification(getWarehouseError.data.detail)
      } else {
        showErrorNotification(getWarehouseMessages.commonError)
      }
    }
  }, [getWarehouseError])

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
