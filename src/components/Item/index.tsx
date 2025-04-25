import React, { useState } from "react";
import commonStyles from '@/src/styles/common.module.css';
import styles from '@/src/components/Item/item.module.css';
import { Task } from '@/src/hooks/useTasks';

// 親コンポーネント 'List - index.tsx' から受け取るpropsの型を定義
type TaskItemProps = {
    task: Task; // 1つのタスクデータ（テキスト・締切・完了状態を含む）
    index: number; // タスクのインデックス（リストの何番目かを識別）
    handleDeleteTask: (index: number) => void;
    handleToggleComplete: (index: number) => void;
    handleEditTask: (index: number, newText: string) => void;
};

// タスクアイテムコンポーネント
export function Item({
    task,
    index,
    handleDeleteTask,
    handleToggleComplete,
    handleEditTask
}: TaskItemProps) {

    // 編集モードの状態管理
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(task.text);

    // 編集の保存処理
    const saveEdit = () => {
        handleEditTask(index, editedText);
        setIsEditing(false);
    };

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
                {isEditing ? (
                    <input
                        type="text"
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                        className={styles.editInput}
                    />
                ) : (
                    <span className={`${styles.taskText} ${task.completed ? styles.taskCompleted : ''}`}>
                        {task.text}
                    </span>
                )}
            </td>

            {/* 締切日 */}
            <td className={styles.dueDate}>{task.dueDate}</td>

            {/* アクションボタン */}
            <td>
                {isEditing ? (
                    <>
                        <button
                            className={`${commonStyles.button} ${styles.saveButton}`}
                            onClick={saveEdit}
                        >
                            💾
                        </button>
                        <button
                            className={`${commonStyles.button} ${styles.cancelButton}`}
                            onClick={() => {
                                setIsEditing(false);
                                setEditedText(task.text);
                            }}
                        >
                            ↩️
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            className={`${commonStyles.button} ${styles.editButton}`}
                            onClick={() => setIsEditing(true)}
                        >
                            ✏️
                        </button>
                        <button
                            className={`${commonStyles.button} ${styles.deleteButton}`}
                            onClick={() => handleDeleteTask(index)}
                        >
                            🗑️
                        </button>
                    </>
                )}
            </td>
        </tr>
    );
}
