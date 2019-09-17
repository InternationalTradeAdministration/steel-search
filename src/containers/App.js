import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { camelCase, isEmpty, map, omit, omitBy, reduce, snakeCase, values } from '../utils/lodash';
import { stringify } from 'querystring';
import { DashboardForm, Spinner, YearlyBarGraph, ComparisonBarGraphs, PieGraphs, DashboardFootnote } from '../components';
import { fetchResultsIfNeeded, requestFormOptions, requestTradeFlowSubgroups, requestReporterSubgroups } from '../actions';
import './App.scss';
import config from '../config.js';

class App extends React.Component {
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    const { endpointKey, dispatch, query } = this.props;
    dispatch(requestFormOptions(this.props.endpointKey));
    dispatch(requestTradeFlowSubgroups(endpointKey, query.trade_flow));
    dispatch(requestReporterSubgroups(endpointKey, query.trade_flow, query.reporter_countries));
  }

  componentDidMount() {
    const { endpointKey, dispatch, query } = this.props;
    dispatch(fetchResultsIfNeeded(endpointKey, query));
  }

  handleSubmit(form) {
    let form_values = values(form);
    let error = {};
    for(let field in form){
      if(form[field] === null){
        error[field] = 'This value is required.';
      }
    }
    if(!isEmpty(error)){
      throw new SubmissionError(error);
    }
    const params = reduce(omitBy(form, isEmpty), (result, value, _key) => {
      const key = snakeCase(_key);
      return Object.assign(
        result, { [key]: Array.isArray(value) ? map(value, 'value').join(',') : value });
    }, {});
    this.props.dispatch(fetchResultsIfNeeded(this.props.endpointKey, params));
    this.push(params);
  }

  push(params) {
    this.props.history.push(`?${stringify(params)}`);
  }

  render() {
    const { query, results, form_options } = this.props;
    const form_values = reduce(
      query,
      (result, value, key) => Object.assign(result, { [camelCase(key)]: value }),
      {});
    let message, yearly, comparisons, pies, download_button;
    if (results.error != "")
      message = <div className="explorer__result">{results.error}</div>;
    else if(results.isFetching == false && !isEmpty(results.dashboardData)){
      message = null;
      yearly = <YearlyBarGraph data={results.dashboardData} query={results.query} />;
      comparisons = <ComparisonBarGraphs data={results.dashboardData} query={results.query} form_options={results.timePeriods} />;
      pies = <PieGraphs data={results.dashboardData} query={results.query} form_options={results.timePeriods} />
    }

    return (
      <div className="explorer pure-g">
        <a id="GSTM2_banner" href={config.GSTM2_link} target="_blank" rel="noopener noreferrer">View the Comparison Dashboard</a>
        <div className="pure-u-1 pure-u-xl-1-2 explorer__first-row">
          <div className="explorer__form-content">
            <h1 className="Header-1"><a href={config.monitor_link} target="_blank"><b>Global Steel Trade Monitor</b></a></h1>
            <p className="DefaultParagraph-1">
              Search for steel trade data from the perspective of the importing or exporting country (Reporting Country).
              First select a Trade Flow, then Reporting Country, Partner Country, Product Group, and Quantity or Value.
              Click Generate Dashboard to update the graphs and downloadable data.
            </p>
            <p>
              Please cite the data and graphs as: U.S. Department of Commerce, Enforcement and Compliance using data from IHS Markit - Global Trade Atlas sourced from the reporting country's official statistics.
            </p>
            <p> <b>All fields are required.</b> <span className="explorer__faqs-link"><a href={config.faqs_link} target="_blank"><b>FAQs</b></a></span> </p>

            <DashboardForm onSubmit={this.handleSubmit} initialValues={form_values} formOptions={form_options} dispatch={this.props.dispatch} results={results} endpointKey={this.props.endpointKey} />

            <Spinner active={results.isFetching} />
            {message}
          </div>
        </div>

        {yearly}
        {comparisons}
        {pies}

        <DashboardFootnote />
      </div>
    );
  }
}
App.propTypes = {
  endpointKey: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  query: PropTypes.object.isRequired,
  results: PropTypes.object,
  form_options: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  let query = ownProps.history.getCurrentLocation().query;
  if (isEmpty(ownProps.history.getCurrentLocation().query)){
    query = {flow_type: "QTY", partner_countries: "World", product_groups: "All Steel Mill Products", reporter_countries: "United States", trade_flow: "IMP" };
  }
  const { results, form_options } = state;
  const endpointKey = ownProps.endpointKey || 'production';

  return {
    endpointKey,
    query,
    results,
    form_options
  };
}

export default connect(mapStateToProps)(App);
