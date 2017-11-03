//to send http request, create a xmlhttprequest obj for both courses
var xhrCalc = new XMLHttpRequest();
var xhrWeb = new XMLHttpRequest();

//function to display entries 
function displayEntries(){
    
    //retrieve data from the server 
    xhrCalc.open('GET', 'https://se3316-lab3-iriszhou.c9users.io:8080/api/bears/', true);
    // xhrCalc.responseType = 'text';
    
    xhrCalc.onreadystatechange = ProcessRequest;
    xhrCalc.send(null);
    
    xhrWeb.open('GET', 'https://se3316-lab3-iriszhou.c9users.io:8080/api/bears/', true);
    // xhrWeb.responseType = 'text';
    xhrWeb.onreadystatechange = ProcessRequest;
    xhrWeb.send(null);
    
    //check updates every one second
    // window.setInterval(function(){
    //   var ol1 = document.getElementById('entriesCal');
    //   if(ol1){
    //       while(ol1.firstChild){
    //           ol1.removeChild(ol1.firstChild);
    //       }
    //   }
    //   displayEntries();//recursive 
    // },5000)
}

function ProcessRequest(){
    var responseCalc = JSON.parse(xhrCalc.responseText);
    var responseWeb = JSON.parse(xhrWeb.responseText);
    //check if the process is complete
    if(xhrCalc.readyState == 4 && xhrCalc.status == 200 ){
        //display the 20 recent messages 
        for(var i = responseCalc.length-1; i >= (responseCalc.length-20); i--){
            var entry = document.createElement('li');
            var text = document.createTextNode(responseCalc[i].message);
            entry.appendChild(text);
            document.getElementById("entriesList1").appendChild(entry);
        }
    }
    
    if(xhrWeb.readyState == 4 && xhrWeb.status == 200){
         //display the 20 recent messages 
        for(var i = responseWeb.length-1; i >= responseWeb.length-20; i--){
            var entry = document.createElement('li');
            var text = document.createTextNode(responseWeb[i].message);
            entry.appendChild(text);
            document.getElementById("entriesList2").appendChild(entry);
        }
    }
}

function sendData(){
   
    var textCalc = document.getElementById("calculus");
    var textWeb = document.getElementById("webtech");
    //validate user inputs 
    if(textCalc.length>200 || textWeb.length>200){
        alert("the message should be less than 200 characters");
    }
    
    var calcSend = XMLHttpRequest();
    var webSend = XMLHttpRequest();
    
    calcSend.open('POST', 'https://se3316-lab3-iriszhou.c9users.io:8080/api/bears/', true);
    calcSend.setRequestHeader('Content-type', "application/x-www-form-urlencoded");
    calcSend.onreadystatechange = function(){
        if(calcSend.readyState == 4 && calcSend.status == 200){
            alert(textCalc.responseText);
        }
    }
    calcSend.send(textCalc);
    
    //for the other course
    webSend.open('POST', 'https://se3316-lab3-iriszhou.c9users.io:8080/api/bears/', true);
    webSend.setRequestHeader('Content-type', "application/x-www-form-urlencoded");
    webSend.onreadystatechange = function(){
        if(webSend.readyState == 4 && webSend.status == 200){
            alert(textWeb.responseText);
        }
    }
    calcSend.send(textWeb);
    
    
}


