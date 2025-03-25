import React, { useState } from 'react';

type Props = {
    onAddTask: (task: string) => void;
};

const TodoInput: React.FC<Props> = ({ onAddTask }) => {
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputValue.trim()) {
            onAddTask(inputValue);
            setInputValue('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="タスクを入力してください"
            />
            <button type="submit">追加</button>
        </form>
    );
};

export default TodoInput;
