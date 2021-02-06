fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
.then(response => response.json())
.then(data => defaultCategories(data))


function defaultCategories(data){
    console.log(data.categories);
    let allCategories = data.categories
    allCategories.forEach(element => {
        let mainBox = document.getElementById('list-item')
        let newBox = document.createElement('div')
        let list = `
        <img src="${element.strCategoryThumb}">
        <h4>${element.strCategory}</h4>
        `
        newBox.innerHTML = list;
        mainBox.appendChild(newBox)
    });
}

document.getElementById('search-btn').addEventListener('click',function(){
    let searchValue = document.getElementById('search-inp').value;
    
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`)
    .then(response => response.json())
    .then(data => display(data))
})

function display(data){
    let cat = data.meals
    cat.forEach(element => {
        document.getElementById('list-item').style.display = 'none'
        let mainBox = document.getElementById('search-list-item')
        let newBox = document.createElement('div');
        let list = `
        <div onclick="functionName('${element.strMeal}')">
        <img src="${element.strMealThumb}">
        <h4>${element.strMeal}</h4>
        </div>
        `
        newBox.innerHTML = list;
        mainBox.appendChild(newBox)
    });
   
}


function functionName(nam){
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${nam}`)
    .then(response => response.json())
    .then(data => displayB(data))
}

function displayB(data){
    let element = data.meals
    console.log(element[0].strMeal);
    console.log(element[0].strMealThumb);
    console.log(element[0].strIngredient1);

}