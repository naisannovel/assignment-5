// search meal

document.getElementById('search-btn').addEventListener('click', ()=> {

    let searchValue = document.getElementById('search-inp').value;

    document.getElementById('search-item-display').innerHTML = '';
    document.getElementById('no-matching-section').style.display = 'none';

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

let searchResultDisplay = data => {
    let allMealItems = data.meals; //data was an object.

    if (allMealItems != null) {

        allMealItems.forEach(element => {

            let searchResultDisplayMainBox = document.getElementById('search-item-display')
            let newBoxElement = document.createElement('div');
            let newElement = `
                <div class="result-item" onclick="popupBox('${element.strMeal}')" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                <img src="${element.strMealThumb}">
                <h5>${element.strMeal}</h5>
                </div>
                `;
            newBoxElement.innerHTML = newElement;
            searchResultDisplayMainBox.appendChild(newBoxElement);

        });

    } else {
        document.getElementById('no-matching-section').style.display = 'block';
    }

}

// popup section.

let popupBox = mealName => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
        .then(response => response.json())
        .then(data => popupDisplay(data))
}

// declare popupDisplay function.

let popupDisplay = data => {
    let mealItems = data.meals[0]; //data was an object.

    let popupNewElement = `
    <img src="${mealItems.strMealThumb}">
    <h1>${mealItems.strMeal}</h1>
    <h4 id="popup-ingredient-title">ingredient</h4>
    <ul id="ingredient"></ul>
    `;

    let popupSection = document.getElementById('popup');
    popupSection.innerHTML = popupNewElement;


    for (let i = 1; i <= 20; i++) {

        let ingredient = 'strIngredient' + i;

        if (mealItems[ingredient].length != 0) {

            let newListElement = document.createElement('li')
            newListElement.innerText = mealItems[ingredient];
            let popupUlElement = document.getElementById('ingredient');
            popupUlElement.appendChild(newListElement);
        }
    }
}