---
layout: page
title: Tips
category: elements
tags:
  - tooltip
  - tipstrip
  - infotip
status: ready

---
Tooltips and infotips, collectively called tips, are used to provide additional context to a UI element.

## General usage
Use tips to provide the name of a control which doesn't contain text in the element, itself. For example, a control that only has an icon in it.  
![Alt text](../../images/elements/tips/tips-example-tooltip.svg)


If the element has a shortcut, provide the shortcut in the tip.
<div class="do" markdown="1">
![Alt text](../../images/elements/tips/tips-shortcut-example-do.svg)  

Do
</div>

It isn’t necessary to provide a tip for every control. Consider how useful a tip is for helping the user understand a command.
<div class="dont" markdown="1">
![Alt text](../../images/elements/tips/tips-control-dont.svg)  

Don't
</div>

## Placement
Place tips in an area that avoids covering related content.  
<div class="do" markdown="1">
![Alt text](../../images/elements/tips/tips-placement-do.svg)  

Do
</div>
<div class="dont" markdown="1">
![Alt text](../../images/elements/tips/tips-placement-dont.svg)  

Don't
</div>

## Choosing between a tooltip and an infotip
- Tooltips provide a concise label to help identify a UI element. If the user only needs to understand what a command is, use a tooltip.
- Infotips are used to provide additional context to an item when helpful. If a command is seldom used or complex, an infotip can provide more information than a tooltip. 

If the extra information provided by an infotip would be redundant, use a tooltip instead.

<div class="do" markdown="1">
![Alt text](../../images/elements/tips/tips-hide-palette-do.svg)  

Do
</div>
<div class="dont" markdown="1">
![Alt text](../../images/elements/tips/tips-hide-palette-dont.svg)  

Don't
</div>
In the example above, the extra content is redundant and unnecessary. A tooltip can be used to define what the control does.


If you need to provide the name **and** description of an element, use an infotip.
  
![Alt text](../../images/elements/tips/tips-highlight-execution.svg)

Don't rely solely on what other controls are using. Just because other elements are using an tooltip or infotip it isn't required that your tip use the same implementation. The part to keep consistent is providing the appropriate amount of information for the user.



## Tooltips
Tooltips provide name or the basic description of an element. 

![Alt text](../../images/elements/tips/tips-hide-palette-do.svg)  


For truncated text, use tooltips to provide the full name.  
<div class="do" markdown="1">
![Alt text](../../images/elements/tips/tips-text-truncate-do.svg)  

Do
</div>
If a textblock is not truncated, don't provide a tooltip if it just repeats the text.  
<div class="dont" markdown="1">
![Alt text](../../images/elements/tips/tips-text-truncate-dont.svg)  

Don't
</div>


If the tooltip is providing additional information about an element, it is OK to show it even if the text is not truncated.  
<div class="do" markdown="1">
![Alt text](../../images/elements/tips/tips-tooltip-file-path-do.svg)  

Do
</div>

### Layout and spacing
![Alt text](../../images/elements/tips/tips-visual-spec-tooltip.svg)  


## Infotips
Do not include elements in an infotip that require the user to click. However, you can provide commands via key input to execute commands in the footer.

![Alt text](../../images/elements/tips/tips-highlight-execution.svg)

Due to their extra content, infotips do not timeout so the user has time to read the information.
  - Technically, it is not possible to turn off the timout value. However, you can set the `ShowDuration` property to a very large value, like `360000000`, to achieve this effect.

It isn't necessary to use a header in an infotip if it is simply repeating the text in the element. 
<div class="do" markdown="1">
![Alt text](../../images/elements/tips/tips-infotip-header-do.svg)  

Do
</div>
<div class="dont" markdown="1">
![Alt text](../../images/elements/tips/tips-infotip-header-dont.svg)  

Don't
</div>
**Exception:** In the palette we have chosen to always show the header in the infotip since the items are a closely related collection and the header sometimes varies from the name shown in the palette.

### Layout and spacing
![Alt text](../../images/elements/tips/tips-visual-spec-infotip-footer.svg)     
![Alt text](../../images/elements/tips/tips-visual-spec-infotip-no-footer.svg)  
