---
layout: page
title: Buttons
category: elements
tags:
    - buttons
    - action
status: WIP

---
## Command buttons
**Codename:** `ShellButton` - NationalInstruments.Controls.Shell


| State         | Image         | 
| ------------- |:-------------:| 
| Normal        | ![Alt text](../../images/elements/buttons/button-normal.svg)        | 
| Default       | ![Alt text](../../images/elements/buttons/button-default-action.svg)| 
| Hover         | ![Alt text](../../images/elements/buttons/button-hover.svg)         |  
| Mouse Down    | ![Alt text](../../images/elements/buttons/button-mouse-down.svg)    |
| Disabled      | ![Alt text](../../images/elements/buttons/button-disabled.svg)      |

**XAML Code Snippet**
{% highlight xml %}
<shell:ShellButton 
    Content="OK"
    Click="onClick" 
    Height="24" 
    MinWidth="70"
    Padding="10,0,10,1" />
{% endhighlight %}

## Toolbar buttons

**Codename:** `ShellToolBarButton` - NationalInstruments.Shell

| State         | Image         | 
| ------------- |:-------------:| 
| Normal        | ![Alt text](../../images/elements/buttons/toolbar-button-normal.svg)        | 
| Hover         | ![Alt text](../../images/elements/buttons/toolbar-button-hover.svg)         |  
| Mouse Down    | ![Alt text](../../images/elements/buttons/toolbar-button-mouse-down.svg)    |

## Toolbar dropdown button
A menu for a small set of related commands. The text on the button doesn't change based on the dropdown selection.

**Codename:** `ShellDropDownButton` - National.Instruments.Controls.Shell

| State         | Image         | 
| ------------- |:--------------| 
| Normal        | ![Alt text](../../images/elements/buttons/toolbar-dropdown-button-normal.svg)        | 
| Hover         | ![Alt text](../../images/elements/buttons/toolbar-dropdown-button-hover.svg)         |  
| Active    | ![Alt text](../../images/elements/buttons/toolbar-dropdown-button-active.svg)    |

## Split buttons

**Codename:** `ShellSplitButton`

Two separate hover states.  The left or top side should function like a command and the right or bottom side will open a drop-down list where a variation of the command is listed. This button is appropriate when there is a "dominant" command but we want to provide related, but less-often-used additional
commands.

| State                 | Image        | 
| --------------------- |:-------------| 
| Normal                | ![Alt text](../../images/elements/buttons/split-button-normal.svg)        | 
| Hover (Button)        | ![Alt text](../../images/elements/buttons/split-button-hover-main.svg)         |  
| Hover (Dropdown)      | ![Alt text](../../images/elements/buttons/split-button-hover-dropdown.svg)         |  
| Mouse Down (Button)   | ![Alt text](../../images/elements/buttons/split-button-mouse-down-main.svg)    |
| Mouse Down (Dropdown) | ![Alt text](../../images/elements/buttons/split-button-active-dropdown.svg)    |

## Split toggle buttons
**Codename:** `ShellSplitToggleButton`

Used in file pane for toggling/selecting filter

| State         | Image         | 
| ------------- |---------------| 
| Normal        | ![Alt text](../../images/elements/buttons/toggle-split-button-normal.svg)        | 
| Hover (Button)         | ![Alt text](../../images/elements/buttons/toggle-split-button-main-hover.svg)         |  
| Hover (Dropdown)         | ![Alt text](../../images/elements/buttons/toggle-split-button-hover-dropdown.svg)         |  
| Mouse Down (Dropdown)    | ![Alt text](../../images/elements/buttons/toggle-split-button-mousedown-dropdown.svg)    |

## Toggle buttons

**Codename:** `ShellToggleButton`

| State         | Image         | 
| ------------- |:-------------:| 
| Normal        | ![Alt text](../../images/elements/buttons/toggle-button-normal.svg)        | 
| Hover         | ![Alt text](../../images/elements/buttons/toggle-button-hover-normal.svg)         |  
| Active         | ![Alt text](../../images/elements/buttons/toggle-button-active.svg)         |  
| Active (Hover)    | ![Alt text](../../images/elements/buttons/toggle-button-hover-active.svg)    |

