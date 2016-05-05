import Ember from 'ember';

export default Ember.Controller.extend({

  /* Chart */
  chartMode: 'StockChart',

  chartOptions: {
    rangeSelector : {
        selected : 1
    },
    title : {
        text : 'YHOO Stock Price'
    },
  },

  chartData: function() {
    return this.series;
  }.property("buildChartData"),

  chartSeries: [
    {name: 'Open', property: 'openValue', visible: true},
    {name: 'Close', property: 'closeValue', visible: true},
    {name: 'High', property: 'highValue', visible: false},
    {name: 'Low', property: 'lowValue', visible: false}
  ],

  buildChartData: function() {
    var self = this;
    this.series = this.chartSeries.map(function(series) {
      var data = self.get('model').map(function(item) {
        return [item.get('tradeDate').getTime(), parseFloat(item.get(series.property))];
      });
      return {
        name: series.name,
        data: data,
        visible: series.visible,
        tooltip: {
          valueDecimals: 3
        }
      };
    });
  }.observes("model"),

  tableData: function() {
    return this.model;
  }.property(),

  tableColumns: [
    {
      "propertyName": "tradeDate",
      "title": "Date"
    },
    {
      "propertyName": "openValue",
      "title": "Open",
      "template": "custom/edit_stock_value",
    },
    {
      "propertyName": "closeValue",
      "title": "Close"
    },
    {
      "propertyName": "highValue",
      "title": "High"
    },
    {
      "propertyName": "lowValue",
      "title": "Low"
    },
    {
      "propertyName": "volume",
      "title": "Volume"
    }
  ],

  theme: null,

  actions: {
    changeValue: function(stockQuote, newValue) {
      stockQuote.set('openValue', parseFloat(newValue));
      stockQuote.save();
    },
    // Not super happy about this. I think the proper way should be
    // to have an observer on the boolean flag and let that trigger
    // the show/hide.
    showSeries: function(seriesIndex, event) {
      var isVisible = event.target.checked;
      Ember.set(this.chartSeries[seriesIndex], 'visible', isVisible);
      // There must be a better way of doing this from the library itself
      // instead of using jQuery
      var chart = Ember.$('.highcharts-wrapper').highcharts();
      var series = chart.series[seriesIndex];
      series.setVisible(isVisible);
    }
  }

});
