---
layout: page
title: List views
category: elements
tags:
status: Ready
---

**Codename:** `ListView` - NationalInstruments.Controls.Shell

List views vertically display data in scrollable columns.

## General usage
List views are used to show a list of items for selection which represent a command, object, or attribute. 

## Usage examples

Example of a list view providing multiple selectionable options in a modal dialog.
<div class="do" markdown="1">
![Alt text](../../images/elements/listviews/listview_do.svg)  

Do
</div>

If the data set you intend to display requires multiple columns per row and would benefit from column headers and the ability to sort, consider a [Table](../tables/) instead.
<div class="dont" markdown="1">
![Alt text](../../images/elements/listviews/listview_donot.svg)  

Don't
</div>

## Layout spacing and color

![Alt text](../../images/elements/listviews/listview_layout_spacing_color.svg) 



**XAML Code Snippet**

This is a snippet of code from the Preferences Pane with the layout-related properties left out.

{% highlight xml %}
<shellControls:ListView
        ItemContainerStyle="{DynamicResource ThemedListBoxItemStyle}" 
        ItemsSource="{Binding Path=PageNames}"> 
    <shellControls:ListView.ItemTemplate> 
        <DataTemplate> 
            <TextBlock Text="{Binding}"/> 
        </DataTemplate> 
    </shellControls:ListView.ItemTemplate> 
</shellControls:ListView> 
{% endhighlight %}