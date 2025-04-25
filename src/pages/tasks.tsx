import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import commonStyles from '@/src/styles/common.module.css';
import styles from '@/src/styles/tasks.module.css';
import { Header } from '@/src/components/Header';
import { List } from '@/src/components/List';
import { useTasks } from '@/src/hooks/useTasks';

// タスク一覧ページコンポーネント
export default function Tasks() {
    // 'useTasks' カスタムフックを利用して、タスク一覧データと操作用関数を取得（オブジェクトの分割代入）
    const {
        tasks,
        handleDeleteTask,
        handleToggleComplete,
        handleDeleteAllTasks,
        handleEditTask
     } = useTasks();

    return (
        <>
            {/* SEO対応 & メタ情報設定 */}
            <Head>
                <title>タスク一覧</title>
                <meta name="description" content="タスク一覧ページです。" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>

            {/* ヘッダーコンポーネントの表示 */}
            <Header />

            {/* メインコンテンツ */}
            <main className={commonStyles.appContainer}>
                <section className={commonStyles.section}>
                    <h2 className={commonStyles.sectionHeading}>タスク一覧</h2>

                    {tasks.length === 0 ? (
                        <p className={styles.emptyMessage}>タスクがありません</p>
                    ) : (
                        /* タスク一覧のリストコンポーネント 'List.tsx' にPropsを渡す */
                        <List
                            tasks={tasks}
                            handleDeleteTask={handleDeleteTask}
                            handleToggleComplete={handleToggleComplete}
                            handleEditTask={handleEditTask}
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

                {/* タスク登録ページへ戻るボタン */}
                <Link href="/">
                    <button className={`${commonStyles.button} ${styles.taskRegisterButton}`}>タスク登録に戻る</button>
                </Link>
            </main>
        </>
    );
}
