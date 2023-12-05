import React from 'react'

import { checkLastItem } from 'shared/utils/common'

export const renderStringWithLineBreak = (value: string) =>
  value.split('\n').map((item, index, array) => (
    <React.Fragment key={index}>
      {item}
      {!checkLastItem(index, array) && <br />}
    </React.Fragment>
  ))
