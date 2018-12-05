---
layout: page
title: Filter tree view
category: elements
tags:
    - buttons
    - action
status: ready

---

**Codename:** `FilteredTreeView` - NationalInstruments.Controls.Shell 

The filtered tree view (FTV) control allows users to search and browse a deep hierarchy of items and make selections. The FTV provides options for single or multiple selections. It can be displayed in dialogs as well as flyout menus.

## General usage
Use the FTV if you need to display and allow users to browse and search a hierarchy of more than 2 levels, not including the root node.

If the user needs different sorting options of the data set (e.g. alphabetically, file type, date), use a list view control.

## Usage examples

When deciding between the FTV and another control, consider this question: 
Is the hierarchical data set large enough to require a search mechanism? If so, use the FTV.

Example of FTV providing multiple selections in a modal dialog.
<div class="do" markdown="1">
![Alt text](../../images/elements/ftv/FTV-default.svg)  

Do
</div>

Example of FTV providing multiple selections in a flyout.
<div class="do" markdown="1">
![Alt text](../../images/elements/ftv/FTV-flyout-multi-select.svg)  

Do
</div>

Example of FTV in search mode.
<div class="do" markdown="1">
![Alt text](../../images/elements/ftv/FTV-SearchMode_multi-select.svg)  

Do
</div>

If the items have no hierarchy and the data set is small, do not use the FTV.
<div class="dont" markdown="1">
![Alt text](../../images/elements/ftv/FTV-wrong-use.svg)  

Don't
</div>

Instead use a different way of providing the options to the user.
<div class="do" markdown="1">
![Alt text](../../images/elements/ftv/FTV-different-control.svg)  

Do
</div>
 
## Layout and spacing

![Alt text](../../images/elements/ftv/FTV-dialog-parts.svg) 

![Alt text](../../images/elements/ftv/FTV-spacing-dialog.svg) 


