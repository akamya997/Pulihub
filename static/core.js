"use strict";

var GetUrlValue = function (name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substring(1).match(reg);
  if (r != null) {
    try {
      return decodeURIComponent(r[2]);
    } catch (e) {
      return null;
    }
  }
  return null;
};

function matchlink(text, reg, urlbase) {
  var allmatch = text.match(reg);
  if (allmatch) {
    for (var j = 0; j < allmatch.length; j++) {
      text = text.replace(
        allmatch[j],
        '<a class="reproduce" target="_blank" href="' +
          urlbase +
          allmatch[j] +
          '">' +
          allmatch[j] +
          "</a>"
      );
    }
  }
  return text;
}

function autolink(text) {
  text = matchlink(
    text,
    new RegExp("av\\d+", "ig"),
    "https://www.bilibili.com/video/"
  );
  text = matchlink(
    text,
    new RegExp("sm\\d+", "ig"),
    "https://www.nicovideo.jp/watch/"
  );
  text = matchlink(
    text,
    new RegExp("v=\\S+", "ig"),
    "https://www.youtube.com/watch?"
  );
  return text;
}

function raise() {
  $("#tips").modal("show");
  setTimeout(function () {
    window.location.reload();
  }, 3000);
}
