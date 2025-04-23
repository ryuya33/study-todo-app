import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import commonStyles from '@/src/styles/common.module.css';
import styles from '@/src/styles/tasks.module.css';
import { Header } from '@/src/components/Header';
import { List } from '@/src/components/List';
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

            <main className={commonStyles.appContainer}>
                <section className={commonStyles.section}>
                    <h2>タスク一覧</h2>
                    {tasks.length === 0 ? (
                        <p className={styles.emptyMessage}>タスクがありません</p>
                    ) : (
                        <List
                            tasks={tasks}
                            handleDeleteTask={handleDeleteTask}
                            handleToggleComplete={handleToggleComplete}
                        />
                    )}
                    
                    {tasks.length > 0 && (
                        <button
                            className={`${commonStyles.button} ${styles.deleteAllButton}`}
                            onClick={handleDeleteAllTasks}
                        >
                            すべて削除
                        </button>
                    )}
                </section>

                <Link href="/">
                    <button className={`${commonStyles.button} ${styles.taskRegisterButton}`}>タスク登録に戻る</button>
                </Link>
            </main>
        </>
    );
}
