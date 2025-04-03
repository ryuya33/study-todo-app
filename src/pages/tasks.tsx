import React, { useState, useCallback } from "react";
import Link from "next/link";

export default function Tasks() {
    const [tasks, setTasks] = useState([
        { text: "タスク1", completed: false },
        { text: "タスク2", completed: false },
        { text: "タスク3", completed: false },
    ]); // 仮のタスクのリスト（実際にはデータベースから取得する）

    const handleDeleteTask = useCallback((index: number) => {
        setTasks(prevTasks => prevTasks.filter((_, i) => i !== index));
    }, []);

    const handleToggleComplete = useCallback((index: number) => {
        setTasks(prevTasks => {
            const newTasks = [...prevTasks];
            newTasks[index] = {
                ...newTasks[index],
                completed: !newTasks[index].completed
            };
            return newTasks;
        });
    }, []);

    const handleDeleteAllTasks = useCallback(() => {
        setTasks([]);
    }, []);

    return (
        <main>
            <h1>タスク一覧</h1>
            <ul>
                {tasks.map((task, index) => (
                    <li key={index}
                        style={{ textDecoration: task.completed ? "line-through" : "none" }}
                    >
                        <span onClick={() => handleToggleComplete(index)} style={{ cursor: 'pointer' }}>{task.text}</span>
                        <button onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteTask(index);
                        }}>削除</button>
                    </li>
                ))}
            </ul>
            <button onClick={handleDeleteAllTasks}>全てのタスクを削除</button>
            <Link href="/">
                <button>タスクを追加する</button>
            </Link>
        </main>
    );
}
