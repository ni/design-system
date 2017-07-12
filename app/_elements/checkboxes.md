---
layout: page
title: Checkboxes
category: elements
tags:
status: WIP

---
Checkboxes are used to turn an option on or off to select or deselect an item.  

**Codename:** `ShellCheckBox` - NationalInstruments.Controls.Shell  

If the meaning of the cleared checkbox isn’t completely obvious, use radio buttons instead.

- Align checkboxes vertically, not horizontally. Horizontal alignment is more difficult to read.
- For disabled checkboxes, show the correct selection state. The disabled checkbox is still conveying information to the user even though they can’t change them.
- Don’t use the selection of checkboxes to: 
  - Perform a command. 
  - Display other windows, such as a dialog box. 
  - Show progress. Use a progress indicator instead. 
  - Dynamically display other controls related to the selected control.

| State               | Image               | 
| ------------------- |:-------------------:| 
| Unselected          | ![Alt text](../../images/elements/checkboxes/checkboxes-normal.svg)             |
| Unselected (hover)  | ![Alt text](../../images/elements/checkboxes/checkboxes-hover-normal.svg)       |
| Selected            | ![Alt text](../../images/elements/checkboxes/checkboxes-selected.svg)           |
| Selected (hover)    | ![Alt text](../../images/elements/checkboxes/checkboxes-hover-selected.svg)     |
| Mixed state         | ![Alt text](../../images/elements/checkboxes/checkboxes-mixed-state.svg)        |
| Mixed state (hover) | ![Alt text](../../images/elements/checkboxes/checkboxes-hover-mixed-state.svg)  |
| Disabled            | ![Alt text](../../images/elements/checkboxes/checkboxes-disabled.svg)           |

## Mixed state

- Mixed state indicates that an option is set for some, but not all, child objects. Don’t use the mixed state to represent a third state. Users shouldn’t be able to set a mixed state directly. If you need to represent a third state, use radio buttons or a dropdown list.
- Clicking a mixed state checkbox cycles through all selected, all cleared, and original mixed states. It’s important to be able to restore the original mixed states. Otherwise, the only way to restore the mixed state is to cancel the task and start over.

## Grouping

- Group related checkboxes into groups of 10 or fewer.
- Don’t use group boxes, which often introduces unnecessary clutter, to organize checkboxes unless there are no other options. Try using separators instead.
- List checkboxes in a logical order. Common ways to logically order checkboxes are to group highly related options together, placing most common options first, or some other natural progression ordering. Alphabetical ordering is not recommended because of localization.

## Labels

- Place the labels to the right of the checkbox.
- Label indicates the selected state. The meaning on the cleared state must be the opposite of the selected state.
- Write the label as a phrase or a direct command with no ending punctuation.
- Use positive phrasing. Don’t phrase a label such that selecting a checkbox means not to perform an action.
  - Exception: Don’t show this again checkboxes.

## Subordinate controls

- Place subordinate controls to the right of or below (indented, flush with the check box label) the checkbox and its label.
- Use a colon after the checkbox label.
- If subordinate text boxes, dropdown lists, etc. use the checkbox’s label (instead of having their own unique labels), leave the subordinate controls editable.
- Automatically select the corresponding checkbox when users type or paste anything into the subordinate controls.
- For checkboxes with subordinate radio buttons or other checkboxes, disable subordinate controls until the high-level option is selected. This avoids confusion about the meaning of the subordinate controls.
- If selecting an option implies selecting subordinate checkboxes, explicitly select the checkboxes to make the relationship clear.