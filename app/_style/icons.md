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

<custom-style>
    <style is="custom-style">
.set {
    margin: auto;
    padding: 1em 0;
    border-bottom: 1px solid silver;
    @apply(--layout-horizontal);
    @apply(--layout-wrap);
}

.set:last-of-type {
    border-bottom: none;
}

.set:nth-of-type(4n-3) {
    color: var(--paper-grey-700);
}

.set:nth-of-type(4n-2) {
    color: var(--paper-pink-500);
}

.set:nth-of-type(4n-1) {
    color: var(--google-green-500);
}

.set:nth-of-type(4n) {
    color: var( --google-blue-500);
}

.container {
    min-width: 10em;
    padding: 1em 0.5em;
    text-align: center;
    @apply(--layout-vertical);
    @apply(--layout-center);
    @apply(--layout-flex);

}


.container > div {
    margin-top: 0.5em;
    color: black;
    font-size: 10px;
}
.icon-card{
    height:160px;
    width: 160px;
    background-color: var(--light-accent-color);
    white-space: nowrap;    
    text-align: center; 
    margin: 1em 0;
}
img{
    vertical-align: middle;
    max-height: 160px;
    max-width: 160px;
}
.helper {
    display: inline-block;
    height: 100%;
    vertical-align: middle;
}
    </style>
  </custom-style>

<body>
    <p>The {{ site.title }} provides a consolidated set of iconongraphy for use throughout NI software products.</p>

   <p><strong>XAML Code Snippet</strong></p>
   <p>To reference an icon from this library in XAML, use the pack URI scheme of the icon.</p>

{% highlight xml%}
<Image Source="pack://application:,,,/NationalInstruments.PlatformFramework;component/ProjectExplorer/Images/AddPullDown_16x16.png"/>
{% endhighlight %}


    {% for group in site.data.icons.groups %}  
    <h2>{{ group.path }}</h2>
    <div class="set">    
        {% for item in group.icons %}
        <span class="container">
            <div class="icon-card">
            <span class="helper"></span>
                <img src="../../images/style/icons/{{ group.path }}/{{ item.icon }}"/>
            </div>
            <div>{{ item.icon }}</div>
        </span>
        {% endfor %}
    </div>
    {% endfor %}
</body>