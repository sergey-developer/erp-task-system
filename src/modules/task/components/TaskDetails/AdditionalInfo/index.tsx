import { Col, Row, Select, Typography } from 'antd'
import React, { FC } from 'react'

import { TaskModel } from 'modules/task/models'
import { MatchedUserPermissions } from 'modules/user/utils'
import EditableField from 'modules/warehouse/components/RelocationTaskDetails/EditableField'
import { WorkTypesModel } from 'modules/warehouse/models'

import Expandable from 'components/Expandable'
import { MapPointIcon } from 'components/Icons'
import Label from 'components/Label'
import Space from 'components/Space'

import { idAndTitleSelectFieldNames } from 'shared/constants/selectField'
import { useDebounceFn } from 'shared/hooks/useDebounceFn'
import { IdType } from 'shared/types/common'
import { EmptyFn } from 'shared/types/utils'
import { valueOrHyphen } from 'shared/utils/common'

import { useTaskStatus } from '../../../hooks/task'
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
> & {
  permissions: MatchedUserPermissions
  impact: string
  severity: string
  priority: string

  expanded: boolean
  onExpand: EmptyFn

  workTypes: WorkTypesModel
  workTypesIsLoading: boolean

  toggleEditWorkType: () => void
  onSaveWorkType: (workTypeId: IdType) => Promise<void>
  saveWorkTypeIsLoading: boolean

  supportGroup?: string
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
  expanded,
  workGroup,
  workType,
  workTypes,
  workTypesIsLoading,
  toggleEditWorkType,
  onSaveWorkType,
  saveWorkTypeIsLoading,
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
        <EditableField
          data-testid='work-type'
          leftColProps={{ span: 6 }}
          label='Тип работ'
          value={workType?.id}
          displayValue={workType?.title}
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

        <Row justify='space-between'>
          <Col span={11}>
            <Space direction='vertical' $block>
              <Row justify='space-between'>
                <Col span={11}>
                  <Text type='secondary'>Компания</Text>
                </Col>

                <Col span={11}>
                  <Text strong>{valueOrHyphen(company)}</Text>
                </Col>
              </Row>

              <Row justify='space-between'>
                <Col span={11}>
                  <Text type='secondary'>Формат магазина</Text>
                </Col>

                <Col span={11}>
                  <Text strong>{valueOrHyphen(contactType)}</Text>
                </Col>
              </Row>

              <Row justify='space-between'>
                <Col span={11}>
                  <Text type='secondary'>SAP ID</Text>
                </Col>

                <Col span={11}>
                  <Text strong>{valueOrHyphen(sapId)}</Text>
                </Col>
              </Row>

              <Row justify='space-between'>
                <Col span={11}>
                  <Text type='secondary'>Email</Text>
                </Col>

                <Col span={11}>
                  <Text strong>{valueOrHyphen(email)}</Text>
                </Col>
              </Row>
            </Space>
          </Col>

          <Col span={11}>
            <Space direction='vertical' size='large'>
              <Space align='start' data-testid='additional-info-address'>
                <MapPointIcon $size='large' />

                <Link
                  href={!!address ? makeYandexMapLink({ longitude, latitude }) : undefined}
                  target='_blank'
                >
                  <Text strong={!!address} underline={!!address}>
                    {address || 'Не определено'}
                  </Text>
                </Link>
              </Space>

              <Label label='Наименование группы поддержки Х5'>
                <Text strong>{valueOrHyphen(supportGroup)}</Text>
              </Label>
            </Space>
          </Col>
        </Row>

        <Row align='middle' justify='space-between'>
          <Col span={5}>
            <Text type='secondary'>Категория заявки</Text>
          </Col>

          <Col span={18}>
            <Row gutter={20}>
              <Col span={8}>
                <Label label='Уровень 1'>
                  <Text>{productClassifier1}</Text>
                </Label>
              </Col>

              <Col span={8}>
                <Label label='Уровень 2'>
                  <Text>{productClassifier2}</Text>
                </Label>
              </Col>

              <Col span={8}>
                <Label label='Уровень 3'>
                  <Text>{productClassifier3}</Text>
                </Label>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row align='bottom' justify='space-between'>
          <Col span={5}>
            <Label label='Приоритет заявки' size={0}>
              <Label label='Вес:' direction='horizontal'>
                <Text>{valueOrHyphen(weight)}</Text>
              </Label>
            </Label>
          </Col>

          <Col span={18}>
            <Row gutter={20}>
              <Col span={8}>
                <Label label='Влияние'>
                  <Text>{valueOrHyphen(impact)}</Text>
                </Label>
              </Col>

              <Col span={8}>
                <Label label='Срочность'>
                  <Text>{valueOrHyphen(severity)}</Text>
                </Label>
              </Col>

              <Col span={8}>
                <Label label='Приоритет'>
                  <Text>{valueOrHyphen(priority)}</Text>
                </Label>
              </Col>
            </Row>
          </Col>
        </Row>
      </Space>
    </Expandable>
  )
}

export default AdditionalInfo
