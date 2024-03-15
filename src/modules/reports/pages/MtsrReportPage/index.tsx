import { Col, Flex, Row } from 'antd'
import moment from 'moment-timezone'
import { FC } from 'react'

import MtsrReportForm from 'modules/reports/components/MtsrReportForm'
import { MtsrReportFormFields } from 'modules/reports/components/MtsrReportForm/types'
import { useGetCustomerList } from 'modules/warehouse/hooks/customer'

const mtsrReportFormInitialValues: MtsrReportFormFields = {
  period: [moment().set('date', 1), moment()],
}

const MtsrReportPage: FC = () => {
  const { currentData: customers = [], isFetching: customersIsFetching } = useGetCustomerList()

  return (
    <Flex data-testid='mtsr-report-page' vertical gap='large'>
      <Row>
        <Col span={7}>
          <MtsrReportForm
            initialValues={mtsrReportFormInitialValues}
            customers={customers}
            customersIsLoading={customersIsFetching}
            onSubmit={async () => {}}
          />
        </Col>
      </Row>
    </Flex>
  )
}

export default MtsrReportPage
