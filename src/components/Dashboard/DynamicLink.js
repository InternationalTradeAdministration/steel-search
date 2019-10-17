import { map, omit, values, isEmpty } from '../../utils/lodash';
import React from 'react';
import PropTypes from 'prop-types';

const TRADE_FLOWS = {
	'IMP': 'Imports',
	'EXP': 'Exports'	
};

const URLS = {
	'EXP': {
		'China': 'https://www.trade.gov/steel/countries/exports/china.asp',
		'Japan': 'https://www.trade.gov/steel/countries/exports/japan.asp',
		'Russia': 'https://www.trade.gov/steel/countries/exports/russia.asp',
		'Korea': 'https://www.trade.gov/steel/countries/exports/korea.asp',
		'Germany': 'https://www.trade.gov/steel/countries/exports/germany.asp',
		'Ukraine': 'https://www.trade.gov/steel/countries/exports/ukraine.asp',
		'Italy': 'https://www.trade.gov/steel/countries/exports/italy.asp',
		'Belgium': 'https://www.trade.gov/steel/countries/exports/belgium.asp',
		'Turkey': 'https://www.trade.gov/steel/countries/exports/turkey.asp',
		'France': 'https://www.trade.gov/steel/countries/exports/france.asp',
		'Brazil': 'https://www.trade.gov/steel/countries/exports/brazil.asp',
		'Taiwan': 'https://www.trade.gov/steel/countries/exports/taiwan.asp',
		'Netherlands': 'https://www.trade.gov/steel/countries/exports/dutch.asp',
		'India': 'https://www.trade.gov/steel/countries/exports/india.asp',
		'Spain': 'https://www.trade.gov/steel/countries/exports/spain.asp',
		'United States': 'https://www.trade.gov/steel/countries/exports/us.asp',
		'Austria': 'https://www.trade.gov/steel/countries/exports/austria.asp',
		'Canada': 'https://www.trade.gov/steel/countries/exports/canada.asp',
		'Poland': 'https://www.trade.gov/steel/countries/exports/poland.asp',
		'Slovakia': 'https://www.trade.gov/steel/countries/exports/slovakia.asp',
		'Iran': 'https://www.trade.gov/steel/countries/exports/iran.asp',
		'Eu28 (External)': 'https://www.trade.gov/steel/countries/exports/eu.asp',
		'Czech Republic': 'https://www.trade.gov/steel/pdfs/global-monitor-report-2017.pdf',
		'Indonesia': 'https://www.trade.gov/steel/pdfs/global-monitor-report-2017.pdf',
		'Malaysia': 'https://www.trade.gov/steel/pdfs/global-monitor-report-2017.pdf',
		'Mexico': 'https://www.trade.gov/steel/pdfs/global-monitor-report-2017.pdf',
		'Philippines': 'https://www.trade.gov/steel/pdfs/global-monitor-report-2017.pdf',
		'Thailand': 'https://www.trade.gov/steel/pdfs/global-monitor-report-2017.pdf',
	},

	'IMP': {
		'United States': 'https://www.trade.gov/steel/countries/imports/us.asp',
		'Germany': 'https://www.trade.gov/steel/countries/imports/germany.asp',
		'Korea': 'https://www.trade.gov/steel/countries/imports/korea.asp',
		'Italy': 'https://www.trade.gov/steel/countries/imports/italy.asp',
		'Thailand': 'https://www.trade.gov/steel/countries/imports/thailand.asp',
		'Turkey': 'https://www.trade.gov/steel/countries/imports/turkey.asp',
		'France': 'https://www.trade.gov/steel/countries/imports/france.asp',
		'China': 'https://www.trade.gov/steel/countries/imports/china.asp',
		'Belgium': 'https://www.trade.gov/steel/countries/imports/belgium.asp',
		'Poland': 'https://www.trade.gov/steel/countries/imports/poland.asp',
		'India': 'https://www.trade.gov/steel/countries/imports/india.asp',
		'Mexico': 'https://www.trade.gov/steel/countries/imports/mexico.asp',
		'Spain': 'https://www.trade.gov/steel/countries/imports/spain.asp',
		'Netherlands': 'https://www.trade.gov/steel/countries/imports/dutch.asp',
		'Malaysia': 'https://www.trade.gov/steel/countries/imports/malaysia.asp',
		'Philippines': 'https://www.trade.gov/steel/countries/imports/philippines.asp',
		'Taiwan': 'https://www.trade.gov/steel/countries/imports/taiwan.asp',
		'Canada': 'https://www.trade.gov/steel/countries/imports/canada.asp',
		'United Kingdom': 'https://www.trade.gov/steel/countries/imports/uk.asp',
		'Czech Republic': 'https://www.trade.gov/steel/countries/imports/czech.asp',
		'United States (For Domestic Consumption)': 'https://www.trade.gov/steel/countries/pdfs/imports-us.pdf',
		'Indonesia': 'https://www.trade.gov/steel/countries/imports/indonesia.asp',
		'Eu28 (External)': 'https://www.trade.gov/steel/countries/imports/eu.asp',
		'Ukraine': 'https://www.trade.gov/steel/pdfs/global-monitor-report-2017.pdf',
		'Russia': 'https://www.trade.gov/steel/pdfs/global-monitor-report-2017.pdf',
		'Japan': 'https://www.trade.gov/steel/pdfs/global-monitor-report-2017.pdf',
		'Iran': 'https://www.trade.gov/steel/pdfs/global-monitor-report-2017.pdf',
		'Brazil': 'https://www.trade.gov/steel/pdfs/global-monitor-report-2017.pdf',
		'Austria': 'https://www.trade.gov/steel/pdfs/global-monitor-report-2017.pdf',
	}
};

const DynamicLink = ({query}) => {
	if(isEmpty(query))
		return null;
	const reporter_country = query.reporter_countries;
	const trade_flow = query.trade_flow;
	const trade_flow_text = TRADE_FLOWS[trade_flow];
	return(
			<button className="explorer__button explorer__dynamic-button pure-button pure-button-primary" onClick={() => {return window.open(URLS[trade_flow][reporter_country], '_blank')}} >
				{'View ' + reporter_country + ' ' + trade_flow_text + ' ' + 'Reports'}
			</button>
		)
}

export default DynamicLink;
