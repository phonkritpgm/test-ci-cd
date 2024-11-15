/* App.js */
import { Component } from 'react';
// @ts-ignore
import CanvasJSReact from '@canvasjs/react-charts';
 
// const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;
class ColumnChart extends Component {
	render() {
		const options = {
			title: {
				text: "Basic Column Chart"
			},
			data: [
			{
				// Change type to "doughnut", "line", "splineArea", etc.
				type: "column",
				dataPoints: [
					{ label: "00:00", y: 10  },
					{ label: "01:00", y: 15  },
					{ label: "02:00", y: 25  },
					{ label: "03:00", y: 30  },
					{ label: "04:00", y: 28  },
					{ label: "05:00", y: 28  },
					{ label: "06:00", y: 28  },
					{ label: "07:00", y: 28  },
					{ label: "08:00", y: 28  },
					{ label: "09:00", y: 28  },
					{ label: "10:00", y: 28  },
					{ label: "11:00", y: 28  },
					{ label: "12:00", y: 28  },
					{ label: "13:00", y: 28  },
					{ label: "14:00", y: 28  },
					{ label: "15:00", y: 28  },
					{ label: "16:00", y: 28  },
					{ label: "17:00", y: 28  },
					{ label: "18:00", y: 28  },
					{ label: "19:00", y: 28  },
					{ label: "20:00", y: 28  },
					{ label: "21:00", y: 28  }
				]
			}
			]
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
export default ColumnChart;         