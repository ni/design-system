---
layout: page
title: List boxes
category: elements
tags:


---

List views allow the user to select from a list of options.

**Codename:** `ListView` - NationalInstruments.Controls.Shell


**XAML Code Snippet**
```xml
<shell:ListView x:Name="listView" Width="200" Height="100">
  <ListViewItem Content="ListViewItem 1"/>
  <ListViewItem Content="ListViewItem 2"/>
  <ListViewItem Content="ListViewItem 3"/>
</shell:ListView>
```

![NIDS\_images/List%20boxes/Controls\_List\_box\_Regular\_No\_Zebra.png](media/image81.png){width="3.5694444444444446in"
height="1.75in"}

![NIDS\_images/List%20boxes/Controls\_List\_box\_Tight\_No\_Zebra.png](media/image82.png){width="3.5694444444444446in"
height="1.3611111111111112in"}

![NIDS\_images/List%20boxes/Controls\_List\_box\_Tight\_No\_Zebra\_Hover.png](media/image83.png){width="2.861111111111111in"
height="1.3611111111111112in"}
![NIDS\_images/List%20boxes/Controls\_List\_box\_Tight\_No\_Zebra\_Selected\_Hover.png](media/image84.png){width="2.875in"
height="1.3611111111111112in"}
![NIDS\_images/List%20boxes/Controls\_List\_box\_Tight\_No\_Zebra\_Selected.png](media/image85.png){width="2.861111111111111in"
height="1.3611111111111112in"}

![NIDS\_images/List%20boxes/Controls\_List\_box\_Tight\_Read-only.png](media/image86.png){width="3.5694444444444446in"
height="1.3611111111111112in"}

![NIDS\_images/List%20boxes/Controls\_List\_box\_Tight-Add\_button.png](media/image87.png){width="3.5972222222222223in"
height="1.4583333333333333in"}

![NIDS\_images/List%20boxes/Controls\_List\_box\_editable\_Basic\_Read-only.png](media/image88.png){width="3.58in"
height="1.47in"}

![NIDS\_images/List%20boxes/Controls\_List\_box\_editable\_Basic\_Regular.png](media/image89.png){width="3.5833333333333335in"
height="1.4722222222222223in"}

![NIDS\_images/List%20boxes/Controls\_List\_box\_editable\_Control\_Drag.png](media/image90.png){width="3.5694444444444446in"
height="1.5277777777777777in"}
![NIDS\_images/List%20boxes/Controls\_List\_box\_editable\_Control\_Drop.png](media/image91.png){width="3.5694444444444446in"
height="1.4722222222222223in"}

![NIDS\_images/List%20boxes/Controls\_List\_box\_editable\_Control\_Edit%20mode.png](media/image92.png){width="3.5833333333333335in"
height="1.4722222222222223in"}
![NIDS\_images/List%20boxes/Controls\_List\_box\_editable\_Control\_Hover.png](media/image93.png){width="3.5694444444444446in"
height="1.4722222222222223in"}

![NIDS\_images/List%20boxes/Controls\_List\_box\_editable\_Control\_Lock\_Hover.png](media/image94.png){width="3.2083333333333335in"
height="1.4722222222222223in"}
![NIDS\_images/List%20boxes/Controls\_List\_box\_editable\_Control\_Lock\_Regular.png](media/image95.png){width="3.2083333333333335in"
height="1.4722222222222223in"}

![NIDS\_images/List%20boxes/Controls\_List\_box\_editable\_Control\_Multi-select.png](media/image96.png){width="3.5833333333333335in"
height="1.4722222222222223in"}
![NIDS\_images/List%20boxes/Controls\_List\_box\_editable\_Control\_Regular.png](media/image97.png){width="3.5833333333333335in"
height="1.4722222222222223in"}

![NIDS\_images/List%20boxes/Controls\_List\_box\_editable\_Mulit-column\_Edit\_mode.png](media/image98.png){width="3.5833333333333335in"
height="1.4583333333333333in"}
![NIDS\_images/List%20boxes/Controls\_List\_box\_editable\_Mulit-column\_Hover.png](media/image99.png){width="3.5833333333333335in"
height="1.4722222222222223in"}

![NIDS\_images/List%20boxes/Controls\_List\_box\_editable\_Mulit-column\_Multi-select.png](media/image100.png){width="3.5833333333333335in"
height="1.4722222222222223in"}
![NIDS\_images/List%20boxes/Controls\_List\_box\_editable\_Mulit-column\_Regular.png](media/image101.png){width="3.5972222222222223in"
height="1.4722222222222223in"}

  ------------------------ --------------- ----------------------------------------------------------------------------------------------------------------------------------- ---- -------------
  Drag and Drop List box   ShellDataGrid   This is a list box that allows multi selection, drag and drop, quick delete and default value.  This isn't a standard MS control.   No   Implemented
  ------------------------ --------------- ----------------------------------------------------------------------------------------------------------------------------------- ---- -------------

  --------------------------------------- -- ------------------------------------------------------------------------------------------------------------------------------------------------- -- ---------------
  List Box                                   Must describe Selection Mode (Extended is much more common than Multiple-Selection). If multiple selections are the most common use checkboxes.      Not Evaluated
                                                                                                                                                                                                  
  -   Standard/Multi/Extended Selection      List Boxes do not support drag and drop so if ordering is important and needs to be drag and drop we should use a List View.
  -   Checkbox?
  -   Ordering?
  --------------------------------------- -- ------------------------------------------------------------------------------------------------------------------------------------------------- -- ---------------