import React, { useState, useCallback } from 'react';
import styles from '@/src/components/Input/Input.module.css';

type Props = {
    handleAddTask: (task: string) => void;
};

export function TodoInput({ handleAddTask }: Props) {
    const [inputValue, setInputValue] = useState('');
    const [isError, setIsError] = useState(false);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length > 20) {
            alert('20文字以内で入力してください');
            return;
        }
        setInputValue(e.target.value.trim());
        setIsError(false);
    }, []);

    const handleSubmit = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim()) {
            setIsError(true);
            return;
        }
        setIsError(false);
        handleAddTask(inputValue);
        setInputValue('');
    }, [inputValue, handleAddTask]);

    return (
        <div className={styles.inputContainer}>
            <form className={styles.formContainer} onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleChange}
                    placeholder="タスクを入力してください（20文字以内）"
                    className={`${styles.inputField} ${isError ? styles.errorInput : ''}`}
                />
                {isError && <p className={styles.errorMessage}>タスクを入力してください</p>}
                <button
                    type="submit"
                    disabled={!inputValue.trim()}
                    className={`${styles.submitButton} ${!inputValue.trim() ? styles.disabledButton : ''}`}
                >
                    追加
                </button>
            </form>
        </div>
    );
}
