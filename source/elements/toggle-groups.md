---
layout: page
title: Toggle groups
category: elements
tags:
  - toggle
  - justification
  - align
status: ready
description: description
---

The toggle group control is used to present multiple options that can be toggled on and off. These options can be mutually exclusive or independent toggle options.
Unlike radio buttons and checkboxes, each control in the toggle group should take immediate effect when pressed and should not require the user to click ‘Save’ or ‘Submit’ to apply the new state.

**Codename:** `ChoiceToggleButtonGroup` - NationalInstruments.Controls.Shell

## Control states

| State                 | Image         |
| --------------------- |:-------------:|
| Normal                | ![Alt text](images/elements/toggle-groups/toggle-groups-exclusive-none.svg) |
| Hover                | ![Alt text](images/elements/toggle-groups/toggle-groups-hover-state.svg) |
| Selected              | ![Alt text](images/elements/toggle-groups/toggle-groups-exclusive-selected.svg)   |

### Mixed state
If the user has selected objects with different values, this control will have all options shown as off to indicate a mixed state.

## General usage 
### Exclusive options
If the options provided are exclusive, do not allow user to select multiple choices at once. In the example below, the user can only choose one of the 3 visual styling
options in the PXI Chassis visual styling toggle group. If the options are mutually exclusive and require the user to click a ‘submit’ control, it is more appropriate to
use [radio buttons](radio-buttons/).


![Alt text](images/elements/toggle-groups/toggle-groups-exclusive-visual-styling.svg)

### Independent options
If the options provided in the toggle group can be applied independently, allow the user to select multiple choices at once. In the example below, italics and
underline are both selected in the text formatting toggle group. If the options are independent and require the user to click a ‘submit’ control, it is more
appropriate to use [checkboxes](checkboxes/).

![Alt text](images/elements/toggle-groups/toggle-groups-independent-selected.svg)

