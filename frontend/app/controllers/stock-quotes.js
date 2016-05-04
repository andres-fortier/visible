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
    console.log(this.get('model'));
    this.series = this.chartSeries.map(function(badName) {
      var data = self.get('model').map(function(item) {
        return [item.get('tradeDate').getTime(), parseFloat(item.get(badName.property))];
      });
      return {
        name: badName.name,
        data: data,
        visible: badName.visible,
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
    toggleShowClose: function(seriesIndex) {
      var isVisible = this.chartSeries[seriesIndex].visible = !this.chartSeries[seriesIndex].visible;
      var series = Highcharts.charts[0].series[seriesIndex];
      if (isVisible) {
        series.show();
      } else {
        series.hide();
      }
    }
  }

});
