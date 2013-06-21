drupalmodules
===========

These drupal modules are used for an internal Drupal installation that processes form submissions.
http://gallatin.nyu.edu

netid_user: creates a drupal account for any new netid (NYU id) in order to build a record of individual user submissions. It does not grant authorization to access anything.

webform_submission_workflow: adds an action to individual submissions which can be used to update the status of a submission and/or send emails based on Previewable Email Templates (the name of the pet must begin with the node number of the form).
