import React, {useState} from 'react';

import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import Modal from './components/Modal';

import styles from './App.module.css'

import {ITask} from './interfaces/Task';



function App() {

  const [tasklist, setTasklist] = useState<ITask[]>([])
  const [taskToUpdate, setTaskToUpdate] = useState<ITask | null>(null)

  const deleteTask = (id:number) =>{
    setTasklist(
      tasklist.filter((task)=>{
        return task.id !== id
      })
    )
  }

  const hideOrShowModal = (display: boolean) =>{
    const modal = document.querySelector("#modal")
    if(display){
      modal?.classList.remove("hide")
    }else{
      modal?.classList.add("hide")
    }
  }

  const editTask = (task: ITask):void =>{
    hideOrShowModal(true)
    setTaskToUpdate(task)
  }

  const updateTask = (id:number, title:string, difficulty:number) => {

    const updatedTask: ITask = {id, title, difficulty}

    const updatedItems = tasklist.map(task =>{
      return task.id === updatedTask.id ? updatedTask : task
    })

    setTasklist(updatedItems)
    hideOrShowModal(false)
  }

  return (
    <div>
      <Modal children={<TaskForm btnText='Editar Tarefa' taskList={tasklist} task={taskToUpdate} handleUpdate={updateTask}/>}/>
      <Header />
      <main className={styles.main}>
        <div>
          <h2>O que você vai fazer?</h2>
          <TaskForm btnText='Criar Tarefa' taskList={tasklist} setTasklist={setTasklist}/>
        </div>
        <div>
          <h2>Suas tarefas</h2>
          <TaskList taskList={tasklist} handleDelete={deleteTask} handleEdit={editTask}/>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
