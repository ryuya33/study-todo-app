import React, { useState, useCallback } from 'react';
import styles from '@/src/components/Input/Input.module.css';

type Props = {
    handleAddTask: (task: string) => void;
};

// タスク入力フォームコンポーネント
export function TodoInput({ handleAddTask }: Props) {

    // ユーザーが入力したテキストを管理する状態
    const [inputValue, setInputValue] = useState('');
    // タスク未入力時のエラー表示フラグ
    const [isError, setIsError] = useState(false);

    // ユーザーが入力を変更したときの処理（`useCallback` でメモ化）
    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        // 入力が20文字を超えた場合、アラートを表示して処理を中断
        if (e.target.value.length > 20) {
            alert('20文字以内で入力してください');
            return;
        }
        // 入力値を `trim()` で前後の空白を除去し、状態を更新
        setInputValue(e.target.value.trim());
        // エラー表示をリセット
        setIsError(false);
    }, []);

    // フォーム送信時の処理（タスクを追加）
    const handleSubmit = useCallback((e: React.FormEvent) => {
        e.preventDefault(); // // 🔹 フォーム送信時のページリロードを防ぐ

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
                    className={`${styles.submitButton} ${!inputValue.trim() ? styles.disabledButton : ''}`}
                >
                    追加
                </button>
            </form>
        </div>
    );
}
