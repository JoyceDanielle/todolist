import * as React from 'react';

import styles from './Modal.module.css';

export interface IModalProps {
    children: React.ReactNode,
}

const Modal = (props: IModalProps ) => {

    const closeModal = (e:React.MouseEvent): void =>{
        const modal = document.querySelector("#modal");
        modal?.classList.add("hide")
    }

    return (
      <div id='modal' className='hide'>
        <div className={styles.fade} onClick={closeModal}></div>
        <div className={styles.modal}>
            <h2>Texto modal</h2>
            {props.children}
        </div>
      </div>
    );
}

export default  Modal;
