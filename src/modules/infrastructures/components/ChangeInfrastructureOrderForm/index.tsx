import { Flex } from 'antd'
import { FC } from 'react'

import { InfrastructureOrderFormListItemModel } from 'modules/infrastructures/models'
import ReadonlyField from 'modules/warehouse/components/RelocationTaskDetails/ReadonlyField'

import Space from 'components/Space'

export type ChangeInfrastructureOrderFormProps = {
  data: InfrastructureOrderFormListItemModel
}

const ChangeInfrastructureOrderForm: FC<ChangeInfrastructureOrderFormProps> = ({ data }) => {
  const { urgencyRateType } = data

  return (
    <Space $block direction='vertical' size='middle'>
      <Flex vertical>
        <ReadonlyField
          rowProps={{ gutter: 8 }}
          leftColProps={{ span: undefined }}
          rightColProps={{ span: undefined }}
          label='Тариф:'
          value={urgencyRateType.title}
        />
      </Flex>
    </Space>
  )
}

export default ChangeInfrastructureOrderForm
