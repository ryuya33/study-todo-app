import React, { useState } from 'react';

type Props = {
    onAddTask: (task: string) => void; // 入力されたタスクを処理するために、親コンポーネントに渡される関数
};

export function TodoInput({ onAddTask }: Props) {
    const [inputValue, setInputValue] = useState('');

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (inputValue.trim()) {
            onAddTask(inputValue); // 親コンポーネントの関数を呼び出す
            setInputValue('');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="タスクを入力してください"
                />
                <button type="submit">追加</button>
            </form>
        </div>
    );
};
