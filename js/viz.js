(function ($) {

  // Chart of top 5 recipients for a donor.
  Drupal.behaviors.donor_top5_recipients_chart = {
    attach: function (context, settings) {
      var chart_id = settings.donor_top5_recipients_chart_id;
      var chart_json = settings.donor_top5_recipients_json;

      if (chart_id && chart_json) {
        chart_id = '#' + chart_id;

        var additional_opts = general_donut_chart_opts(chart_json);
        var donor_names = Object.keys(settings.donor_top5_recipients_json);

        $(chart_id, context).once('donor-top5-recipients-chart', function (){
          var chart = generate_donut_chart(chart_id, chart_json, additional_opts);
          generate_legend('.pane-donor-top5-recipients-chart', chart, donor_names);
        });
      }
    }
  };

  /**
   * Generic chart functions.
   */

  // Generate donut chart.
  function generate_donut_chart(chart_id, chart_json, config_opts) {
    // Set up default options for this chart.
    var default_opts = {
      bindto: chart_id,
      data: {
        json: chart_json,
        type: 'donut',
      },
      legend: {
        position: 'right'
      },
      tooltip: {
        format: {
          value: formatCurrencyTooltip
        }
      },
    };

    // Get additional options.
    var additional_opts = config_opts || {};

    // Merge in any additional options passed to the function.
    var chart_opts = $.extend(default_opts, additional_opts);

    // Generate the chart.
    var chart = c3.generate(chart_opts);

    return chart;
  }

  // Generate bar chart.
  function generate_bar_chart(chart_id, chart_json, config_opts) {
    // Default options for this chart.
    var default_opts = {
      bindto: chart_id,
      data: {
        json: chart_json,
        type: 'bar',
      },
    };

    // Get additional options.
    var additional_opts = config_opts || {};

    // Merge in additional options for this chart.
    var chart_opts = $.extend(default_opts, additional_opts);

    // Generate the chart.
    var chart = c3.generate(chart_opts);

    return chart;
  }

})(jQuery);
