import '@babel/polyfill';

const footnote = 'Source: U.S. Department of Commerce, Enforcement and Compliance.  Includes content supplied by IHS Global Ltd.; Copyright © IHS Global, Ltd. All rights reserved.';
const monitor_link = 'https://www.trade.gov/steel/global-monitor.asp';
const faqs_link = 'https://www.trade.gov/steel/pdfs/faqs.pdf';

const config = Object.assign({
  endpoints: {
    development: {
      api: {
        steel: {
          host: 'https://api.trade.gov/v1/steel_data/search',
          apiKey: 'z0HcA6rliy9k8c6kymR4kjNc'
        }
      }
    },
    test: {
      api: {
        steel: {
          host: 'http://127.0.0.1:3000/v1/steel_data/search',
          apiKey: 'devkey'
        }
      }
    },
    production: {
      api: {
        steel: {
          host: 'https://api.trade.gov/v1/steel_data/search',
          apiKey: 'z0HcA6rliy9k8c6kymR4kjNc'
        }
      }
    },
    staging: {
      api: {
        steel: {
          host: 'https://api.trade.gov/v1/steel_data_staging/search',
          apiKey: 'FGjwxfSkdeVB2GncULww_uFb'
        }
      }
    }
  },
  monitor_link: monitor_link,
  footnote: footnote,
  faqs_link: faqs_link
});

export default config;
