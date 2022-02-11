import styles from './ProjectForm.module.css'

function ProjectForm() {

    return (

        <form>
            <div>
                <input type="text" placeholder='insira o nome do projeto' />
            </div>
            <div>
                <input type="number" placeholder='insira o orçamento total' />
            </div>
            <div>
                <select name="category_id">
                    <option disabled selected>Selecione a Categoria</option>
                </select>
            </div>
            <div>
                <input type="submit" value="Criar projeto"/>
            </div>
        </form>
    );
}

export default ProjectForm;