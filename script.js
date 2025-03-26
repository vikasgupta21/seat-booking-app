const moviesList = [
  { movieName: "Flash", price: 7 },
  { movieName: "Spiderman", price: 5 },
  { movieName: "Batman", price: 4 },
];

// Get elements
let selectMovie = document.getElementById("selectMovie");
let movieName = document.getElementById("movieName");
let moviePrice = document.getElementById("moviePrice");
let totalPrice = document.getElementById("totalPrice");
let selectedSeatsHolder = document.getElementById("selectedSeatsHolder");
let numberOfSeat = document.getElementById("numberOfSeat");
let proceedBtn = document.getElementById("proceedBtn");
let cancelBtn = document.getElementById("cancelBtn");
let price = 0;

// Populate dropdown menu
moviesList.forEach((movie) => {
  let option = document.createElement("option");
  option.value = movie.movieName;
  option.textContent = movie.movieName;
  selectMovie.appendChild(option);
});

// Set default movie
const defaultMovie = moviesList[0];
movieName.textContent = defaultMovie.movieName;
moviePrice.textContent = `$${defaultMovie.price}`;
price = defaultMovie.price;

// Movie selection event
selectMovie.addEventListener("change", (event) => {
  const selectedMovie = moviesList.find(movie => movie.movieName === event.target.value);
  movieName.textContent = selectedMovie.movieName;
  moviePrice.textContent = `$${selectedMovie.price}`;
  price = selectedMovie.price;
  updatePrice();
});

// Seat selection logic
let seatcount = [];
let seats = document.querySelectorAll("#seatCont .seat");

seats.forEach((seat, index) => {
  seat.dataset.seatId = index + 1;

  seat.addEventListener("click", () => {
      if (!seat.classList.contains("occupied")) {
          if (!seat.classList.contains("selected")) {
              seat.classList.add("selected");
              seatcount.push(seat.dataset.seatId);
          } else {
              seat.classList.remove("selected");
              seatcount = seatcount.filter(s => s !== seat.dataset.seatId);
          }
      }

      updatePrice();
      updateSeats();
  });
});

// Update selected seats display
function updateSeats() {
  selectedSeatsHolder.innerHTML = seatcount.length > 0 ? seatcount.join(",") : "No seat selected";
}

// Update price calculation
function updatePrice() {
  numberOfSeat.textContent = seatcount.length;
  totalPrice.textContent = `$${seatcount.length * price}`;
}

// Proceed button logic
proceedBtn.addEventListener("click", () => {
  if (seatcount.length == 0) {
      alert("Oops, no seat selected!");
  } else {
      alert("Yayy! Your seats have been booked");

      seats.forEach((seat) => {
          if (seat.classList.contains("selected")) {
              seat.classList.remove("selected");
              seat.classList.add("occupied");
          }
      });

      seatcount = [];
      updatePrice();
      updateSeats();
  }
});

// Cancel button logic
cancelBtn.addEventListener("click", () => {
  seats.forEach(seat => seat.classList.remove("selected"));
  seatcount = [];
  updatePrice();
  updateSeats();
})