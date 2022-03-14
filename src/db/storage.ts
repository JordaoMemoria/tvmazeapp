import AsyncStorage from '@react-native-async-storage/async-storage';

const save = async (data: any, key: string) => {
  const jsonWrite = JSON.stringify(data);
  await AsyncStorage.setItem(key, jsonWrite);
};

const saveConfig = async (pincode: string, authID: string) => {
  save(
    {
      pincode,
      authID,
    },
    'auth_config',
  );
};

const load = async (key: string, callback: Function) => {
  const jsonRead = await AsyncStorage.getItem(key);
  const data = jsonRead != null ? JSON.parse(jsonRead) : [];

  if (data.length === 0 && key === 'auth_config') {
    callback({
      pincode: '',
      authID: '',
    });
  } else {
    callback(data);
  }
};

export {save, load, saveConfig};
