import styles from './ProjectForm.module.css'
import Input from '../form/Input'
import Select from '../form/Select';
import Buttonsubmit from '../form/Buttonsubmit';

function ProjectForm({btntext}) {

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
            name ='category_id' 
            
            />
            <Buttonsubmit
            text={btntext}
            />
        </form>
    );
}

export default ProjectForm;