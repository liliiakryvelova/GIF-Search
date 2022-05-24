import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import GIFservice from './GIF-service.js';

function clearFields() {
  $('#keyword').val("");
  $('.showErrors').text("");
  $('.showResult').text("");
}


$(document).ready(function () {
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
});

