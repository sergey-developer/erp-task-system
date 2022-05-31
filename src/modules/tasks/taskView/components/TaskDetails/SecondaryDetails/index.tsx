import { Col, Row, Typography } from 'antd'
import React, { FC, useMemo } from 'react'

import ButtonText from 'components/Buttons/ButtonText'
import Space from 'components/Space'
import useUserInfo from 'modules/auth/hooks/useUserInfo'
import { TaskDetailsModel } from 'modules/tasks/taskView/models'
import useUserRole from 'modules/user/hooks/useUserRole'
import getUserFullName from 'modules/user/utils/getUserFullName'
import { WorkGroupModel } from 'modules/workGroups/models'

import Performer from '../Performer'
import { DetailContainerStyled } from '../styles'
import { SelectStyled } from './styles'

const { Text } = Typography

type SecondaryDetailsProps = Pick<TaskDetailsModel, 'workGroup'> &
  Partial<Pick<TaskDetailsModel, 'assignee' | 'status'>> & {
    workGroupList: Array<WorkGroupModel>
    workGroupListLoading: boolean
  }

const SecondaryDetails: FC<SecondaryDetailsProps> = ({
  status,
  assignee,
  workGroup,
  workGroupList,
  workGroupListLoading,
}) => {
  const userInfo = useUserInfo()
  const {
    isFirstLineSupportRole,
    isEngineerRole,
    isSeniorEngineerRole,
    isHeadOfDepartmentRole,
  } = useUserRole()

  const hasWorkGroup: boolean = !!workGroup

  const firstLineSupportNotHasWorkGroup: boolean =
    !hasWorkGroup && isFirstLineSupportRole

  const seniorEngineerHasWorkGroup: boolean =
    hasWorkGroup && isSeniorEngineerRole

  const headOfDepartmentHasWorkGroup: boolean =
    hasWorkGroup && isHeadOfDepartmentRole

  const workGroupMembers = useMemo(() => {
    const workGroupFromList = workGroupList.find(
      ({ id }) => id === workGroup?.id,
    )
    return workGroupFromList ? workGroupFromList.members : []
  }, [workGroup?.id, workGroupList])

  const renderChangeTaskLineButton = () => {
    return firstLineSupportNotHasWorkGroup ? (
      <ButtonText type='link'>Перевести на II линию</ButtonText>
    ) : seniorEngineerHasWorkGroup || headOfDepartmentHasWorkGroup ? (
      <ButtonText type='link'>Вернуть на I линию</ButtonText>
    ) : null
  }

  return (
    <DetailContainerStyled>
      <Row justify='space-between'>
        <Col span={12}>
          <Space direction='vertical'>
            <Space size='large'>
              <Text type='secondary'>Рабочая группа</Text>

              {renderChangeTaskLineButton()}
            </Space>

            {isEngineerRole || isFirstLineSupportRole ? (
              <Text>{workGroup?.name || 'I линия поддержки'}</Text>
            ) : (
              (seniorEngineerHasWorkGroup || headOfDepartmentHasWorkGroup) && (
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
                      <Text className='break-text'>{name}</Text>
                    </SelectStyled.Option>
                  ))}
                </SelectStyled>
              )
            )}
          </Space>
        </Col>

        <Col span={10}>
          <Space direction='vertical' $fullWidth>
            <Space size='large'>
              <Text type='secondary'>Исполнитель</Text>

              {userInfo && (
                <ButtonText type='link'>
                  {assignee?.id === userInfo.id
                    ? 'Отказаться от заявки'
                    : 'Назначить на себя'}
                </ButtonText>
              )}
            </Space>

            {isEngineerRole || isFirstLineSupportRole ? (
              assignee ? (
                <Performer
                  name={getUserFullName(assignee)}
                  status={status}
                  assignee={assignee}
                />
              ) : (
                <Text>Не назначен</Text>
              )
            ) : (
              (seniorEngineerHasWorkGroup || headOfDepartmentHasWorkGroup) && (
                <SelectStyled
                  defaultValue={assignee?.id}
                  loading={workGroupListLoading}
                  bordered={false}
                  placeholder={assignee ? null : 'Не назначен'}
                >
                  {workGroupMembers.map(({ id, fullName }) => (
                    <SelectStyled.Option
                      key={id}
                      value={id}
                      disabled={id === assignee?.id}
                    >
                      <Performer
                        name={fullName}
                        status={status}
                        assignee={assignee}
                      />
                    </SelectStyled.Option>
                  ))}
                </SelectStyled>
              )
            )}
          </Space>
        </Col>
      </Row>
    </DetailContainerStyled>
  )
}

export default SecondaryDetails
