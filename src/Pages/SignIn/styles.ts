import styled from 'styled-components'
import { Button, Card, Form, Typography } from 'antd'
import { Link } from 'react-router-dom'

export const CardStyled = styled(Card)`
  &.ant-card {
    ${props => props.theme.shadows.shadow1}
    border-radius: 4px;
    padding: 54px 130px;
  }
`;

export const TitleStyledLevelFirst = styled(Typography.Title)`
  &.ant-typography {
    color: ${props => props.theme.colors.blue1};
    font-size: 20px;
    text-align: center;
    font-weight: 600;
    margin-bottom: 48px;
  }
`;

export const TitleStyledLevelTwo = styled(Typography.Title)`
  &.ant-typography {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 24px;
    margin-top: 24px;
  }
`;

export const FormItemStyled = styled(Form.Item)`
  margin-top: 16px;
  margin-bottom: 16px;
  > .ant-form-item-label {
    padding-bottom: 4px;
    > label {
      color: ${props => props.theme.colors.gray3};
      font-size: 12px;
      &.ant-form-item-required:before {
        display: none;
      }
    }
  }
  .ant-form-item-explain-error {
    font-size: 12px;
  }
  .ant-form-item-control-input-content {
    min-width: 300px;
    .ant-input:not([type=password]) {
      border: 1px solid ${props => props.theme.colors.gray5};
      color: ${props => props.theme.colors.gray3};
    }  
  }
  .ant-input-password {
    border: 1px solid ${props => props.theme.colors.gray5};
  }
`;

export const FooterStyled = styled.div`
  display: flex;
  margin: 26px 0 42px;
  gap: 12px;
  flex-wrap: wrap;
  
`;

export const ButtonStyled = styled(Button)`
  width: 100%;
  background-color: ${props => props.theme.colors.blue1};
  border-radius: 4px;
  height: 38px;
`;

export const LinkStyled = styled(Link)`
  color: ${props => props.theme.colors.blue1};
  margin: 0 auto;
`;
