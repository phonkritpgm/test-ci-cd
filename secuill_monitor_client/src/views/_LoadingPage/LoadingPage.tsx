import React from 'react'
import styles from './LoadingPage.module.css'
export const LoadingPage = () => {
    return(
        <React.Fragment>
            <div className={ styles.loading } />
            <div className={ styles.loader_container }>
                <div className={ styles.loading_text }>Loading 
                    <span className={ styles.dots }></span>
                </div>
            </div>
        </React.Fragment>     
    )
}