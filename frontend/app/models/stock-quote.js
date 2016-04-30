import DS from 'ember-data';

export default DS.Model.extend({
  tradeDate: DS.attr('date'),
  openValue: DS.attr('number'),
  closeValue: DS.attr('number'),
  highValue: DS.attr('number'),
  lowValue: DS.attr('number'),
  volume: DS.attr('number'),
});
