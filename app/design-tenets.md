---
layout: page
title: Design tenets
---

<style is="custom-style">

#tenets h2{
font-size:2em;
margin-bottom:20px;
font-weight:300;
margin-top:8px;
}
#tenets h3{
font-size:1.33em;
font-weight:700;
margin-bottom:0px;
line-height:30px;
margin-top:8px;
color: var(--primary-color);
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
    margin: 1em 0 0 0;
    border-top: 1px solid var(--divider-color);
    min-height:275px;
    padding: 15px 0 0 0;
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
    padding: 0 0 0 0;
}


</style>

<div id="tenets">
<div class="right tenet">
  <div class="words">
    <h2>Stay Authentically LabVIEW</h2>  
    <h3>Respect the History</h3>  
    <p>More than parity; we desire migration. Therefore, while the design should feel contemporary, we choose to change patterns, and workflows familiar to our existing users only when doing so is a clear improvement.</p>
    
    <h3>Stay Trustworthy</h3>  
    <p>NI users have a high capacities for processing information. We build and maintain trust through accuracy and providing the appropriate level of complexity so a user can take action, complete tasks, and be successful. We only show that which provides value, and we avoid over simplification which may cause frustration.</p>
  </div>  
</div>

<div class="right tenet"> 
  <div class="words">
  <h2>Convey Purpose</h2>
  
  <h3>Direct Focus</h3>
  <p>A well-considered design does not obscure the workspace. It is both neutral and restrained, concentrating on purpose. It elevates the essential aspects of the experience, and defers to the user’s content, which should be clear and readable.</p>
  
  <h3>Be Cautious When Assuming User Intent</h3>
  <p>Users need to feel in control. The frustration in fighting an unwanted automated change is far greater than the frustration of performing a task manually.</p>
  </div>
</div>

<div class="right tenet">
  <div class="words">
  <h2>Foster Learning</h2>  
  <h3>Promote Confidence</h3>
  <p>Exploration depends on user confidence in predicting behavior and trust that the experience is error tolerant. To achieve this, use common, consistent patterns, and the appropriate visual cues to convey meaning and suggest expected behavior.</p>
  
  <h3>Progressive Disclosure</h3>
  <p>Use progressive disclosure to promote good decision-making, and reduce cognitive load. For novice users, this helps prioritize their attention. For advanced users, this saves them time scanning through features they rarely use.</p>
  </div>
</div>

<div class="right tenet"> 
  <div class="words">
  <h2>Promote Efficiency</h2>  
  <h3>Encourage Direct Manipulation</h3>
  <p>Direct manipulation is recommended for non-repeated or non-batch configuration. It helps users feel in control and promotes rapid learning. Lack of navigation makes it more discoverable, feedback is immediate, and actions are easier to understand than UI syntax.</p>
  
  <h3>Provide Batch Operations, and Promote Property Inheritance</h3>
  <p>When objects are out of sight, or the user needs to perform one action across multiple objects, avoid direct manipulation. It is better to provide one place to apply settings through an 'Apply All' control, a dialog, a pane, a separate document, or context menu.</p>
  <h3>Provide the Appropriate Level of "Scrappiness"</h3>
  <p>"Scrappiness" is the ability to perform a non-linear workflow from one of many starting points. If the user may easily be overwhelmed, the experience requires specific steps in a specific order, or the user needs a strong indication of progress, it is better to guide the user or promote automation.</p>

  </div>
</div>

</div>