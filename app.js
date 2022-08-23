
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-analytics.js";
  import { 
    getDatabase,
     ref, 
     set,
     push,
     onValue,
  } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-database.js";
 
  // import { getDatabase, 
  //   ref,
  //    set,
  //    push, 
  //    onValue,  } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-databse.js";
  // import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-database.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDkkbPX3WPHpTtOUoqjPth11ZrNoQmweYg",
    authDomain: "to-do-app-7b04f.firebaseapp.com",
    projectId: "to-do-app-7b04f",
    storageBucket: "to-do-app-7b04f.appspot.com",
    messagingSenderId: "1084380881226",
    appId: "1:1084380881226:web:23f238510c622feda721b3",
    measurementId: "G-4QPL5KGB99"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const databs = getDatabase();





//get started

var obj = {};
var inp=document.getElementById("inp")
var parent=document.getElementById("parent")

//added the values of input in window
window.add = function () {
    obj = {
    text: inp.value,
    time: new Date().getHours() + " : " + new Date().getMinutes(),
  };
  console.log(obj); 


//sending values to databse

var reference = ref(databs, "inps/");
var newRef = push(reference);
obj.id = newRef.key;
set(newRef,{
  text: inp.value,
  time: new Date().getHours() + " : " + new Date().getMinutes(),
});
};


//sent data to firebase databse

var objectsData;
function getData(){
var reference = ref(databs, "inps/")
onValue(reference, function(data){
 console.log(data.val());
 objectsData = Object.values( data.val());
 console.log(objectsData);
 renderQuestions();
    } )

}
getData()




//get back the data at window
function renderQuestions() {
  var parent = document.getElementById("parent");
  parent.innerHTML = "";
  for (var i = 0; i < objectsData.length; i++) {
    parent.innerHTML += `
    <div class="taskbox text-center rounded my-4">
<p> ${objectsData[i].text}</p>
<span class="fs-6">${objectsData[i].time}</span>
<button class="btn btn-light rounded my-1" onclick="del(${i})">Delete</button>
<button class="btn btn-light rounded my-1" onclick="edit(${i})">Edit</button>
</div>  `;
 
    inp.value = "";
  }
}




window.del = function (index){
objectsData.splice(index,1);
 renderQuestions();
 }

  window.deleteall = function(){
objectsData = {}
   renderQuestions();
}




 window.edit= function(i) {
  var a = prompt('Edit new text', objectsData[i].text);
  objectsData[i].text = a;
  renderQuestions();
  }
  








