---
layout: page
title: Tabs
category: elements
tags:
  - aspect
  - switcher
  - pane
  - document
  - group
---

Tabs are used to switch the view of content within the same area. They are comprised of a parent tab control that contains individual children elements, or "tabs".

## Basic tab controls  
**Codename:** `NITabControl` - NationalInstruments.Controls  
This is the control for a collection of NITabItems

**Codename:** `NITabItem` - NationalInstruments.Controls  
An individual tab within a NITabControl  
Used in preferences dialog

## Pane tab controls  
**Codename:** `WindowTab` - NationalInstruments.Controls.Dock.Primitives  
This is an individual tab. In this context, tabs are contained by a StackPanel.  
These are the tab-like controls that switch the view in the rails. These must look visually different than the document tabs because these can't be manually "ripped out" or moved.

![NIDS\_images/Tabs/Controls\_Tabs\_Text\_Normal.png](media/image155.png){width="3.4166666666666665in"
height="0.4305555555555556in"}

![NIDS\_images/Tabs/Controls\_Tabs\_Text\_Hover.png](media/image156.png){width="3.4166666666666665in"
height="0.6527777777777778in"}

![NIDS\_images/Tabs/Controls\_Tabs\_Text\_Normal\_With\_Split\_Button.png](media/image157.png){width="4.513888888888889in"
height="0.4305555555555556in"}

## Document tab controls  
**Codename:** `WindowTab` - NationalInstruments.Controls.Dock.Primitives

![NIDS\_images/Tabs/Document\_Tabs\_Visual\_Normal.png](media/image158.png){width="12.11111111111111in"
height="0.8333333333333334in"}

![NIDS\_images/Tabs/Document\_Tabs\_Visual\_Unselected\_Running.png](media/image159.png){width="12.11111111111111in"
height="0.8472222222222222in"}

![NIDS\_images/Tabs/Document\_Tabs\_Visual\_Selected\_Running.png](media/image160.png){width="12.125in"
height="0.8472222222222222in"}

![NIDS\_images/Tabs/Document\_Tabs\_Visual\_Rename.png](media/image161.png){width="12.125in"
height="0.8333333333333334in"}

![NIDS\_images/Tabs/Document\_Tabs\_Visual\_Hover.png](media/image162.png){width="12.125in"
height="0.8472222222222222in"}

![NIDS\_images/Tabs/Document\_Tabs\_Visual\_Hover\_Inactive.png](media/image163.png){width="12.125in"
height="0.8472222222222222in"}

![NIDS\_images/Tabs/Document\_Tabs\_Visual\_Infotip.png](media/image164.png){width="12.125in"
height="1.875in"}

![NIDS\_images/Tabs/Document\_Tabs\_Visual\_Overflow\_Active.png](media/image165.png){width="12.125in"
height="1.1805555555555556in"}

![NIDS\_images/Tabs/Document\_Tabs\_Visual\_Hover\_Add.png](media/image166.png){width="12.125in"
height="0.8333333333333334in"}

## Document view tab controls  
**Codename:** `EditorSwitcherControl` - NationalInstruments.Shell  
Used in document toolbar to allow the user to switch the view of the document.