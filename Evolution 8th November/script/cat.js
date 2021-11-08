
async function getcatData(url){
    let res=await fetch(url)
    let data=await res.json()
    console.log("getdata",data)
    return data
}

function appendcat(data,cat){
    console.log(data)
    data.categories.forEach(({strCategory,strCategoryDescription,strCategoryThumb}) => {
        let div=document.createElement("div")
        let imgdiv=document.createElement("div")
        let pmeal=document.createElement("p")
        // console.log(strCategory=="beef")
        if(strCategory==="Beef"){
            pmeal.innerText="Non-Veg"
        }else{
            pmeal.innerText=strCategory
        }
        pmeal.style.fontWeight="900"
        // let pcat=document.createElement("p")
        // pcat.innerText=strCategoryDescription
       
        let img=document.createElement("img")
        img.src=strCategoryThumb
        
        // imgdiv.append(img)
        div.append(img,pmeal)
        div.onclick=function(){
            displaydata(strCategory)
        }
        cat.append(div)
    });
}
export {getcatData,appendcat}


async function displaydata(strCategory){
    // localStorage.clear()
    console.log(strCategory)
    let res=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${strCategory}`)
    let data=await res.json()
    console.log("getdata",data)
    // return data
    showmenu(data)


}

function showmenu(data){
    
    if(localStorage.getItem("recipe")==null){
        localStorage.setItem("recipe",JSON.stringify([]))
    }
    let recipe_data=JSON.parse(localStorage.getItem("recipe"));
    recipe_data.push(data)
    localStorage.setItem("recipe",JSON.stringify(recipe_data))
    console.log("showdata",recipe_data)
    showcatproduct()
    

}

let cont=document.getElementById("container")
let cat=document.getElementById("cat")
function blank(){
    cont.innerText=null;
    cat.innerText=null;
}

let recipediv=document.getElementById("recipediv")
function showcatproduct(){
    blank()
    let localstoragedata=JSON.parse(localStorage.getItem("recipe"))

    console.log("localstrorage",localstoragedata[0].meals)
    localstoragedata[0].meals.forEach(({idMeal,strMeal,strMealThumb}) => {
        let rdiv=document.createElement("div")
        let imgdiv=document.createElement("div")
        let descdiv=document.createElement("div")
        let img=document.createElement("img")
        img.src=strMealThumb
        let rmeal=document.createElement("p")
        rmeal.innerText=strMeal
        imgdiv.append(img)
        descdiv.append(rmeal)
        rdiv.append(imgdiv,descdiv)
        recipediv.append(rdiv)
        
        
    })
    
}

let backbtn=document.getElementById("backbtn")
// backbtn.onclick=function(){
//     backbtnf()
// }
backbtn.addEventListener("click",backbtnf)
function backbtnf(){
    window.localStorage.clear()
    location.reload();
}