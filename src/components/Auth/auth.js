import $ from 'jquery';
import './auth.scss';

const loginButton = () => {
  const domString = `
  <button class="btn btn-secondary">Log in</button>
  `;
  $('#login-container').html(domString);
};

export default loginButton;
