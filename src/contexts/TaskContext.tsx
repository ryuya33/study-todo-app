import React, { createContext, useContext } from 'react';
import { useTasks } from '@/src/hooks/useTasks';

const TaskContext = createContext<ReturnType<typeof useTasks> | null>(null);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const taskManager = useTasks();

    return (
        <TaskContext.Provider value={taskManager}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTaskContext = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error('useTaskContext must be used within a TaskProvider');
    }
    return context;
};
