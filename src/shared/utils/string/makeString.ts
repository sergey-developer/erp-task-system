import { Nullable } from 'shared/types/utils'

export const makeString = (separator: string, ...args: Nullable<string>[]): string =>
  args.join(separator).trim()
