import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import GIFservice from './GIF-service.js';
import { GIFservice2 } from './GIF-service.js';
import { GIFservice3 } from './GIF-service.js';

function clearFields() {
  $('#keyword').val("");
  $('.showErrors').text("");
  $('.showResult').append("");
  $('.showTrendingResult').append("");
  $('.showRandom').append("");
}


$(document).ready(function () {
  let promise2 = GIFservice2.getTrending();
  promise2.then(function (response) {
    const body = JSON.parse(response);
    body.data.forEach(gif => {
      $(`.showTrendingResult`).append(`<div class="card" style="width: 25%;">
      <img src="${gif.images.fixed_height.url}" class="card-img-top" alt="${gif.title}">
      <div class="card-body">
        <p class="card-text">${gif.title}</p>
      </div>
    </div>`);
    });
  });

  $('#searchResult').click(function () {
    let keyword = $(`#keyword`).val();
    clearFields();
    let promise = GIFservice.getPicture(keyword);


    promise.then(function (response) {
      const body = JSON.parse(response);
      body.data.forEach(gif => {
        $(`.showResult`).append(`<div class="card" style="width: 25%;">
        <img src="${gif.images.fixed_height.url}" class="card-img-top" alt="${gif.title}">
        <div class="card-body">
          <p class="card-text">${gif.title}</p>
        </div>
      </div>`);
      });
    }, function (error) {
      $('.showErrors').text(`There was an error processing your request: ${error}`);
    });

  });


  $("#searchRandom").click(function () {
    clearFields();
    let promise3 = GIFservice3.getRandom();

    promise3.then(function (response) {
      const body = JSON.parse(response);

      $('.showRandom').append(
        ` <img src="${body.data.images.fixed_width_small.url}" class="card-img-top" alt="${body.data.title}" style = "width:100px, height: 100px">`
      );
    });
  });
});

