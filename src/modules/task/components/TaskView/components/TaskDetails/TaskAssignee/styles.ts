import { Select } from 'antd'

import styled from 'styled-components'

/**
 * "typeof Select" для правильного вычисления типов
 */

export const SelectStyled: typeof Select = styled(Select)`
  width: 100%;

  &&.ant-select .ant-select-selector {
    height: max-content;
    padding-left: 0;
  }

  &.ant-select-single .ant-select-selector .ant-select-selection-item {
    line-height: unset;
  }
`
