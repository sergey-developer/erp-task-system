import { Button, Col, Row, Typography } from 'antd'
import React, { FC } from 'react'

import { DownIcon, MapPointIcon, UpIcon } from 'components/Icons'
import LabeledData from 'components/LabeledData'
import Space from 'components/Space'
import { TaskDetailsModel } from 'modules/task/features/TaskView/models'
import useDebounceFn from 'shared/hooks/useDebounceFn'
import valueOr from 'shared/utils/common/valueOr'
import valueOrHyphen from 'shared/utils/common/valueOrHyphen'

import DetailsWrapper from '../DetailsWrapper'
import { ContainerStyled } from './styles'
import { makeYandexMapLink } from './utils'

const { Text, Link } = Typography

export type AdditionalInfoProps = Pick<
  TaskDetailsModel,
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
  const handleExpand = useDebounceFn(onExpand)

  return (
    <ContainerStyled $hasMarginBottom={!expanded}>
      <Space direction='vertical' size='middle' $block>
        <DetailsWrapper disablePadding='vertical'>
          <Button type='text' onClick={handleExpand}>
            <Text type='secondary' underline>
              Дополнительная информация
            </Text>

            {expanded ? <UpIcon $size='small' /> : <DownIcon $size='small' />}
          </Button>
        </DetailsWrapper>

        {expanded && (
          <DetailsWrapper
            data-testid='additional-info-content'
            bgColor='lotion'
          >
            <Space direction='vertical' size={30} $block>
              <Row gutter={60}>
                <Col span={12}>
                  <Space direction='vertical' $block>
                    <Row>
                      <Col span={12}>
                        <Text type='secondary'>Компания</Text>
                      </Col>

                      <Col span={12}>
                        <Text strong>{valueOrHyphen(company)}</Text>
                      </Col>
                    </Row>

                    <Row>
                      <Col span={12}>
                        <Text type='secondary'>Формат магазина</Text>
                      </Col>

                      <Col span={12}>
                        <Text strong>{valueOrHyphen(contactType)}</Text>
                      </Col>
                    </Row>

                    <Row>
                      <Col span={12}>
                        <Text type='secondary'>SAP ID</Text>
                      </Col>

                      <Col span={12}>
                        <Text strong>{valueOrHyphen(sapId)}</Text>
                      </Col>
                    </Row>

                    <Row>
                      <Col span={12}>
                        <Text type='secondary'>Email</Text>
                      </Col>

                      <Col span={12}>
                        <Text strong>{valueOrHyphen(email)}</Text>
                      </Col>
                    </Row>
                  </Space>
                </Col>

                <Col span={12}>
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
                </Col>
              </Row>

              <LabeledData label='Наименование группы поддержки Х5'>
                <Text strong>{valueOrHyphen(supportGroup)}</Text>
              </LabeledData>

              <Row align='middle'>
                <Col span={6}>
                  <Text type='secondary'>Категория заявки</Text>
                </Col>

                <Col span={18}>
                  <Row gutter={20}>
                    <Col span={8}>
                      <LabeledData label='Уровень 1' block>
                        <Text>{productClassifier1}</Text>
                      </LabeledData>
                    </Col>

                    <Col span={8}>
                      <LabeledData label='Уровень 2' block>
                        <Text>{productClassifier2}</Text>
                      </LabeledData>
                    </Col>

                    <Col span={8}>
                      <LabeledData label='Уровень 3' block>
                        <Text>{productClassifier3}</Text>
                      </LabeledData>
                    </Col>
                  </Row>
                </Col>
              </Row>

              <Row align='bottom'>
                <Col span={6}>
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
          </DetailsWrapper>
        )}
      </Space>
    </ContainerStyled>
  )
}

export default AdditionalInfo
