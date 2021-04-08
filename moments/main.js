let speechRecognition = window.webkitSpeechRecognition
let recognition = new speechRecognition()

let textbox = $("#textbox")
let instructions = $("#instructions")
let content = ''
let startBtn=$('#start-btn')
let stopBtn=$('#stop-btn')
let photoButton = $("#photo-btn");
let video = $("#video").get(0);
let canvas = $("#canvas");
let context = $("#canvas")[0].getContext('2d');
let introText=$("#intro-text");
let refresh=$("#refresh");

refresh.hide();

recognition.continuous = true;

recognition.onstart = function(){
  instructions.text("Voice recognition is on!")
}

recognition.onspeechend = function (){
  instructions.text("Voice recognition has stopped!")
}

recognition.onerror = function(){
  instructions.text("Try Again!")
}

recognition.onresult = function(event){
  var current = event.resultIndex;
  var transcript = event.results[current][0].transcript
  content += transcript
  textbox.val(content)
}

startBtn.click(function(event){
  if(content.length){
    content += ''
  }
  recognition.start()
})


stopBtn.click(function(event){
  recognition.stop()
})

textbox.on('input', function (){
    content = $(this).val()
})


if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    const params = { video: true };
    navigator.mediaDevices.getUserMedia(params).then(function(stream) {
        video.srcObject = stream;
        video.play();
    });
}

photoButton.click(function(event) {
  $("#canvas")[0].style.display = "block";
	video.remove();
	context.drawImage(video, 0, 0, 640, 480);
});


$(document).ready(function(){

  $("#savePostBtn").click(function(){

    const allElements=[startBtn,stopBtn,photoButton,instructions,introText];
    for(let i=0; i<allElements.length; i++){
      allElements[i].hide();

    }
    refresh.show();

    html2canvas($("#yourMoment"), {
      onrendered: function(canvas) {

        var img = canvas.toDataURL();
        $("#result-image").attr('src', img).show();

        canvas.toBlob(function(blob) {

        saveAs(blob, "your-moment.png");

		});
      },
      allowTaint: true,
      imageTimeout: 0,
      useCORS: true
    });
      return false;
  })
});
