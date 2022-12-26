import { Col, Row, Typography } from 'antd'
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint'
import React, { FC } from 'react'

import Expandable from 'components/Expandable'
import { MapPointIcon } from 'components/Icons'
import LabeledData from 'components/LabeledData'
import Space from 'components/Space'
import { TaskModel } from 'modules/task/models'
import useDebounceFn from 'shared/hooks/useDebounceFn'
import valueOr from 'shared/utils/common/valueOr'
import valueOrHyphen from 'shared/utils/common/valueOrHyphen'

import { ContentWrapperStyled } from './styles'
import { makeYandexMapLink } from './utils'

const { Text, Link } = Typography

export type AdditionalInfoProps = Pick<
  TaskModel,
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
> & {
  impact: string
  severity: string
  priority: string

  expanded: boolean
  onExpand: () => void

  supportGroup?: string
}

const AdditionalInfo: FC<AdditionalInfoProps> = ({
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
  onExpand,
}) => {
  const breakpoints = useBreakpoint()
  const handleExpand = useDebounceFn(onExpand, [onExpand])

  return (
    <Expandable
      data-testid='task-additional-info'
      btnText='Дополнительная информация'
      btnTextType='secondary'
      btnTextUnderline
      gap='middle'
      expanded={expanded}
      onClick={handleExpand}
    >
      <ContentWrapperStyled
        data-testid='additional-info-content'
        $breakpoints={breakpoints}
      >
        <Space direction='vertical' size={30} $block>
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
                    href={
                      !!address
                        ? makeYandexMapLink({ longitude, latitude })
                        : undefined
                    }
                    target='_blank'
                  >
                    <Text strong={!!address} underline={!!address}>
                      {valueOr(address, 'Отсутствует')}
                    </Text>
                  </Link>
                </Space>

                <LabeledData label='Наименование группы поддержки Х5'>
                  <Text strong>{valueOrHyphen(supportGroup)}</Text>
                </LabeledData>
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
                  <LabeledData label='Уровень 1'>
                    <Text>{productClassifier1}</Text>
                  </LabeledData>
                </Col>

                <Col span={8}>
                  <LabeledData label='Уровень 2'>
                    <Text>{productClassifier2}</Text>
                  </LabeledData>
                </Col>

                <Col span={8}>
                  <LabeledData label='Уровень 3'>
                    <Text>{productClassifier3}</Text>
                  </LabeledData>
                </Col>
              </Row>
            </Col>
          </Row>

          <Row align='bottom' justify='space-between'>
            <Col span={5}>
              <LabeledData label='Приоритет заявки' size={0}>
                <LabeledData label='Вес:' direction='horizontal'>
                  <Text>{valueOrHyphen(weight)}</Text>
                </LabeledData>
              </LabeledData>
            </Col>

            <Col span={18}>
              <Row gutter={20}>
                <Col span={8}>
                  <LabeledData label='Влияние'>
                    <Text>{impact}</Text>
                  </LabeledData>
                </Col>

                <Col span={8}>
                  <LabeledData label='Срочность'>
                    <Text>{severity}</Text>
                  </LabeledData>
                </Col>

                <Col span={8}>
                  <LabeledData label='Приоритет'>
                    <Text>{priority}</Text>
                  </LabeledData>
                </Col>
              </Row>
            </Col>
          </Row>
        </Space>
      </ContentWrapperStyled>
    </Expandable>
  )
}

export default AdditionalInfo
