function goBack() {
    window.history.back();
}

function showAlert(title,message){
    document.getElementById('modal-title').textContent += title;
    document.getElementById('modal-message').textContent += message;
    console.log("Title: " + title + " | Message: " + message);
    UIkit.modal('#message').show();
}
function showFlash(message){
    console.log('message:' + message)
    if(message === null) {
        UIkit.alert(document.getElementById('flash-box')).close();
        return
    }
    if(message === undefined) {
        UIkit.alert(document.getElementById('flash-box')).close();
        return;
    }
    if(message === '') {
        UIkit.alert(document.getElementById('flash-box')).close();
        return;
    }
    if(message === ' '){
        UIkit.alert(document.getElementById('flash-box')).close();
        return;
    }
    //document.getElementById('flash-box').classList.remove('hidden');
    document.getElementById('flash').textContent += message;
}
function showTopNotiflication(message){
    UIkit.notification(message, 'primary');
}
function init(){
    $(function(){
        $('#nav-placeholder').load('/old-nav');
    });
    sleep(500)
    highlight()
    /*
    sleep(500);
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
     */
    /*
    if(yes === false){
        console.log("false")
        x1.item(0).className += ' active';
    }
     */
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
