---
layout: page
title: Icons
category: style
tags:
  - images
  - iconography
  - image
status: ready
---
<body>
    <p>The {{ site.title }} provides a consolidated set of iconography for use throughout NI software products.</p>

   <p><strong>XAML Code Snippet</strong></p>
   <p>To reference an icon from this library in XAML, use the pack URI scheme of the icon.</p>

{% highlight xml%}
<Image Source="pack://application:,,,/NationalInstruments.PlatformFramework;component/ProjectExplorer/Images/AddPullDown_16x16.png"/>
{% endhighlight %}


    {% for group in site.data.icons.groups %}  
    <h2>{{ group.path }}</h2>
    <div class="iconset">    
        {% for item in group.icons %}
        <span class="container">
            <div class="icon-card">
            <span class="helper"></span>
                <img class="icon" src="../../images/style/icons/{{ group.path }}/{{ item.icon }}"/>
            </div>
            <div>{{ item.icon }}</div>
        </span>
        {% endfor %}
    </div>
    {% endfor %}
</body>