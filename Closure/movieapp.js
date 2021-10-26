var timerId;
var signupdiv=document.getElementById("signupdiv")
signupdiv.style.display="none";
var moviesdiv=document.getElementById("movies")
var signindiv=document.getElementById("signindiv")
signindiv.style.display="none";

    async function getdata(moviename){
        // moviename=document.getElementById("movie").value
        // moviename="spy"
        let res=await fetch(`http://www.omdbapi.com/?s=${moviename}&apikey=810ed14a`)
        let data=await res.json()
        // console.log(data.imdbID)
        appenddata(data.Search)
        
    
    }
    
    function appenddata(movies){
        if(movies===undefined){
        return false;

    }

    moviesdiv.innerHTML=null;
    movies.forEach(function (movie){

        
    let img=document.createElement("img");

    img.src=movie.Poster;
    img.style.width="100px";
    let p=document.createElement("div")
    p.innerText=movie.Title;

    p.onclick=function(){
        displaymovie(movie.imdbID)
    }
    
    moviesdiv.append(img,p)
});
    }

    async function main(){
    let name=document.getElementById("movie").value;
    if(name.length <3){
        return false;
    }
    let res=await getdata(name)
    let movie_data=res.Search;
    appendMovie(movie_data)
    
}



function debounce(func,delay){
if(timerId){
    clearTimeout(timerId)
}    

timerId=setTimeout(function(){
        func();
    },delay);
}


async function displaymovie(movie_id){
    moviesdiv.innerHTML=null;
    console.log(movie_id)
    let res=await fetch(`http://www.omdbapi.com/?i=${movie_id}&apikey=810ed14a`)
    let data=await res.json()
    showmovie(data)
}
     let parent=document.getElementById("posterdiv")
    let parentp=document.getElementById("moviediv")

function showmovie(data){
    
   movie.innerHTML="";
   posterdiv.innerHTML="";
if(data.Error){
    let img=document.createElement("img");
    img.src="https://c.tenor.com/9JOoBLgNIYcAAAAM/not-available.gif"
    
    parent.append(img,data.Error)
}else{

    let img=document.createElement("img");

    img.src=data.Poster;
    let namebar=document.createElement("div")
    let langbar=document.createElement("div")
    let yearbar=document.createElement("div")
    let actorbar=document.createElement("div")
    let productbar=document.createElement("div")
    let awardbar=document.createElement("div")
    let ratingbar=document.createElement("div")
    let recbar=document.createElement("div")
    img.append("img"+data.Poster)
    namebar.append("Name : "+ data.Title)
    langbar.append("Language : "+data.Language)
    yearbar.append("Released Year : "+data.Year)
    actorbar.append("Cast : "+data.Actors)
    productbar.append("Production : "+data.Production)
    awardbar.append("Awards : "+data.Awards)
    ratingbar.append("Ratings : "+data.imdbRating)
    if(data.imdbRating >= 8.0){
        console.log("Recommended")  
        recbar.append("Recommended")
        recbar.style.backgroundColor="red";
        recbar.style.color="white";
        parent.append(recbar,namebar,langbar,yearbar,actorbar,productbar,awardbar,ratingbar)
        parentp.append(img)
    }else{
        parent.append(namebar,langbar,yearbar,actorbar,productbar,awardbar,ratingbar)
        parentp.append(img)
    }
      }
    }

    let parentcc=document.getElementById("container")
    async function f(){
     let res=await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=5b9d11ecd78af801eff03c6428c1b2d1`)
    let data=await res.json()
    console.log(data.results)
    showmoviee(data.results)
    }

    f()
    function showmoviee(data){
    data.forEach(function(el){
        console.log(el.title)
        console.log(el.poster_path)
        console.log(el.vote_average)
        let poster_path=el.poster_path
        let imgpath=`https://image.tmdb.org/t/p/original/${poster_path}`
        let pdiv=document.createElement("div")
        let img=document.createElement("img")
        img.src=imgpath
        img.onclick=function(){
            alldata(el)
        }
        if(el.title==undefined){
            var ptitle=document.createElement("p")
            ptitle.innerText=el.name
        }else{
            var ptitle=document.createElement("p")
            ptitle.innerText=el.title
        }
        
        let pvote=document.createElement("p")
        pvote.innerHTML="Rating:<b>&#x2605</b>"+el.vote_average

        pdiv.append(img,ptitle,pvote)

        parentcc.append(pdiv)
        // parent.append(img,ptitle)
    });

    }
    
    parentt=document.getElementById("showdata")
    async function alldata(data){
        parentt.innerHTML=null;
        console.log("showid",data)
        let poster_path=data.poster_path
        let imgpath=`https://image.tmdb.org/t/p/original/${poster_path}`
        let pdiv=document.createElement("div")
        let pdata=document.createElement("div")


        let img=document.createElement("img")
        img.src=imgpath
        if(data.title==undefined){
            var ptitle=document.createElement("p")
            ptitle.innerText=data.name
        }else{
            var ptitle=document.createElement("p")
            ptitle.innerText=data.title
        }
        

        let pvote=document.createElement("p")
        pvote.innerHTML="Rating:<b>&#x2605</b>"+data.vote_average

        let mtype=document.createElement("p")
        mtype.innerHTML="Media -type :"+data.media_type

        let origin=document.createElement("p")
        origin.innerHTML="Original Language :"+data.original_language

        let overview=document.createElement("p")
        overview.innerHTML="Briefly Overview :"+data.overview

        let original_name=document.createElement("p")
        original_name.innerHTML="Original Name:"+data.original_name

        let backbtn=document.createElement("button")
        backbtn.textContent="Refresh"
        backbtn.onclick=function(){
            location.reload();
        }
        
        pdiv.append(img)
        pdata.append(ptitle,mtype,origin,overview,original_name,pvote,backbtn)
        parentt.append(pdiv,pdata)
    };

    function loginuser(){
        moviesdiv.innerHTML=null;
        parent.innerHTML=null;
        parentt.innerHTML=null;
        parentcc.innerHTML=null;
        parentp.innerHTML=null;
        let section=document.getElementById("section")
        section.innerHTML=null;
        signupdiv.style.display="block";
        signindiv.style.display="block";
    }
        function signup(event){
            event.preventDefault();

            let form=document.getElementById("signup-form")
            let user_data={
                name:form.name.value,
                email:form.email.value,
                password:form.password.value,
                username:form.username.value,
                mobile:form.mobile.value,
                description:form.description.value,
            };
            console.log(user_data)
            user_data=JSON.stringify(user_data);
            

            fetch("https://masai-api-mocker.herokuapp.com/auth/register",{

            method:"POST",
            body:user_data,
            headers:{
                "Content-Type":"application/json",
            },

            })
            .then((res)=>{
                return res.json()
            })
            .then((res)=>{
                console.log(res)
                if(res.error="true"){
                    var msg=document.getElementById("msgdiv")
                    msg.innerText=res.message
                    msg.style.backgroundColor="green"
                }

            })
            .catch((res)=>{
                console.log("error",res)
            })
            
            form.name.value="";
            form.email.value=""
            form.password.value=""
            form.username.value=""
            form.mobile.value=""
            form.description.value=""
        }

        function login(event){
            event.preventDefault();

            let form=document.getElementById("login-form")
            let user_data={
                password:form.password.value,
                username:form.username.value,
            };
            let data_to_send=JSON.stringify(user_data);
            console.log(data_to_send)

            let res=fetch("https://masai-api-mocker.herokuapp.com/auth/login",{
                method:'POST',
                body:data_to_send,
                headers:{
                "Content-Type":"application/json",
            },
            })
            .then((res)=>{
                return res.json()
            })
            .then((res)=>{
                console.log("res",res)
                fetchdata(user_data.username,res.token)
            })
            .catch((res)=>{
                console.log(res)
            })
            
        }

        function fetchdata(username,token){

            let res=fetch(`https://masai-api-mocker.herokuapp.com/user/${username}`,{
                headers:{
                "Content-Type":"application/json",
                Authorization: `Bearer ${token}`
            },
            })
            .then((res)=>{
                return res.json()
            })
            .then((res)=>{
                console.log(res)
                setTimeout(function(){
                    if(res.error="true"){
                        var msg=document.getElementById("msgdiv")
                        msg.innerText="Login Successful"
                        msg.style.backgroundColor="green"
                        var profile=document.getElementById("profile")
                        profile.innerText=res.username
                        var userdiv=document.getElementById("userdiv")
                        userdiv.innerHTML=null;
                        f()

                    }
                },2000);
            })
            .catch((res)=>{
                console.log(res)
            })
        
        }

        var slideIndex = 0;
showSlides();

function showSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
  setTimeout(showSlides, 2500);
}