function buildTOC(){
    var h2s = document.getElementsByTagName("h2");
    var ul = document.getElementById("tocList");
    if (h2s.length == 0){
        var element = document.getElementById("toc");
        element.parentNode.removeChild(element);
    }else{    
        for (var i = 0; i < h2s.length; i++) {
            var li = document.createElement("li");
            var link = document.createElement("a");

            link.name = h2s[i].id
            
            link.innerHTML = h2s[i].innerHTML;
            link.addEventListener(
                "click", 
                function scrollToAnchor(e) {
                        e.preventDefault();
                        var elements = document.getElementsByClassName('content');
                        var contentElement = elements[0];

                        var element = document.getElementById(e.target.name);
                        var scrollPos = element.offsetTop - 72;
                        window.scroll({ top: scrollPos, left: 0, behavior: 'smooth' });
                })
            li.appendChild(link);
            ul.appendChild(li);            
            }
        }
    }


function scrollToAnchor(anchor){
    alert("click");
    

}