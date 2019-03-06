import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import ProductGroupPie from '../../../../components/Dashboard/PieGraphs/ProductGroupPie';
import test_data from '../test_data';

jest.mock('react-chartjs-2', () => ({
  Pie: () => null
}));

configure ({ adapter: new Adapter() });

function setup() {
  const props = {};
  props.query = test_data.query;
  props.data = test_data.dashboardData.product_group_entry;
  props.last_updated = test_data.dashboardData.source_last_updated;
  props.time_period = 'ytd_2017';

  const wrapper = mount(<ProductGroupPie {...props} />);

  return {
    props,
    wrapper
  };
}

describe('components', () => {
  describe('ProductGroupPie', () => {
    it('should render the graph title', () => {
      const { wrapper } = setup();
  
      const heading = wrapper.find('h3');
      expect(heading.hasClass('explorer__chart-title')).toBe(true);
      expect(heading.text()).toBe('Share of United States Imports from Top 5 Partner Countries of All Steel Mill Products in Metric Tons - YTD Jun 2017 - View Data');
    });

    it('should render the graph with the correct data and labels', () => {
      const { wrapper } = setup();
      
      expect(wrapper.find('PieGraph').props().data_values).toEqual(
          ['8.87', '0.37', '0.14', '0.10', '0.08', '90.45']
        );
      expect(wrapper.find('PieGraph').props().labels).toEqual(
        [
          'Mexico',
          'Egypt',
          'Finland',
          'Colombia, foo',
          'Guatemala',
          'Rest of the World'
        ]
      );
    });

    it('should render the footnote', () => {
      const { wrapper } = setup();

      const footnote = wrapper.find('p');
      expect(footnote.hasClass('explorer__graph-footnote')).toBe(true);
      expect(footnote.text()).toBe('Source: U.S. Department of Commerce, Enforcement and Compliance.  Includes content supplied by IHS Global Ltd.; Copyright © IHS Global, Ltd., 2018. All rights reserved.  Updated on 09-14-2017.  Trade covered in the table is 17,852,770.02 metric tons.');
    });
  });
});