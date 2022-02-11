import styles from './Home.module.css'
import savings from '../../img/savings.svg'
import BtnLink from '../layout/BtnLink';

function Home(){

    return(
        <section className={styles.homeContainer}>
            <h1> Bem vindo ao <span>costs</span></h1>
            <p>Comece a gerenciar seus projetos agora mesmo</p>
            <BtnLink to="/newproject" text="Criar projeto"/>
            <img src={savings} alt="costs"/>

        </section>
    );
}

export default Home;