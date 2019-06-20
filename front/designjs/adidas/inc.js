fetch("/inc/adi/header.html")
    .then(response => {
        return response.text()
    })
    .then(data => {
        document.querySelector("header_adi").innerHTML = data;
    });

fetch("/inc/adi/footer.html")
    .then(response => {
        return response.text()
    })
    .then(data => {
        document.querySelector("footer_adi").innerHTML = data;
    });