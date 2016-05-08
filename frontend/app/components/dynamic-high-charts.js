import Ember from 'ember';
import EmberHighChartsComponent from 'ember-highcharts/components/high-charts';

export default EmberHighChartsComponent.extend({

  /**
   * Had to redefine the basic HC component so that a change in the data
   * won't trigger a setExtremes and zoom out the whole chart.
   * The way to achieve this is to make the setExtremes function a
   * no-op while executing the inherited behavior and then restoring
   * it.
   */
  didReceiveAttrs: Ember.observer('content.@each.isLoaded', function() {
    const chart = this.get('chart');
    var result;
    if (chart) {
      const oldHandler = chart.xAxis[0].setExtremes;
      try {
        // Just replace it with a no-op
        chart.xAxis[0].setExtremes = () => {};
        result = this._super(...arguments);
      } finally {
        chart.xAxis[0].setExtremes = oldHandler;
      }
    } else {
      result = this._super(...arguments);
    }
    return result;
  })

});
