import React, { useState, useCallback } from 'react';

type Props = {
    handleAddTask: (task: string) => void;
};

export function TodoInput({ handleAddTask }: Props) {
    const [inputValue, setInputValue] = useState('');

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length > 20) {
            alert('20文字以内で入力してください');
            return;
        }
        setInputValue(e.target.value.trim());
    }, []);

    const handleSubmit = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        if (inputValue.trim()) {
            handleAddTask(inputValue);
            setInputValue('');
        }
        console.log(inputValue);
    }, [inputValue, handleAddTask]);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleChange}
                    placeholder="タスクを入力してください"
                />
                <button type="submit">追加</button>
            </form>
        </div>
    );
}
