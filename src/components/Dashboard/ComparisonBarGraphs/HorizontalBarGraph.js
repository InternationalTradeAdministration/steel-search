import React from 'react';
import PropTypes from 'prop-types';
import { values, pickBy, has, omit, map, startCase, pick } from '../../../utils/lodash';
import moment from 'moment';
import { HorizontalBar } from 'react-chartjs-2';
import { ComparisonBarColors } from '../GraphColors';
import Modal from '../Modals/ComparisonBarModal';

class HorizontalBarGraph extends React.Component {
  constructor(props){
    super(props);
    this.state = { modalOpen: false };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.onModalLinkClick = this.onModalLinkClick.bind(this);
  }

  openModal() {
    this.setState({modalOpen: true});
  }

  closeModal() {
    this.setState({modalOpen: false});
  }

  onModalLinkClick(event){
    event.preventDefault();
    this.openModal();
  }

  render(){
    const { data_entries, labels, query, time_periods, title } = this.props;
    const ytd_label = 'YTD ' + data_entries[0].ytd_end_month + ' ';

    const datasets = map(time_periods, (time_period, i) => {
      return (
      {
        label: time_period.replace('sum_', '').replace('ytd_', ytd_label),
        fill: false,
        backgroundColor:  ComparisonBarColors[i],
        data: map(data_entries, (entry) => { return entry[time_period]/1000; })
      }
        );
    });
    const chart_key = map(datasets, (data) => {
      return data.label;
    }).join(',');

    const chartData = {
      labels: labels,
      datasets: datasets
    };
    
    const x_axis_label = query.flow_type === 'QTY' ? 'Thousands of Metric Tons' : 'Thousands of U.S. Dollars';
    const chartOptions = {
      title: {
        display: false
      },
      legend: {
        display: true,
        position: 'right',
        onClick: function(e){ e.stopPropagation(); }
      },
      tooltips: {
        callbacks: {
          label: function(tooltipItem, data){
            return parseFloat(tooltipItem.xLabel.toFixed(2)).toLocaleString();
          }
        }
      },
      scales: { 
        xAxes: [{
          ticks: {
            maxTicksLimit: 15,
            beginAtZero: true,
            userCallback: function(value, index, values) {
              return parseFloat(value.toFixed(2)).toLocaleString();
            }
          },
          scaleLabel: {
            display: true,
            labelString: x_axis_label
          }
        }]
      },
      maintainAspectRatio: false
    };

    return  (
      <div>
        <h3 className="explorer__chart-title">
          {title + ' - '}
          <a href="#" onClick={this.onModalLinkClick}>View Data</a>
        </h3>
        <div className="explorer__bar-graph">
          <HorizontalBar key={chart_key} data={chartData} options={chartOptions} />
        </div>
        <Modal modalOpen={this.state.modalOpen} closeModal={this.closeModal} labels={labels} data={datasets} query={query} title={title}/>
      </div>
    );
  }
};

export default HorizontalBarGraph;
