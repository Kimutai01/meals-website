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
                <h3>${meal.strMeal}</h3>
                <div class='further'>
                <div class='button'>
                    <button id=${meal.idMeal} class='comments'>View more</button>
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
      showComments(e.target.id);
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
    <button class='back'>❌</button>
   <img src="${data.strMealThumb}" alt="${data.strMeal}">
   <h2>${data.strMeal}</h2>
   <div class='details'>
   <p><strong>Area:</strong>${data.strArea}</p>
   <p><strong>category:</strong>${data.strCategory}</p>
   </div>
   <h2>Instructions</h2>
   <p>${data.strInstructions}</p>
   <button class='you'><a href="${data.strYoutube}">Youtube link</a></button>
   <h3>Add a comment</h3>
    <form class='form-comments'>
      <input type="text" id='name' placeholder='enter your name' />
      <input type="text" id='comment' placeholder='enter your reservations' />
      <input type="submit" id=${data.idMeal} class='sub-comment' />
    </form>
    <h3>Comments</h3>
   <div class= 'shown-comments'>
   </div>
   </div>
   
    </div>
  `;
  displayComments();
  postComment();
  const filtered = Object.entries(data).filter(
    ([key, value]) =>
      key.includes("strIngredient") && value !== null && value !== ""
  );
  console.log(filtered);
  showComments();

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
// document.addEventListener("DOMContentLoaded", () => {});
const displayComments = () => {
  const form = document.querySelector(".form-comments");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const id = document.querySelector("#name");
    const com = document.querySelector("#comment");
    console.log(id.value, com.value);
  });
};

const postComment = () => {
  const Allcomments = document.querySelectorAll(".sub-comment");
  Allcomments.forEach((likebtn) => {
    likebtn.addEventListener("click", async (e) => {
      alert(123);
      e.preventDefault();
      const user = document.querySelector("#name");
      const com = document.querySelector("#comment");
      const posCom = await fetch(
        "https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/BQmOqtxOBj7eESoqjNWo/comments",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            item_id: e.target.id,
            username: user.value,
            comment: com.value,
          }),
        }
      );
      const getComments = await fetch(
        `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/BQmOqtxOBj7eESoqjNWo/comments?item_id=${e.target.id}`
      );
      const gottenComments = await getComments.json();
      console.log(gottenComments);
      document.querySelector(".shown-comments").innerHTML = "";
      gottenComments.forEach((com) => {
        document.querySelector(".shown-comments").innerHTML += `
        <div class="each-comment">
        <p>${com.creation_date} @ ${com.username}:${com.comment}</p>
      </div>
        `;
      });
    });
  });
};

const showComments = async (id) => {
  const getComments = await fetch(
    `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/BQmOqtxOBj7eESoqjNWo/comments?item_id=${id}`
  );
  const gottenComments = await getComments.json();
  console.log(gottenComments);
  gottenComments.forEach((com) => {
    document.querySelector(".shown-comments").innerHTML += `
        <div class="each-comment">
     <p>${com.creation_date} @ ${com.username}: ${com.comment}</p>
      </div>
        `;
  });
};
