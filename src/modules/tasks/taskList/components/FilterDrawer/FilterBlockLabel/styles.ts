import { Button, Space, Typography } from 'antd';
import styled from 'styled-components';

const {Title} = Typography;

export const ButtonStyled = styled(Button)`
  &&& {
    color: ${({ theme }) => theme.colors.gray3};
  }
`

export const SpaceStyled = styled(Space)`
  margin-bottom: 30px;
`

export const TitleStyled = styled(Title)`
  &&& {
    line-height: 1;
    margin-bottom: 0;
  }
`
