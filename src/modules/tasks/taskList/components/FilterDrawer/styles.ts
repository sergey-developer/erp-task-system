import { Radio, Checkbox, DatePicker, Drawer } from 'antd';
import styled from 'styled-components';

export const RadioGroupStyled = styled(Radio.Group)`
  &&& {
    margin-bottom: 24px;
  }
`

export const CheckboxGroupStyled = styled(Checkbox.Group)`
  &&& {
    display: flex;
    flex-direction: column;
    
    & .ant-checkbox-group-item:not(:nth-last-child(1)) {
      margin-bottom: 20px;
    }
  }
`

export const DrawerStyled = styled(Drawer)`
  .ant-drawer-body {
    padding: 0;
    background-color: ${({ theme }) => theme.colors.extraLightGray};
  }
`

export const RangePickerStyled = styled(DatePicker.RangePicker)`
  width: 100%;
`
