---
layout: page
title: Dropdowns
category: elements
status: ready
tags:
  - selector
  - choice
  - ring
  - enum
  - enumeration
---

A dropdown is a list in which the current value is displayed in the element. Upon clicking on the element, the other options are visible. The user cannot manually enter values.

If the user needs to manually enter values, use a [combo box](../combo-boxes/)

**Codename:** `ShellComboBox`  - NationalInstruments.Controls.Shell  
**Codename:** `ShellComboBoxItem` - NationalInstruments.Controls.Shell

Set `IsEditable=false` to disable typing in the control.

## Standard dropdowns

| State         | Image         |
| ------------- |:-------------:|
| Normal        | ![Alt text](../../images/elements/dropdowns/dropdowns-normal.svg)        |
| Hover         | ![Alt text](../../images/elements/dropdowns/dropdowns-hover.svg)         |
| Active        | ![Alt text](../../images/elements/dropdowns/dropdowns-active.svg)        |

#### Mixed state
If the user has selected objects with different values, this control will be blank to represent a mixed state.