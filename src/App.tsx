import React, { FormEvent, MouseEventHandler } from 'react';
import { PlusCircle } from 'phosphor-react';

import './global.css';
import styles from './App.module.css';
import Logo from './assets/logo.svg';
import IconClipboard from './assets/icon-clipboard.svg';
import { Tasks } from './components/Tasks';

interface Task {
  id: number;
  desc: string;
  checked: boolean;
}

function App() {

  const [tasks, setTasks] = React.useState<Task[]>([]);
  const [inputNewTask, setInputNewTask] = React.useState('');

  const totalTasks = tasks.length;
  const totalTasksCompleted = tasks.filter(itemTaks => itemTaks.checked === true).length;

  function newTask(event: FormEvent<HTMLFormElement>) {

    event.preventDefault();

    const newTask: Task = {
      id: new Date().getTime(),
      desc: inputNewTask,
      checked: false
    }

    setTasks(state => [...state, newTask]);
    setInputNewTask('');
  }

  function changeTaskChecked(id: number, checked: boolean) {
    const aux = tasks.slice();

    aux.forEach(itemTask => {
      if (itemTask.id === id)
        itemTask.checked = checked;
    });

    setTasks(aux);
  }

  function deleteTask(id: number) {
    setTasks(state => state.filter(itemTask => itemTask.id !== id));
  }

  return (
    <div>
      <header className={styles.header}>
        <img src={Logo} alt="Logotipo" />
      </header>

      <form onSubmit={newTask} className={styles.containerNewTask}>
        <input
          placeholder='Adicione uma nova tarefa'
          value={inputNewTask}
          onChange={e => setInputNewTask(e.target.value)}
        />

        <button type='submit' disabled={!inputNewTask.length}>
          Criar
          <PlusCircle size={20} weight="bold" />
        </button>
      </form>

      <div className={styles.containerTasks}>
        <div className={styles.info}>
          <div className={styles.infoItem}>
            <span style={{ color: 'var(--blue)' }}>Tarefas criadas</span>
            <div className={styles.badge}><span>{totalTasks}</span></div>
          </div>
          <div className={styles.infoItem}>
            <span style={{ color: 'var(--purple)' }}>Concluídas</span>
            <div className={styles.badge}><span>{totalTasksCompleted ? `${totalTasksCompleted} de ${totalTasks}` : '0'}</span></div>
          </div>
        </div>
        <div className={styles.containerListTasks}>

          {!tasks.length && (
            <div className={styles.listTasksEmpty}>
              <img src={IconClipboard} alt="Icone de prancheta." />
              <p>
                <b>Você ainda não tem tarefas cadastradas</b>
                <br />
                Crie tarefas e organize seus itens a fazer
              </p>
            </div>
          )}

          {tasks.map(task => <Tasks onChecked={changeTaskChecked} onDelete={deleteTask} key={task.id} task={task} />)}
        </div>
      </div>

    </div>
  )
}

export default App
