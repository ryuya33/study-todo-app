import React from 'react';
import Head from "next/head";
import Link from "next/link";
import { TodoInput } from '@/src/components/TodoInput';
import styles from '@/src/styles/Home.module.css';
import { Header } from '@/src/components/Header';

export default function Home() {
  // タスク追加関数
  function addTask(task: string): void {
    console.log('新しいタスク:', task); // 子コンポーネントから渡されたデータを処理
  }

  return (
    <>
      {/* HeadコンポーネントでSEO対応 */}
      <Head>
        <title>Todoリスト</title>
        <meta name="description" content="タスク管理を効率化するTodoリストアプリです。" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <Header />

      {/* メインコンテンツ */}
      <main className={styles.todoApp}>
        <section className={styles.todoInput}>
          <TodoInput onAddTask={addTask} /> {/* 子コンポーネントに関数を渡す */}
        </section>

        <Link href="/tasks">
          <button className={styles.taskListButton}>タスク一覧を見る</button>
        </Link>
      </main>
    </>
  );
};
