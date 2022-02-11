import { Link } from 'react-router-dom';
import styles from './BtnLink.module.css'

function BtnLink({to, text}){
    return(
        <Link className={styles.btn} to={to}>
            {text}
        </Link>
    )
}

export default BtnLink;