import '@babel/polyfill';

const footnote = 'Source: U.S. Department of Commerce, Enforcement and Compliance.  Includes content supplied by IHS Global Ltd.; Copyright © IHS Global, Ltd. All rights reserved.';
const monitor_link = 'https://www.trade.gov/steel/global-monitor.asp';
const GSTM2_link = 'https://beta.trade.gov/gstmcompare';
const faqs_link = 'https://www.trade.gov/steel/pdfs/faqs.pdf';

const config = Object.assign({
  endpoints: {
    development: {
      api: {
        steel: {
          host: 'https://api.trade.gov/gateway/v1/steel_data/search',
          accessToken: 'b0045391-2ef8-3049-a215-f78b7716f045'
        }
      }
    },
    test: {
      api: {
        steel: {
          host: 'http://127.0.0.1:3000/gateway/v1/steel_data/search',
          accessToken: 'devkey'
        }
      }
    },
    production: {
      api: {
        steel: {
          host: 'https://api.trade.gov/gateway/v1/steel_data/search',
          accessToken: 'b0045391-2ef8-3049-a215-f78b7716f045'
        }
      }
    },
    staging: {
      api: {
        steel: {
          host: 'https://api.trade.gov/gateway/v1/steel_data_staging/search',
          accessToken: 'b0045391-2ef8-3049-a215-f78b7716f045'
        }
      }
    }
  },
  monitor_link: monitor_link,
  GSTM2_link: GSTM2_link,
  footnote: footnote,
  faqs_link: faqs_link
});

export default config;
