import { useBoolean } from 'ahooks'
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

const { Text } = Typography

type AdditionalInfoProps = Pick<
  TaskDetailsModel,
  | 'initialImpact'
  | 'severity'
  | 'priorityCode'
  | 'weight'
  | 'address'
  | 'company'
  | 'email'
  | 'sapId'
  | 'contactType'
  | 'supportGroup'
  | 'productClassifier1'
  | 'productClassifier2'
  | 'productClassifier3'
> & {
  onExpand?: (expanded: boolean) => void
  defaultExpanded?: boolean
}

const AdditionalInfo: FC<AdditionalInfoProps> = ({
  email,
  sapId,
  weight,
  company,
  address,
  severity,
  priorityCode,
  contactType,
  supportGroup,
  initialImpact,
  productClassifier1,
  productClassifier2,
  productClassifier3,
  onExpand,
  defaultExpanded,
}) => {
  const [expanded, { toggle: toggleExpand }] = useBoolean(defaultExpanded)

  const handleExpand = useDebounceFn(() => {
    toggleExpand()
    onExpand && onExpand(!expanded)
  }, [onExpand])

  return (
    <ContainerStyled $hasMarginBottom={!expanded}>
      <Space direction='vertical' size='middle' $block>
        <DetailsWrapper disablePadding='vertical'>
          <Button data-testid='btn-expand' type='text' onClick={handleExpand}>
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
                  <Space align='start'>
                    <MapPointIcon $size='large' />

                    <Text strong={!!address} underline={!!address}>
                      {valueOr(address, 'Отсутствует')}
                    </Text>
                  </Space>
                </Col>
              </Row>

              <LabeledData label='Наименование группы поддержки Х5'>
                <Text strong={!!supportGroup?.name}>
                  {valueOrHyphen(supportGroup?.name)}
                </Text>
              </LabeledData>

              <Row align='middle'>
                <Col span={6}>
                  <Text type='secondary'>Категория заявки</Text>
                </Col>

                <Col span={18}>
                  <Row>
                    <Col span={8}>
                      <LabeledData label='Уровень 1'>
                        <Text>Мониторинг</Text>
                      </LabeledData>
                    </Col>

                    <Col span={8}>
                      <LabeledData label='Уровень 2'>
                        <Text>Инфраструктурные события</Text>
                      </LabeledData>
                    </Col>

                    <Col span={8}>
                      <LabeledData label='Уровень 3' block>
                        <Text>Алерт</Text>
                      </LabeledData>
                    </Col>
                  </Row>
                </Col>
              </Row>

              <Row align='bottom'>
                <Col span={6}>
                  <LabeledData label='Приоритет заявки' size={0}>
                    <LabeledData label='Вес:' direction='horizontal'>
                      <Text>87</Text>
                    </LabeledData>
                  </LabeledData>
                </Col>

                <Col span={18}>
                  <Row>
                    <Col span={8}>
                      <LabeledData label='Влияние'>
                        <Text>1-всеохватывающее/ широкое</Text>
                      </LabeledData>
                    </Col>

                    <Col span={8}>
                      <LabeledData label='Срочность'>
                        <Text>2-высокая</Text>
                      </LabeledData>
                    </Col>

                    <Col span={8}>
                      <LabeledData label='Приоритет'>
                        <Text>1-критический</Text>
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

AdditionalInfo.defaultProps = {
  defaultExpanded: false,
}

export default AdditionalInfo
