import { useState, useCallback, useEffect } from 'react';

export type Task = {
    text: string;
    completed: boolean;
};

export type UseTasksReturnType = {
    tasks: Task[];
    handleAddTask: (task: string) => void;
    handleDeleteTask: (index: number) => void;
    handleToggleComplete: (index: number) => void;
    handleDeleteAllTasks: () => void;
};

export const useTasks = (): UseTasksReturnType => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        // クライアントサイドでのみlocalStorageからタスクを読み込む
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            setTasks(JSON.parse(savedTasks));
        }
        setIsInitialized(true);
    }, []);

    useEffect(() => {
        if (isInitialized) {
            // タスクが変更されるたびにlocalStorageに保存
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }, [tasks, isInitialized]);

    const handleAddTask = useCallback((task: string) => {
        setTasks((prevTasks: Task[]) => [...prevTasks, { text: task, completed: false }]);
    }, []);

    const handleDeleteTask = useCallback((index: number) => {
        setTasks((prevTasks: Task[]) => prevTasks.filter((_, i) => i !== index));
    }, []);

    const handleToggleComplete = useCallback((index: number) => {
        setTasks((prevTasks: Task[]) => {
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

    return {
        tasks,
        handleAddTask,
        handleDeleteTask,
        handleToggleComplete,
        handleDeleteAllTasks
    };
}
