# Baltimore Budget Data Viz
## Dependencies

This module depends on the Panels, Ctools, and Libraries modules.

## Makefiles

Add these lines to your project's makefile to include this module in your project:

```
projects[bmore_budget_viz][type] = module
projects[bmore_budget_viz][download][type] = git
projects[bmore_budget_viz][download][url] = https://github.com/markdboyd/bmore-budget-viz.git
```

Add these lines to your project's makefile to include D3 and C3 as libraries (assuming you have the Libraries module installed):

```
  ; D3
  libraries[d3][type] = library
  libraries[d3][download][type] = file
  libraries[d3][download][url] = https://github.com/mbostock/d3/archive/master.zip

  ; C3
  libraries[c3][type] = library
  libraries[c3][download][type] = git
  libraries[c3][download][url] = https://github.com/masayuki0812/c3.git
```
