import Ember from 'ember';

export default Ember.Controller.extend({
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
    var data = this.model.map(function(item) {
      return [item.get('tradeDate').getTime(), parseFloat(item.get('openValue'))];
    });

    return [{
    name : 'YHOO',
    data : data,
    tooltip: {
        valueDecimals: 3
      }
    }];
  }.property('model.@each.openValue'),

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
    }
  }

});
