// 这些变量用来存储用以显示谁是参赛者或志愿者的视觉元素的引用
var racersList, volunteersList;

$(function() {
    racersList = document.getElementById("racers"); // <ul id="racers"></ul>
    volunteersList = document.getElementById("volunteers"); // <ul id="volunteers"></ul>

    // 目标列表注册了drag enter、leave和drop事件处理器
    var lists = [racersList, volunteersList];
    [].forEach.call(lists, function(list) {
        list.addEventListener("dragenter", handleDragEnter, false);
        list.addEventListener("dragover", handleDragOver, false);
        list.addEventListener("dragleave", handleDragLeave, false);
        list.addEventListener("drop", handleDrop, false);
    });

    // 列表外围的fieldset起到缓冲作用，用来重置drag over的样式
    var fieldsets = document.querySelectorAll("#racersField, #volunteersField"); // <fieldset id="racersField">...</fieldset>
    [].forEach.call(fieldsets, function(fieldset) {
        fieldset.addEventListener("dragover", handleDragOverOuter, false);
        // fieldset.addEventListener("dragleave", handleDragLeave, false);
    });

    // 每个可拖动的成员都有开始和结束事件处理器
    var members = document.querySelectorAll("#members li"); // <ul id="members">...</ul>
    [].forEach.call(members, function(member) {
        member.addEventListener("dragstart", handleDragStart, false);
        member.addEventListener("dragend", handleDragEnd, false);
    });
});

function handleDragStart(evt) {
    console.debug("handleDragStart()");
    evt.dataTransfer.effectAllowed = "move";
    evt.dataTransfer.setData("text/plain", evt.target.id);


    // 高亮潜在放置目标
    racersList.className = "validtarget";
    volunteersList.className = "validtarget";

    return true;
}

function handleDragEnter(evt) {
    console.debug("handleDragEnter()");
    evt.stopPropagation();
    // 默认情况下，系统假定所有的目标都不是有效的放置位置，这里取消默认，相当于通知浏览器当前目标是有效放置位置
    evt.preventDefault();
    return false;
}

function handleDragLeave(evt) {
    console.debug("handleDragLeave()");
    return false;
}

function handleDragOver(evt) {
    console.debug("handleDragOver()");
    evt.dataTransfer.dropEffect = "move";
    evt.stopPropagation();
    evt.preventDefault();

    evt.target.className = "highlighted";
    return false;
}

function handleDragOverOuter(evt) {
    console.debug("handleDragOverOuter()");
    if (evt.target.id == "racersField") {
        racersList.className = "";
    } else if (evt.target.id == "volunteersField") {
        volunteersList.className = "";
    }

    evt.stopPropagation();
    return false;
}

// 传输数据
function handleDrop(evt) {
    console.debug("handleDrop()");
    evt.stopPropagation();
    evt.preventDefault();

    var dropTarget = evt.target;
    // 使用text类型获取拖动项的姓名
    var id = evt.dataTransfer.getData("text/plain");

    var list = volunteersList;

    // 如果放置目标列表是参赛者列表，
    // 那么额外获取年龄，并加入开始处
    if (dropTarget.id == "racers" ||
        // 因为可能会在li上drop
        dropTarget.parentNode.id == "racers") {
        list = racersList;
    }

    list.appendChild(document.getElementById(id));

    return false;
}

// 确保清空所有托放操作
function handleDragEnd(evt) {
    racersList.className = "";
    volunteersList.className = "";
    return false;
}