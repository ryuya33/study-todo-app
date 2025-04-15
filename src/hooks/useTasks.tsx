import { useState, useCallback, useEffect } from 'react';

// タスク型（タスクのデータ構造を定義）
export type Task = {
    text: string;       // タスクの内容（文字列）
    completed: boolean; // タスクの完了状態（true: 完了、false: 未完了）
};

// useTasksフックの戻り値の型を定義（外部コンポーネントが利用するもの）
export type UseTasksReturnType = {
    tasks: Task[];                                  // 現在のタスク一覧
    handleAddTask: (task: string) => void;          // タスク追加関数
    handleDeleteTask: (index: number) => void;      // タスク削除関数
    handleToggleComplete: (index: number) => void;  // タスク完了状態切り替え関数
    handleDeleteAllTasks: () => void;               // 全タスク削除関数
};

// タスクの状態管理を行うカスタムフック
export const useTasks = (): UseTasksReturnType => {
    // タスクリスト（初期値は空の配列）
    const [tasks, setTasks] = useState<Task[]>([]);             // タスク一覧を管理する状態
    const [isInitialized, setIsInitialized] = useState(false);  // 初期化済みかどうかのフラグ

    // 初回レンダリング時に localStorage からタスクを読み込む
    useEffect(() => {
        try {
            // localStorage からタスクリストを取得
            const savedTasks = localStorage.getItem('tasks');
            if (savedTasks) {
                // JSON文字列をパースして tasks にセット
                setTasks(JSON.parse(savedTasks));
            }
        } catch (error) {
            console.error('localStorage のデータ取得に失敗しました:', error);
            setTasks([]);
        }
        setIsInitialized(true); // 初期化完了フラグを設定
    }, []); // 初回レンダリング時のみ実行（依存配列が `[]`）

    // tasks が更新されるたびに localStorage に保存
    useEffect(() => {
        if (!isInitialized) return; // 初期化が終わっていない場合は何もしない
        // タスク一覧を保存
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    // 新しいタスクを追加する
    const handleAddTask = useCallback((task: string) => {
        setTasks((prevTasks: Task[]) => [
            ...prevTasks,                       // 既存のタスクを保持
            { text: task, completed: false }    // 新しいタスクを追加
        ]);
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
