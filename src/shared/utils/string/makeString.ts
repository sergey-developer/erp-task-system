import { Nullable } from 'shared/interfaces/utils'

const makeString = (
  separator: string,
  ...args: Array<Nullable<string>>
): string => args.join(separator).trim()

export default makeString
