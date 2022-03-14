interface ChangePageProps {
  page: number
  next: Function
  back: Function
}

interface CategoryRowProps {
  onChange: Function
  category: string
}

interface FavProps {
  onValueChange: Function
  value: boolean
  absolute: boolean
}

interface ItemProp {
  id: number
  name: string
  image: string
  favorite: boolean
  showFavorite: boolean
  canClick: boolean
  category: string
}

interface SearchProps {
  searching: boolean
  onType: Function
  onCancel: Function
  category: string
}

interface NavigationProps {
  navigation?: any
  route?: any
}

interface ObjectData {
  id: number
  name: string
  image: string
}

interface Show {
  id: number
  name: string
  image: {
    medium: string
  }
}

interface ShowDetail {
  id: number
  name: string
  image: {
    medium: string
  }
  summary: string
  genres: string[]
  schedule: {
    time: string
    days: string[]
  }
}

interface Episode {
  id: number
  name: string
  number: number
  season: number
}

interface EpisodeDetail extends Episode {
  summary: string
  image: string
}

interface BlueSquareProps {
  text: string
  center?: boolean
}

interface WhiteSquareProps {
  text: string
  absolute?: boolean
}

interface RowButtonProps {
  text: string
  onClick: any
}

interface RowSettingsProps {
  activated: boolean
  text: string
  onChange: Function
}

interface Person {
  id: number
  name: string
  image: string
  show: {
    id: number
    name: string
    image: string
  }[]
}

export {
  ChangePageProps,
  FavProps,
  ItemProp,
  SearchProps,
  NavigationProps,
  ObjectData,
  Show,
  ShowDetail,
  Episode,
  EpisodeDetail,
  RowButtonProps,
  BlueSquareProps,
  WhiteSquareProps,
  Person,
  CategoryRowProps,
  RowSettingsProps
}
