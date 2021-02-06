fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
.then(response => response.json())
.then(data => defaultCategories(data))


function defaultCategories(data){
    let allCategories = data.categories
    allCategories.forEach(element => {
        let mainBox = document.getElementById('list-item')
        let newBox = document.createElement('div')
        newBox.className = 'cate'
        let list = `
        <img src="${element.strCategoryThumb}">
        <h5>${element.strCategory}</h5>
        `
        newBox.innerHTML = list;
        mainBox.appendChild(newBox)
    });
}

document.getElementById('search-btn').addEventListener('click',function(){
    let searchValue = document.getElementById('search-inp').value;
    
    if(searchValue.length != 0){
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`)
    .then(response => response.json())
    .then(data => display(data))
    }else{
        alert('Search box are empty')
    }
    document.getElementById('search-inp').value = '';
})

function display(data){
    let cat = data.meals
    if(cat != null){
    cat.forEach(element => {
        document.getElementById('list-item').style.display = 'none'
        let mainBox = document.getElementById('search-list-item')
        let newBox = document.createElement('div');
        let list = `
        <div class="cate" onclick="functionName('${element.strMeal}')">
        <img src="${element.strMealThumb}">
        <h5>${element.strMeal}</h5>
        </div>
        `
        newBox.innerHTML = list;
        mainBox.appendChild(newBox)
    })
}else{
    alert('no food avileable')
}
   
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