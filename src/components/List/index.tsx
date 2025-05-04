import React, { FC } from 'react';
import { Item } from '@/src/components/Item/index';
import styles from '@/src/components/List/list.module.css';
import { Task } from '@/src/hooks/useTasks';

// 親コンポーネント 'tasks.tsx' から受け取るpropsの型を定義
type TaskListProps = {
    tasks: Task[];
    handleDeleteTask: (index: number) => void;
    handleToggleComplete: (index: number) => void;
    handleEditTask: (index: number, newText: string) => void;
}

// タスク一覧コンポーネント
export const List: FC<TaskListProps> = ({ tasks, handleDeleteTask, handleToggleComplete, handleEditTask }) => {
    return (
        <table className={styles.taskTable}>
            <thead>
                <tr>
                    <th>タスク名</th>
                    <th>締切</th>
                    <th>アクション</th>
                </tr>
            </thead>
            <tbody>
                {tasks.map((task, index) => (
                    /* タスクアイテムコンポーネント 'Item.tsx' にpropsを渡す */
                    <Item
                        key={index}
                        task={task}
                        index={index}
                        handleDeleteTask={handleDeleteTask}
                        handleToggleComplete={handleToggleComplete}
                        handleEditTask={handleEditTask}
                    />
                ))}
            </tbody>
        </table>
    );
}
