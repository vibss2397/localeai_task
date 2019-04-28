import React, {
    Component
} from "react";
import ReactEcharts from "echarts-for-react";
import "../App.css";

class PieChart extends Component {
componentDidMount(){
    console.log(this.props.data.values);
}
getOption = () => ({
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },

    visualMap: {
        show: false,
        min: 80,
        max: 600,
        inRange: {
            colorLightness: [0, 1]
        }
    },
    series : [
        {
            name: this.props.data.label,
            type:'pie',
            radius : this.props.data.radius,
            center: ['50%', '50%'],
            data:this.props.data.values,
            roseType: 'radius',
            label: {
                normal: {
                    textStyle: {
                        color: 'rgba(0, 0, 0, 1)'
                    }
                }
            },
            labelLine: {
                normal: {
                    lineStyle: {
                        color: '#255'
                    },
                    smooth: 0.2,
                    length: 10,
                    length2: 20
                }
            },
            itemStyle: {
                normal: {
                    color: this.props.data.color,
                    shadowBlur: 200,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            },

            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function (idx) {
                return Math.random() * 200;
            }
        }
    ]
    });
render() {
return ( 
<div className = "App" >  
  <ReactEcharts option={this.getOption()} style={{ height: 150 }} /> </div>
   );
  }
 }
export default PieChart;