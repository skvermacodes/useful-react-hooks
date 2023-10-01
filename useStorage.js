import { useCallback, useState, useEffect, useRef } from "react";

const useStorage = (key, value, storageType = "session") => {
  const storageObjectRef = useRef(
    storageType === "session" ? window.sessionStorage : window.localStorage
  );
  const [storageValue, setStorageValue] = useState(() => {
    const jsonValue = storageObjectRef.current.getItem(key);
    if (jsonValue != null) return JSON.parse(jsonValue);

    if (typeof value === "function") {
      return value();
    }
    return value;
  });

  useEffect(() => {
    if (storageValue === undefined)
      return storageObjectRef.current.removeItem(key);
    storageObjectRef.current.setItem(key, JSON.stringify(storageValue));
  }, [key, storageValue]);

  const remove = useCallback(() => {
    setStorageValue(undefined);
  }, []);

  return [storageValue, setStorageValue, remove];
};

export default useStorage;
