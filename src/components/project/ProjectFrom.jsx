import { useEffect, useState } from 'react';

import styles from './ProjectForm.module.css'
import Input from '../form/Input'
import Select from '../form/Select';
import Buttonsubmit from '../form/Buttonsubmit';
import react from 'react';

function ProjectForm({ btntext, handleSubmit, projectData }) {

    const [categories, setCategories] = useState([]);
    const [project, setProject] = useState(projectData || {})

    useEffect(() => {

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
    }, [])

    const submit = (e) => {
        e.preventDefault();
        handleSubmit(project)
        // console.log(project)
    }

    function handleChange(e) {
        setProject({ ...project, [e.target.name]: e.target.value })
        // console.log(project)
    }

    function handleCategory(e) {
        setProject({
            ...project,
            category: {
                id: e.target.value,
                name: e.target.options[e.target.selectedIndex].text,
            },
        })
    }

    return (

        <form onSubmit={submit} className={styles.form}>

            <Input
                type="text"
                placeholder="insira o nome do projeto"
                text="Nome do projeto"
                name="name"
                handleOnChange={handleChange}
                value={project.name ? project.name : ''}
            />


            <Input
                type="number"
                placeholder="insira o orçamento total"
                text="Orçamento do projeto"
                name="budget"
                handleOnChange={handleChange}
                value={project.budget ? project.budget : ''}

            />

            <Select
                text='Selecione a categoria'
                name='category_id'
                options={categories}
                handleOnChange={handleCategory}
                value={project.category ? project.category.id : ''}
            />
            <Buttonsubmit
                text={btntext}
            />
        </form>
    );
}

export default ProjectForm;