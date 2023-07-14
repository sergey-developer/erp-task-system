import { FC } from 'react'

import LabeledData from 'components/LabeledData'
import Space from 'components/Space'

import { WrapperStyled } from './styles'

const WarehousePage: FC = () => {
  return (
    <WrapperStyled data-testid='warehouse-page'>
      <Space $block direction='vertical'>
        <LabeledData label='Наименование объекта'>ООО “СКЛАД”</LabeledData>

        <LabeledData label='Родительский склад'>
          ООО “СКЛАД-ОСНОВНОЙ”
        </LabeledData>

        <LabeledData label='Юридическое лицо'>
          ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ "СКЛАД"
        </LabeledData>

        <LabeledData label='Адрес'>
          123112, город Москва, Пресненская наб, д. 10 стр. 2, помещ. 5н офис
          337
        </LabeledData>

        <LabeledData label='Договор'>
          Договор складского хранения №55369
        </LabeledData>

        <LabeledData label='Прочие данные'>Прочие данные о складе</LabeledData>
      </Space>
    </WrapperStyled>
  )
}

export default WarehousePage
