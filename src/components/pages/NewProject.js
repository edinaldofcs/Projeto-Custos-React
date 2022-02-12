import { useNavigate  } from 'react-router-dom'
import ProjectForm from '../project/ProjectFrom';
import styles from './NewProject.module.css'

function NewProject() {

    const history = useNavigate()

    function createPost(project) {
        //initialize cost and services
        project.cost = 0
        project.services = []

        fetch('http://localhost:5000/projects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),
        }).then((resp) => resp.json())
            .then((data) => {
                // console.log(data)
                history('/projects', {message: 'projeto criado com sucesso'})
            })
            .catch(err => console.log(err))
    }


    return (

        <div className={styles.newProjectContainer}>

            <h1>Criar Projeto</h1>
            <p>Crie seu projeto, para depois adicionar os serviços</p>
            <ProjectForm btntext="criar projeto" handleSubmit={createPost} />
        </div>
    );
}

export default NewProject;