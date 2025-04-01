import React from "react";
import Link from "next/link";

export default function Tasks() {
    const tasks = ["タスク1", "タスク2", "タスク3"]; // 仮のタスクのリスト（実際にはデータベースから取得する）

    return (
        <main>
            <h1>タスク一覧</h1>
            <ul>
                {tasks.map((task, index) => (
                    <li key={index}>{task}</li>
                ))}
            </ul>
            <Link href="/">
                <button>タスクを追加する</button>
            </Link>
        </main>
    );
}
