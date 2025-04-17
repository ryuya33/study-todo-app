import React from 'react';
import Link from 'next/link';
import styles from '@/src/components/Header/Header.module.css';

export function Header() {
    return (
        <header className={styles.header}>
            <h1 className={styles.title}>タスク管理アプリ</h1>
            <nav>
                <ul className={styles.navList}>
                    <li><Link href="/">登録</Link></li>
                    <li><Link href="/tasks">タスク一覧</Link></li>
                </ul>
            </nav>
        </header>
    );
}
