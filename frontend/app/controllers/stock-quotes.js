import Ember from 'ember';

export default Ember.Controller.extend({

  /* Chart */
  chartMode: 'StockChart',

  chartOptions: function() {
    return {
      rangeSelector: {
        selected: undefined
      },
      xAxis: {
        events: {
          setExtremes: (e) => {
            var range = {
              fromDate: new Date(e.min),
              toDate: new Date(e.max),
            };
            this.set('dateRangeFilter', range);
          }
        }
      }
    };
  }.property(),

  dateRangeFilter: null,

  chartSeries: [
    {name: 'Open', property: 'openValue', visible: true},
    {name: 'Close', property: 'closeValue', visible: true},
    {name: 'High', property: 'highValue', visible: false},
    {name: 'Low', property: 'lowValue', visible: false}
  ],

  sortedModel: Ember.computed.sort('model', function(model1, model2) {
    if (model1.get('tradeDate') < model2.get('tradeDate')) {
      return -1;
    } else {
      return 1;
    }
  }),

  chartData: function() {
    return this.get('chartSeries').map((series) => {
      var data = this.get('sortedModel').map((item) => {
        return [item.get('tradeDate').valueOf(), item.get(series.property)];
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
  }.property("model", "model.@each.{tradeDate,openValue,closeValue,highValue,lowValue}"),

  tableData: function() {
    if (!this.get('dateRangeFilter')) {
      return this.get('sortedModel');
    } else {
      var from = this.get('dateRangeFilter').fromDate;
      var to = this.get('dateRangeFilter').toDate;
      return this.get('sortedModel').filter((stockQuote) => {
        var quoteDate = stockQuote.get('tradeDate');
        return (from <= quoteDate) && (quoteDate <= to);
      });
    }
  }.property('dateRangeFilter', "model.@each"),

  theme: null,

  actions: {
    // Not super happy about this. I think the proper way should be
    // to have an observer on the boolean flag and let that trigger
    // the show/hide.
    showSeries: function(seriesIndex, event) {
      const isVisible = event.target.checked;
      Ember.set(this.chartSeries[seriesIndex], 'visible', isVisible);
      // There must be a better way of doing this from the library itself
      // instead of using jQuery
      const chart = Ember.$('.highcharts-wrapper').highcharts();
      const series = chart.series[seriesIndex];
      series.setVisible(isVisible);
    }
  }

});
