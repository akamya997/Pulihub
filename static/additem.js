function showAdd() {
  $("#add_box").modal("show");
}

function closeAdd() {
  $("#add_box").modal("hide");
}

function changeType(obj) {
  var idx = obj.selectedIndex;
  var value = obj.options[idx].value;
  console.log(value, "is selected.");
  for (var i = 0; i < obj.options.length; i++) {
    if (obj.options[i].value == value)
      document.getElementById(`${obj.options[i].value}_form`).style.display =
        "";
    else
      document.getElementById(`${obj.options[i].value}_form`).style.display =
        "none";
  }
}

function submitItem() {
  var typeSelector = document.getElementById("type");
  var idx = typeSelector.selectedIndex;
  var type = typeSelector.options[idx].value;
  var form_data = $(`#${type}_form`)
    .serializeArray()
    .reduce(
      (json, { name, value }) => {
        json[name] = value;
        return json;
      },
      { type: type }
    );
  $.ajax({
    type: "POST",
    url: "api/data",
    dataType: "json",
    data: JSON.stringify(form_data),
    success: function (data, status) {
      alert(data["message"]);
      closeAdd();
    },
    error: function (e) {
      alert("failed");
    },
  });
}
