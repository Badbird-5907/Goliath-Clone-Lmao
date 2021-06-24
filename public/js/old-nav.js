window.onload = function (){
    highlight();
    /*
    var x1 = document.getElementsByClassName("navEntry");
    var yes = false;
    //var link = window.location.href.replace('localhost/','').replace('http://localhost/','').replace('https://panel.octopvp.net/','').replace('http://','').replace('https://','').replace(" ",'');
    var page = document.title.replaceAll("OctoControl > ","").replaceAll(" ","");
    for (let i = 0; i < x1.length; i++) {
        var x = x1.item(i);
        console.log("" + page.toLowerCase());
        console.log("" + x.textContent.toLowerCase());
        if(x.textContent.toLowerCase() == page.toLowerCase()){
            x.className += " active";
            yes = true;
        }
    }
    if(yes === false){
        x1.item(0).className += " active";
    }
     */

}
function highlight(){
    const x1 = document.getElementsByClassName('navEntry');
    let yes = false;
    const title = document.title;
    const p = title.split(' > ');
    console.log(p);
    var length = p.length - 1;
    const page = p[length].toLowerCase();
    const p1 = page.replaceAll(' ','');
    console.log("a: " + page  + " | b: " + p1)
    for (let i = 0; i < x1.length; i++) {
        console.log(p1);
        var x = x1.item(i);
        console.log(x);
        var text = x.textContent.toLowerCase().replaceAll(' > ','').replaceAll('>','').replaceAll(' ','');
        console.log('Link: ' + p1);
        console.log('NavEntry: ' + text.replaceAll(' ',''));
        if(text == p1){
            console.log("true")
            x.className += ' active';
            yes = true;
            break;
        }
    }
}
/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function myFunction() {
    var x = document.getElementById("topnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

