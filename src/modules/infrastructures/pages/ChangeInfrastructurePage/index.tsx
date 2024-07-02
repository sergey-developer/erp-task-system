import { Button, Flex, Typography } from 'antd'
import { FC } from 'react'
import { useParams } from 'react-router-dom'

const { Title } = Typography

const ChangeInfrastructurePage: FC = () => {
  const params = useParams<'id'>()
  const infrastructureId = Number(params?.id) || undefined

  return (
    <div data-testid='change-infrastructure-page'>
      <Flex gap='small' align='end'>
        <Title level={4}>Изменение инфраструктуры по заявке</Title>

        <Button type='link' size='large'>
          ИНЦ-102665683
        </Button>
      </Flex>
    </div>
  )
}

export default ChangeInfrastructurePage
