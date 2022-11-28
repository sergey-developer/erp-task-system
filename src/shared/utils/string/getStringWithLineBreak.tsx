import React from 'react'

const getStringWithLineBreak = (value: string): JSX.Element[] =>
  value.split('\n').map((item, index, array) => (
    <React.Fragment key={index}>
      {item}
      {index !== array.length - 1 && <br />}
    </React.Fragment>
  ))

export default getStringWithLineBreak
