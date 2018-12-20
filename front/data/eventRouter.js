if(!window.location.href.match(/\/build\//)){
    var newLink = window.location.href;
    var hash = newLink.match(/#.+/);
    newLink = newLink.replace(/(\w+|\W+)\.html(#(.+))?/,'')

    if(hash == null){
        newLink = newLink + 'build/';
    }else{
        newLink = newLink + 'build/index.html'+hash;
    }

    window.location.href = newLink;
}
