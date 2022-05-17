import { Radio, DatePicker, Drawer } from 'antd';
import styled from 'styled-components';

export const RadioGroupStyled = styled(Radio.Group)`
  &&& {
    margin-bottom: 24px;
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

export const TaskStatusList = styled.ul`
  padding: 0;
  margin: 0;
  list-style-type: none;
  
  li {
    line-height: 1;
  }
  
  li:not(:nth-last-child(1)) {
    margin-bottom: 20px;
  }
`