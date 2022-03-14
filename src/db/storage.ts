import AsyncStorage from '@react-native-async-storage/async-storage'

const save = async (allFavoriteSeries: any[], key: string) => {
  const jsonWrite = JSON.stringify(allFavoriteSeries)
  await AsyncStorage.setItem(key, jsonWrite)
}

const load = async (key: string, callback: Function) => {
  const jsonRead = await AsyncStorage.getItem(key)
  const series = jsonRead != null ? JSON.parse(jsonRead) : []
  callback(series)
}

export { save, load }
