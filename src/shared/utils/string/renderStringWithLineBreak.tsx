import React from 'react'

export const renderStringWithLineBreak = (value: string) =>
  value.split('\n').map((item, index, array) => (
    <React.Fragment key={index}>
      {item}
      {index !== array.length - 1 && <br />}
    </React.Fragment>
  ))
