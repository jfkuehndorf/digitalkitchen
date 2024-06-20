function post(data) {
  return `
  <div class="card mt-3">
    <div class="card-body">
      <h3 class="card-title recipeName">${data.name}</h3>
      <hr />
      <p class="card-text postDescription">
        ${data.description}
      </p>
      <div
        class="accordion accordion-flush"
        id="accordionFlushExampleOne${data.postNum}"
      >
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseOne${data.postNum}"
              aria-expanded="false"
              aria-controls="flush-collapseOne${data.postNum}"
            >
              Instructions
            </button>
          </h2>
          <div
            id="flush-collapseOne${data.postNum}"
            class="accordion-collapse collapse"
            data-bs-parent="#accordionFlushExampleOne${data.postNum}"
          >
            <div class="accordion-body">
              ${data.instructions}
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseTwo${data.postNum}"
              aria-expanded="false"
              aria-controls="flush-collapseTwo${data.postNum}"
            >
              Ingredients
            </button>
          </h2>
          <div
            id="flush-collapseTwo${data.postNum}"
            class="accordion-collapse collapse"
            data-bs-parent="#accordionFlushExampleOne${data.postNum}"
          >
            <div class="accordion-body">
              ${data.ingredients}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `;
}

function PostPosts(AllData) {
  let posts = ``;
  for (const postDat of AllData) {
    posts += post(postDat);
  }
  return posts;
}



fetch("components/posts.json")
  .then((response) => response.json())
  .then((data) => {
    document.getElementById("posts").innerHTML = PostPosts(data.posts);
  })
  .catch((error) => console.error("Error fetching navbar:", error));
