(function ($) {

  var department_colors = {
    "Board of Elections": '#6f93bb',
    "City Council": '#1a74c3',
    "Comptroller": '#f528ca',
    "Council Services": '#beac70',
    "Courts: Circuit Court": '#40c2bb',
    "Courts: Orphans' Court": '#40a13d',
    "Employees' Retirement Systems": '#453004',
    "Enoch Pratt Free Library": '#8400e0',
    "Finance":' #26cf5a',
    "Fire": '#d35d65',
    "General Services": '#4fce',
    "Health": '#14ca6d',
    "Housing and Community Development": '#55c3f2',
    "Human Resources": '#596f75',
    "Law": '#476dc0',
    "Legislative Reference": '#9c7467',
    "Liquor License Board": '#84ff3b',
    "Mayoralty": '#825de1',
    "M-R: Art and Culture": '#f8baeb',
    "M-R: Baltimore City Public Schools": '#c52bd1',
    "M-R: Cable and Communications": '#3702a8',
    "M-R: Civic Promotion": '#2608f4',
    "M-R: Conditional Purchase Agreements": '#644cc0',
    "M-R: Contingent Fund": '#d3ccbd',
    "M-R: Convention Center Hotel": '#3073a9',
    "M-R: Convention Complex": '#b383ff',
    "M-R: Debt Service": '#d1f1cc',
    "M-R: Educational Grants": '#975adb',
    "M-R: Employees' Retirement Contribution": '#cc7545',
    "M-R: Environmental Control Board": '#69d5b6',
    "M-R: Health and Welfare Grants": '#f2977b',
    "M-R: Innovation Fund": '#c20fc6',
    "M-R: Miscellaneous General Expenses": '#a6d4e3',
    "M-R: Office of CitiStat Operations": '#87e79a',
    "M-R: Office of Criminal Justice": '#397504',
    "M-R: Office of Employment Development": '#d4a215',
    "M-R: Office of Human Services": '#eee86b',
    "M-R: Office of Information Technology": '#427da7',
    "M-R: Office of Neighborhoods": '#f13333',
    "M-R: Office of the Inspector General": '#ddc03c',
    "M-R: Office of the Labor Commissioner": '#9a8a95',
    "M-R: Retirees' Benefits": '#153d91',
    "M-R: Self-Insurance Fund": '#e072b9',
    "M-R: TIF Debt Service": '#adf2d4',
    "Municipal and Zoning Appeals": '#ca3040',
    "Office of Civil Rights": '#7c22b2',
    "Planning": '#900a65',
    "Police": '#f85b72',
    "Public Works": '#4e2a11',
    "Recreation and Parks": '#bcdbe1',
    "Sheriff": '#16c4d9',
    "Social Services": '#1c69ab',
    "State's Attorney":' #1ce0e',
    "Transportation": '#a0b8f6'
  };

  // Function for scaling values.
  var scaleValue = function (value, scale) {
    var scaled_value = value;
    var precision = 0;

    if (value === 0) {
      return value;
    }

    if (scale && scale === 'billion') {
      scaled_value = (value / 1e9);
    }
    else if (scale && scale === 'million') {
      scaled_value = (value / 1e6);
    }
    else if (scale && scale === 'thousand') {
      scaled_value = (value / 1e3);
    }

    return d3.round(scaled_value, precision);
  };

  // Functions for formatting values & labels.
  var formatCurrency = d3.format('$,');

  var formatScaledValue = function (scale) {
    scale = scale || null;

    var getScaledValue = function (d) {
      if (d === 0) {
        return d;
      }

      var scaled_value = scaleValue(d, scale);
      return formatCurrency(scaled_value);
    };

    return getScaledValue;
  };

  // Donut chart of budget data.
  Drupal.behaviors.bmore_budget_donut_chart = {
    attach: function (context, settings) {
      var chart_id = settings.bmore_budget_donut_data_chart_id;
      var chart_json = settings.bmore_budget_donut_data_json;

      if (chart_id && chart_json) {
        chart_id = '#' + chart_id;

        var additional_opts = {
          data: {
            type: 'donut',
            json: chart_json,
            // colors: department_colors
          }
        };

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

        var additional_opts = {
          data: {
            type: 'bar',
            json: chart_json,
            x: 'x',
            axes: {
              'total': 'y'
            },
            // color: function (color, d) {
            //   var department = chart_json['x'][d.index];
            //   return department_colors[department] ? department_colors[department] : color;
            // }
          },
          axis: {
            // rotated: true,
            x: {
              tick: {
                culling: false,
                // width: 250
              },
              type: 'category'
            },
            y: {
              // tick: {
              //   format: formatScaledValue('million')
              // },
              // label: {
              //   text: 'Total approved funding (in millions)',
              //   position: 'outer-center'
              // }
            }
          },
          // legend: {
          //   hide: true
          // }
        };

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
      tooltip: {
        format: {
          value: formatCurrency
        }
      }
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
