---
layout: page
title: Trees
category: elements
tags:
status: WIP

---
## General usage
Trees are used to display a hierarchical set of information to the user. A tree allows the user to expand and collapse sections to see their contents. It can contain multiple levels of hierarchy.

**Codename:** `ShellTreeView` - NationalInstruments.Controls.Shell  
**Codename:** `ShellTreeViewItem` - NationalInstruments.Controls.Shell

## Examples

| State         | Image         |
| ------------- |:-------------:|
| Normal        | ![Alt text](images/elements/trees/trees-list-item-parent-normal.svg)        |
| Hover         | ![Alt text](images/elements/trees/trees-list-item-parent-hover.svg)         |
| Selected      | ![Alt text](images/elements/trees/trees-list-item-parent-selected.svg)    |

## Code sample
This example is created with the XAML and C# snippets below. It shows a hierarchical set of information with multiple levels of hierarchy. The items (`TreeItems`) are defined in the C# and bound to the tree in the XAML.

![Alt text](images/elements/trees/trees-list-no-icon.svg) 

**XAML snippet**

```xml
<shellControls:ShellTreeView x:Name="shellTreeView" ItemsSource="{Binding TreeItems}">
    <shellControls:ShellTreeView.ItemTemplate>
        <HierarchicalDataTemplate ItemsSource="{Binding Children}">
            <StackPanel Orientation="Horizontal" Height="22">
                <shellControls:ShellTextBlock Text="{Binding Name}" VerticalAlignment="Center" Foreground="{StaticResource NIBlackBrush}"/>
            </StackPanel>
        </HierarchicalDataTemplate>
    </shellControls:ShellTreeView.ItemTemplate>
</shellControls:ShellTreeView>
```

**C# snippet**

{% highlight c# %}
public class Node
{
    public IEnumerable<Node> Children { get; set; }
    public string Name { get; set; }
    public Node(IEnumerable<Node> children, string name)
    {
        Children = children;
        Name = name;
    }
}

private IEnumerable<Node> _fruits = new List<Node>
{
    new Node(null, "Apple"),
    new Node(null, "Banana"),
    new Node(null, "Orange"),
};

private static IEnumerable<Node> _primaryColors = new List<Node>
{
    new Node(null, "Red"),
    new Node(null, "Yellow"),
    new Node(null, "Blue"),
};

private static IEnumerable<Node> _secondaryColors = new List<Node>
{
    new Node(null, "Green"),
    new Node(null, "Purple"),
    new Node(null, "Orange"),
};

private IEnumerable<Node> _colors = new List<Node>
{
    new Node(_primaryColors, "Primary"),
    new Node(_secondaryColors, "Secondary"),
};

public IEnumerable<Node> TreeItems
{
    get
    {
        return new List<Node>()
        {
            new Node(_fruits, "Fruit"),
            new Node(_colors, "Color"),
        };
    }
}

```


<!-- **Codename:** `FilteredTreeView` - NationalInstruments.Controls.Shell -->

