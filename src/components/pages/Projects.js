import { useLocation } from "react-router-dom";
import Message from "../layout/Message";


function Projects() {

    const location = useLocation();
    let msg = ''
    if(location.state){
        msg = location.state.message
    } 
    
    return (
        <div>
            <h1>Projects</h1>
            {msg && <Message  type="success" message={msg}/>}
        </div>
    );
}

export default Projects;