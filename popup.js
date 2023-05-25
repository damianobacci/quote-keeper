document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("view-quotes").addEventListener("click", function () {
    alert("Pressed");
    let body = (document.getElementsByTagName("body")[0].style.backgroundColor =
      "aqua");
  });
});
