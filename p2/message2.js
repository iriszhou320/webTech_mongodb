//using fetch 

function createNode(element){
    return document.createElement(element);
 }

function append(parent, el) {
    return parent.appendChild(el);
  }
    
//functional code 
function displayEntries(){
    
    //timestamp
    var dt= new Date();
    var utcDate = dt.toUTCString();
    time.innerHTML = "current time is "+utcDate;
    //fetch 
    fetch("https://se3316-lab3-iriszhou.c9users.io:8080/api/bears/")
    .then(function(res){
        return res.json();
    })
    .then(function(data){
       var c = new Array();
       var w = new Array();
       for(var i = 0; i<data.length;i++){
           if(data[i].name == "Calculus"){
            c.push(data[i].message);   
           }
           else if(data[i].name == "WebTech"){
               w.push(data[i].message);
           }
       }
       //append to the list 
       for(var j = c.length-1; j>= c.length-20; j--){
           entry = createNode("li");
           entry.innerHTML = c[j];
           entriesList1.appendChild(entry);
       }
       
       for(var j = c.length-1; j>= c.length-20; j--){
           entry = createNode("li");
           entry.innerHTML = w[j];
           entriesList2.appendChild(entry);
       }
     })
}
   

function sendCalc(){
    var textCalc = document.getElementById("calculus");
    
    let dataCalc = {
         name:"Calculus",
         message: textCalc.value,
         }
         
    var encoded = new URLSearchParams(dataCalc);
    
    
    //validate userinput 
    if(textCalc.length > 200){
        alert("message should be less than 200 characters");
    }
    
    fetch("https://se3316-lab3-iriszhou.c9users.io:8080/api/bears/",{
         method: "POST",
         headers: {
             'Content-Type': 'application/x-www-form-urlencoded'
         },
         body: encoded
    })
    
    
    }
    
    function sendWeb(){
    var textWeb = document.getElementById("webtech");
    
    let dataWeb = {
        name:"WebTech",
        message: textWeb.value,
    }
   
    var encoded2 = new URLSearchParams(dataWeb);
    
    //validate userinput 
    if(textWeb.length > 200){
        alert("message should be less than 200 characters");
    }
    
    
    fetch("https://se3316-lab3-iriszhou.c9users.io:8080/api/bears/",{
         method: "POST",
         headers: {
             'Content-Type': 'application/x-www-form-urlencoded'
         },
         body: encoded2
    })
    }
    
