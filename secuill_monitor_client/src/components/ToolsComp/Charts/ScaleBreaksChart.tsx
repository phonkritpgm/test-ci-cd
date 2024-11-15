import { Component } from 'react';
//@ts-ignore
import CanvasJSReact from '@canvasjs/react-charts';
 
const CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
class ScaleBreaksChart extends Component {	
	render() {
		const options = {
			animationEnabled: true,
			theme: "light",
			title: {
				text: "Prescription / hr"
			},
			axisY: {
			title: "Count-Prescription",
				scaleBreaks: {
					autoCalculate: true,
					type: "wavy",
					lineColor: "white"
				}
			},
			data: [{
				type: "column",
				indexLabel: "{y}",		
				indexLabelFontColor: "white",
				dataPoints: [
					{"label":"00:00","y":5},
					{"label":"01:00","y":1},
					{"label":"02:00","y":2},
					{"label":"03:00","y":2},
					{"label":"04:00","y":6},
					{"label":"05:00","y":2},
					{"label":"06:00","y":2} ,
					{"label":"07:00","y":0} ,
					{"label":"08:00","y":2} ,
					{"label":"09:00","y":2} ,
					{"label":"10:00","y":2} ,
					{"label":"11:00","y":2} ,
					{"label":"12:00","y":2} ,
					{"label":"13:00","y":2} ,
					{"label":"14:00","y":2} ,
					{"label":"15:00","y":2} ,
					{"label":"16:00","y":2} ,
					{"label":"17:00","y":2} ,
					{"label":"18:00","y":2} ,
					{"label":"19:00","y":2} ,
					{"label":"20:00","y":2} ,
					{"label":"21:00","y":2} ,
					{"label":"22:00","y":0} ,
					{"label":"23:00","y":0}     
				]
			}]
		}
		
		return (
		<div>
			<CanvasJSChart options = {options}
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}
 
export default ScaleBreaksChart; 