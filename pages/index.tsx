import React from 'react';
import Head from "next/head";
import { TodoInput } from '../components/TodoInput';

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

      {/* メインコンテンツ */}
      <main className="todo-app">
        <header className="todo-header">
          <h1 className="todo-title">Todoリスト</h1>
        </header>
        <section className="todo-input">
          <TodoInput onAddTask={addTask} /> {/* 子コンポーネントに関数を渡す */}
        </section>
      </main>
    </>
  );
};
