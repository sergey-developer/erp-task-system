import { Checkbox, DatePicker, Drawer, Radio } from 'antd'

import {
  StyledBreakpointStyles,
  StyledBreakpointsProps,
} from 'shared/interfaces/breakpoints'
import applyBreakpointStyles from 'shared/utils/breakpoints/applyBreakpointStyles'
import styled, { css } from 'styled-components'

export const RadioGroupStyled = styled(Radio.Group)`
  && {
    margin-bottom: 24px;
  }
`

export const CheckboxGroupStyled = styled(Checkbox.Group)`
  && {
    display: flex;
    flex-direction: column;

    & .ant-checkbox-group-item {
      align-items: center;
    }

    & .ant-checkbox-group-item:not(:nth-last-child(1)) {
      margin-bottom: 20px;
    }

    & .ant-checkbox {
      top: 0;
    }
  }
`

const drawerBreakpointStyles: StyledBreakpointStyles = {
  xxl: css`
    padding: 20px 40px;
  `,
  xl: css`
    padding: 20px 15px;
  `,
}

export const DrawerStyled = styled(Drawer)<StyledBreakpointsProps>`
  .ant-drawer-header {
    ${({ $breakpoints }) =>
      applyBreakpointStyles($breakpoints, drawerBreakpointStyles)}
  }

  .ant-drawer-close {
    padding-left: 0;
  }

  .ant-drawer-body {
    padding: 0;
    background-color: ${({ theme }) => theme.colors.extraLightGray};
  }
`

export const RangePickerStyled = styled(DatePicker.RangePicker)`
  width: 100%;
`
