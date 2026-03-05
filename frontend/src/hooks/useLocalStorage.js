import { useEffect, useState } from "react";
import {CryptoJs} from 'crpto-js';

const decrypt = (ciphetext) => {
    try {
        const bytes = CryptoJS.AES.decrypt(ciphetext, SECRET_KEY);

        return JSON.parse(bytes.toString(CryptoJs))
    }
    catch {

    }
}

export const useLocalStorage = (key, initialValue, encryptedData = false) => {
    const [storedValue, setStoresValue] = useState(() => {
        try {
            const item = localStorage.getItem(key);
            if (item) return encryptedData ? decrypt(item) : JSON.parse(item);
            return initialValue instanceof Function ? initialValue() : initialValue;
        }
        catch {
            return initialValue
        }
    });

    useEffect(()=> {
        try {
            if(storedValue === undefined || storedValue ===null) {
                localStorage.removeItem(key);
                return;
            }
            const valueToStore = encryptedData ? encrypt(storedValue) : JSON.stringify(storedValue);
            localStorage.setItem(valueToStore);
        }
        catch (error) {
            console.error('Error saving value to local storage');
        }
    }, [])
    const removeValue = () => {
        setStoredValue(undefined);
        localStorage.removeItem(key);
    }
}