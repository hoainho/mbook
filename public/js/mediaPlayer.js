
function play(element) {
  var vynlId = document.getElementById("vynl-id");

  var audio = document.getElementById("audioSrc");

  audio.loop = true;

  if (document.getElementById("playpause").classList.contains("play-circle")) {
    vynlId.classList.add("vynl-animation");
    document.getElementById("audioSrc").play();
    document.getElementById("playpause").classList.remove("play-circle");
    document.getElementById("playpause").classList.add("pause-circle");
  }
  else if (document.getElementById("playpause").classList.contains("pause-circle")) {
    vynlId.classList.remove("vynl-animation");

    document.getElementById("audioSrc").pause();
    document.getElementById("playpause").classList.remove("pause-circle");
    document.getElementById("playpause").classList.add("play-circle");
  }
}
// playpause.onclick(play())
$(document).ready(function () {
  $("#playpause").click(() => {
    play()
  })
  $("#searchByCategory").select2();
});

