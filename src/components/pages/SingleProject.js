import styles from './SingleProject.module.css'

import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Loading from "../layout/Loading";
import Container from '../layout/Container';
import ProjectForm from '../project/ProjectForm';
import Message from '../layout/Message';
import ServiceForm from '../service/ServiceForm';

import { parse, v4 as uuidv4 } from 'uuid'
import ServiceCard from '../service/ServiceCard';

function SingleProject() {

    const { id } = useParams()
    const [project, setProject] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [message, setMessage] = useState('');
    const [type, setType] = useState('');
    const [showServiceForm, setShowServiceForm] = useState(false);
    const [services, setServices] = useState([])

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
                    setServices(data.services)
                })
                .catch(err => console.log(`singleProject-Erro: ${err}`))

        }, 1000)

    }, [id])

    function toggleProjecForm() {
        setShowProjectForm(!showProjectForm)
    }

    function editPost(project) {

        setMessage('')

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

    function toggleServiceForm(){
        setShowServiceForm(!showServiceForm)
    }

    function createService(project){
        setMessage('')

        const lastService = project.services[project.services.length - 1]
        lastService.id = uuidv4();

        const lastServiceCost = lastService.cost

        const newCost = parseFloat(project.cost) + parseFloat(lastService.cost)

        if(newCost > parseFloat(project.budget)){
            setMessage('Valor acima do limite do orçamento')
            setType('fail')
            project.services.pop()
            return false;
        }

        project.cost = newCost

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),
        })
            .then((resp) => resp.json())
            .then((data) => {
                //console.log(data)
                setMessage('Projeto atualizado com sucesso!')
                setType('success')
                setShowServiceForm(false)
            })
            .catch(err => console.log(`singleProject-Erro-Update: ${err}`))
    }

    function removeService(id, cost){

        setMessage('')
        
        const servicesUpdated = project.services.filter((element)=>
            element.id !== id
        )

        const projectUpdated = project
        projectUpdated.services = servicesUpdated
        projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost)

        fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),
        })
            .then((resp) => resp.json())
            .then((data) => {
                setProject(projectUpdated)
                setServices(servicesUpdated)
                setMessage('Serviço removido com sucesso!')
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
                        <div className={styles.service_container}>
                                <h2>Adicione um serviço:</h2>
                                <button className={styles.btn} onClick={toggleServiceForm}>
                                {!showServiceForm ? 'Adicionar serviço' : 'Fechar'}
                            </button>
                            <div className={styles.project_info}>
                                {showServiceForm && (
                                    <ServiceForm 
                                    handleSubmit={createService}
                                    textBtn="Adicionar serviço"
                                    projectData={project}
                                    />
                                )}
                            </div>
                        </div>
                        <h2>Serviço</h2>
                        <Container customClass='start'>
                        
                                {services.length > 0 ?
                                (
                                    project.services.map((element)=>(
                                        <ServiceCard 
                                        id={element.id}
                                        name={element.name}
                                        cost={element.cost}
                                        description={element.description}
                                        key={element.id}
                                        handleRemove={removeService}
                                        />
                                    ))

                                ):(
                                    <p>Não há serviços contratados</p>
                                )}
                        </Container>
                    </Container>
                </div>
            ) : (
                <Loading />
            )}
        </>
    )
}

export default SingleProject;