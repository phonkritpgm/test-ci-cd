import styles from './groupBox.module.css'
interface propTypes{
    title: string
    children: React.ReactNode
}
const GroupBox = (props:propTypes) =>{
    return(
        <div className={styles.panel}>
             <p className={styles.titlePanel}>{props.title}</p>
             <br></br>
             <div className={styles.panelInput}>
                {props.children}
             </div>
        </div>
    );
};

export default GroupBox;