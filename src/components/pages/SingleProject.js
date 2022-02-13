import styles from './SingleProject.module.css'

import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Loading from "../layout/Loading";
import Container from '../layout/Container';
import ProjectForm from '../project/ProjectFrom';
import Message from '../layout/Message';

function SingleProject() {

    const { id } = useParams()
    const [project, setProject] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [message, setMessage] = useState('');
    const [type, setType] = useState('');

    useEffect(() => {

        setTimeout(() => {

            fetch(`http://localhost:5000/projects/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((resp) => resp.json())
                .then((data) => {
                    setProject(data)
                })
                .catch(err => console.log(`singleProject-Erro: ${err}`))

        }, 1000)

    }, [id])

    function toggleProjecForm() {
        setShowProjectForm(!showProjectForm)
    }

    function editPost(project) {
        if (project.budget < project.cost) {
            //mensagem
            setMessage('O orçamento deve ser maior que o custo')
            setType('fail')
            return false
        }

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),
        })
            .then((resp) => resp.json())
            .then((data) => {
                setProject(data)
                setShowProjectForm(false)
                setMessage('Projeto atualizado com sucesso!')
                setType('success')
            })
            .catch(err => console.log(`singleProject-Erro-Update: ${err}`))
    }

    return (
        <>
            {project.name ? (

                <div className={styles.project_details}>
                    <Container customClass="column">
                        {message && <Message type={type} msg={message}/>}
                        <div className={styles.details_container}>
                            <h1>Projeto: {project.name}</h1>
                            <button className={styles.btn} onClick={toggleProjecForm}>
                                {!showProjectForm ? 'Editar projeto' : 'Fechar'}
                            </button>
                            {!showProjectForm ? (
                                <div className={styles.project_info}>
                                    <p>
                                        <span>Categoria: </span>{project.category.name}
                                    </p>
                                    <p>
                                        <span>Total do projeto: </span>R${project.budget}
                                    </p>
                                    <p>
                                        <span>Total utilizado: </span>R${project.cost}
                                    </p>
                                </div>
                            ) : (
                                <div className={styles.project_info}>
                                    <ProjectForm
                                        handleSubmit={editPost}
                                        btntext='Concluir edição'
                                        projectData={project}
                                    />
                                </div>
                            )}
                        </div>
                    </Container>
                </div>
            ) : (
                <Loading />
            )}
        </>
    )
}

export default SingleProject;