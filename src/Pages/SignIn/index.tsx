import React from 'react'
import PublicLayout from '../../components/Layout/PublicLayout'
import { Routes, Route, Link } from 'react-router-dom';
import { Form, Input, Button, Checkbox, Card, Typography } from 'antd'
import styled from 'styled-components'


export const CardStyled = styled(Card)`
  /** вынести все нах в переменные */
  box-shadow: 0px 2px 8px 0px #00000026;
  border-radius: 4px;
  padding: 54px 130px;
;
`;

export const TitleStyledLevelFirst = styled(Typography.Title)`
  &.ant-typography {
    color: #2F80ED;
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
      color: #828282;
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
      border: 1px solid #E0E0E0;
      color: #828282;
    }  
  }
  .ant-input-password {
    border: 1px solid #E0E0E0;
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
  background-color: #2F80ED;
  border-radius: 4px;
  height: 38px;
`;

export const LinkStyled = styled(Link)`
  color: #2F80ED;
  margin: 0 auto;
`;
/** Страница авторизации */
const SignIn = () => {

  const onFinish = (values: any) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  /** PublicLayout вынести в настройки Routes */
  return <PublicLayout>
    <CardStyled>
      <TitleStyledLevelFirst level={1}>
        Obermeister-ITSM
      </TitleStyledLevelFirst>
      <TitleStyledLevelTwo level={2}>
        Авторизация
      </TitleStyledLevelTwo>
      <Form
        name='basic'
        // labelCol={{ span: 8 }}
        // wrapperCol={{ span: 16 }}
        // initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        // autoComplete='off'
        layout="vertical"
      >
        <FormItemStyled
          label='E-mail'
          name='email'
          rules={[{ required: true, message: 'Введите E-mail', type: 'email' }]}
        >
          <Input placeholder="ober@obermeister.ru" />
        </FormItemStyled>
        <FormItemStyled
          label='Пароль'
          name='password'
          rules={[{ required: true, message: 'Введите пароль' }]}
        >
          <Input.Password />
        </FormItemStyled>
        <FooterStyled>
          <ButtonStyled type='primary' htmlType='submit'>
            Войти
          </ButtonStyled>
          <LinkStyled to={'/'}>Забили пароль?</LinkStyled>
        </FooterStyled>
      </Form>
    </CardStyled>
  </PublicLayout>
}

export default SignIn
