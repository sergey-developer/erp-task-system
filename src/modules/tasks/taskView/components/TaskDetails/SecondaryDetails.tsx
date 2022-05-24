import { Col, Row, Space, Typography } from 'antd'
import React, { FC, useMemo } from 'react'

import ButtonText from 'components/Buttons/ButtonText'
import { TaskDetailsModel } from 'modules/tasks/taskView/models'
import useUserRole from 'modules/user/hooks/useUserRole'
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
  const {
    isFirstLineSupportRole,
    isEngineerRole,
    isSeniorEngineerRole,
    isHeadOfDepartmentRole,
  } = useUserRole()

  const hasWorkGroup: boolean = !!workGroup

  const workGroupFirstLineSupportCase: boolean =
    !hasWorkGroup && isFirstLineSupportRole

  const workGroupEngineerCase: boolean = isEngineerRole

  const workGroupSeniorEngineerCase: boolean =
    hasWorkGroup && isSeniorEngineerRole

  const workGroupHeadOfDepartmentCase: boolean =
    hasWorkGroup && isHeadOfDepartmentRole

  const workGroupOptions = useMemo(() => {
    return workGroupList.map(({ id, name }) => (
      <SelectStyled.Option key={id} value={id} disabled={id === workGroup}>
        <SelectOptionWrapperStyled>{name}</SelectOptionWrapperStyled>
      </SelectStyled.Option>
    ))
  }, [workGroup, workGroupList])

  const workGroupFromList = useMemo(
    () => workGroupList.find(({ id }) => id === workGroup),
    [workGroupList, workGroup],
  )

  return (
    <DetailContainerStyled>
      <Row justify='space-between'>
        <Col span={12}>
          <Space direction='vertical'>
            <Space size='large'>
              <Text type='secondary'>Рабочая группа</Text>

              {workGroupFirstLineSupportCase ? (
                <ButtonText type='link'>Перевести на II линию</ButtonText>
              ) : workGroupSeniorEngineerCase ||
                workGroupHeadOfDepartmentCase ? (
                <ButtonText type='link'>Вернуть на I линию</ButtonText>
              ) : null}
            </Space>

            {(workGroupFirstLineSupportCase || workGroupEngineerCase) &&
            workGroupFromList ? (
              <Typography.Text>{workGroupFromList.name}</Typography.Text>
            ) : (
              <SelectStyled
                defaultValue={workGroup}
                loading={workGroupListLoading}
                bordered={false}
              >
                {workGroupOptions}
              </SelectStyled>
            )}
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
