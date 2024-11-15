import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  // Legend,
  Label,
  ResponsiveContainer
} from "recharts";

const data = [
  {
      "label": "01",
      "y": 0
  },
  {
      "label": "02",
      "y": 0
  },
  {
      "label": "03",
      "y": 0
  },
  {
      "label": "04",
      "y": 0
  },
  {
      "label": "05",
      "y": 0
  },
  {
      "label": "06",
      "y": 0
  },
  {
      "label": "07",
      "y": 0
  },
  {
      "label": "08",
      "y": 0
  },
  {
      "label": "09",
      "y": 0
  },
  {
      "label": "10",
      "y": 0
  },
  {
      "label": "11",
      "y": 0
  },
  {
      "label": "12",
      "y": 0
  },
  {
      "label": "13",
      "y": 0
  },
  {
      "label": "14",
      "y": 0
  },
  {
      "label": "15",
      "y": 0
  },
  {
      "label": "16",
      "y": 0
  },
  {
      "label": "17",
      "y": 0
  },
  {
      "label": "18",
      "y": 0
  },
  {
      "label": "19",
      "y": 0
  },
  {
      "label": "20",
      "y": 0
  },
  {
      "label": "21",
      "y": 0
  },
  {
      "label": "22",
      "y": 0
  },
  {
      "label": "23",
      "y": 0
  },
  {
      "label": "24",
      "y": 0
  }
]

// const getIntroOfPage = (label) => {
//   if (label === 'Page A') {
//     return "Page A is about men's clothing";
//   }
//   if (label === 'Page B') {
//     return "Page B is about women's dress";
//   }
//   if (label === 'Page C') {
//     return "Page C is about women's bag";
//   }
//   if (label === 'Page D') {
//     return 'Page D is about household goods';
//   }
//   if (label === 'Page E') {
//     return 'Page E is about food';
//   }
//   if (label === 'Page F') {
//     return 'Page F is about baby food';
//   }
//   return '';
// };

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ lineHeight: "1.2em", width: "auto", borderRadius: "10px", padding: "8px" ,backgroundColor: "#fcfcfc", opacity: "0.8", border: "solid 1px rgba(233, 240, 244, 0.9)" }}>
        <p style={{ fontSize: "0.8em", fontWeight: "600", color: "#8884d8" }}>ช่วงเวลา ( { (parseInt(label) - 1).toString().padStart(2, "0") } - { label } )</p>
        <p style={{ fontSize: "0.7em", textAlign: "center", color: "#1aa7f3" }}>{`${"Count "} : ( ${payload[0].value} )`}</p>
        {/* <p className="intro">{getIntroOfPage(label)}</p> */}
      </div>
    );
  }

  return <></>;
};

class CustomizedLabel extends React.PureComponent {
  render() {
    const { x, y, value }: any = this.props;

    return (
      <text x={x} y={y} dy={-9} fill="gray" fontSize={"0.7em"} textAnchor="middle">
        {value}
      </text>
    );
  }
}

class CustomizedXAxisTick extends React.PureComponent {
  render() {
    const { x, y, payload }: any = this.props;

    return (
      <g transform={`translate(${x},${y})`}>
        <text x={5} y={0} dy={16} textAnchor="end" fill="gray" fontWeight={600} fontSize={"0.8em"} transform="rotate(0)">
          {payload.value}
        </text>
      </g>
    );
  }
}

class CustomizedYAxisTick extends React.PureComponent {
  render() {
    const { x, y, payload }: any = this.props;

    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={-12} dy={16} textAnchor="end" fill="gray" fontWeight={600} fontSize={"0.7em"} transform="rotate(0)">
          {payload.value}
        </text>
      </g>
    );
  }
}

function RechartChartLine(props: {
  data: object[],
}){
  return (
    <div style={{padding: "10px", width: "100%", height: "auto"}}>
      <div style={{ position: "absolute", 
                    width: "100%", 
                    textAlign: "center", 
                    fontSize: "1.2em",
                    fontWeight: "600", 
                    color: "rgb(0, 130, 31)"}}>Prescription count / hr</div>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart 
            // width={1000}
            // height={300}
            data={ props == undefined ? ( data ) : props.data.length == 0 || props.data.length == undefined ? ( data ) : props.data }
            margin={{
              top: 50,
              right: 10,
              left: 10,
              bottom: 10
            }} 
          >          
            <CartesianGrid strokeDasharray="3 3" />    
            <XAxis tickSize={1} textRendering="" dataKey="label" height={60} tick={<CustomizedXAxisTick />}>
              <Label value="Hour ( 01 - 24 )" fill="#8884d8" fontWeight={600} fontSize={"1em"} offset={8} position="insideBottom" />
            </XAxis>
            <YAxis 
              label={{fill:"#8884d8", fontWeight:600, value: 'Prescription count', angle: -90, position: 'insideBottomLeft', y: 30, offset: 10, fontSize: "0.9em"}}
              tick={<CustomizedYAxisTick />} 
              domain={[0, 'dataMax + 1']}
            >
              {/* <Label
                style={{
                    // textAnchor: "middle",
                    textAlign: "center",
                    fontSize: "14px",
                    padding: "10px",
                    fill: "#8884d8",     
                }}
                
                angle={270} 
                value="Prescription count" 
              /> */}
            </YAxis>
            <Tooltip content={<CustomTooltip />} />
            {/* <Legend iconType={'line'} /> */}
            <Line
              type="linear"
              dataKey="y"
              stroke="#8884d8"
              activeDot={{ r: 6 }}
              label={<CustomizedLabel />}
            >
            </Line>
            {/* insideTop */}
            {/* <Line type="monotone" dataKey="y" stroke="#82ca9d" /> */}
          </LineChart>
        </ResponsiveContainer>
    </div>
  );
}

const defaultProps = {
  data: data,
};
RechartChartLine.defaultProps = defaultProps;
export default RechartChartLine;

// type customTypeString = "A" | "B" | "C"
// const testType: customTypeString = "s"

// position
// | 'top' | 'left' | 'right' | 'bottom' | 'inside' 
// | 'outside' | 'insideLeft' | 'insideRight' | 'insideTop' 
// | 'insideBottom' | 'insideTopLeft' | 'insideBottomLeft' 
// | 'insideTopRight' | 'insideBottomRight' | 'insideStart' 
// | 'insideEnd' | 'end' | 'center' | 'centerTop' | 'centerBottom' | 'middle'

// type
// | "step" | "basis" | "basisClosed" | "basisOpen" 
// | "bumpX" | "bumpY" | "bump" | "linear" | "linearClosed" 
// | "natural" | "monotoneX" | "monotoneY" | "monotone" 
// | "stepBefore" | "stepAfter" |


