import React from 'react';
import Head from "next/head";
import Link from "next/link";
import commonStyles from '@/src/styles/common.module.css';
import styles from '@/src/styles/Home.module.css';
import { Header } from '@/src/components/Header';
import { TodoInput } from '@/src/components/Input';
import { useTasks } from '@/src/hooks/useTasks';

// タスク登録ページ（ホーム画面）
export default function Home() {
  // カスタムフック useTasks からタスク追加の関数を取得
  const { handleAddTask } = useTasks();

  return (
    <>
      {/* HeadコンポーネントでSEO対応 */}
      <Head>
        <title>タスク登録</title>
        <meta name="description" content="タスク登録ページです。" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      {/* ヘッダーコンポーネントを表示 */}
      <Header />

      {/* メインコンテンツ */}
      <main className={commonStyles.appContainer}>
        <section className={commonStyles.section}>
          <h2>タスク登録</h2>
          {/* タスク入力用のフォームコンポーネントを表示 */}
          <TodoInput handleAddTask={handleAddTask} />
        </section>

        {/* タスク一覧ページへ移動するリンクボタン */}
        <Link href="/tasks">
          <button className={`${commonStyles.button} ${styles.taskListButton}`}>
            タスク一覧を見る
          </button>
        </Link>
      </main>
    </>
  );
};
