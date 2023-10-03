const weatherForm=document.querySelector("form");
const search=document.querySelector("input");
const p1=document.querySelector(".p1");
const p2=document.querySelector(".p2");

weatherForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    const location=search.value;
    
    if(location){
    fetch(`http://localhost:3000/weather?address=${location}`)
    .then((data)=>{
        data.json().then((jsondata)=>{
            console.log(jsondata)
            p1.textContent="Location : "+jsondata.Location.Location;
            p2.textContent="Weather is "+jsondata.weather+",Temperature is "+jsondata.Temperature
        })
    })
    .catch((err)=>console.log("error",err))
    search.value="";
    }
    else{
        console.log("Please enter location!!!!!!")
        p1.textContent="Please enter location!!!!!!"
        search.value="";
    }

})