import React from 'react';
import Link from 'next/link';
import styles from '../styles/Header.module.css';

export function Header() {
    return (
        <header className={styles.header}>
            <h1 className={styles.title}>Todoリスト</h1>
            <nav>
                <ul className={styles.navList}>
                    <li><Link href="/">ホーム</Link></li>
                    <li><Link href="/tasks">タスク一覧</Link></li>
                </ul>
            </nav>
        </header>
    );
}
