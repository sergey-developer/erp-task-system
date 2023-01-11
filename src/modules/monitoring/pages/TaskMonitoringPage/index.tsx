import { Col, Input, Row, Tabs, Typography } from 'antd'
import { FC, useState } from 'react'

import LoadingArea from 'components/LoadingArea'
import PrettyJson from 'components/PrettyJson'
import Space from 'components/Space'
import { useGetTaskMonitoringQuery } from 'modules/monitoring/services/monitoringApi.service'

const { Search } = Input
const { Text } = Typography

const TaskMonitoringPage: FC = () => {
  const [recordId, setRecordId] = useState<string>('')

  const { isFetching, data: monitoringData = [] } = useGetTaskMonitoringQuery(
    recordId,
    { skip: !recordId },
  )

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

      <Row justify='center'>
        <Col span={12}>
          <LoadingArea isLoading={isFetching}>
            {monitoringData.length ? (
              <Tabs tabPosition='left'>
                {monitoringData.map((item, index) => (
                  <Tabs.TabPane key={index} tab={item.title}>
                    <PrettyJson data={item.data} />
                  </Tabs.TabPane>
                ))}
              </Tabs>
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
