import { useBoolean } from 'ahooks'
import { Button, Col, Row, Typography } from 'antd'
import React, { FC } from 'react'

import { DownIcon, MapPointIcon, UpIcon } from 'components/Icons'
import LabeledData from 'components/LabeledData'
import Space from 'components/Space'
import { TaskDetailsModel } from 'modules/task/features/TaskView/models'
import useDebounceFn from 'shared/hooks/useDebounceFn'

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
              <Row justify='space-between' wrap={false}>
                {(company || contactType || sapId || true) && (
                  <Space size={37}>
                    <Space direction='vertical'>
                      {true && <Text type='secondary'>Компания</Text>}

                      {true && <Text type='secondary'>Формат магазина</Text>}

                      {true && <Text type='secondary'>SAP ID</Text>}
                      {true && <Text type='secondary'>Email</Text>}
                    </Space>

                    <Space direction='vertical'>
                      {true && <Text strong>ТС5</Text>}
                      {true && <Text strong>discounter</Text>}
                      {true && <Text strong>5015</Text>}
                      {true && <Text strong>SV-828-dir@x5.ru</Text>}
                    </Space>
                  </Space>
                )}

                {true && (
                  <Space align='start'>
                    <MapPointIcon $size='large' />

                    <Text strong underline>
                      Камчатский край, г. Петропавловск-Камчатский
                    </Text>
                  </Space>
                )}
              </Row>

              {supportGroup && (
                <LabeledData label='Наименование группы поддержки Х5'>
                  <Text strong>{supportGroup.name}</Text>
                </LabeledData>
              )}

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
