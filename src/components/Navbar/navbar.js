import $ from 'jquery';
import './navbar.scss';

const navBarEvents = () => {
  $('.nav-link').on('click', (e) => {
    console.log(e.target.id);
  });
};

const navbarBuilder = () => {
  const domString = `
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <a class="navbar-brand" href="#">To Do</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <a class="nav-link" id="navbar-button-auth">Authentication</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" id="navbar-button-logout">Logout</a>
        </li>
      </ul>
    </div>
</nav>
  `;
  $('#navbar').html(domString);
  navBarEvents();
};

export default navbarBuilder;
