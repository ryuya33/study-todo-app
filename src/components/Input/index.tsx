import React, { useState, useCallback, useEffect, FC } from 'react';
import styles from '@/src/components/Input/input.module.css';
import { addDays, format } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

type Props = {
    handleAddTask: (text: string, dueDate: string) => void;
};

// タスク入力フォームコンポーネント
export const TodoInput: FC<Props> = ({ handleAddTask }) => {

    // ユーザーが入力したテキストを管理
    const [inputValue, setInputValue] = useState('');
    // タスク・締切日未入力時のエラーメッセージ表示フラグ
    const [isTaskError, setIsTaskError] = useState(false);
    const [isDateError, setIsDateError] = useState(false);
    // タスク登録完了時の成功メッセージ表示フラグ
    const [successMessage, setSuccessMessage] = useState('');
    // 締切日の管理
    const [dueDate, setDueDate] = useState<Date | null>(null);

    // タスク入力を変更した時の処理（`useCallback` でメモ化）
    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const trimmedValue = e.target.value.trim();

        // 入力が20文字を超えた場合、アラートを表示して処理を中断
        if (trimmedValue.length > 20) {
            alert('20文字以内で入力してください');
            return;
        }

        // 入力値を更新
        setInputValue(trimmedValue);

        // 入力欄にテキストが入力されたら、エラー表示を解除
        if (trimmedValue) {
            setIsTaskError(false);
        }
    }, []);

    // 締切日入力を変更した時の処理（`useCallback` でメモ化）
    const handleDateChange = useCallback((date: Date | null) => {
        setDueDate(date);

        // 締切日が選択されたら、エラー表示を解除
        if (date) {
            setIsDateError(false);
        }
    }, []);

    // フォーム送信時の処理（タスクを追加）
    const handleSubmit = useCallback((e: React.FormEvent) => {
        // フォーム送信時のページリロードを防止
        e.preventDefault();

        // タスク未入力の場合、エラーメッセージを表示
        if (!inputValue.trim()) {
            setIsTaskError(true);
        }
        // 締切日未入力の場合、エラーメッセージを表示
        if (!dueDate) {
            setIsDateError(true);
        }

        // どちらかが未入力なら処理を中断
        if (!inputValue.trim() || !dueDate) {
            return;
        }

        // 正常な場合はエラーを解除
        setIsTaskError(false);
        setIsDateError(false);

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
                    className={`${styles.inputField} ${isTaskError ? styles.errorInput : ''}`}
                />

                {/* エラーメッセージ表示（タスク未入力時） */}
                {isTaskError && <p className={styles.errorMessage}>タスクを入力してください</p>}

                {/* 締切日入力欄 */}
                <DatePicker
                    selected={dueDate}
                    onChange={handleDateChange}
                    dateFormat="yyyy-MM-dd"
                    minDate={new Date()} // 今日以降の選択のみ許可！
                    maxDate={addDays(new Date(), 30)} // 30日以内の締切のみ設定可能！
                    placeholderText="締切日を選択"
                    className={`${styles.datePicker} ${isDateError ? styles.errorInput : ''}`}
                />

                {/* エラーメッセージ表示（タスク未入力時） */}
                {isDateError && <p className={styles.errorMessage}>締切日を選択してください</p>}

                {/* 成功メッセージを表示（タスク登録成功時） */}
                {successMessage && <p className={styles.successMessage}>{successMessage}</p>}

                {/* タスク追加ボタン（入力が空なら `disabledButton` のスタイル適用） */}
                <button
                    type="submit"
                    className={`${styles.submitButton} ${(!inputValue.trim() || !dueDate) ? styles.disabledButton : ''}`}
                >
                    追加
                </button>
            </form>
        </div>
    );
}
