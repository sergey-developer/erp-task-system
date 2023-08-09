import { NumberOrString } from 'shared/types/utils'

export const makeMaxLengthMessage = (
  value: string,
  maxLength: NumberOrString,
): string =>
  value.replace(
    // eslint-disable-next-line no-template-curly-in-string
    '${max}',
    String(maxLength),
  )
