import React, { PropTypes } from 'react';
import { values, pickBy, has, omit, map, startCase, pick, remove } from '../../utils/lodash';
import moment from 'moment';
import { Pie } from 'react-chartjs-2';

function compare(a, b) {
  if (a.ytd_2017 > b.ytd_2017)
    return -1;
  if (a.ytd_2017 < b.ytd_2017)
    return 1;
  return 0;
}

function buildTitle(params, ytd_end_month, time_period) {
  const units = params.flow_type === "QTY" ? "Metric Tons" : "U.S. Dollars";
  const flow = params.trade_flow === 'EXP' ? ' Exports to ' : ' Imports from ';
  const ytd_label = 'YTD ' + ytd_end_month + ' ';

  const chart_title = 'Share of ' + params.reporter_countries + flow + 'Top 5 Partner Countries of ' + params.product_groups + ' in ' + units + ' - ' + time_period.replace('sum_', '').replace('ytd_', ytd_label);
  return chart_title;
}

const Footnote = ({data, params, total}) => {
  const units = params.flow_type === "QTY" ? "metric tons" : "U.S. dollars";

  return (
    <p className="graph_footnote"> 
      Source:  U.S. Department of Commerce, Enforcement and Compliance:  Trade covered in the table is {parseFloat(total.toFixed(2)).toLocaleString()} {units}.
    </p> 
  );
}

const ProductGroupPie = ({ data, params, last_updated, time_period }) => {
  const chartTitle = buildTitle(params, data[0].ytd_end_month, time_period);

  remove(data, function(n) {
    return n.partner_country === 'Other Countries';
  });

  const sorted_data = data.sort(compare);
  const data_entries = sorted_data.slice(1, 6);
  const total = sorted_data[0][time_period];

  const labels = map(data_entries, (entry) => {
    return entry.partner_country;
  });
  labels.push('Rest of the World');

  let percentage_subtotal = 0;
  const data_values = map(data_entries, (entry) => { 
    let percentage = (entry[time_period]/total)*100;
    percentage_subtotal += percentage;
    return percentage.toFixed(2); 
  });
  data_values.push((100 - percentage_subtotal).toFixed(2));

  const datasets = [
      {
        label: 'YTD 2017',
        fill: false,
        backgroundColor:  ['rgba(215,90,0,0.7)', 'rgb(0, 158, 103)', 'rgb(235, 228, 0)', 'rgba(0,99,132,0.7)', 'rgb(196, 31, 61)', 'rgb(150, 150, 150)'],
        data: data_values,
      },
    ];

  const chartData = {
    labels: labels,
    datasets: datasets
  };

  
  const chartOptions = {
        title: {
            display: true,
            text: chartTitle,
            fontSize: 16
        },
        legend: {
            display: true
        },
        maintainAspectRatio: true
    }


  return  (
    <div>
      <div className="pie_graph">
        <Pie data={chartData} options={chartOptions} />
      </div>
      <Footnote data={data} params={params} total={total}/>
    </div>
  );
}

export default ProductGroupPie;
