import { Col, Row, Typography } from 'antd'
import { FC } from 'react'

import RelocationEquipmentEditableTable from 'modules/warehouse/components/RelocationEquipmentEditableTable'

import Space from 'components/Space'

const { Text } = Typography

const CreateRelocationTaskPage: FC = () => {
  return (
    <Row data-testid='create-relocation-task-page' gutter={[40, 40]}>
      <Col span={24}>
        <Space direction='vertical'>
          <Text strong>Перечень оборудования</Text>

          <RelocationEquipmentEditableTable />
        </Space>
      </Col>
    </Row>
  )
}

export default CreateRelocationTaskPage
