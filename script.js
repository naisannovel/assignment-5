// search meal

document.getElementById('search-btn').addEventListener('click', function () {
    let searchValue = document.getElementById('search-inp').value;
    document.getElementById('search-item-display').innerHTML = '';
    document.getElementById('empty-search-result').style.display = 'none';

    if (searchValue.length != 0) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`)
            .then(response => response.json())
            .then(data => searchResultDisplay(data)) //call another function. 
    } else {
        alert('Search box are empty')
    }
    document.getElementById('search-inp').value = '';
})

// declare searchResultDisplay function

function searchResultDisplay(data) {
    let allMealItems = data.meals; //data was an object.

    if (allMealItems != null) {

        allMealItems.forEach(element => {
            
            let searchResultDisplayMainBox = document.getElementById('search-item-display')
            let newBoxElement = document.createElement('div');
            let newElement = `
                <div class="cate" onclick="popup('${element.strMeal}')" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                <img src="${element.strMealThumb}">
                <h5>${element.strMeal}</h5>
                </div>
                `;
            newBoxElement.innerHTML = newElement;
            searchResultDisplayMainBox.appendChild(newBoxElement);

        });

    } else {
        document.getElementById('empty-search-result').style.display = 'block';
    }

}



function popup(mealName) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
        .then(response => response.json())
        .then(data => popupDisplay(data))
}

function popupDisplay(data) {
    let mealItems = data.meals[0]; //data was an object.
    // let element = data.meals;

    // let allMealItems = items[0];

    let popupNewElement = `
    <img src="${mealItems.strMealThumb}">
    <h1>${mealItems.strMeal}</h1>
    <ul id="ingredient"></ul>
    `;

    let popupSection = document.getElementById('popup');
    popupSection.innerHTML = popupNewElement;


    for (let i = 1; i <= 20; i++) {
        const element = i;
        let ingredient = 'strIngredient' + i;

        if (mealItems[ingredient].length != 0) {

            let newListElement = document.createElement('li')

            newListElement.innerText = mealItems[ingredient]
            let popupUlElement = document.getElementById('ingredient');
            popupUlElement.appendChild(newListElement);
        }


    }

}