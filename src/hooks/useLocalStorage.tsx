import useLocalStorageState from 'use-local-storage-state';

export const useLocalStorage = <T,>(key: string, initialValue: T) => {
    return useLocalStorageState<T>(key, { defaultValue: initialValue });
};
