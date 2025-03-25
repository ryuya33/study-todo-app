import React from 'react';
import TodoInput from '../components/TodoInput'; // TodoInputをインポート

const Home: React.FC = () => {
  const addTask = (task: string) => {
    console.log('新しいタスク:', task); // タスクが渡されたかコンソールで確認
  };

  return (
    <div>
      <h1>Todoリスト</h1>
      <TodoInput onAddTask={addTask} />
    </div>
  );
};

export default Home;
