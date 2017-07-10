---
layout: page
title: Toolbars
category: elements
tags:
  - command
  - commands
  - container

status: WIP
---

A toolbar provides a set of commands and controls for a context. These are commonly seen along the top of documents and tabs within a pane.

**Codename:** `ShellToolbar` - NationalInstruments.Shell

## Use the factory to create toolbars
In general, you will populate a toolbar via our commanding and factory system. To get the toolbar look, most factories have a `ForToolBar` static factory to get this different style. In some cases we actually have a different factory, like `ShellToolBarButtonVisualFactory` which creates a `ShellToolBarButton` (rather than just a different style for `ShellButto`n). 

## Use separators between text controls
aflajfifnsflasjf

Example below, with separators.

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