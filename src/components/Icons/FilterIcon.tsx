import { FilterTwoTone } from '@ant-design/icons'

import styled from 'styled-components'

import { IconProps } from './interfaces'
import { fontSizeStyles } from './styles'

const FilterIcon = styled(FilterTwoTone)<Pick<IconProps, '$size'>>`
  ${fontSizeStyles}
`

export default FilterIcon
