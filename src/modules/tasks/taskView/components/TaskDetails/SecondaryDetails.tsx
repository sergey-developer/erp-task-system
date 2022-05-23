import { Col, Row, Space, Typography } from 'antd'
import React, { FC, useMemo } from 'react'

import ButtonText from 'components/Buttons/ButtonText'
import { TaskDetailsModel } from 'modules/tasks/taskView/models'
import { WorkGroupModel } from 'modules/workGroups/models'

import {
  DetailContainerStyled,
  SelectOptionWrapperStyled,
  SelectStyled,
} from './styles'

const { Text } = Typography

type SecondaryDetailsProps = Pick<TaskDetailsModel, 'workGroup'> & {
  workGroupList: Array<WorkGroupModel>
  workGroupListLoading: boolean
}

const SecondaryDetails: FC<SecondaryDetailsProps> = ({
  workGroup,
  workGroupList,
  workGroupListLoading,
}) => {
  const workGroupOptions = useMemo(() => {
    return workGroupList.map(({ id, name }) => (
      <SelectStyled.Option key={id} value={id}>
        <SelectOptionWrapperStyled>{name}</SelectOptionWrapperStyled>
      </SelectStyled.Option>
    ))
  }, [workGroupList])

  return (
    <DetailContainerStyled>
      <Row justify='space-between'>
        <Col span={12}>
          <Space direction='vertical'>
            <Space size='large'>
              <Text type='secondary'>Рабочая группа</Text>

              <ButtonText type='link'>Перевести на II линию</ButtonText>
            </Space>

            <SelectStyled
              defaultValue={workGroup}
              loading={workGroupListLoading}
              bordered={false}
            >
              {workGroupOptions}
            </SelectStyled>
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
