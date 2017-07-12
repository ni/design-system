---
layout: page
title: Group boxes
category: elements
tags:
status: WIP


---

While group boxes can be a way to visually create relationships between controls, they can cause a simple interface to look overly complex.

**Pro:** Strong way to indicate relationships.  
**Con:** Overusing them adds visual clutter.

### Alternatives

Instead of group boxes, try using layout to communicate relationships. Place related controls next to each other and put extra spacing between unrelated controls. Use headings and indenting to show hierarchical relationships.

Using a separator is more lightweight and provides a cleaner look.
If you find you must use a group box:

- Don’t nest group boxes.
- Don’t put controls in group box labels 
  - **Exception:** OK to use a checkbox as a group box label if the checkbox enables/disables all controls inside the group box.
- Don’t disable group boxes. Instead, disable all the controls inside the group box, but not the group box itself.
- Label all group boxes.
- Watch for redundancy with the group box label and the control labels.
