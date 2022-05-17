import React from 'react';
import { FCWithChildren } from 'shared/interfaces/utils'
import { DividerStyled, Wrapper } from './styles';

type Props = {
  withDivider: boolean;
}

const FilterBlock: FCWithChildren<Props> = (props) => {
  const { children, withDivider } = props;

  return (
    <>
      <Wrapper>
        {children}
      </Wrapper>
      {withDivider && <DividerStyled />}
    </>

  )
}

export default FilterBlock
