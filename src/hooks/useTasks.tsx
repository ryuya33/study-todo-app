import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';

// タスク型（タスクのデータ構造を定義）
export type Task = {
    text: string;       // タスクの内容（文字列）
    completed: boolean; // タスクの完了状態（true: 完了、false: 未完了）
    dueDate: string;    // 締切日（文字列）
};

// useTasksフックの戻り値の型を定義（外部コンポーネントが利用するもの）
export type UseTasksReturnType = {
    tasks: Task[];                                  // 現在のタスク一覧
    handleAddTask: (task: Task) => void;          // タスク追加関数
    handleDeleteTask: (index: number) => void;      // タスク削除関数
    handleToggleComplete: (index: number) => void;  // タスク完了状態切り替え関数
    handleDeleteAllTasks: () => void;               // 全タスク削除関数
};

// タスクの状態管理を行うカスタムフック
export const useTasks = (): UseTasksReturnType => {
    // useLocalStorageカスタムフックを使って、localStorage と同期した状態管理を行う（初期値は空の配列）
    const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', []);

    // 新しいタスクを追加する
    const handleAddTask = useCallback((task: Task) => {
        setTasks((prevTasks: Task[]) => [
            ...prevTasks, task]);
    }, []);

    // 指定したインデックスのタスクを削除する
    const handleDeleteTask = useCallback((index: number) => {
        setTasks((prevTasks: Task[]) =>
            prevTasks.filter((_, i) => i !== index));   // 指定したインデックス以外のタスクを残す
    }, []);

    // 指定したインデックスのタスクの完了状態を切り替える
    const handleToggleComplete = useCallback((index: number) => {
        setTasks((prevTasks: Task[]) => {
            return prevTasks.map((task, i) =>
                i === index ? { ...task, completed: !task.completed } : task // 完了状態を反転
            );
        });
    }, []);

    // すべてのタスクを削除する
    const handleDeleteAllTasks = useCallback(() => {
        if (window.confirm('すべてのタスクを削除しますか？')) {
            setTasks([]);   // 空の配列をセット
        }
    }, []);

    // タスクの状態と操作関数を返す
    return {
        tasks,
        handleAddTask,
        handleDeleteTask,
        handleToggleComplete,
        handleDeleteAllTasks
    };
}
