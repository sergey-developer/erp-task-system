import { Nullable } from 'shared/interfaces/utils'

export const makeString = (
  separator: string,
  ...args: Array<Nullable<string>>
): string => args.join(separator).trim()
