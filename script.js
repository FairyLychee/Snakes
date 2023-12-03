$(document).ready(() => {
    // navbar 
    $('.main-nav').on('click', (event) => {
        // Remove active class from all tabs
        $('.main-nav').removeClass('active');

        // Add active class to the clicked tab
        $(event.currentTarget).addClass('active');
    });

    // back btn
    $(".btn-back").on("click", () => {
        $(".snake-description").empty();

        $(".snake-category").removeClass("d-none").addClass("d-flex");
        $(".btn-holder").removeClass("d-block").addClass("d-none");
        $(".snake-category-header").removeClass("d-none").addClass("d-block");
        $(".snake-description").removeClass("d-flex").addClass("d-none");

        $(".snake-description").css("height", "auto");
        $('.snake-tab').removeClass('active')
        $('.snake-category-tab').addClass('active');
    })

    setTimeout(() => {
        showSnakes();
    }, 300)

    $(".snake-tab").on("click", (event) => {
        event.preventDefault();
        if ($(event.target).hasClass("snake-category-tab")) {
            $(".snake-category").empty();

            $(".venomous").removeClass("d-flex").addClass("d-none");
            $(".snake-description").removeClass("d-flex").addClass("d-none");
            $(".nonvenomous").removeClass("d-flex").addClass("d-none");
            $(".snake-category").removeClass("d-none").addClass("d-flex");

            setTimeout(() => {
                showSnakes();
            }, 300)
        }
        else if ($(event.target).hasClass("venom-tab")) {
            $(".venomous").empty();

            $(".snake-category").removeClass("d-flex").addClass("d-none");
            $(".snake-description").removeClass("d-flex").addClass("d-none");
            $(".nonvenomous").removeClass("d-flex").addClass("d-none");
            $(".venomous").removeClass("d-none").addClass("d-flex");

            setTimeout(() => {
                showVenomous();
            })
        }
        else {
            $(".nonvenomous").empty();

            $(".snake-category").removeClass("d-flex").addClass("d-none");
            $(".snake-description").removeClass("d-flex").addClass("d-none");
            $(".venomous").removeClass("d-flex").addClass("d-none");
            $(".nonvenomous").removeClass("d-none").addClass("d-flex");

            setTimeout(() => {
                showNonVenomous();
            })
        }
    })
});

async function getSnakes() {
    let response = await fetch('Snakes.json');
    let data = await response.json();
    // console.log(data)
    return data;
}

async function showSnakes() {
    let snakes = await getSnakes();

    snakes.forEach((snake, index) => {
        // console.log(snake)
        let card = creatingCard(snake);
        $(".snake-category").append(card);
    });
    // add card function here
    showDetailOnCard();
}

async function showVenomous() {
    let snakes = await getSnakes();
    // console.log(snakes);
    let venomousSnakes = snakes.filter(snake => snake.IsPoison == 'Yes');
    // console.log(venomousSnakes);

    venomousSnakes.forEach(snake => {
        let card = creatingCard(snake);
        $(".venomous").append(card);
    })

    showDetailOnCard();
}

async function showNonVenomous() {
    let snakes = await getSnakes();
    // console.log(snakes);
    let nonVenomousSnakes = snakes.filter(snake => snake.IsPoison == 'No');
    // console.log(venomousSnakes);
    nonVenomousSnakes.forEach(snake => {
        let card = creatingCard(snake);
        $(".nonvenomous").append(card);
    })

    showDetailOnCard();
}

async function showDetailOnCard() {
    let snakes = await getSnakes();

    $(".card").on("click", (event) => {
        $(".snake-description").empty();

        $(".snake-category").removeClass("d-flex").addClass("d-none");
        $(".snake-category-header").removeClass("d-block").addClass("d-none");
        $(".venomous").removeClass("d-flex").addClass("d-none");
        $(".nonvenomous").removeClass("d-flex").addClass("d-none");
        $(".snake-description").removeClass("d-none")
            .addClass("d-flex justify-content-between align-items-center");
        $(".btn-holder").removeClass("d-none").addClass("d-block");
        $(".snake-description").css("height", "100vh").css("overflow-y", "auto");

        let currentId = $(event.currentTarget).attr('value');
        let selectedSnake = snakes.findIndex(snake => currentId == snake.Id);
        console.log(currentId);
        console.log(selectedSnake);

        let column1 = $(`<div class="col-md-6  col-12"></div>`);
        let column2 = $(`<div class="col-md-6  col-12"></div>`);
        let detail = $(`<p class="mt-5"></p>`);
        let mmTitle = $(`<h2 class=" mt-2"></h2>`);
        let enTitle = $(`<h2 class=" mt-2 mb-5"></h2>`);
        let isDangerous = $(`<h5 class="mt-5"></h5>`);
        let isPoisonous = $(`<h5></h5>`);

        let img = $(`<img />`);
        img.attr("src", `img/${currentId}.jpg`);

        detail.text(snakes[selectedSnake].Detail);

        mmTitle.text(snakes[selectedSnake].MMName);
        enTitle.text(snakes[selectedSnake].EngName);

        isPoisonous.text(`အဆိပ်ရှိ (isPoisonous): ${snakes[selectedSnake].IsPoison}`)
        isDangerous.text(`အန္တရာယ်ရှိ (isDangerous): ${snakes[selectedSnake].IsDanger}`)

        column1.append(img, isDangerous, isPoisonous);
        column2.append(mmTitle, enTitle, detail);
        $(".snake-description").append(column1, column2);
    })
}

function creatingCard(snake) {
    let column1 = $(`<div class="col-lg-3 col-md-4 col-sm-6 col-12 mb-3"></div>`);
    let card = $(`<div class="card rounded-5"></div>`);
    let cardBody = $(`<div class="card-body"></div>`);
    let mmTitle = $(`<h4 class="text-light card-title mt-2"></h4>`);
    let enTitle = $(`<h4 class="text-light card-title mt-2"></h4>`);
    let img = $(`<img class="rounded-top-5"/>`);
    img.attr('src', `img/${snake.Id}.jpg`);
    img.css("height", "260px");

    card.css("height", "400px");
    card.attr("value", snake.Id);

    mmTitle.text(snake.MMName);
    enTitle.text(snake.EngName);

    cardBody.append(mmTitle, enTitle);
    card.append(img, cardBody);
    column1.append(card);

    return column1;
}