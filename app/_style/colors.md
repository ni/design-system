---
layout: page
title: Colors
category: style
tags:
  - palette
  - hex
  - rgb
  - IDE
status: WIP
---
To use these colors, you will need to make sure that your XAML file has a direct or indirect references to **Colors.xaml**. 

## Editor colors
This list contains the primary colors used throughout NI software interfaces.
<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Example</th>
      <th>Value</th>
    </tr>
  </thead>
  <tbody>
     {% for color in site.data.colors-editor %}  
        <tr>      
            <td>{{ color.name }}</td>            
            {% if color.type == nil %}
              <td style="background-color:{{ color.value }}"></td> 
              <td>{{ color.value }}</td> 
            {% else %}
              {% assign stop1val = color.stop1value %}
              {% assign stop1offset = color.stop1offset %}
              {% assign stop2val = color.stop2value %}
              {% assign stop2offset = color.stop2offset %}
              <td style="background: red; /* For browsers that do not support gradients */
              background: -webkit-linear-gradient({{ stop1val }} {{stop1offset}}%, {{stop2val }} {{stop2offset}}%); /* For Safari 5.1 to 6.0 */
              background: -o-linear-gradient({{ stop1val }} {{stop1offset}}%, {{stop2val }} {{stop2offset}}%); /* For Opera 11.1 to 12.0 */
              background: -moz-linear-gradient({{ stop1val }} {{stop1offset}}%, {{  stop2val }} {{stop2offset}}%); /* For Firefox 3.6 to 15 */
              background: linear-gradient({{ stop1val }} {{stop1offset}}% , {{ stop2val }} {{stop2offset}}%); /* Standard syntax */
              "></td> 
              <td>{{ stop1val }} (Offset: {{stop1offset}}%)<br/>{{ stop2val }} (Offset: {{stop2offset}}%)</td>  
            {% endif %}
                    
        </tr>
    {% endfor %}
  </tbody>
</table>

#### Editor colors implementation example
To use the colors in a XAML file, reference the resource dictionary and use the names of the colors.

{% highlight xml %}
<!--Reference Colors.xaml as a resource dictionary -->
<ResourceDictionary Source="/NationalInstruments.Core;component/Themes/Colors.xaml" />
<!--After that, you can use the colors by name -->
 <Rectangle 
  Fill="{StaticResource NIHighlightBrush}" 
  Height="100" 
  Width="100"/>  
{% endhighlight %}

## Data type colors
Data type colors are referenced in **PlatformFramework\\SourceModel\\Designer\\StockDiagramUIResources.cs** as part of the public static class `StockTypeAssets`. 

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Variation</th>
      <th>Example</th>
      <th>Value</th>
    </tr>
  </thead>
  <tbody>
     {% for color in site.data.colors-data-type %}  
        <tr>      
            <td>{{ color.name }}</td>
            <td>{{ color.type }}</td>
            <td>Primary</td>
            <td style="background-color: {{ color.primary }}"></td>
            <td>{{ color.primary }}</td>
        </tr>
         <tr>      
            <td></td>
            <td></td>
            <td>Secondary</td>
            <td style="background-color: {{ color.secondary }}"></td>
            <td>{{ color.secondary }}</td>
        </tr>
         <tr>      
            <td></td>
            <td></td>
            <td>Tertiary</td>
            <td style="background-color: {{ color.tertiary }}"></td>
            <td>{{ color.tertiary }}</td>
        </tr>
        <!--Blank row added to help spacing-->
        <tr>
            <td style="border:0px"></td>
            <td style="border:0px"></td>
            <td style="border:0px"></td>
            <td style="border:0px"></td>
            <td style="border:0px"></td>
        </tr>
    {% endfor %}
  </tbody>
</table>