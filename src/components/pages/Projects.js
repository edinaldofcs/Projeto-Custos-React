import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Message from "../layout/Message";
import Container from '../layout/Container'
import BtnLink from '../layout/BtnLink'

import styles from './Projects.module.css'
import ProjectCard from "../project/ProjectCard";
import Loading from "../layout/Loading";

function Projects() {
    const [projects, setProjects] = useState([]);
    const location = useLocation();
    const [removeLoading, setRemoveLoading] = useState(false);

    let message = ''
    if (location.state) {
        message = location.state.message
    }

    useEffect(() => {

        fetch('http://localhost:5000/projects', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((resp) => resp.json())
            .then((data) => {
                console.log(data)
                setProjects(data)
                setRemoveLoading(true)
            })
            .catch(err => console.log(err))

    }, [])

    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Projects</h1>
                <BtnLink to="/newproject" text="Criar projeto" />
            </div>
            {message && <Message type="success" msg={message} />}
            <Container customClass='start'>
                {projects.length > 0 &&
                projects.map((element)=>(

                    <ProjectCard
                    id={element.id}
                    name={element.name}
                    budget={element.budget}
                    category={element.category.name}
                    key={element.id}
                    />                    
                ))}
                {!removeLoading && <Loading/>}
                {removeLoading && projects.length === 0 &&(
                    <p>Não há projetos cadastrados</p>
                )}
            </Container>
        </div>
    );
}

export default Projects;