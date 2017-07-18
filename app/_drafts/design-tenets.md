---
layout: page
title: Design tenets
---

<style is="custom-style">

#tenets h2{
font-size:48px;
margin-bottom:8px;

}

.left{
  text-align:right;
   justify-content: flex-end;
}
.left img{
  -webkit-order: 2;
  order: 2;
  margin-left:25px;
  height:260px;
}
.left .words{
  -webkit-order: 1;
  order: 1;
}

.right{
text-align:left;
justify-content: flex-start;

}

.right img{
  margin-right:25px;
  height:260px;
  -webkit-order: 1;
  order: 1;
}
.right .words{
  -webkit-order: 2;
  order: 2;
}

.tenet{
    margin: 1em 0;
    border-top: 1px solid var(--divider-color);
    min-height:275px;
    padding: 20px 0 0 0;
    margin: 0;
    list-style: none;
    
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    flex-direction: row
    -webkit-flex-flow: row wrap;
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
  <div class="words">
    <h2>Efficient</h2>  
    <p><strong>Let users do their thing with efficiency.</strong></p>  
    <p>
      Allow direct manipulation for common actions.<br />
      Provide a means to apply settings across multiple objects.<br />
      Different stages of the workflow may call for different levels of “scrappiness.”<br />
      Be cautious when making assumptions about what users want.<br />
    </p>
  </div>  
</div>

<div class="left tenet"> 
  <img src="../images/overview/design-tenets-modern.svg"/>
  <div class="words">
  <h2>Modern</h2>
  
  <p><strong>Modernize without losing the goodness of what came before.</strong></p>
  <p>
    Use common, familiar interaction and visual patterns.<br />  
    Strive for migration of functionality, not parity of interactions.<br />  
    Balance between familiarity and innovation.<br />
  </p>
  </div>
</div>

<div class="right tenet">
  <img src="../images/overview/design-tenets-learnable.svg"/>
  <div class="words">
  <h2>Learnable</h2>  
  <p><strong>Help users create a foundation of knowledge that can be built upon.</strong></p>
  <p>
    Guide users to understanding without distracting them from their goal.<br />  
    Encourage and allow exploration with minimal consequences.<br />  
    Maintain consistent interaction and visual patterns between basic and advanced workflows.<br />  
    Use progressive disclosure to promote good decision-making and reduce cognitive load.<br />
  </p>
  </div>
</div>

<div class="left tenet"> 
  <img src="../images/overview/design-tenets-trustworthy.svg"/>
  <div class="words">
  <h2>Trustworthy</h2>  
  <p><strong>Work as a trusted partner to inspire confidence.</strong></p>
  <p>
    Complexity isn’t always bad; don’t strictly strive for simplicity.<br />  
    Give appropriate feedback and actionable messaging to inform users of the system’s status.<br />  
    Encourage and allow exploration with minimal consequences.<br />
  </p>
  </div>
</div>

<div class="right tenet">
  <img src="../images/overview/design-tenets-unobtrusive.svg"/>
  <div class="words">
  <h2>Unobtrusive</h2>
  <p><strong>Allow users to focus on creating meaningful content.</strong></p>
  <p>
    User content should be clear and readable.<br />
    Avoid obscuring the workspace<br />
    Reduce the need to focus on chrome or pixel pushing<br />
  </p>
  </div>
</div>
</div>