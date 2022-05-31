import React, {useState, ChangeEvent, FormEvent, useEffect} from 'react';

import styles from './TaskForm.module.css'

import {ITask} from '../interfaces/Task';

export interface ITaskFormProps {
    btnText: string,
    taskList: ITask[],
    setTasklist?: React.Dispatch<React.SetStateAction<ITask[]>>,
    task?: ITask | null,
    handleUpdate?(id:number, title:string, difficulty:number): void
}

export function TaskForm (props: ITaskFormProps) {

    const [id, setId] = useState<number>(0)
    const [title, setTitle] = useState<string>("")
    const [difficulty, setDifficulty] = useState<number>(0)

    useEffect(()=>{
        if(props.task){
            setId(props.task.id)
            setTitle(props.task.title)
            setDifficulty(props.task.difficulty)
        }
    }, [props.task])

    const addTaskHandler = (e: FormEvent<HTMLFormElement>) =>{
        e.preventDefault();

        if(props.handleUpdate){
            props.handleUpdate(id, title, difficulty)
        }else{
            const id = Math.floor(Math.random() * 1000)

            const newTask: ITask = {id, title, difficulty} 

            props.setTasklist!([...props.taskList, newTask])

            setTitle("")
            setDifficulty(0)
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) =>{
        if(e.target.name === "title"){
            setTitle(e.target.value)
        }else{
            setDifficulty(parseInt(e.target.value))
        }
    }

  return (
    <form onSubmit={addTaskHandler} className={styles.form}>
        <div className={styles.input_container}>
            <label htmlFor="title">Título</label>
            <input type="text" name='title' placeholder='Título da tarefa' onChange={handleChange} value={title}/>
        </div>
        <div className={styles.input_container}>
            <label htmlFor="difficulty">Dificuldade</label>
            <input type="text" name='difficulty' placeholder='Dificuldade da tarefa' onChange={handleChange} value={difficulty}/>
        </div>
        <input type="submit" value={props.btnText} />
    </form>
  );
}
