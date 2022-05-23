import { Col, Row, Select, Space, Typography } from 'antd'
import React, { FC } from 'react'

import ButtonText from 'components/Buttons/ButtonText'
import { TaskDetailsModel } from 'modules/tasks/taskView/models'
import { WorkGroupModel } from 'modules/workGroups/models'

import { DetailContainerStyled } from './styles'

const { Text } = Typography

type SecondaryDetailsProps = Pick<TaskDetailsModel, 'workGroup'> & {
  workGroupList: Array<WorkGroupModel>
}

const SecondaryDetails: FC<SecondaryDetailsProps> = ({
  workGroupList,
  workGroup,
}) => {
  console.log({ workGroupList, workGroup })
  return (
    <DetailContainerStyled>
      <Row justify='space-between'>
        <Col span={12}>
          <Space direction='vertical'>
            <Space size='large'>
              <Text type='secondary'>Рабочая группа</Text>

              <ButtonText type='link'>Перевести на II линию</ButtonText>
            </Space>

            <Select
              defaultValue={workGroup}
              options={workGroupList.map(({ id, name }) => ({
                label: name,
                value: id,
              }))}
            />
          </Space>
        </Col>

        <Col span={10}>
          <Space direction='vertical'>
            <Space size='large'>
              <Text type='secondary'>Исполнитель</Text>

              <ButtonText type='link'>Назначить на себя</ButtonText>
            </Space>

            <Text>Не назначен</Text>
          </Space>
        </Col>
      </Row>
    </DetailContainerStyled>
  )
}

export default SecondaryDetails
