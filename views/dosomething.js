function dosomething(message){
    if (message === "Sean"){
       const newwindow = window.open("info.html");
       newwindow.onload = function() {
        var w = newwindow.innerWidth;
        var h = newwindow.innerHeight;
        newwindow.document.getElementById("message").innerHTML = 'Sean is very cool';
      };
        //newwindow.document.write("Sean is very cool");
    } 
    else if (message === "Yoda"){
        newwindow = window.open("info.html");
        newwindow.document.write("Yoda is best pug");
    }  
    else if (message === "Gwen"){
        newwindow = window.open("info.html");
        newwindow.document.write("Gwen is very dumb");
    }
    else if (message === "Anthony"){
        newwindow = window.open("info.html");
        newwindow.document.write("Anthony is very smart");
    }   
    else if (message === "Steven"){
        newwindow = window.open("info.html");
        newwindow.document.write("Steven is very smart");
    }   
    else if (message === "Sharon"){
        newwindow = window.open("info.html");
        newwindow.document.write("Sharon is very smart");
    }       
}
