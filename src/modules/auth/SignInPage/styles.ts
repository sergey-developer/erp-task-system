import styled from 'styled-components'
import { Card, Form, Typography } from 'antd'

export const CardStyled = styled(Card)`
    ${props => props.theme.shadows.shadow1}
    border-radius: 4px;
    padding: 54px 130px;
`;

export const PageTitleStyled = styled(Typography.Title)`
  &.ant-typography {
    color: ${props => props.theme.colors.blue1};
    font-size: 20px;
    text-align: center;
    font-weight: 600;
    margin-bottom: 48px;
  }
`;

export const FormTitleStyled = styled(Typography.Title)`
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
  flex-direction: column;
  margin: 26px 0 42px;
  gap: 12px;
`;
