const GetFood = () => {
  fetch("https://www.themealdb.com/api/json/v1/1/filter.php?a=British")
    .then((res) => res.json())
    .then((data) => {
      const meals = data.meals;
      meals.forEach((meal) => {
        displayData(meal);
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
                    <p class='like-button' id='${meal.idMeal}'>️❤️</p>
                    <p class='like-count' id='${meal.idMeal}'>0</p>
                </div>
                 </div>

            </div>
    `;
  showLikes();
  addLike();
  const popup = div.querySelectorAll(".comments");
  popup.forEach((pop) => {
    pop.addEventListener("click", (e) => {
      //   displayPopup();
      displaySingle(e.target.id);
      const popupDiv = (document.querySelector(".popup-overly").style.display =
        "flex");
      const mini = (document.querySelector(".modal1").style.display = "flex");
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
   <div class='details'>
   <p><strong>Area:</strong>${data.strArea}</p>
   <p><strong>category:</strong>${data.strCategory}</p>
   </div>
   <h2>Instructions</h2>
   <p>${data.strInstructions}</p>
   <button><a href="${data.strYoutube}">Youtube link</a></button>
   </div>
   
    </div>
  `;

  const filtered = Object.entries(data).filter(
    ([key, value]) =>
      key.includes("strIngredient") && value !== null && value !== ""
  );
  console.log(filtered);

  const backButton = document.querySelector(".back");
  backButton.addEventListener("click", () => {
    const popupDiv = (document.querySelector(".popup-overly").style.display =
      "none");
    const mini = (document.querySelector(".modal1").style.display = "none");
    modal.innerHTML = "";
  });
};

const addLike = () => {
  const AllLikes = document.querySelectorAll(".like-button");
  AllLikes.forEach((likebtn) => {
    likebtn.addEventListener("click", async (e) => {
      const postLikes = await fetch(
        "https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/BQmOqtxOBj7eESoqjNWo/likes",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            item_id: e.target.id,
          }),
        }
      );

      const getLikes = await fetch(
        "https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/BQmOqtxOBj7eESoqjNWo/likes"
      );
      const gottenLikes = await getLikes.json();
      gottenLikes.forEach((dat) => {
        if (dat.item_id === String(e.target.id)) {
          e.target.nextElementSibling.innerText = dat.likes;
        }
      });
    });
  });
};

const showLikes = async () => {
  const gotlikes = document.querySelectorAll(".like-count");

  const getLikes = await fetch(
    "https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/BQmOqtxOBj7eESoqjNWo/likes"
  );
  const gottenLikes = await getLikes.json();
  gotlikes.forEach((like) => {
    // console.log(like.item_id);
    gottenLikes.forEach((single) => {
      if (like.id === single.item_id) {
        like.innerText = single.likes;
      }
    });
  });
};
document.addEventListener('DOMContentLoaded',()=>{
  
})
