import { useBoolean } from 'ahooks'
import { Button, Col, Row, Typography } from 'antd'
import React, { FC } from 'react'

import { DownIcon, MapPointIcon, UpIcon } from 'components/Icons'
import LabeledData from 'components/LabeledData'
import Space from 'components/Space'
import useDebounceFn from 'shared/hooks/useDebounceFn'

import DetailsWrapper from '../DetailsWrapper'
import { ADDITIONAL_INFO_BUTTON_TEXT } from './constants'
import { ContainerStyled } from './styles'

const { Text } = Typography

type AdditionalInfoProps = {
  onExpand?: (expanded: boolean) => void
  defaultExpanded?: boolean
}

const AdditionalInfo: FC<AdditionalInfoProps> = ({
  defaultExpanded,
  onExpand,
}) => {
  const [expanded, { toggle: toggleExpand }] = useBoolean(defaultExpanded)

  const handleExpand = useDebounceFn(() => {
    toggleExpand()
    onExpand && onExpand(!expanded)
  })

  return (
    <ContainerStyled $hasMarginBottom={!expanded}>
      <Space direction='vertical' size='middle' $block>
        <DetailsWrapper disablePadding='vertical'>
          <Button data-testid='btn-expand' type='text' onClick={handleExpand}>
            <Text type='secondary' underline>
              {ADDITIONAL_INFO_BUTTON_TEXT}
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
                  <MapPointIcon $size='large' />

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

AdditionalInfo.defaultProps = {
  defaultExpanded: false,
}

export default AdditionalInfo
