import { Collapse, Typography } from 'antd'
import { CollapseProps } from 'rc-collapse/es/interface'
import { FC, useMemo } from 'react'

import { useGetInfrastructureOrdersForms } from 'modules/infrastructures/hooks'

import LoadingArea from 'components/LoadingArea'
import Space from 'components/Space'

import { IdType } from 'shared/types/common'

import ChangeInfrastructureOrderForm from '../ChangeInfrastructureOrderForm'

const { Text } = Typography

export type ChangeInfrastructureOrdersFormsTabProps = {
  infrastructureId: IdType
}

const ChangeInfrastructureOrdersFormsTab: FC<ChangeInfrastructureOrdersFormsTabProps> = ({
  infrastructureId,
}) => {
  const {
    currentData: infrastructureOrdersForms = [],
    isFetching: infrastructureOrdersFormsIsFetching,
  } = useGetInfrastructureOrdersForms({ infrastructureProject: infrastructureId })

  const ordersFormsItems: CollapseProps['items'] = useMemo(
    () =>
      infrastructureOrdersForms.map((orderForm) => ({
        key: orderForm.id,
        label: <Text strong>Бланк-заказ №${orderForm.number}</Text>,
        children: <ChangeInfrastructureOrderForm data={orderForm} />,
      })),
    [infrastructureOrdersForms],
  )

  const ordersFormsItemsActiveKeys: CollapseProps['defaultActiveKey'] = useMemo(
    () => infrastructureOrdersForms.map((orderForm) => orderForm.id),
    [infrastructureOrdersForms],
  )

  return (
    <Space
      $block
      direction='vertical'
      size='large'
      data-testid='change-infrastructure-order-form-tab'
    >
      <LoadingArea isLoading={infrastructureOrdersFormsIsFetching}>
        {!!infrastructureOrdersForms.length ? (
          <Collapse ghost defaultActiveKey={ordersFormsItemsActiveKeys} items={ordersFormsItems} />
        ) : (
          <Text>Нет бланк заказов</Text>
        )}
      </LoadingArea>
    </Space>
  )
}

export default ChangeInfrastructureOrdersFormsTab
