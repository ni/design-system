---
layout: page
title: Text boxes
category: elements
tags:
  - indicator
  - string
  - inc
  - dec
  - increment
  - decrement
  - control
  - numeric
  - path
  - URL
status: ready
---

## Single line

**Codename:** `ShellTextBox` - NationalInstruments.Controls.Shell  

Simple user control entering alphanumeric data.

To present a read-only text boxes set the `.isReadOnly` property to `true`. Read-only text boxes are not directly editable but allow the user to see the current value.  The user is still able to select the text for copying purposes.

| State         | Image         |
| ------------- |:-------------:|
| Normal        | ![Alt text](images/elements/text-boxes/text-boxes-single-line-normal.svg)   | 
| Hover         | ![Alt text](images/elements/text-boxes/text-boxes-single-line-hover.svg)    |  
| Disabled      | ![Alt text](images/elements/text-boxes/text-boxes-single-line-disabled.svg)    |
| Read-only     | ![Alt text](images/elements/text-boxes/text-boxes-read-only-normal.svg) |

## Multi-line text boxes
**Codename:** `ShellTextBox` - NationalInstruments.Controls.Shell  

Use a multi-line text box to provide plain text with carriage returns and tabs. When used in a configuration pane, it spans the width of the area. 



## Single line with spin controls  
**Codename:** `ShellNumericTextBox` - NationalInstruments.Controls.Shell

Similar to a single line text box but only used for numeric data. The spin controls allow the user to increment and decrement the value.

| State                    | Image         |
| ------------------------ |:-------------:|
| Normal                   | ![Alt text](images/elements/text-boxes/text-boxes-single-spinner-normal.svg)               |
| Hover                    | ![Alt text](images/elements/text-boxes/text-boxes-single-spinner-hover.svg)                |
| Spin control (Hover)     | ![Alt text](images/elements/text-boxes/text-boxes-single-spinner-hover-increment.svg)      |
| Spin control (Mousedown) | ![Alt text](images/elements/text-boxes/text-boxes-single-spinner-mouse-down-increment.svg) |
| Disabled                 | ![Alt text](images/elements/text-boxes/text-boxes-single-spinner-disabled.svg)             |



## Path text box

**Codename:** `ShellPathSelector` - NationalInstruments.Controls.Shell

This controls allows the user to specify a path to folder or other relative content. Extra controls are provided to allow the user to browse to a location or set the value to "Not a path."

| State                | Image         |
| -------------------- |:-------------:|
| Normal               | ![Alt text](images/elements/text-boxes/text-boxes-path-normal.svg)       |
| Text box (Hover)     | ![Alt text](images/elements/text-boxes/text-boxes-path-hover.svg)        |
| Button (Hover)       | ![Alt text](images/elements/text-boxes/text-boxes-path_button_hover.svg) |
| Button (Mousedown)   | ![Alt text](images/elements/text-boxes/text-boxes-path-button-down.svg)  |
| Browse (Hover)       | ![Alt text](images/elements/text-boxes/text-boxes-path_browse-hover.svg) |
| Browse (Mousedown)   | ![Alt text](images/elements/text-boxes/text-boxes-path-browse-down.svg)  |