document.addEventListener("DOMContentLoaded", () => {
  const filmsList = document.getElementById("films");
  const title = document.getElementById("title");
  const runtime = document.getElementById("runtime");
  const showtime = document.getElementById("showtime");
  const availableTickets = document.getElementById("available-tickets");
  const poster = document.getElementById("poster");
  const buyTicketButton = document.getElementById("buy-ticket");

  // Fetch all films
  fetch("http://localhost:3000/films")
    .then((response) => response.json())
    .then((films) => {
      filmsList.innerHTML = ""; // Clear placeholder
      films.forEach((film) => {
        const li = document.createElement("li");
        li.className = "film item";
        li.textContent = film.title;
        li.addEventListener("click", () => displayMovieDetails(film));
        filmsList.appendChild(li);
      });

      // Display details of the first movie by default
      if (films.length > 0) displayMovieDetails(films[0]);
    });

  function displayMovieDetails(film) {
    title.textContent = film.title;
    runtime.textContent = film.runtime;
    showtime.textContent = film.showtime;
    availableTickets.textContent = film.capacity - film.tickets_sold;
    poster.src = film.poster;

    buyTicketButton.onclick = () => {
      const ticketsLeft = parseInt(availableTickets.textContent);
      if (ticketsLeft > 0) {
        availableTickets.textContent = ticketsLeft - 1;
      } else {
        alert("Sold Out!");
      }
    };
  }
});
