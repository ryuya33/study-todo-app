import React from "react";
import commonStyles from '@/src/styles/common.module.css';
import styles from '@/src/components/Item/item.module.css';
import { Task } from '@/src/hooks/useTasks';

// タスクアイテムコンポーネント
type Props = {
    task: Task;
    index: number;
    handleDeleteTask: (index: number) => void;
    handleToggleComplete:(index: number) => void;
};

export function Item ({ task, index, handleDeleteTask, handleToggleComplete }: Props) {
    return (
        <tr className={styles.taskRow}>
            {/* タスク名（チェックボックス付き） */}
            <td>
                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleToggleComplete(index)}
                    className={styles.checkbox}
                />
                <span className={`${styles.taskText} ${task.completed ? styles.taskCompleted : ''}`}>
                    {task.text}
                </span>
            </td>

            {/* 締切日 */}
            <td className={styles.dueDate}>{task.dueDate}</td>

            {/* 削除ボタン */}
            <td>
                <button
                    className={`${commonStyles.button} ${styles.deleteButton}`}
                    onClick={() => handleDeleteTask(index)}
                >
                    削除
                </button>
            </td>
        </tr>
    );
}
