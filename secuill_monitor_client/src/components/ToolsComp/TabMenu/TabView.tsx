import React from 'react'
import styles from './TabView.module.css'
import { v4 as uuidv4 } from 'uuid'

export interface ITableView{
	tabName: string
	tabIco: React.JSX.Element | undefined
	tabContent: React.JSX.Element | undefined
}

const tabIndex = [
	styles.tab_content_first,
	styles.tab_content_2,
	styles.tab_content_3,
	styles.tab_content_4,
	styles.tab_content_5,
	styles.tab_content_6,
	styles.tab_content_7,
	styles.tab_content_8,
	styles.tab_content_9,
	styles.tab_content_last,
]

const TabView= (props: {tabViewData: ITableView[], children: any | undefined }) => {
	
	// tab display tab first, tab content2, tab content3, n.., tab last
    return(
		<div className={`${ styles.pcss3t } ${ styles.pcss3t_effect_scale } ${ styles.pcss3t_theme_1 }`}>		
			{
				props.tabViewData.map((iIab, index) => (
					<React.Fragment>
						<input key={ uuidv4() } type="radio" name="pcss3t" id={`tab` + (index + 1)} className={`${ tabIndex[index] }`} />
						<label htmlFor={`tab` + (index + 1)}> { iIab.tabIco } { iIab.tabName }</label>
					</React.Fragment>					
				))
			}

			<ul key={ uuidv4() }>
				{
					props.tabViewData.map((iIab, index) => (
						<React.Fragment>
							<li className={`${ styles.tab_content } ${ tabIndex[index] } ${ styles.typography }`}>
								{ iIab.tabContent }							
							</li>
						</React.Fragment>					
					))
				}
			</ul>

			{ props.children }
			
		</div>
    )
}

export default TabView;