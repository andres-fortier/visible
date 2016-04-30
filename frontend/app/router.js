import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('stockQuotes');
  this.route('stockQuote.new', { path: 'stockQuote/new' });
  this.resource('stockQuote', { path: 'stockQuote/:stockQuoteId' });
});

export default Router;
