"use strict";

//Disable send button until connection is established
document.getElementById("PeoplesendButton").disabled = false;
document.getElementById("WolfsendButton").disabled = false;



function ChangeDay() {
    var Day = document.getElementById("Day").value;
    if (Day == "白天") {
        document.getElementById('background').style.backgroundColor = "white";

    }
    else if (Day == "黑夜") {
        document.getElementById('background').style.backgroundColor = "gray";
    }
}

connection.on("ReceiveMessage", function (Profession, message, roomId) {
    var Day = document.getElementById("Day").value;
    if (Day == "白天") {
        document.getElementById("PeoplemessagesList").hidden = false;
        document.getElementById("WolfmessagesList").hidden = true;


        var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        var encodedMsg = msg;
        var li = document.createElement("li");
        li.textContent = encodedMsg;
        document.getElementById("PeoplemessagesList").appendChild(li);
    }
    else if (Profession == "狼人" || Profession == "狼王" && Day == "黑夜") {
        document.getElementById("WolfmessagesList").hidden = false;
        document.getElementById("PeoplemessagesList").hidden = false;
        //var UserName = document.getElementById("Name").textContent;
        var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        var encodedMsg = msg;
        var li = document.createElement("li");
        li.textContent = encodedMsg;
        document.getElementById("WolfmessagesList").appendChild(li);
    }


});



document.getElementById("PeoplesendButton").addEventListener("click", function (event) {
    //var user = document.getElementById('userInput').value;
    var message = document.getElementById('PeoplemessageInput').value;

    if (message != "") {
        var Profession = document.getElementsByClassName(names).value();
        connection.invoke("SendMessage", Profession, message, myroomid).catch(function (err) {
            return console.error(err.toString());
        });
        document.getElementById('PeoplemessageInput').value = "";
    }
});

document.getElementById("WolfsendButton").addEventListener("click", function (event) {
    //var user;
    var message2 = document.getElementById("WolfmessageInput").value;
    if (message2 != "") {
        var Profession = document.getElementsByClassName(names).value();
        connection.invoke("SendMessage", Profession, message2, myroomid).catch(function (err) {
            return console.error(err.toString());
        });
        document.getElementById('WolfmessageInput').value = "";
    }
});

//-----------------SAMPLE----------------------
var backVoteResult = [{
    "RoomID": 1,
    "Account": "oo",
    "Vote": "2",
    "voteResult": null
}];

//connection.on("VoteResult",
//    function(data) {
//        console.log(data);
//    });

$('#Test').click(function () {

    connection.invoke("Vote", backVoteResult);
});