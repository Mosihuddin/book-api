// input-field

document.getElementById("button-search").addEventListener("click", () => {
    let inputBox = document.getElementById("input-field");
    let inputValue = inputBox.value;

    // empty  validation
    if (inputValue === "") {
        resultToggle("none");
        let result = document.getElementById("result");
        result.style.display = "block";
        result.innerText = "Invalid Request!!";
        let bookFound = document.getElementById("book-found");
        bookFound.innerHTML = "";
    } else {
        spinnerToggle("block");
        resultToggle("none");
        bookFoundToggle("none");
        result.style.display = "none";

        // book fetch
        let loadData = bookname => {
            let url = `https://openlibrary.org/search.json?q=${bookname}`;
            fetch(url)
                .then(response => response.json())
                .then(data => bookDetails(data));
        };
        loadData(inputValue);
        inputBox.value = "";

        let bookDetails = data => {
            console.log(data);

            // book found check

            let bookFound = document.getElementById("book-found");
            bookFound.style.display = "block";
            bookFound.innerText = `Total books found : ${data.numFound}`;

            // no  book name validation

            if (data.numFound === 0) {
                bookFound.innerHTML = `<span class="text-danger">Please give  a book name</span> `;
            }

            // list of books 

            let row = document.getElementById("row");
            row.textContent = "";
            let details = data.docs;

            details.forEach(srcBooks => {
                let author = srcBooks.author_name;
                let publisher = srcBooks.publisher;

                let div = document.createElement("div");
                div.classList.add("col");
                let bookTitle = srcBooks.title.slice(0, 10);
                div.innerHTML = `
            <div class="card mb-3 shadow rounded">
              <div class="row g-0">
                <div class="col-md-4">
                  <img
                    class="card-img-top w-100 h-100"
                    src="https://covers.openlibrary.org/b/id/${srcBooks.cover_i}-L.jpg"
                    class="img-fluid rounded-start"
                    alt="..."
                  />
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <h1 class="card-title text-success">${bookTitle}</h1>
                    <hr />
                    <h3 class="lead"><span class="fw-bold">Author : </span> ${author}</h3>
                    <p class="lead"><span class="fw-bold">Publisher : </span> ${publisher}</p>
  
                    <p class="card-text">
                      <small class="text-muted"
                        >First Published : ${srcBooks.first_publish_year}</small
                      >
                    </p>
                  </div>
                </div>
              </div>
            </div>
          `;
                row.appendChild(div);
            });
            spinnerToggle("none");
            resultToggle("flex");
            bookFoundToggle("block");
        };
    }
});
// spinner  function

let spinnerToggle = displayStyle => {
    document.getElementById("spinner").style.display = displayStyle;
};
let resultToggle = displayStyle => {
    document.getElementById("row").style.display = displayStyle;
};
let bookFoundToggle = displayStyle => {
    document.getElementById("book-found").style.display = displayStyle;
};
