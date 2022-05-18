import { CloseOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Card, Dropdown, Menu, Typography } from 'antd'
import React from 'react'

import styled from 'styled-components'

export const WrapStyled = styled.div`
  padding: 0 0 8px 8px;
  height: 100%;
`
export const CardStyled = styled(Card)`
  height: 100%;
  && {
    border-radius: 4px;
  }
  .ant-card-head {
    padding: 0;
    background-color: #eef5fe;
  }
  .ant-card-head-title {
    padding: 12px 20px 12px 40px;
  }
  .ant-card-body {
    padding: 0;
  }
`

export const TitleStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
export const ButtonBlockStyled = styled.div`
  display: flex;
  align-items: center;
`
const menu = (
  <Menu
    onClick={() => {}}
    items={[
      {
        label: '1st menu item',
        key: '1',
      },
      {
        label: '2nd menu item',
        key: '2',
      },
      {
        label: '3rd menu item',
        key: '3',
      },
    ]}
  />
)

export const BlockWrapStyled = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #e0e0e0;
  padding: 16px 40px;
`

export const TitleBlockStyled = styled.div`
  display: flex;
  gap: 4px;
  margin-bottom: 18px;
`

export const TitleTextStyled = styled(Typography.Title).attrs({
  level: 4,
})`
  && {
    line-height: 1.2;
    margin-bottom: 4px;
  }
`

export const SmallTextStyled = styled(Typography.Text)`
  font-size: 12px;
`

export const WrapDescriptionStyled = styled.div`
  margin: 16px 0;
  display: flex;
  gap: 44px;
`

export const DescriptionBlockStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
`
const BlockMainTask = () => {
  return (
    <BlockWrapStyled>
      <TitleBlockStyled>
        <Typography.Text type='secondary'>ИНЦ-000345456</Typography.Text>
        <Typography.Text type='secondary'>•</Typography.Text>
        <Typography.Text type='danger'>
          до 17.11.2021, 18:00 (2ч)
        </Typography.Text>
      </TitleBlockStyled>
      <TitleTextStyled>
        Плохо печатает принтер, шумит/застревает, заминается бумага
      </TitleTextStyled>
      <SmallTextStyled>06.12.2021, 16:00</SmallTextStyled>
      <WrapDescriptionStyled>
        <DescriptionBlockStyled>
          <SmallTextStyled type='secondary'>Адрес</SmallTextStyled>
          <Typography.Text strong>
            1298-Пятерочка (гп.Воскресенск)
          </Typography.Text>
          <Typography.Text>
            Московская область, гп.Воскресенск, ул.Центральная, д.16
          </Typography.Text>
        </DescriptionBlockStyled>
        <DescriptionBlockStyled>
          <SmallTextStyled type='secondary'>Заявитель</SmallTextStyled>
          <Typography.Text strong>
            Константинопольский Константин Константинович
          </Typography.Text>
          <Typography.Text>+7 (900) 345-34-54</Typography.Text>
        </DescriptionBlockStyled>
      </WrapDescriptionStyled>
    </BlockWrapStyled>
  )
}

export const TitleBlock = () => {
  return (
    <TitleStyled>
      <Typography>REQ0000007898</Typography>
      <ButtonBlockStyled>
        <Dropdown.Button onClick={() => {}} overlay={menu} type='text' />
        <Button type='text' icon={<CloseOutlined />} />
      </ButtonBlockStyled>
    </TitleStyled>
  )
}
const TaskDetail = () => {
  return (
    <WrapStyled>
      <CardStyled title={<TitleBlock />}>
        <BlockMainTask />
        <BlockMainTask />
      </CardStyled>
    </WrapStyled>
  )
}

export default TaskDetail
