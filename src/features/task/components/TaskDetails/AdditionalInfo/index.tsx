import { Button, Col, Flex, Row, Select, Typography } from 'antd'
import React, { FC } from 'react'

import { useTaskStatus } from 'features/task/hooks/task'
import { TaskModel } from 'features/task/models'
import { MatchedUserPermissions } from 'features/user/types'
import EditableField from 'features/warehouse/components/RelocationTaskDetails/EditableField'
import ReadonlyField from 'features/warehouse/components/RelocationTaskDetails/ReadonlyField'
import { WorkTypesModel } from 'features/warehouse/models'

import Expandable from 'components/Expandable'
import { MapPointIcon } from 'components/Icons'
import Label from 'components/Label'
import Space from 'components/Space'

import { idAndTitleSelectFieldNames } from 'shared/constants/selectField'
import { useDebounceFn } from 'shared/catalogs/hooks/useDebounceFn'
import { IdType } from 'shared/types/common'
import { EmptyFn } from 'shared/types/utils'
import { valueOr } from 'shared/utils/common'

import { makeYandexMapLink } from './utils'

const { Text, Link } = Typography

export type AdditionalInfoProps = Pick<
  TaskModel,
  | 'status'
  | 'weight'
  | 'address'
  | 'company'
  | 'email'
  | 'sapId'
  | 'contactType'
  | 'productClassifier1'
  | 'productClassifier2'
  | 'productClassifier3'
  | 'latitude'
  | 'longitude'
  | 'workType'
  | 'workGroup'
  | 'parentTask'
> & {
  permissions: MatchedUserPermissions

  expanded: boolean
  onExpand: EmptyFn

  workTypes: WorkTypesModel
  workTypesIsLoading: boolean

  toggleEditWorkType: () => void
  onSaveWorkType: (workTypeId: IdType) => Promise<void>
  saveWorkTypeIsLoading: boolean

  supportGroup?: string
  impact?: string
  severity?: string
  priority?: string

  openParentTask?: EmptyFn
}

const AdditionalInfo: FC<AdditionalInfoProps> = ({
  permissions,
  status,
  email,
  sapId,
  weight,
  company,
  address,
  severity,
  priority,
  impact,
  contactType,
  supportGroup,
  productClassifier1,
  productClassifier2,
  productClassifier3,
  latitude,
  longitude,
  workGroup,

  parentTask,
  openParentTask,

  workType,
  workTypes,
  workTypesIsLoading,
  toggleEditWorkType,
  onSaveWorkType,
  saveWorkTypeIsLoading,

  expanded,
  onExpand,
}) => {
  const handleExpand = useDebounceFn(onExpand, [onExpand])
  const taskStatus = useTaskStatus(status)

  return (
    <Expandable
      data-testid='task-details-additional-info'
      btnText='Дополнительная информация'
      btnTextType='secondary'
      btnTextUnderline
      gap='middle'
      expanded={expanded}
      onClick={handleExpand}
    >
      <Space data-testid='additional-info-content' direction='vertical' size={30} $block>
        <Flex vertical gap='small'>
          <EditableField
            data-testid='work-type'
            leftColProps={{ span: 6 }}
            label='Тип работ'
            value={workType?.id}
            displayValue={workType?.title}
            forceDisplayValue
            renderEditable={({ value, onChange }) => (
              <Select
                popupMatchSelectWidth={200}
                placeholder='Выберите из списка'
                value={value}
                onChange={(value) => onChange(value)}
                options={workTypes}
                disabled={workTypesIsLoading}
                loading={workTypesIsLoading}
                fieldNames={idAndTitleSelectFieldNames}
              />
            )}
            editButtonHidden={
              !(
                permissions.classificationOfWorkTypes &&
                !!workGroup &&
                !taskStatus.isClosed &&
                !taskStatus.isCompleted
              )
            }
            onEdit={toggleEditWorkType}
            onCancel={toggleEditWorkType}
            onSave={onSaveWorkType}
            isLoading={saveWorkTypeIsLoading}
          />

          {parentTask?.recordId && (
            <ReadonlyField
              leftColProps={{ span: 6 }}
              rightColProps={{ span: 16 }}
              label='Родительская заявка'
              value={
                <Button type='link' onClick={openParentTask}>
                  {parentTask.recordId}
                </Button>
              }
            />
          )}

          <Row justify='space-between'>
            <Col span={11}>
              <Space direction='vertical' $block>
                {parentTask?.recordId && (
                  <ReadonlyField
                    rowProps={{ justify: 'space-between' }}
                    leftColProps={{ span: 11 }}
                    rightColProps={{ span: 11 }}
                    label='Компания'
                    value={<Text strong>{valueOr(company)}</Text>}
                  />
                )}

                {contactType && (
                  <ReadonlyField
                    rowProps={{ justify: 'space-between' }}
                    leftColProps={{ span: 11 }}
                    rightColProps={{ span: 11 }}
                    label='Формат магазина'
                    value={<Text strong>{contactType}</Text>}
                  />
                )}

                {sapId && (
                  <ReadonlyField
                    rowProps={{ justify: 'space-between' }}
                    leftColProps={{ span: 11 }}
                    rightColProps={{ span: 11 }}
                    label='SAP ID'
                    value={<Text strong>{sapId}</Text>}
                  />
                )}

                {email && (
                  <ReadonlyField
                    rowProps={{ justify: 'space-between' }}
                    leftColProps={{ span: 11 }}
                    rightColProps={{ span: 11 }}
                    label='Email'
                    value={<Text strong>{email}</Text>}
                  />
                )}
              </Space>
            </Col>

            {(address || supportGroup) && (
              <Col span={11}>
                <Space direction='vertical' size='large'>
                  {address && (
                    <Space align='start' data-testid='additional-info-address'>
                      <MapPointIcon $size='large' />

                      <Link
                        href={
                          longitude && latitude
                            ? makeYandexMapLink({ longitude, latitude })
                            : undefined
                        }
                        target='_blank'
                      >
                        <Text strong underline>
                          {address}
                        </Text>
                      </Link>
                    </Space>
                  )}

                  {supportGroup && (
                    <Label label='Наименование группы поддержки Х5'>
                      <Text strong>{supportGroup}</Text>
                    </Label>
                  )}
                </Space>
              </Col>
            )}
          </Row>
        </Flex>

        {(productClassifier1 || productClassifier2 || productClassifier3) && (
          <Row align='middle' justify='space-between'>
            <Col span={5}>
              <Text type='secondary'>Категория заявки</Text>
            </Col>

            <Col span={18}>
              <Row gutter={20}>
                {productClassifier1 && (
                  <Col span={8}>
                    <Label label='Уровень 1'>
                      <Text>{productClassifier1}</Text>
                    </Label>
                  </Col>
                )}

                {productClassifier2 && (
                  <Col span={8}>
                    <Label label='Уровень 2'>
                      <Text>{productClassifier2}</Text>
                    </Label>
                  </Col>
                )}

                {productClassifier3 && (
                  <Col span={8}>
                    <Label label='Уровень 3'>
                      <Text>{productClassifier3}</Text>
                    </Label>
                  </Col>
                )}
              </Row>
            </Col>
          </Row>
        )}

        {(weight || impact || severity) && (
          <Row align='bottom' justify='space-between'>
            {weight && (
              <Col span={5}>
                <Label label='Приоритет заявки' size={0}>
                  <Label label='Вес:' direction='horizontal'>
                    <Text>{weight}</Text>
                  </Label>
                </Label>
              </Col>
            )}

            {(impact || severity || priority) && (
              <Col span={18}>
                <Row gutter={20}>
                  {impact && (
                    <Col span={8}>
                      <Label label='Влияние'>
                        <Text>{impact}</Text>
                      </Label>
                    </Col>
                  )}

                  {severity && (
                    <Col span={8}>
                      <Label label='Срочность'>
                        <Text>{severity}</Text>
                      </Label>
                    </Col>
                  )}

                  {priority && (
                    <Col span={8}>
                      <Label label='Приоритет'>
                        <Text>{priority}</Text>
                      </Label>
                    </Col>
                  )}
                </Row>
              </Col>
            )}
          </Row>
        )}
      </Space>
    </Expandable>
  )
}

export default AdditionalInfo
