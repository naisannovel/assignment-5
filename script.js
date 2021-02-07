
// search meal

document.getElementById('search-btn').addEventListener('click', function () {
    let searchValue = document.getElementById('search-inp').value;

    if (searchValue.length != 0) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`)
            .then(response => response.json())
            .then(data => display(data)) //call another function. 
    } else {
        alert('Search box are empty')
    }
    document.getElementById('search-inp').value = '';
})

function display(data) {
    let allMealElements = data.meals
    console.log(allMealElements);
    if (allMealElements != null) {
        allMealElements.forEach(element => {
            let mainUiBox = document.getElementById('search-list-item')
            let newBox = document.createElement('div');
            let list = `
        <div class="cate" onclick="functionName('${element.strMeal}')" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
        <img src="${element.strMealThumb}">
        <h5>${element.strMeal}</h5>
        </div>
        `
            newBox.innerHTML = list;
            mainUiBox.appendChild(newBox);

        });

    } else {
        alert('no food avileable')
    }

}


function functionName(nam) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${nam}`)
        .then(response => response.json())
        .then(data => displayB(data))
}

function displayB(data) {
    let element = data.meals;
    let nov = element[0];
    console.log(element[0]);


    for (let i = 1; i <= 20; i++) {
        const element = i;
        let x = 'strIngredient' + i;

        if (nov[x].length != 0) {
            console.log(nov[x]);
        }


    }

}