
import styles from './Buttonsubmit.module.css'

function Buttonsubmit({text}) {

    return (
        <div>
              <button className={styles.btn}>{text}</button>
        </div>
    )
}

export default Buttonsubmit;