import Ember from 'ember';
import BufferedProxy from 'ember-buffered-proxy/proxy';

/**
 * This component is used to delete or edit a record. The edit
 * is handled through a BufferedProxy so that we don't show
 * the updates until the user hits the save button.
 */
export default Ember.Component.extend({
  tagName: 'tr',
  isEditing: false,

  didReceiveAttrs() {
    this._super(...arguments);
    this.bufferedModel = BufferedProxy.create({
      content: this.get('stockQuote')
    });
  },

  actions: {

    editRecord() {
      this.toggleProperty('isEditing');
    },

    // Unfortunately there is no handy way of getting the numbers as actual numbers
    // (see https://github.com/emberjs/ember.js/issues/11209).
    // TODO: use a similar approach to the one used in BufferedProxy or extend it
    // to perform the transformation.
    saveRecord() {
      this.bufferedModel.set('openValue', parseFloat(this.bufferedModel.get('openValue')));
      this.bufferedModel.set('closeValue', parseFloat(this.bufferedModel.get('closeValue')));
      this.bufferedModel.set('highValue', parseFloat(this.bufferedModel.get('highValue')));
      this.bufferedModel.set('lowValue', parseFloat(this.bufferedModel.get('lowValue')));
      this.bufferedModel.set('lowValue', parseInt(this.bufferedModel.get('volume')));
      this.bufferedModel.applyChanges();
      this.get('stockQuote').save().then(() => {
        this.toggleProperty('isEditing');
      }, () => {});
    },

    cancelEdit() {
      this.toggleProperty('isEditing');
      this.bufferedModel.discardChanges();
    },

    // TODO: Use proper bootstrap modal windows
    deleteRecordWithConfirmation() {
      if (confirm("Are you sure you want to delete this sotck quote?")) {
        this.get('stockQuote').destroyRecord();
      }
    }

  }
});
