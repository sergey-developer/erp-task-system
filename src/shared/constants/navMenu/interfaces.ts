import { ItemType } from 'antd/lib/menu/hooks/useItems'

import { RoutesEnum } from 'configs/routes'

export type NavMenuItem = ItemType & { key: RoutesEnum }
