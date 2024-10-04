import { Button, Col, Flex, Row, Select, Tabs, Typography } from 'antd'
import React, { FC } from 'react'
import { useLocation, useParams } from 'react-router-dom'

import { useAuthUser } from 'modules/auth/hooks'
import ChangeInfrastructureOrdersFormsTab from 'modules/infrastructures/components/ChangeInfrastructureOrdersFormsTab'
import {
  infrastructureStatusDict,
  InfrastructureStatusEnum,
  infrastructureStatusOptions,
} from 'modules/infrastructures/constants'
import {
  useGetInfrastructure,
  useUpdateInfrastructure,
  useUpdateInfrastructureStatus,
} from 'modules/infrastructures/hooks'
import TaskAssignee from 'modules/task/components/TaskAssignee'
import { UserPermissionsEnum } from 'modules/user/constants'
import { useUserPermissions } from 'modules/user/hooks'
import EditableField from 'modules/warehouse/components/RelocationTaskDetails/EditableField'
import ReadonlyField from 'modules/warehouse/components/RelocationTaskDetails/ReadonlyField'

import GoBackButton from 'components/Buttons/GoBackButton'
import LoadingArea from 'components/LoadingArea'
import Space from 'components/Space'

import { NO_ASSIGNEE_TEXT } from 'shared/constants/common'
import { extractLocationState, valueOr } from 'shared/utils/common'
import { formatDate } from 'shared/utils/date'

import { changeInfrastructurePageTabNames, ChangeInfrastructurePageTabsEnum } from './constants'
import { ChangeInfrastructurePageLocationState } from './types'

const { Title, Text } = Typography

const ChangeInfrastructurePage: FC = () => {
  const location = useLocation()
  const locationState = extractLocationState<ChangeInfrastructurePageLocationState>(location)
  const task = locationState?.task

  const params = useParams<'id'>()
  const infrastructureId = Number(params?.id) || undefined

  const authUser = useAuthUser()
  const permissions = useUserPermissions([UserPermissionsEnum.InfrastructureProjectLeading])

  const { currentData: infrastructure, isFetching: infrastructureIsFetching } =
    useGetInfrastructure({ infrastructureId: infrastructureId! }, { skip: !infrastructureId })

  const [updateInfrastructureMutation, { isLoading: updateInfrastructureIsLoading }] =
    useUpdateInfrastructure()

  const onUpdateInfrastructure = async () => {
    if (!authUser || !infrastructureId) {
      console.error('Update infrastructure. Required data not supplied:', {
        infrastructureId,
        authUser,
      })
      return
    }

    await updateInfrastructureMutation({ infrastructureId, manager: authUser.id })
  }

  const [
    updateInfrastructureStatusMutation,
    { isLoading: updateInfrastructureStatusIsLoading, data: updateInfrastructureStatusResponse },
  ] = useUpdateInfrastructureStatus()

  const onUpdateInfrastructureStatus = async (status: InfrastructureStatusEnum) => {
    if (!authUser || !infrastructureId) {
      console.error('Update infrastructure status. Required data not supplied:', {
        infrastructureId,
      })
      return
    }

    await updateInfrastructureStatusMutation({ infrastructureProject: infrastructureId, status })
  }

  return (
    <div data-testid='change-infrastructure-page'>
      <LoadingArea data-testid='infrastructure-loading' isLoading={infrastructureIsFetching}>
        {infrastructure && (
          <Space $block direction='vertical' size='large'>
            <Space $block direction='vertical' size='large'>
              <Flex gap='small' align='end'>
                <Title level={4}>Изменение инфраструктуры по заявке</Title>

                {task?.recordId && (
                  <Button type='link' size='large'>
                    {task.recordId}
                  </Button>
                )}
              </Flex>

              <Row>
                <Col span={10}>
                  <Space $block direction='vertical' size='middle'>
                    <ReadonlyField
                      data-testid='executor'
                      rowProps={{ align: 'top' }}
                      label='Исполнитель'
                      value={valueOr(
                        task?.assignee,
                        (value) => (
                          <TaskAssignee
                            {...value}
                            showAvatar={false}
                            showPhone={false}
                            hasPopover
                          />
                        ),
                        NO_ASSIGNEE_TEXT,
                      )}
                    />

                    <Flex data-testid='manager' vertical gap='small'>
                      <ReadonlyField
                        rowProps={{ align: 'top' }}
                        label='Менеджер по сопровождению'
                        value={valueOr(
                          infrastructure?.manager,
                          (value) => (
                            <TaskAssignee
                              {...value}
                              showAvatar={false}
                              showPhone={false}
                              hasPopover
                            />
                          ),
                          NO_ASSIGNEE_TEXT,
                        )}
                      />

                      {permissions.infrastructureProjectLeading && (
                        <Row>
                          <Col span={8}></Col>
                          <Col span={16}>
                            <Button
                              type='link'
                              loading={updateInfrastructureIsLoading}
                              onClick={onUpdateInfrastructure}
                            >
                              Назначить на себя
                            </Button>
                          </Col>
                        </Row>
                      )}
                    </Flex>

                    <EditableField
                      data-testid='status'
                      rowProps={{ align: 'top' }}
                      label='Статус'
                      value={
                        updateInfrastructureStatusResponse?.status || infrastructure.status?.status
                      }
                      forceDisplayValue
                      displayValue={
                        updateInfrastructureStatusResponse?.status || infrastructure.status
                          ? (editButton) => (
                              <Space direction='vertical' size={0}>
                                <Space>
                                  <Text>
                                    {updateInfrastructureStatusResponse?.status
                                      ? infrastructureStatusDict[
                                          updateInfrastructureStatusResponse.status
                                        ]
                                      : infrastructure.status
                                      ? infrastructureStatusDict[infrastructure.status.status]
                                      : null}
                                  </Text>

                                  {editButton}
                                </Space>

                                {infrastructure.status && (
                                  <Text type='secondary'>
                                    Установлен: {formatDate(infrastructure.status.createdAt)}
                                  </Text>
                                )}
                              </Space>
                            )
                          : null
                      }
                      renderEditable={({ value, onChange }) => (
                        <Select
                          allowClear
                          popupMatchSelectWidth={200}
                          value={value}
                          onChange={(value) => onChange(value)}
                          options={infrastructureStatusOptions}
                        />
                      )}
                      editButtonHidden={infrastructure.manager?.id !== authUser?.id}
                      onSave={onUpdateInfrastructureStatus}
                      isLoading={updateInfrastructureStatusIsLoading}
                    />

                    {/*<ReadonlyField*/}
                    {/*  data-testid='status'*/}
                    {/*  rowProps={{ align: 'top' }}*/}
                    {/*  label='Статус'*/}
                    {/*  value={valueOr(infrastructure.status, (value) => (*/}
                    {/*    <Flex vertical gap='small'>*/}
                    {/*      <Text>{infrastructureStatusDict[value.status]}</Text>*/}

                    {/*      <Text type='secondary'>Установлен: {formatDate(value.createdAt)}</Text>*/}
                    {/*    </Flex>*/}
                    {/*  ))}*/}
                    {/*/>*/}
                  </Space>
                </Col>

                <Col span={11}></Col>

                <Col span={3}>
                  <Flex justify='end'>
                    <GoBackButton text='Вернуться' />
                  </Flex>
                </Col>
              </Row>
            </Space>

            <Tabs
              type='card'
              destroyInactiveTabPane
              defaultActiveKey={ChangeInfrastructurePageTabsEnum.OrderForm}
              items={[
                {
                  key: ChangeInfrastructurePageTabsEnum.OrderForm,
                  label:
                    changeInfrastructurePageTabNames[ChangeInfrastructurePageTabsEnum.OrderForm],
                  children: (
                    <ChangeInfrastructureOrdersFormsTab
                      infrastructureId={infrastructure.id}
                      manager={infrastructure.manager}
                    />
                  ),
                },
              ]}
            />
          </Space>
        )}
      </LoadingArea>
    </div>
  )
}

export default ChangeInfrastructurePage
