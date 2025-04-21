import React, { useState, useCallback, useEffect } from 'react';
import styles from '@/src/components/Input/Input.module.css';
import { addDays, format } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

type Props = {
    handleAddTask: (text: string, dueDate: string) => void;
};

// タスク入力フォームコンポーネント
export function TodoInput({ handleAddTask }: Props) {

    // ユーザーが入力したテキストを管理
    const [inputValue, setInputValue] = useState('');
    // タスク未入力時のエラーメッセージ表示フラグ
    const [isError, setIsError] = useState(false);
    // タスク登録完了時の成功メッセージ表示フラグ
    const [successMessage, setSuccessMessage] = useState('');
    // 締切日の管理
    const [dueDate, setDueDate] = useState<Date | null>(null);

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

    // 締切変更時の処理（`useCallback` でメモ化）
    const handleDateChange = useCallback((date: Date | null) => {
        if (date) {
            setDueDate(date);
        }
    }, []);

    // フォーム送信時の処理（タスクを追加）
    const handleSubmit = useCallback((e: React.FormEvent) => {
        e.preventDefault(); // フォーム送信時のページリロードを防止

        // 入力が空白だった場合、エラーメッセージを表示
        if (!inputValue.trim() || !dueDate) {
            setIsError(true);
            return;
        }

        // 正常な場合はエラーを解除
        setIsError(false);

        // タスク追加関数（親コンポーネントの関数）を呼び出し
        handleAddTask(inputValue, format(dueDate, 'yyyy-MM-dd'));

        // 成功メッセージを表示
        setSuccessMessage('タスクが登録されました！');

        // 入力フィールドをクリア
        setInputValue('');
        setDueDate(null);
    }, [inputValue, dueDate, handleAddTask]);

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
                {/* タスク入力欄 */}
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleChange}
                    placeholder="タスクを入力してください（20文字以内）"
                    className={`${styles.inputField} ${isError ? styles.errorInput : ''}`}
                />

                {/* 期限入力欄 */}
                {/* <input
                    type="date"
                    value={dueDate}
                    onChange={handleDateChange}
                    className={styles.dateInput}
                /> */}

                <DatePicker
                    selected={dueDate}
                    onChange={handleDateChange}
                    dateFormat="yyyy-MM-dd"
                    minDate={new Date()} // 今日以降の選択のみ許可！
                    maxDate={addDays(new Date(), 30)} // 30日以内の締切のみ設定可能！
                    placeholderText="締切日を選択"
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
