/* App.js */
import { Component } from 'react';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore @ts-expect-error
import CanvasJSReact from '@canvasjs/react-charts';
//var CanvasJSReact = require('@canvasjs/react-charts');

// const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;
const updateInterval = 500;
class DynamicChart extends Component {
	private chart: any;
	constructor() {
		super({});
		this.updateChart = this.updateChart.bind(this);
	}
	componentDidMount(){
		setInterval(this.updateChart, updateInterval);
	}
	updateChart() {
		let dpsColor, dpsTotal = 0, deltaY, yVal;
		const dps = this.chart.options.data[0].dataPoints;
		const chart = this.chart;
		for (let i = 0; i < dps.length; i++) {
			deltaY = Math.round(2 + Math.random() *(-2-2));
			yVal = deltaY + dps[i].y > 0 ? (deltaY + dps[i].y < 100 ? dps[i].y + deltaY : 100) : 0;
			dpsColor = yVal >= 90 ? "#e40000" : yVal >= 70 ? "#ec7426" : yVal >= 50 ? "#81c2ea" : "#88df86 ";
			dps[i] = {label: "Core "+(i+1) , y: yVal, color: dpsColor};
			dpsTotal += yVal;
		}
		chart.options.data[0].dataPoints = dps;
		chart.options.title.text = "CPU Usage " + Math.round(dpsTotal / 6) + "%";
		chart.render();
	}
	render() {
		const options = {
			theme: "dark2",
			title: {
				text: "CPU Usage"
			},
			subtitles: [{
				text: "Intel Core i7 980X @ 3.33GHz"
			}],
			axisY: {
				title: "CPU Usage (%)",
				includeZero: true,
				suffix: "%",
			maximum: 100
			},
			data: [{
				type: "column",
				yValueFormatString: "#,###'%'",
				indexLabel: "{y}",
				dataPoints: [
					{ label: "Core 1", y: 68 },
					{ label: "Core 2", y: 3 },
					{ label: "Core 3", y: 8 },
					{ label: "Core 4", y: 87 },
					{ label: "Core 5", y: 2 },
					{ label: "Core 6", y: 6 }
				]
			}]
		}
		return (
			<div>
				<CanvasJSChart options = {options} onRef={(ref: any) => this.chart = ref} />
				{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
			</div>
		);
	}
}
export default DynamicChart; 