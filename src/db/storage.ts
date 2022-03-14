import AsyncStorage from '@react-native-async-storage/async-storage';

const save = async (data: any, key: string) => {
  const jsonWrite = JSON.stringify(data);
  await AsyncStorage.setItem(key, jsonWrite);
};

const load = async (key: string, callback: Function) => {
  const jsonRead = await AsyncStorage.getItem(key);
  const series = jsonRead != null ? JSON.parse(jsonRead) : [];
  callback(series);
};

export {save, load};
