import React from 'react';
import { Item } from '@/src/components/Item/index';
import styles from '@/src/components/List/list.module.css';
import { Task } from '@/src/hooks/useTasks';
import { takeCoverage } from 'v8';
import { table } from 'console';

// タスクリストコンポーネント
type Props = {
    tasks: Task[];
    handleDeleteTask: (index: number) => void;
    handleToggleComplete: (index: number) => void;
}

export function List({ tasks, handleDeleteTask, handleToggleComplete}: Props) {
    return (
        <table className={styles.taskTable}>
            <thead>
                <tr>
                    <th className={styles.headerCell}>タスク名</th>
                    <th className={styles.headerCell}>締切</th>
                    <th className={styles.headerCell}>アクション</th>
                </tr>
            </thead>
            <tbody>
                {tasks.map((task, index) => (
                    <Item
                        key={index}
                        task={task}
                        index={index}
                        handleDeleteTask={handleDeleteTask}
                        handleToggleComplete={handleToggleComplete}
                    />
                ))}
            </tbody>
        </table>
    );
}
