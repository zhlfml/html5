var uploadFile = function(url, file) {
    var $element = $("<div />"),
        $progress = $("#progress");
    $element.text(file.name);
    $("#target").append($element);

    var formData = new FormData();
    formData.append("file", file);

    var xhr = new XMLHttpRequest();
    xhr.upload.addEventListener("progress", function(e) {
        var per = Math.round((e.loaded / e.total) * 100);
        $progress.val(per);
    });
    xhr.upload.addEventListener("load", function() {
        $element.text("Complete");
        $element.delay(1000).fadeOut();
        $progress.val(0);
    });

    xhr.open("POST", url, true);
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest"); // seems not necessary
    xhr.send(formData);
};