import Ember from 'ember';

export default Ember.Component.extend({

  // Maybe bubbling the action to the controller would be better
  // than injecting the store
  store: Ember.inject.service(),

  tagName: 'tr',

  isEditing: false,

  errors: [],

  actions: {

    newRecord() {
      this.toggleProperty('isEditing');
    },

    // Unfortunately there is no handy way of getting the numbers as actual numbers
    // (see https://github.com/emberjs/ember.js/issues/11209).
    saveRecord() {
      const newStockQuote = this.get('store').createRecord('stockQuote', {
        tradeDate: this.get('tradeDate'),
        openValue: parseFloat(this.get('openValue')),
        closeValue: parseFloat(this.get('closeValue')),
        highValue: parseFloat(this.get('highValue')),
        lowValue: parseFloat(this.get('lowValue')),
        volume: parseInt(this.get('volume'))
      });
      newStockQuote.save().then(() => {
        this.toggleProperty('isEditing');
        this._cleanupForm();
      }, () => {
        this.set('errors', newStockQuote.get('errors'));
      });
    },

    cancelEdit() {
      this.toggleProperty('isEditing');
      this._cleanupForm();
    },
  },

  _cleanupForm: function() {
    this.set('tradeDate', null);
    this.set('openValue', null);
    this.set('closeValue', null);
    this.set('highValue', null);
    this.set('lowValue', null);
    this.set('volume', null);
  }
});
