import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (value: any, user: any) => {
  try {
    await AsyncStorage.setItem('my-key', value);
    await AsyncStorage.setItem('user_name', user.name);
    await AsyncStorage.setItem('user_email', user.email);
    await AsyncStorage.setItem('user_role', user.role);
    await AsyncStorage.setItem('user_avatar_url', user.avatar.url);
  } catch (e) {
  }
};
export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem('my-key');
    await AsyncStorage.removeItem('user_name');
    await AsyncStorage.removeItem('user_email');
    await AsyncStorage.removeItem('user_role');
    await AsyncStorage.removeItem('user_avatar_url');
  } catch (e) {
  }
};