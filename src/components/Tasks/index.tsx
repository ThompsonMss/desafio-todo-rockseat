import styles from './index.module.css';

import { CheckCircle, Circle, Trash } from 'phosphor-react';

interface PropsTask {
  task: Task,
  onChecked: (id: number, newCheck: boolean) => void;
  onDelete: (id: number) => void;
}

interface Task {
  id: number;
  desc: string;
  checked: boolean;
}

export function Tasks({ task, onChecked, onDelete }: PropsTask) {

  return (
    <div className={styles.containerTask}>
      <div onClick={() => onChecked(task.id, !task.checked)} className={styles.containerCheck}>
        {task.checked
          ? <CheckCircle size={24} weight="fill" style={{ color: 'var(--purple-dark)' }} />
          : <Circle size={24} weight="bold" style={{ color: 'var(--blue)' }} />}
      </div>

      <div className={styles.containerContent}>
        <p className={task.checked ? styles.checked : ''}>{task.desc}</p>
      </div>

      <div onClick={() => onDelete(task.id)} className={styles.containerAction}>
        <Trash size={18} weight="bold" />
      </div>
    </div>
  );
}