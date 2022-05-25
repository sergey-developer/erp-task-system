import { Col, Row, Space, Typography } from 'antd'
import React, { FC } from 'react'

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

  const changeWorkGroupFirstLineSupportCase: boolean =
    !hasWorkGroup && isFirstLineSupportRole

  const changeWorkGroupSeniorEngineerCase: boolean =
    hasWorkGroup && isSeniorEngineerRole

  const changeWorkGroupHeadOfDepartmentCase: boolean =
    hasWorkGroup && isHeadOfDepartmentRole

  return (
    <DetailContainerStyled>
      <Row justify='space-between'>
        <Col span={12}>
          <Space direction='vertical'>
            <Space size='large'>
              <Text type='secondary'>Рабочая группа</Text>

              {changeWorkGroupFirstLineSupportCase ? (
                <ButtonText type='link'>Перевести на II линию</ButtonText>
              ) : changeWorkGroupSeniorEngineerCase ||
                changeWorkGroupHeadOfDepartmentCase ? (
                <ButtonText type='link'>Вернуть на I линию</ButtonText>
              ) : null}
            </Space>

            {isEngineerRole || isFirstLineSupportRole ? (
              <Typography.Text>{workGroup?.name || '—'}</Typography.Text>
            ) : (
              (changeWorkGroupSeniorEngineerCase ||
                changeWorkGroupHeadOfDepartmentCase) && (
                <SelectStyled
                  defaultValue={workGroup?.id}
                  loading={workGroupListLoading}
                  bordered={false}
                >
                  {workGroupList.map(({ id, name }) => (
                    <SelectStyled.Option
                      key={id}
                      value={id}
                      disabled={id === workGroup?.id}
                    >
                      <SelectOptionWrapperStyled>
                        {name}
                      </SelectOptionWrapperStyled>
                    </SelectStyled.Option>
                  ))}
                </SelectStyled>
              )
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
