import { useBoolean } from 'ahooks'
import { Button, Col, Row, Typography } from 'antd'
import React, { FC } from 'react'

import { DownIcon, MapPointIcon, UpIcon } from 'components/Icons'
import LabeledData from 'components/LabeledData'
import Space from 'components/Space'

import DetailsWrapper from '../DetailsWrapper'
import { ContainerStyled } from './styles'

const { Text } = Typography

const AdditionalInfo: FC = () => {
  const [expanded, { toggle: toggleExpand }] = useBoolean(false)

  return (
    <ContainerStyled $hasMarginBottom={!expanded}>
      <Space direction='vertical' size='middle' $block>
        <DetailsWrapper disablePadding='vertical'>
          <Button type='text' onClick={toggleExpand}>
            <Text type='secondary' underline>
              Дополнительная информация
            </Text>

            {expanded ? (
              <UpIcon className='fs-10' />
            ) : (
              <DownIcon className='fs-10' />
            )}
          </Button>
        </DetailsWrapper>

        {expanded && (
          <DetailsWrapper bgColor='lotion'>
            <Space direction='vertical' size={30} $block>
              <Row justify='space-between'>
                <Space size={37}>
                  <Space direction='vertical'>
                    <Text type='secondary'>Компания</Text>
                    <Text type='secondary'>Формат магазина</Text>
                    <Text type='secondary'>SAP ID</Text>
                    <Text type='secondary'>Email</Text>
                  </Space>

                  <Space direction='vertical'>
                    <Text strong>ТС5</Text>
                    <Text strong>discounter</Text>
                    <Text strong>5015</Text>
                    <Text strong>SV-828-dir@x5.ru</Text>
                  </Space>
                </Space>

                <Space align='start'>
                  <MapPointIcon />

                  <Text strong underline>
                    Камчатский край, г. Петропавловск-Камчатский
                  </Text>
                </Space>
              </Row>

              <LabeledData label='Наименование группы поддержки Х5'>
                <Text strong>Группа БД</Text>
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

export default AdditionalInfo
