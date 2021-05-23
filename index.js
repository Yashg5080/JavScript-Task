function saveSearch(key,value) {
    localStorage.setItem(key,value)
}
function runSpeechRecognition() {
    var output = document.getElementById("output");
    var action = document.getElementById("action");
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    var recognition = new SpeechRecognition();

    recognition.onstart = function() {
        action.innerHTML = "<small>listening, please speak...</small>";
    };
    
    recognition.onspeechend = function() {
        action.innerHTML = "<small>stopped listening, hope you are done...</small>";
        recognition.stop();
    }
  
    recognition.onresult = function(event) {
        var transcript = event.results[0][0].transcript;
        var confidence = event.results[0][0].confidence;
        output.innerHTML = "<b>Text:</b> " + transcript + "<br/> <b>Confidence:</b> " + confidence*100+"%";
        output.classList.remove("hide");
        if (transcript){
            saveSearch(transcript,transcript)
        }
    };
  
     recognition.start();
}
/* JS comes here */
function textToAudio() {
    let msg = document.getElementById("text-to-speech").value;
    
    let speech = new SpeechSynthesisUtterance();
    speech.lang = "en-US";
    
    speech.text = msg;
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;
    
    window.speechSynthesis.speak(speech);
    if (msg){
        saveSearch(msg,msg);
        console.log(localStorage.getItem(msg))
    }
}
// console.log(Object.keys(localStorage))

function getAllSearches(){
    arr=Object.keys(localStorage);
    op1=document.getElementById('op1');
    op1.innerHTML="";
    if (arr.length==0){
        op1.innerHTML="No searches to show";
        return
    }
    for (i=0; i<arr.length;i++){
        op1.innerHTML+=arr[i]+"<br>";

    }
}
function removesearches() {
    op1=document.getElementById('op1');
    op1.innerHTML="";
}
function clearHistory(){
    localStorage.clear()
    op1.innerHTML="Search History Cleared"
}