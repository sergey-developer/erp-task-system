import { Typography } from 'antd'
import { FC, useEffect, useState } from 'react'

import { PrettyJsonStyled } from './styles'

const { Text } = Typography

type PrettyJsonProps = {
  data: string
}

const PrettyJson: FC<PrettyJsonProps> = ({ data }) => {
  const [json, setJson] = useState<string>()
  const [error, setError] = useState<string>()

  useEffect(() => {
    try {
      const parsed = JSON.parse(data)
      const jsonString = JSON.stringify(parsed, null, 2)
      setJson(jsonString)
    } catch {
      setError('Не валидный формат данных')
    }
  }, [data])

  return error ? (
    <Text type='danger'>{error}</Text>
  ) : (
    <PrettyJsonStyled>{json}</PrettyJsonStyled>
  )
}

export default PrettyJson
