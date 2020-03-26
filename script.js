let timerObj = {
    minutes: 0,
    seconds: 0,
    timerId: 0
}

function soundAlarm() {
    let amount = 3;
    let audio = new Audio("Timer_Sound_Effect.mp3")
    
    function playSound()
    {
        audio.pause();
        audio.currentTime = 0;
        audio.play();
    }
    for (let i = 0; i < amount; i++)
    {
        setTimeout(playSound, 1200 * i);
    }
}


function updateValue(key, value)
{
    if (value < 0) {
        value = 0;
        console.log("Positive No. Only");
    }
    if (key == "seconds") {
        if (value < 10) {
            value = "0" + value;
        }
        if (value > 59) {
            value=59
        }
    }
    $("#" + key).html(value || 0);
    timerObj[key] = value;
}

(function detectChanges(key) {

    let input = "#" + key + "-input"
    
    $(input).change(function () {
        updateValue(key,$(input).val());
    })
    $(input).keyup(function () {
        updateValue(key,$(input).val());
    })
    return arguments.callee
})("minutes")("seconds")

function startTimer() {
    buttonManager(["start", false], ["pause", true], ["reset", true])
    freezeInputs()

    timerObj.timerId = setInterval(function () {
        timerObj.seconds--
        if (timerObj.seconds < 0) {
            if (timerObj.minutes == 0) {
                soundAlarm();
                return resetTimer();
            }
            timerObj.seconds = 59;
            timerObj.minutes--;
        }

        updateValue("minutes", timerObj.minutes);
        updateValue("seconds", timerObj.seconds);
    },1000)
}


function resetTimer() {
    clearInterval(timerObj.timerId)
    buttonManager(["start", true], ["pause", false], ["reset", false])  
    unfreezeInputs()
    updateValue("minutes",0)
    let seconds = $("#seconds-input").val();
    if (seconds < 10) { seconds = "0" + seconds;}
    updateValue("seconds",0)
}


function pauseTimer() {    
    buttonManager(["start", true], ["pause", false], ["reset", true])
    clearInterval(timerObj.timerId)
}

function buttonManager(...buttonArray) {
    for (let i = 0; i < buttonArray.length; i++){
        let button = "#" + buttonArray[i][0] + "-button";
        if (buttonArray[i][1]) {
            $(button).removeAttr("disabled")
        }
        else {
            $(button).attr("disabled","disabled")
        }
    }
}

function freezeInputs() {
    $("#minutes-input").attr("disabled","disabled")
    $("#seconds-input").attr("disabled","disabled")
}

function unfreezeInputs() {
    $("#minutes-input").removeAttr("disabled")
    $("#seconds-input").removeAttr("disabled")
}