import { Col, Input, Row, Tabs, Typography } from 'antd'
import { FC, useState } from 'react'

import LoadingArea from 'components/LoadingArea'
import Space from 'components/Space'

import { useGetTaskMonitoringQuery } from '../../services/monitoringApi.service'
import { JsonStyled } from './styles'

const { Search } = Input
const { Text } = Typography

const TaskMonitoringPage: FC = () => {
  const [recordId, setRecordId] = useState<string>('')

  const { isFetching, data: monitoringData = [] } = useGetTaskMonitoringQuery(
    recordId,
    { skip: !recordId },
  )

  // const monitoringData: Array<TaskMonitoringModel> = [
  //   {
  //     title: 'title 1',
  //     data: JSON.stringify(
  //       [
  //         'matter',
  //         {
  //           pale: 'proud',
  //           involved: 1127412192.4335465,
  //           gun: -1848528504.1972694,
  //           change: -1812139763,
  //           image: 'crew',
  //           smallest: 'mean',
  //           result: -162817004.16204166,
  //           family: {
  //             right: {
  //               human: -126604212.5184555,
  //               eaten: 640029939,
  //               airplane: 'shoot',
  //               variety: 'habit',
  //               court: [
  //                 'trace',
  //                 'carefully',
  //                 'yellow',
  //                 1360493437,
  //                 -2105984442,
  //                 592566906.3492765,
  //                 1289115976,
  //                 -2000366234,
  //                 'sharp',
  //                 1672669890.679285,
  //               ],
  //               pain: 'against',
  //               massage: 1995548497,
  //               split: -2077081066,
  //               pipe: 2023432329.7525501,
  //               differ: 'would',
  //             },
  //             death: 'stock',
  //             enemy: -901950072,
  //             unknown: 'ask',
  //             gold: 432785922.1601896,
  //             every: -560483167,
  //             customs: 'plant',
  //             tired: 'society',
  //             charge: 'rhythm',
  //             married: 'dish',
  //           },
  //           snow: 'aid',
  //           when: 915996921,
  //         },
  //         'pony',
  //         1802163376,
  //         -439495331.9141774,
  //         664080519,
  //         -849799028,
  //         'who',
  //         1439948114,
  //         'construction',
  //       ],
  //       null,
  //       2,
  //     ),
  //   },
  // ]

  return (
    <Space direction='vertical' size='large'>
      <Row justify='center'>
        <Col span={5}>
          <Search
            placeholder='Введите значение'
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
                    <JsonStyled>{item.data}</JsonStyled>
                  </Tabs.TabPane>
                ))}
              </Tabs>
            ) : (
              <Text>Данных нет</Text>
            )}
          </LoadingArea>
        </Col>
      </Row>
    </Space>
  )
}

export default TaskMonitoringPage
