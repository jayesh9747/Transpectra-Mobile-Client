import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from "moment";

const prefix = "cache_";
const expiryInMinutes = 5;

const store = async (key, value) => {
    try {
        const item = {
            value,
            timestamp: Date.now(),
        };
        await AsyncStorage.setItem(prefix + key, JSON.stringify(item));
    } catch (error) {
        console.log(error);
    }
};

const isExpired = (item) => {
    const now = moment(Date.now());
    const storedTime = moment(item.timestamp);
    return now.diff(storedTime, "minutes") > expiryInMinutes;
};

const get = async (key) => {
    try {
        console.log("this is restor from the cache",key)
        const value = await AsyncStorage.getItem(prefix + key);
        if (!value) return null;

        const item = JSON.parse(value);
        if (!item) return null;

        if (isExpired(item)) {
            await AsyncStorage.removeItem(prefix + key);
            return null;
        }

        return item.value;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const clearAll = async () => {

    console.log("this is from clear ")
    try {
        const keys = await AsyncStorage.getAllKeys();
        console.log(keys);
        const cacheKeys = keys.filter(key => key.startsWith(prefix));
        const t = await AsyncStorage.multiRemove(keys);

        console.log("remove all keys ",keys);
    } catch (error) {
        console.log(error);
    }
};

export default {
    store,
    get,
    clearAll
};
