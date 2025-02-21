import { FilterTwoTone } from '@ant-design/icons'
import styled from 'styled-components'

import { IconProps } from './types'
import { fontSizeStyles } from './styles'

const FilterIconStyled = styled(FilterTwoTone)<Pick<IconProps, '$size'>>`
  ${fontSizeStyles}
`

export default FilterIconStyled
