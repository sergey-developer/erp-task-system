import { AdditionalInfoProps } from './index'

export const makeYandexMapLink = ({
  longitude,
  latitude,
}: Pick<AdditionalInfoProps, 'longitude' | 'latitude'>) =>
  `https://yandex.ru/maps/?pt=${longitude},${latitude}&z=18&l=map`
