---
layout: page
title: Text capitalization
category: style
tags:
    - style
    - text
    - UI
status: WIP
---
This section provides information on how to capitalize text in the UI of NI software products that run on Microsoft Windows. These guidelines, currently, only apply to Windows. These guidelines apply to text objects throughout the UI of NI software, such as button labels, window titles, tooltips, checkboxes, etc.
These guidelines do not apply to node name or terminal names. Those guidelines can be found at Naming nodes {::comment}add url's{:/comment} and Naming terminals.

## Guidelines

Use title-style capitalization for window titles, sentence-style capitalization for all other UI elements. While there are some exceptions (noted below), these guidelines can be used to address most of the text in the UI.

## Exceptions

1. Use title capitalization for Panes that can also be floating panes. For example, the panes along the bottom rail of LabVIEW.
  * Also use the same capitalization when referencing those panes such as in the tools pane for the left rail and the application menu.
2. When referencing a node/palette category name (or anything in the palette, really) follow the capitalization of the item being referenced.
 * Ex: If you are talking about the “Add” node, use Add. If you are talking about adding things, use add.
3. When referencing a terminal name, follow the capitalization of that terminal.
4. When referencing a Dialog Title, follow the capitalization of that dialog (Title case).
  * For example, referencing "Context Help" in the application menu (Help > Context Help) should use Title Case as it is the name of the dialog.
5.	File types are proper nouns and should be Title Case (Web VI, Resource Collection, Shared Library Interface, etc.)

## Examples

### Dialog
Outside of the title of the dialog, itself, all items should be
sentence-style capitalization.

![ialog Example](media/image1.png){width="10.56in" height="7.39in"}

### Context menu
All items in the context menu should follow sentence-style
capitalization.

![ontextMenu\_Example\_Correct.png](media/image2.png){width="5.0in"
height="2.7118055555555554in"}

Do.

![ontextMenu\_Example\_Incorrect.png](media/image3.png){width="5.0in"
height="2.7118055555555554in"}

Don't

### Configuration pane
All items in the configuration pane should follow sentence-style
capitalization.

![onfiguration Pane Correct](media/image4.png){width="5.0in"
height="7.5in"}

Do.

The terminal names of the node (input 0, input 1, etc.) follow the
capitalization from the terminal.

![onfiguration Pane Incorrect](media/image5.png){width="5.0in"
height="7.5in"}

Don't