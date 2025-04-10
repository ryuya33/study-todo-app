import React from 'react';
import Head from "next/head";
import Link from "next/link";
import styles from '@/src/styles/Home.module.css';
import { Header } from '@/src/components/Header';
import { useTasks } from '@/src/hooks/useTasks';

export default function Tasks() {
    const { tasks, handleDeleteTask, handleToggleComplete, handleDeleteAllTasks } = useTasks();

    return (
        <>
            <Head>
                <title>タスク一覧</title>
                <meta name="description" content="タスク一覧ページです。" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>

            <Header />

            <main className={styles.todoApp}>
                <section className={styles.todoList}>
                    <h2>タスク一覧</h2>
                    {tasks.length === 0 ? (
                        <p>タスクがありません</p>
                    ) : (
                        <ul>
                            {tasks.map((task, index) => (
                                <li key={index} className={styles.todoItem}>
                                    <input
                                        type="checkbox"
                                        checked={task.completed}
                                        onChange={() => handleToggleComplete(index)}
                                    />
                                    <span className={task.completed ? styles.completed : ''}>
                                        {task.text}
                                    </span>
                                    <button onClick={() => handleDeleteTask(index)}>削除</button>
                                </li>
                            ))}
                        </ul>
                    )}
                    <button onClick={handleDeleteAllTasks}>すべて削除</button>
                </section>

                <Link href="/">
                    <button className={styles.taskListButton}>タスク登録に戻る</button>
                </Link>
            </main>
        </>
    );
}
