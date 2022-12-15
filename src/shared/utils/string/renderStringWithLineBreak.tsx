import React from 'react'
//todo: написать тесты
const renderStringWithLineBreak = (value: string): JSX.Element[] =>
  value.split('\n').map((item, index, array) => (
    <React.Fragment key={index}>
      {item}
      {index !== array.length - 1 && <br />}
    </React.Fragment>
  ))

export default renderStringWithLineBreak
