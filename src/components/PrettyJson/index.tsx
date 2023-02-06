import { Typography } from 'antd'
import { FC, useEffect, useState } from 'react'

import { PrettyJsonStyled } from './styles'

const { Text } = Typography

type PrettyJsonProps = {
  data: any
}

const PrettyJson: FC<PrettyJsonProps> = ({ data }) => {
  const [json, setJson] = useState<string>()
  const [error, setError] = useState<string>()

  useEffect(() => {
    try {
      const json = JSON.stringify(data, null, 2)
      setJson(json)
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
