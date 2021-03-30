import { useEffect, useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    const STRING_IS_EMPTY =/^\s*$/.test(newTaskTitle);
    if(!STRING_IS_EMPTY){
      let flag=0;
      for(let i=0; i< tasks.length; i++){
        if(tasks[i].title===newTaskTitle)
          flag++;
      }
      if(flag===0){
        let numId=0;
        let title =newTaskTitle;

        tasks.length> 0 ? (numId=tasks.length):(numId=0);
        
        setTasks([...tasks, {
          id: numId,
          title: newTaskTitle,
          isComplete:false
        }]);
      }
    }
  }
  
  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    if(id){
      const Task_Draft= tasks.find(task=>task.id==id);

      if(Task_Draft){
        Task_Draft.isComplete=!Task_Draft.isComplete;
        setTasks([...tasks])
      }
    }
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    if (id) {
      const taskIndex = tasks.findIndex(task=>task.id===id);
      tasks.splice(taskIndex, 1);
      setTasks([...tasks]);
    }
  }
 

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text"
            id="taskTitle"
            placeholder="Adicionar nova tarefa" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    checked={task.isComplete}
                    id={`${"checkbox"}${task.id}`}
                    readOnly
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.id}</p>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}