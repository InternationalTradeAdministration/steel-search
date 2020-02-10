import { map, omit, values, isEmpty } from '../../utils/lodash';
import React from 'react';
import PropTypes from 'prop-types';

const TRADE_FLOWS = {
	'IMP': 'Imports',
	'EXP': 'Exports'	
};

const URLS = {
	'EXP': {
		'China': 'https://legacy.trade.gov/steel/countries/exports/china.asp',
		'Japan': 'https://legacy.trade.gov/steel/countries/exports/japan.asp',
		'Russia': 'https://legacy.trade.gov/steel/countries/exports/russia.asp',
		'Korea': 'https://legacy.trade.gov/steel/countries/exports/korea.asp',
		'Germany': 'https://legacy.trade.gov/steel/countries/exports/germany.asp',
		'Ukraine': 'https://legacy.trade.gov/steel/countries/exports/ukraine.asp',
		'Italy': 'https://legacy.trade.gov/steel/countries/exports/italy.asp',
		'Belgium': 'https://legacy.trade.gov/steel/countries/exports/belgium.asp',
		'Turkey': 'https://legacy.trade.gov/steel/countries/exports/turkey.asp',
		'France': 'https://legacy.trade.gov/steel/countries/exports/france.asp',
		'Brazil': 'https://legacy.trade.gov/steel/countries/exports/brazil.asp',
		'Taiwan': 'https://legacy.trade.gov/steel/countries/exports/taiwan.asp',
		'Netherlands': 'https://legacy.trade.gov/steel/countries/exports/dutch.asp',
		'India': 'https://legacy.trade.gov/steel/countries/exports/india.asp',
		'Spain': 'https://legacy.trade.gov/steel/countries/exports/spain.asp',
		'United States': 'https://legacy.trade.gov/steel/countries/exports/us.asp',
		'Austria': 'https://legacy.trade.gov/steel/countries/exports/austria.asp',
		'Canada': 'https://legacy.trade.gov/steel/countries/exports/canada.asp',
		'Poland': 'https://legacy.trade.gov/steel/countries/exports/poland.asp',
		'Slovakia': 'https://legacy.trade.gov/steel/countries/exports/slovakia.asp',
		'Iran': 'https://legacy.trade.gov/steel/countries/exports/iran.asp',
		'Eu28 (External)': 'https://legacy.trade.gov/steel/countries/exports/eu.asp',
		'Czech Republic': 'https://legacy.trade.gov/steel/pdfs/global-monitor-report-2017.pdf',
		'Indonesia': 'https://legacy.trade.gov/steel/pdfs/global-monitor-report-2017.pdf',
		'Malaysia': 'https://legacy.trade.gov/steel/pdfs/global-monitor-report-2017.pdf',
		'Mexico': 'https://legacy.trade.gov/steel/pdfs/global-monitor-report-2017.pdf',
		'Philippines': 'https://legacy.trade.gov/steel/pdfs/global-monitor-report-2017.pdf',
		'Thailand': 'https://legacy.trade.gov/steel/pdfs/global-monitor-report-2017.pdf',
	},

	'IMP': {
		'United States': 'https://legacy.trade.gov/steel/countries/imports/us.asp',
		'Germany': 'https://legacy.trade.gov/steel/countries/imports/germany.asp',
		'Korea': 'https://legacy.trade.gov/steel/countries/imports/korea.asp',
		'Italy': 'https://legacy.trade.gov/steel/countries/imports/italy.asp',
		'Thailand': 'https://legacy.trade.gov/steel/countries/imports/thailand.asp',
		'Turkey': 'https://legacy.trade.gov/steel/countries/imports/turkey.asp',
		'France': 'https://legacy.trade.gov/steel/countries/imports/france.asp',
		'China': 'https://legacy.trade.gov/steel/countries/imports/china.asp',
		'Belgium': 'https://legacy.trade.gov/steel/countries/imports/belgium.asp',
		'Poland': 'https://legacy.trade.gov/steel/countries/imports/poland.asp',
		'India': 'https://legacy.trade.gov/steel/countries/imports/india.asp',
		'Mexico': 'https://legacy.trade.gov/steel/countries/imports/mexico.asp',
		'Spain': 'https://legacy.trade.gov/steel/countries/imports/spain.asp',
		'Netherlands': 'https://legacy.trade.gov/steel/countries/imports/dutch.asp',
		'Malaysia': 'https://legacy.trade.gov/steel/countries/imports/malaysia.asp',
		'Philippines': 'https://legacy.trade.gov/steel/countries/imports/philippines.asp',
		'Taiwan': 'https://legacy.trade.gov/steel/countries/imports/taiwan.asp',
		'Canada': 'https://legacy.trade.gov/steel/countries/imports/canada.asp',
		'United Kingdom': 'https://legacy.trade.gov/steel/countries/imports/uk.asp',
		'Czech Republic': 'https://legacy.trade.gov/steel/countries/imports/czech.asp',
		'United States (For Domestic Consumption)': 'https://legacy.trade.gov/steel/countries/pdfs/imports-us.pdf',
		'Indonesia': 'https://legacy.trade.gov/steel/countries/imports/indonesia.asp',
		'Eu28 (External)': 'https://legacy.trade.gov/steel/countries/imports/eu.asp',
		'Ukraine': 'https://legacy.trade.gov/steel/pdfs/global-monitor-report-2017.pdf',
		'Russia': 'https://legacy.trade.gov/steel/pdfs/global-monitor-report-2017.pdf',
		'Japan': 'https://legacy.trade.gov/steel/pdfs/global-monitor-report-2017.pdf',
		'Iran': 'https://legacy.trade.gov/steel/pdfs/global-monitor-report-2017.pdf',
		'Brazil': 'https://legacy.trade.gov/steel/pdfs/global-monitor-report-2017.pdf',
		'Austria': 'https://legacy.trade.gov/steel/pdfs/global-monitor-report-2017.pdf',
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
