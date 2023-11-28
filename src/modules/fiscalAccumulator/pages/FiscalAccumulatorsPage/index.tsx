import { useBoolean } from 'ahooks'
import { Col, Row } from 'antd'
import { FC } from 'react'

import FiscalAccumulatorTable from 'modules/fiscalAccumulator/components/FiscalAccumulatorTable'
import { useGetFiscalAccumulators } from 'modules/fiscalAccumulator/hooks'

import UpdateTasksButton from 'components/Buttons/UpdateTasksButton'

import {
  TasksUpdateVariantsEnum,
  tasksUpdateVariantsIntervals,
} from 'shared/constants/tasksUpdateVariants'

const FiscalAccumulatorsPage: FC = () => {
  const [autoUpdateEnabled, { toggle: toggleAutoUpdateEnabled }] = useBoolean(false)

  const {
    currentData: fiscalAccumulators = [],
    isFetching: fiscalAccumulatorsIsFetching,
    refetch: refetchFiscalAccumulators,
  } = useGetFiscalAccumulators({
    pollingInterval: autoUpdateEnabled
      ? tasksUpdateVariantsIntervals[TasksUpdateVariantsEnum.AutoUpdate1M]
      : undefined,
  })

  return (
    <Row>
      <Col span={24}>
        <Row justify='end'>
          <Col>
            <UpdateTasksButton
              onClick={refetchFiscalAccumulators}
              disabled={fiscalAccumulatorsIsFetching}
              onAutoUpdate={toggleAutoUpdateEnabled}
            />
          </Col>
        </Row>
      </Col>

      <Col span={24}>
        <FiscalAccumulatorTable
          loading={fiscalAccumulatorsIsFetching}
          dataSource={fiscalAccumulators}
        />
      </Col>
    </Row>
  )
}

export default FiscalAccumulatorsPage
