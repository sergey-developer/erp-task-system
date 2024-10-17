import { SearchOutlined } from '@ant-design/icons'
import styled from 'styled-components'

import { colorStyles, cursorStyles, fontSizeStyles } from './styles'
import { IconProps } from './types'

const SearchIconStyled = styled(SearchOutlined)<Pick<IconProps, '$size' | '$color' | '$cursor'>>`
  ${fontSizeStyles}
  ${colorStyles}
  ${cursorStyles}
`

export default SearchIconStyled
