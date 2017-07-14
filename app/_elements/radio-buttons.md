---
layout: page
title: Radio buttons
category: elements
tags:
    - buttons
    - choice
    - selector
status: ready
---
Use radio buttons to choose one option from a set of mutually exclusive choices.

**Codename:** `ShellRadioButton` - NationalInstruments.Controls.Shell  
**Codename:** `ShellRadioButtonGroup` - NationalInstruments.Controls.Shell

## Usage guidelines

* Use radio buttons when you want to emphasize all options equally. If the default option is recommended for most users in most situations or if space is constrained, consider using a [dropdown](../dropdowns/).
* Always have one radio button selected by default unless the user **must** make an explicit choice. Use the most likely or safest (to prevent data loss) option.
* If none of the options is a valid choice, provide “None” as an option.
* Align radio buttons vertically instead of horizontally to increase readability and aid localization.
* Typically, the first option will be the default but that might not be appropriate in every case.

## Individual labels

* Every radio button should contain a label.
* If all options have the same introductory text, move the introductory text to radio group label.
* Keep the actual radio button labels brief. If the option requires further explanation, provide secondary text below the radio button. Use complete sentences and ending punctuation. Adding an explanation to one radio button doesn’t mean you have to add an explanation for all radio buttons.
* Clicking the radio button label also selects the radio button.

| State             | Image         |
| ----------------- |:-------------:|
| Selected          | ![Alt text](../../images/elements/radio-buttons/radio-button-selected.svg)         |
| Selected (Hover)  | ![Alt text](../../images/elements/radio-buttons/radio-button-selected-hover.svg)   |
| Unselected        | ![Alt text](../../images/elements/radio-buttons/radio-button-unselected.svg)       |
| Unselected (Hover)| ![Alt text](../../images/elements/radio-buttons/radio-button-unselected-hover.svg) |
| Disabled          | ![Alt text](../../images/elements/radio-buttons/radio-button-disabled.svg)         |

## Grouping

* Keep the number of options in a radio button group between two and seven. If you have more than eight options, use a [dropdown](../dropdowns/).
* List radio button options in a logical order. Common ways to logically order radio buttons are from most likely to be selected to least, simplest operation to most complex, least to most risky, or some other progression. Alphabetical ordering is not recommended because of localization.
* In radio button groups, only the selected radio button is accessible using the Tab key. Users cycle through the radio buttons in the group using the arrow keys.


![Alt text](../../images/elements/radio-buttons/radio-button-group.svg)    |

## Radio button group labels

* Use the label to explain the purpose of the group, not how to make the selection. For example, don’t use “Select one of the following choices” as a group label.
* All radio button groups need labels.