import { useEffect, useState } from "react";
import CryptoJs from 'crypto-js'

const SECRET_KEY = import.meta.env.VITE_CRYPTO_SECRET;

const encrypt = (data) => {
    return CryptoJs.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
}

const decrypt = (cipherText) => {
    try {
        const bytes = CryptoJs.AES.decrypt(cipherText, SECRET_KEY);

        return JSON.parse(bytes.toString(CryptoJs.enc.Utf8))
    }
    catch {
        return null
    }
}

export const useLocalStorage = (key, initialValue, encryptedData = false) => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = localStorage.getItem(key);
            if (item) return encryptedData ? decrypt(item) : JSON.parse(item);
            return initialValue instanceof Function ? initialValue() : initialValue;
        }
        catch {
            return initialValue
        }
    });

    useEffect(() => {
        try {
            if (storedValue === undefined || storedValue === null) {
                localStorage.removeItem(key);
                return;
            }
            const valueToStore = encryptedData
                ? encrypt(storedValue)
                : JSON.stringify(storedValue);
            localStorage.setItem(valueToStore);
        }
        catch {
            console.error('Error saving to local storage');
        }
    }, [key, storedValue, encryptedData]);

    const removeValue = () => {
        setStoredValue(undefined);
        localStorage.removeItem(key);
    }

    return [storedValue, setStoredValue, removeValue ]
}

export const encryptData = encrypt;
export const decryptData = decrypt;