const GetFood = () => {
  fetch("https://www.themealdb.com/api/json/v1/1/filter.php?a=British")
    .then((res) => res.json())
    .then((data) => {
      const meals = data.meals;
      meals.forEach((meal) => {
        displayData(meal);
        console.log(meal);
      });
    });
};
GetFood();

const displayData = (meal) => {
  const div = document.querySelector(".meals-div");
  div.innerHTML += `

     <div class="single-meal">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <h2>${meal.strMeal}</h2>
                <div class='further'>
                <div class='button'>
                    <button id=${meal.idMeal} class='comments'>comments</button>
                </div>
                <div class='details'>
                    <p>️❤️</p>
                    <p>0</p>
                </div>
                 </div>

            </div>
    `;
  const popup = div.querySelectorAll(".comments");
  popup.forEach((pop) => {
    pop.addEventListener("click", (e) => {
      //   displayPopup();
      displaySingle(e.target.id);
      const popupDiv = (document.querySelector(".popup-overly").style.display =
        "block");
      const mini = (document.querySelector(".modal1").style.display = "block");
    });
  });
};

const displaySingle = (id) => {
  const url = `https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      //   displayPopup(data);
      // console.log(data.meals.);
      const singleMeal = data.meals;
      singleMeal.forEach((one) => {
        console.log(one);

        displayPopup(one);
      });
    });
};

const displayPopup = (data) => {
  const modal = document.querySelector(".modal1");
  modal.innerHTML += `
   <div class="modal-content">
    <button class='back'>back</button>
   <img src="${data.strMealThumb}" alt="${data.strMeal}">
   <h2>${data.strMeal}</h2>
   <div>
   <p>Area:${data.strArea}</p>
   <p>category:${data.strCategory}</p>
   </div>
    </div>
  `;
  const backButton = document.querySelector(".back");
  backButton.addEventListener("click", () => {
    const popupDiv = (document.querySelector(".popup-overly").style.display =
      "none");
    const mini = (document.querySelector(".modal1").style.display = "none");
    modal.innerHTML = "";
  });
};
