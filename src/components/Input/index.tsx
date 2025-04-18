import React, { useState, useCallback, useEffect } from 'react';
import styles from '@/src/components/Input/Input.module.css';
import { setTimeout } from 'timers/promises';

type Props = {
    handleAddTask: (task: string) => void;
};

// タスク入力フォームコンポーネント
export function TodoInput({ handleAddTask }: Props) {

    // ユーザーが入力したテキストを管理
    const [inputValue, setInputValue] = useState('');
    // タスク未入力時のエラーメッセージ表示フラグ
    const [isError, setIsError] = useState(false);
    // タスク登録完了時の成功メッセージ表示フラグ
    const [successMessage, setSuccessMessage] = useState('');

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
        e.preventDefault(); // フォーム送信時のページリロードを防止

        // 入力が空白だった場合、エラーメッセージを表示
        if (!inputValue.trim()) {
            setIsError(true);
            return;
        }

        // 正常な場合はエラーを解除
        setIsError(false);

        // タスク追加関数（親コンポーネントの関数）を呼び出し
        handleAddTask(inputValue);

        // 成功メッセージを表示
        setSuccessMessage('タスクが登録されました！');

        // 入力フィールドをクリア
        setInputValue('');
    }, [inputValue, handleAddTask]);

    // 成功メッセージを3秒後にクリアする処理
    useEffect(() => {
        if (successMessage) {
            const timer: number = window.setTimeout(() => setSuccessMessage(''), 3000);
            return () => clearTimeout(timer);
        }
    }, [successMessage]);

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

                {/* 成功メッセージを表示（タスク登録成功時） */}
                {successMessage && <p className={styles.successMessage}>{successMessage}</p>}

                {/* エラーメッセージ表示（タスク未入力時） */}
                {isError && <p className={styles.errorMessage}>タスクを入力してください</p>}

                {/* タスク追加ボタン（入力が空なら `disabledButton` のスタイル適用） */}
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
