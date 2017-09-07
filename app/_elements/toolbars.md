---
layout: page
title: Toolbars
category: elements
tags:
  - command
  - commands
  - container

status: ready
---

A toolbar provides a set of commands and controls for a context. These are commonly seen along the top of documents and tabs within a pane.

**Codename:** `ShellToolbar` - NationalInstruments.Shell

## Use the factory to create toolbars
You will populate a toolbar via our commanding and factory system. To get the toolbar look, most factories have a `ForToolBar` static factory to get this different style. In some cases we actually have a different factory, like `ShellToolBarButtonVisualFactory` which creates a `ShellToolBarButton` (rather than just a different style for `ShellButton`). 

## Examples
#### Left side

![Alt text](../../images/elements/toolbars/toolbar-left.svg)
#### Right side

![Alt text](../../images/elements/toolbars/toolbar-right.svg)

## Use separators between text controls
Because dropdowns and buttons only have text, they need some sort of containment. Use a separator on both sides of controls that have text but don't have borders. In the example below, the zoom drop-down and Edit icon controls have toolbar separators on both sides of them.

![Alt text](../../images/elements/toolbars/toolbar-right.svg)

{% highlight c# %}
using (context.AddDocumentToolBarContent())
{
  using (context.AddGroup(ShellToolBar.LeftGroupCommand))
  {
    context.Add(new ShellCommandInstance(ShmooCommands.ActiveSite) { Weight = 0.1 },
      new ChoiceComboBoxFactory { CreateLabel = true, LabelVerticalAlignment = VerticalAlignment.Center, Width = SessionManager.SitesComboBoxWidth });
    context.Add(new ShellCommandInstance(PatternCommands.OpenEnabledSitesDialog) { Weight = 0.1 }, ShellToolBarButtonVisualFactory.NoMask);
    context.Add(new ShellCommandInstance(CommandHelpers.SeparatorItem) { Weight = 0.1 });
    context.Add(new ShellCommandInstance(PatternCommands.ToggleAutomaticallyConnectPinsOnBurst) { Weight = 0.1 },
      new ToggleButtonFactory { Padding = new SMThickness(4), RenderImageAsMask = false, ShowContentLabel = false, ShowToolTip = true });
    context.Add(new ShellCommandInstance(ShmooCommands.Run) { Weight = 0.1 }, ShellToolBarButtonVisualFactory.NoMask);
    context.Add(new ShellCommandInstance(PatternCommands.Abort) { Weight = 0.1 }, ShellToolBarButtonVisualFactory.NoMask);
    context.Add(new ShellCommandInstance(CommandHelpers.SeparatorItem) { Weight = 0.1 });
    context.Add(new ShellCommandInstance(ShmooCommands.SaveToPng) { Weight = 0.1 }, ShellToolBarButtonVisualFactory.NoMask);
  }
}
{% endhighlight %}