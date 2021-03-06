import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import ProductGroupPie from './PieGraphs/ProductGroupPie';
import PartnerCountryPie from './PieGraphs/PartnerCountryPie';
import DateSelect from './DateSelect';

class PieGraphs extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      time_period: this.props.form_options[this.props.form_options.length - 1].value
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({time_period: e});
  }

  render() {
    return (
      <div className="pure-u-1 pure-g">
        <div className="pure-u-1 pure-u-xl-1-2 explorer__primary-graph">
          <div className="explorer__form-content">
            <form className="explorer__form">
              <fieldset>
                <legend>Pie Graphs Form</legend>
                <DateSelect name="piePeriod" form_options={this.props.form_options} onChange={this.handleChange} default_val={this.state.time_period} label="Pie Graphs Time Interval" />
              </fieldset>
            </form>
          </div>

          <ProductGroupPie data={this.props.data.product_group_entry} query={this.props.query} last_updated={this.props.data.source_last_updated} time_period={this.state.time_period} />
        </div>
        
        <div className="pure-u-1 pure-u-xl-1-2 explorer__second-graph-pie">
          <PartnerCountryPie data={this.props.data.partner_country_entry} query={this.props.query} last_updated={this.props.data.source_last_updated} time_period={this.state.time_period} />
        </div>
      </div>
    );
  }
}

export default PieGraphs;