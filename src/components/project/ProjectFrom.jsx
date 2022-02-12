import { useEffect, useState } from 'react';

import styles from './ProjectForm.module.css'
import Input from '../form/Input'
import Select from '../form/Select';
import Buttonsubmit from '../form/Buttonsubmit';
import react from 'react';

function ProjectForm({ btntext }) {

    const [categories, setCategories] = useState([]);

    useEffect(()=>{

        fetch("http://localhost:5000/categories", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((resp) => resp.json())
            .then((data) => {
                setCategories(data);
            })
            .catch((err) => console.log(err));
    },[])


    

    return (

        <form className={styles.form}>

            <Input
                type="text"
                placeholder="insira o nome do projeto"
                text="Nome do projeto"
                name="name"
            />


            <Input
                type="number"
                placeholder="insira o orçamento total"
                text="Orçamento do projeto"
                name="budget"
            />

            <Select
                text='Selecione a categoria'
                name='category_id'
                options={categories}

            />
            <Buttonsubmit
                text={btntext}
            />
        </form>
    );
}

export default ProjectForm;