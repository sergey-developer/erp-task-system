import React from 'react';
import { FCWithChildren } from 'shared/interfaces/utils'
import { ButtonStyled, SpaceStyled, TitleStyled } from './styles';

type Props = {
  onReset: () => void;
}

const FilterBlockLabel: FCWithChildren<Props> = (props) => {
  const { children, onReset } = props;

  return (
    <SpaceStyled align="baseline">
      <TitleStyled level={4}>{children}</TitleStyled>
      <ButtonStyled onClick={onReset} type="text">Сбросить</ButtonStyled>
    </SpaceStyled>
  )
}

export default FilterBlockLabel
