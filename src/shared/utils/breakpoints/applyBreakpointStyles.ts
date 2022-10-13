import {
  BreakpointUnion,
  StyledBreakpointStyles,
  StyledBreakpointsProps,
} from 'shared/interfaces/breakpoints'
import { SimpleInterpolation } from 'styled-components'

/**
 @param breakpoints - результат вызова хука `useBreakpoint` из `antd`
 @param styles - последовательность ключей должна быть от большего расширения к меньшему, например:
 `{ xxl, xl, ...etc }` т.к. при наибольшем расширении (`xxl`), остальные поля в параметре `breakpoints`
 будут со значением `true`
 @returns - стили из параметра `styles` для первого попавшегося `breakpoint` из параметра
 `breakpoints` со значением `true`
 */

const applyBreakpointStyles = (
  breakpoints: StyledBreakpointsProps['$breakpoints'],
  styles: StyledBreakpointStyles,
): SimpleInterpolation => {
  const breakpointSequence = Object.keys(styles)
  const matchedBreakpoint = breakpointSequence.find(
    (breakpoint) => breakpoints[breakpoint as BreakpointUnion],
  )

  return styles[matchedBreakpoint as BreakpointUnion] || ''
}

export default applyBreakpointStyles
