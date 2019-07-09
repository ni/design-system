---
layout: page
title: Checkboxes
category: elements
tags:
status: ready
description: Checkboxes description
---
Checkboxes are used to turn an option on/off or to select/deselect an item. They can also show a mixed, or indeterminate, state.  

**Codename:** `ShellCheckBox` - NationalInstruments.Controls.Shell  

If the meaning of the checkbox isn’t completely obvious, consider using [radio buttons](radio-buttons/) or a [dropdown](dropdowns/) instead.

Don’t use the selection of checkboxes to:  
  - Perform a command. 
  - Display other windows, such as a dialog box. 
  - Show progress. Use a progress indicator instead. 
  - Dynamically display other controls related to the selected control.

## Layout and grouping
- Checkboxes should be aligned in a vertical stack. Arranging them horizontally is more difficult to read. In cases where space is limited or there a large number of related checkboxes, two columns of vertical stacks.
- In general, group related checkboxes into groups of 10 or fewer. If more than 10 are needed, consider arranging them into two columns.
- Order checkboxes in a logical fashion such as most frequently used to least frequently used or other progression.

## Control states
For disabled checkboxes, show the current selection state so that control still communicates the current state even though it can't be changed.

A mixed state is available if state of child or selected objects is not the same.  The user can cycle through all selected, all cleared and the previous mixed state (in that order) It’s important to be able to restore the original mixed states as the alternative would require the user to cancel the task, undo or start over.

| State               | Image               | 
| ------------------- |:-------------------:| 
| Unselected          | ![Alt text](images/elements/checkboxes/checkboxes-normal.svg)             |
| Unselected (hover)  | ![Alt text](images/elements/checkboxes/checkboxes-hover-normal.svg)       |
| Selected            | ![Alt text](images/elements/checkboxes/checkboxes-selected.svg)           |
| Selected (hover)    | ![Alt text](images/elements/checkboxes/checkboxes-hover-selected.svg)     |
| Mixed state         | ![Alt text](images/elements/checkboxes/checkboxes-mixed-state.svg)        |
| Mixed state (hover) | ![Alt text](images/elements/checkboxes/checkboxes-hover-mixed-state.svg)  |
| Disabled            | ![Alt text](images/elements/checkboxes/checkboxes-disabled.svg)           |

## C# code snippets

```cs
//Set UI type in your ShellSelectionRelayCommand
UIType = UITypeForCommand.Toggle 

//For showing element in configuration pane
context.Add(yourClass.yourCommand, CheckBoxFactory.ForConfigurationPane);

//For showing element in toolbar
context.Add(yourClass.yourCommand, CheckBoxFactory.ForToolBar);
```



