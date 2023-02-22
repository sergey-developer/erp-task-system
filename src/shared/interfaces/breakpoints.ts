import {
  Breakpoint as BaseBreakpoint,
  ScreenMap as BaseScreenMap,
} from 'antd/es/_util/responsiveObserve'
import { FlattenSimpleInterpolation } from 'styled-components'

/**
 $breakpoints - это результат вызова хука "useBreakpoint" для передачи его как пропс
 в styled component.

 Символ "$" нужно добавлять к названию пропса в начале, чтобы не было warnings
 */

export type ScreenMap = BaseScreenMap
export type BreakpointUnion = BaseBreakpoint

export type StyledBreakpointsProps = Record<`$breakpoints`, ScreenMap>

export type StyledBreakpointStyles = Partial<
  Record<BreakpointUnion, FlattenSimpleInterpolation>
>
