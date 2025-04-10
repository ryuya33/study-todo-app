import React from 'react';
import Head from "next/head";
import Link from "next/link";
import { TodoInput } from '@/src/components/TodoInput';
import styles from '@/src/styles/Home.module.css';
import { Header } from '@/src/components/Header';
import { useTasks } from '@/src/hooks/useTasks';

export default function Home() {
  const { handleAddTask } = useTasks();

  return (
    <>
      {/* HeadコンポーネントでSEO対応 */}
      <Head>
        <title>タスク登録</title>
        <meta name="description" content="タスク登録ページです。" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <Header />

      {/* メインコンテンツ */}
      <main className={styles.todoApp}>
        <section className={styles.todoInput}>
          <h2>タスク登録</h2>
          <TodoInput handleAddTask={handleAddTask} />
        </section>

        <Link href="/tasks">
          <button className={styles.taskListButton}>タスク一覧を見る</button>
        </Link>
      </main>
    </>
  );
};
