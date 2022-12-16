import React from 'react'

const renderStringWithLineBreak = (value: string) =>
  value.split('\n').map((item, index, array) => (
    <React.Fragment key={index}>
      {item}
      {index !== array.length - 1 && <br />}
    </React.Fragment>
  ))

export default renderStringWithLineBreak
