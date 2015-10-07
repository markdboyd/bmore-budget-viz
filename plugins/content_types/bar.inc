<?php
/**
 * @file
 * Plugin to render a bar chart of
 * Baltimore operating budget data.
 */

$plugin = array(
  'title' => t('Donut chart - Baltimore operating budget'),
  'category' => t('Bmore'),
  'description' => t('Renders a bar chart visualization of budget data.'),
  'edit form' => 'bmore_budget_data_bar_viz_edit_form',
  'render callback' => 'bmore_budget_data_bar_viz_render',
  'admin title' => 'bmore_budget_data_bar_viz_admin_title',
  'required context' => array(
    new ctools_context_required(t('Year'), 'string'),
  ),
);

/**
 * Admin title callback.
 */
function bmore_budget_data_bar_viz_admin_title($subtype, $conf, $context = NULL) {
  return bmore_budget_data_content_type_plugin_admin_title($subtype, $conf, $context, 'Bar chart - Baltimore operating budget');
}

/**
 * Edit form callback for the content type.
 */
function bmore_budget_data_bar_viz_edit_form($form, &$form_state) {
  return $form;
}

/**
 * Render callback for the pane.
 */
function bmore_budget_data_bar_viz_render($subtype, $conf, $args, $contexts) {
  $pane = new stdClass();

  $pane->title = $conf['override_title'] ? $conf['override_title_text'] : t('Baltimore Operating Budget - @year', array(
      '@year' => $appeal_year,
    )
  );

  // Get data for this visualization.
  // source = https://data.baltimorecity.gov/resource/g5wn-pq7y.json?fiscal_year=2014&$limit=10&$order=approved_amount%20DESC
  // info = http://dev.socrata.com/docs/queries.html
  $appeals_summary_data = fts_data_get_appeal_overview_get_summary_data($appeal_year);
  if (empty($appeals_summary_data)) {
    return '';
  }

  // Options for C3js chart.
  $chart_id = 'bmore-budget-bar-chart';

  $output = '<div class="overlay"></div>';
  $pane->content = $output;

  return $pane;
}
