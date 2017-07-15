---
layout: page
title: Design tenets
---

<style is="custom-style">

#tenets h2{
font-size:48px;
}

.left{
  text-align:right;
  clear:both;

}
.left img{
  float:right;
  margin-left:15px;
  height:260px;
}
.right{
text-align:left;
clear:both;

}

.right img{
  float:left;
  margin-right:15px;
  height:260px;
}

.tenet{
    padding: 1em 0;
    border-top: 1px solid var(--divider-color);
    min-height:275px;
}
.tenet:first-of-type {
    border-top: none;
    padding: 0 0 1em 0;
}
#post{
  max-width:900px;
}


</style>

<div id="tenets">
<div class="right tenet">
  <img src="../images/overview/design-tenets-efficient.svg"/>
  <h2>Efficient</h2>
  
  <p>Let users do their thing with efficiency (get out of the way)</p>
  
  <p>
    allow direct manipulation for common actions<br />
    provide a means to apply settings across multiple objects (batch operations)<br />
    different stages of the workflow may call for different levels of “scrappiness”<br />
    be cautious when making assumptions about what users want<br />
  </p>
  
</div>
<div class="left tenet"> 
  <img src="../images/overview/design-tenets-modern.svg"/>
  <h2>Modern</h2>
  
  <p>Modernize without losing the goodness of what came before</p>
  <p>
    use common, familiar interaction and visual patterns<br />  
    strive for migration of functionality, not parity of interactions<br />  
    balance between familiarity and innovation<br />
  </p>
</div>

<div class="right tenet">
  <img src="../images/overview/design-tenets-learnable.svg"/>
  <h2>Learnable</h2>  
  <p>Help users create a foundation of knowledge that can be built upon</p>
  <p>
    guide users to understanding without distracting them from their goal<br />  
    encourage and allow exploration with minimal consequences<br />  
    maintain consistent interaction and visual patterns between basic and advanced workflows<br />  
    use progressive disclosure to promote good decision-making and reduce cognitive load<br />
  </p>
</div>

<div class="left tenet"> 
  <img src="../images/overview/design-tenets-trustworthy.svg"/>
  <h2>Trustworthy</h2>  
  <p>Work as a trusted partner to inspire confidence</p>
  <p>
    complexity isn’t always bad; don’t strictly strive for simplicity<br />  
    give appropriate feedback and actionable error messaging to inform users of the system’s status<br />  
    encourage and allow exploration with minimal consequences<br />
  </p>
</div>

<div class="right tenet">
  <img src="../images/overview/design-tenets-unobtrusive.svg"/>
  <h2>Unobtrusive</h2>
  <p>Allow users to focus on creating meaningful content</p>
  <p>
    user content should be clear and readable<br />
    avoid obscuring the workspace<br />
    reduce the need to focus on chrome or pixel pushing<br />
  </p>
</div>
</div>