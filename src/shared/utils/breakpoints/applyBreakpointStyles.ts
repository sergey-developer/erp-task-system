import {
  BreakpointsUnion,
  StyledBreakpointStyles,
  StyledBreakpointsProps,
} from 'shared/interfaces/breakpoints'
import { SimpleInterpolation } from 'styled-components'

/**
 @param breakpoints - результат вызова хука из `ant.design` - `useBreakpoint`
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
    (breakpoint) => breakpoints[breakpoint as BreakpointsUnion],
  )

  return styles[matchedBreakpoint as BreakpointsUnion] || ''
}

export default applyBreakpointStyles
