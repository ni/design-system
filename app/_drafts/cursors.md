---
layout: page_notoc
title: Cursors
category: style
tags:
  - images
  - iconography
  - image
status: ready
---
<body>
    <p>The {{ site.title }} provides a consolidated set of cursors for use throughout NI desktop software products.</p>

 <!--   <p><strong>XAML Code Snippet</strong></p>
   <p>To reference an icon from this library in XAML, use the pack URI scheme of the icon.</p> -->

<!-- {% highlight xml%}
<Image Source="pack://application:,,,/NationalInstruments.PlatformFramework;component/ProjectExplorer/Images/AddPullDown_16x16.png"/>
{% endhighlight %} -->



    <div class="iconset">    
        {% for item in site.data.cursors %}
        <span class="container">
            <div class="icon-card">
            <span class="helper"></span>
                <img class="icon" style="width: 32px" src="../../images/style/cursors/{{ item.cursor }}"/>
            </div>
            <div>{{ item.cursor }}</div>
        </span>
        {% endfor %}
    </div>

</body>
