---
layout: page
title: Toggle groups
category: elements
tags:
  - toggle
  - justification
  - align
status: WIP
---

The toggle group control is used to present multiple options that can be toggled on and off. These options can be mutually exclusive or independent toggle options. 

**Codename:** `ChoiceToggleButtonGroup` - NationalInstruments.Controls.Shell

## General usage

| State                 | Image         |
| --------------------- |:-------------:|
| Normal                | ![Alt text](../../images/elements/toggle-groups/toggle-groups-exclusive-none.svg) |
| Selected              | ![Alt text](../../images/elements/toggle-groups/toggle-groups-exclusive-selected.svg)   |

### Mixed state
If the user has selected objects with different values, this control will have all options shown as off to indicate a mixed state.

## Independent options
If the options provided in the toggle group can be applied independently, allow multiple choices. An example of this is with text formatting controls.

![Alt text](../../images/elements/toggle-groups/toggle-groups-independent-selected.svg)

## Exclusive options
If the options provided are exclusive, do not provide multiple choices. An example of this is text alignment options.  

![Alt text](../../images/elements/toggle-groups/toggle-groups-exclusive-selected.svg)

If the options are mutually exclusive, also consider using [radio buttons](../radio-buttons/). 


