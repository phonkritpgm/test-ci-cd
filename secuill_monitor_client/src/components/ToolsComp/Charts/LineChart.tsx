//@ts-ignore
import CanvasJSReact from '@canvasjs/react-charts';
 
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

export interface ILineChartOption{
    animationEnabled: boolean,
    exportEnabled: boolean,
    theme: string, // "light1", "light2", "dark1", "dark2"
    title:{
        text: string
    },
    axisY: {
        title: string,
        suffix: string
    },
    axisX: {
        title: string,
        prefix: string,
        interval: number
    },
    data: [{
        type: string,
        toolTipContent: string,
        dataPoints: object
    }]
}
// reference line point marker
// https://canvasjs.com/docs/charts/basics-of-creating-html5-chart/markers/

const LineChart = (options: { options: object }) => {
    return(
        <CanvasJSChart options = { options.options }
            /* onRef={ref => this.chart = ref} */
        />
    )
}

// LineChart.defaultProps = {prop: optionsTest};

export default LineChart; 