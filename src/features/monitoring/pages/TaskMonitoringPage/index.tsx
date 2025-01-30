import { Col, Input, Row, Tabs, TabsProps, Typography } from 'antd'
import { FC, useState } from 'react'

import { useGetTaskMonitoring } from 'features/monitoring/hooks'

import LoadingArea from 'components/LoadingArea'
import PrettyJson from 'components/PrettyJson'
import Space from 'components/Space'

const { Search } = Input
const { Text } = Typography

const TaskMonitoringPage: FC = () => {
  const [recordId, setRecordId] = useState<string>('')

  const { isFetching, currentData: monitoringData = [] } = useGetTaskMonitoring(recordId, {
    skip: !recordId,
  })

  const tabsItems: TabsProps['items'] = monitoringData.map((item, index) => ({
    key: String(index),
    label: item.title,
    children: <PrettyJson data={item.data} />,
  }))

  return (
    <Space direction='vertical' size='large'>
      <Row justify='center'>
        <Col span={5}>
          <Search
            placeholder='Введите значение'
            allowClear
            loading={isFetching}
            disabled={isFetching}
            onSearch={setRecordId}
          />
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          <LoadingArea isLoading={isFetching}>
            {monitoringData.length ? (
              <Tabs tabPosition='left' items={tabsItems} />
            ) : (
              <Text>По вашему запросу ничего не найдено</Text>
            )}
          </LoadingArea>
        </Col>
      </Row>
    </Space>
  )
}

export default TaskMonitoringPage
