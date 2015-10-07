<?php
/**
 * @file
 * Plugin to render a donut chart of
 * Baltimore operating budget data.
 */

$plugin = array(
  'title' => t('Donut chart - Baltimore operating budget'),
  'category' => t('Bmore'),
  'description' => t('Renders a donut chart visualization of budget data.'),
  'edit form' => 'bmore_budget_data_donut_viz_edit_form',
  'render callback' => 'bmore_budget_data_donut_viz_render',
  'admin title' => 'bmore_budget_data_donut_viz_admin_title',
  'required context' => array(
    new ctools_context_required(t('Year'), 'string'),
  ),
);

/**
 * Admin title callback.
 */
function bmore_budget_data_donut_viz_admin_title($subtype, $conf, $context = NULL) {
  $title = 'Donut chart - Baltimore operating budget';

  if ($conf['override_title'] && !empty($conf['override_title_text'])) {
    $title = filter_xss_admin($conf['override_title_text']);
  }

  return $title;

}

/**
 * Edit form callback for the content type.
 */
function bmore_budget_data_donut_viz_edit_form($form, &$form_state) {
  return $form;
}

/**
 * Render callback for the pane.
 */
function bmore_budget_data_donut_viz_render($subtype, $conf, $args, $contexts) {
  $pane = new stdClass();

  $fiscal_year = $contexts[0]->data;

  $pane->title = $conf['override_title'] ? $conf['override_title_text'] : t('Top 10 Departments by Approved Funding for FY @year', array(
      '@year' => $fiscal_year,
    )
  );

  // Get data for this visualization.
  $budget_data = bmore_budget_viz_get_data($fiscal_year);
  if (empty($budget_data)) {
    return '';
  }

  // Options for C3js chart.
  $chart_id = 'bmore-budget-donut-chart';

  // Add JSON settings for our visualization.
  drupal_add_js(array('bmore_budget_data_json' => $budget_data), 'setting');
  drupal_add_js(array('bmore_budget_data_chart_id' => $chart_id), 'setting');

  $output = '<div id="' . $chart_id . '"></div>';
  $pane->content = $output;

  return $pane;
}
