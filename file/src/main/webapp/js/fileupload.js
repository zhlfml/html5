var uploadFile = function(url, file) {
    var $element = $("<div />"),
        $progress = $("#progress");;
    $element.text(file.name);
    $("#target").append($element);

    var onProgress = function(e) {
        var per = Math.round((e.loaded / e.total) * 100);
        $progress.val(per);
    };

    var onSuccess = function() {
        $element.text("Complete");
        $element.delay(1000).fadeOut();
        $progress.val(0);
    };

    $.upload(url, file, {upload: {progress: onProgress}, success: onSuccess});
};