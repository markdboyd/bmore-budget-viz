(function ($) {

  // Donut chart of budget data.
  Drupal.behaviors.bmore_budget_donut_chart = {
    attach: function (context, settings) {
      var chart_id = settings.bmore_budget_donut_data_chart_id;
      var chart_json = settings.bmore_budget_donut_data_json;

      if (chart_id && chart_json) {
        chart_id = '#' + chart_id;

        var additional_opts = {};

        // var additional_opts = general_donut_chart_opts(chart_json);
        // var department_names = Object.keys(settings.donor_top5_recipients_json);

        $(chart_id, context).once('bmore-budget-donut-chart', function (){
          var chart = generate_donut_chart(chart_id, chart_json, additional_opts);
        });
      }
    }
  };

  // Bar chart of budget data.
  Drupal.behaviors.bmore_budget_bar_chart = {
    attach: function (context, settings) {
      var chart_id = settings.bmore_budget_bar_data_chart_id;
      var chart_json = settings.bmore_budget_bar_data_json;

      if (chart_id && chart_json) {
        chart_id = '#' + chart_id;

        var department_names = Object.keys(chart_json);

        var additional_opts = {
          data: {
            type: 'json',
            json: chart_json,
            x: 'x',
            axes: {
              'total': 'y'
            },
            colors: {
              'total': '#000',
            },
          },
          axis: {
            rotated: true,
            x: {
              tick: {
                culling: false
              },
              type: 'category'
            }
          }
        };

        console.log(JSON.stringify(chart_json));

        // var additional_opts = general_bar_chart_opts(chart_json);

        $(chart_id, context).once('bmore-budget-bar-chart', function (){
          var chart = generate_bar_chart(chart_id, chart_json, additional_opts);
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
      }
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
