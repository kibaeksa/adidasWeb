function startCateScrollScroll() {
    setTimeout("slideCateScroll()", 15);
}

function slideCateScroll() {
    var Sel_Height=350; 
        el = document.getElementById("fast_shopping");
    if (el.heightPos == null || (el.isDone && el.isOn == false)) {
        el.isDone = false;
        el.heightPos = 0;
        el.heightTo = Sel_Height;
    } else if (el.isDone && el.isOn){
        el.isDone = false;
        el.heightTo = 0; 
    }

    if (Math.abs(el.heightTo - el.heightPos) > 1) {
        el.heightPos += (el.heightTo - el.heightPos) / 13;
        el.style.height = el.heightPos + "px";
        startCateScrollScroll();
    } else {
    if (el.heightTo == Sel_Height) {
        el.isOn = true;
    } else {
        el.isOn = false;
    }
        el.heightPos = el.heightTo;
        el.style.height = el.heightPos + "px";
        el.isDone = true;
    }
}