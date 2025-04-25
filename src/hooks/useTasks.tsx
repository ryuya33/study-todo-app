import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { format, parseISO } from 'date-fns';

// タスク型（タスクのデータ構造を定義）
export type Task = {
    text: string;       // タスクの内容
    dueDate: string;    // 締切日
    completed: boolean; // タスクの完了状態（true: 完了、false: 未完了）
};

// useTasksフックの戻り値の型を定義（外部コンポーネントが利用するもの）
export type UseTasksReturnType = {
    tasks: Task[];  // タスク一覧（複数の 'Task' 型の配列）
    handleAddTask: (text: string, dueDate: string) => void;     // タスク追加関数
    handleDeleteTask: (index: number) => void;      // タスク削除関数
    handleToggleComplete: (index: number) => void;  // タスク完了状態切り替え関数
    handleDeleteAllTasks: () => void;               // 全タスク削除関数
    handleEditTask: (index: number, newText: string) => void;   // タスク編集関数
};

// タスクの状態管理を行うカスタムフック 'useTasks'
export const useTasks = (): UseTasksReturnType => {
    // useLocalStorageカスタムフックを使って、localStorage と同期した状態管理を行う（初期値は空の配列）
    const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', []);

    // 'dueDate' を 'yyyy-MM-dd' に統一
    const formatDueDate = (dueDate: string) => {
        return format(parseISO(dueDate), 'yyyy-MM-dd');
    }

    // 新しいタスクを追加する
    const handleAddTask = useCallback((text: string, dueDate: string) => {
        const formattedDate = formatDueDate(dueDate);
        const newTask: Task = { text, dueDate: formattedDate, completed: false };
        setTasks((prevTasks: Task[]) => [...prevTasks, newTask]);
    }, [setTasks]);

    // 指定したインデックスのタスクを削除する
    const handleDeleteTask = useCallback((index: number) => {
        setTasks((prevTasks: Task[]) =>
            prevTasks.filter((_, i) => i !== index));   // 指定したインデックス以外のタスクを残す
    }, [setTasks]);

    // 指定したインデックスのタスクの完了状態を切り替える
    const handleToggleComplete = useCallback((index: number) => {
        setTasks((prevTasks: Task[]) =>
            prevTasks.map((task, i) =>
                i === index ? { ...task, completed: !task.completed } : task // 完了状態を反転
            )
        );
    }, [setTasks]);

    // すべてのタスクを削除する
    const handleDeleteAllTasks = useCallback(() => {
        if (window.confirm('すべてのタスクを削除しますか？')) {
            setTasks([]);   // 空の配列をセット
        }
    }, [setTasks]);

    // 指定したインデックスのタスクのテキストを更新する（編集機能）
    const handleEditTask = useCallback((index: number, newText: string) => {
        setTasks((prevTasks: Task[]) =>
            prevTasks.map((task, i) =>
                i === index ? { ...task, text: newText } : task
            )
        );
    }, [setTasks]);

    // タスクの状態と操作関数を返す
    return {
        tasks,
        handleAddTask,
        handleDeleteTask,
        handleToggleComplete,
        handleDeleteAllTasks,
        handleEditTask
    };
}
