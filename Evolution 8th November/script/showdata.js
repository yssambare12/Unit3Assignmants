
async function getData(url){
    let res=await fetch(url)
    let data=await res.json()
    console.log("getdata",data)
    return data
}

function append(data,container){
    console.log(data)
    data.meals.forEach(({strMeal,strCategory,strArea,strInstructions,strMealThumb}) => {
        let div=document.createElement("div")
        let imgdiv=document.createElement("div")
        let pmeal=document.createElement("p")
        pmeal.innerText=strMeal
        pmeal.style.fontWeight="900"
        let pcat=document.createElement("p")
        pcat.innerText=strCategory
        let parea=document.createElement("p")
        parea.innerText=strArea
        let pinstruction=document.createElement("p")
        pinstruction.innerText=strInstructions
        let img=document.createElement("img")
        img.src=strMealThumb
        imgdiv.append(img)
        div.append(pmeal,pcat,parea,pinstruction)
        container.append(imgdiv,div)
    });
}
export {getData,append}