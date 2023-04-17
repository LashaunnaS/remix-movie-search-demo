import type { LinksFunction } from '@remix-run/node';
import styles from '~/styles/login.css';
import { Form } from '@remix-run/react';
import cinemaImg from '../../public/images/cinema.jpg';

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }];

export default function Login() {

  return (
    <div className="login-container">
      <div className="login-container-left">
        <h1>⍛MoviePilgrim</h1>
        <div className="login-form-container">
          <h1>Login</h1>
          <Form method="post">
            <div className="form-field">
              <label htmlFor="username-input">Username</label>
              <input
                type="text"
                id="username-input"
                name="username"
                placeholder="Enter your username"
              />
            </div>
            <div className="form-field">
              <label htmlFor="password-input">Password</label>
              <input
                type="text"
                id="password-input"
                name="password"
                placeholder="Enter your password"
              />
            </div>
            <button type="submit" className="button">
              Sign in
            </button>
          </Form>
        </div>
      </div>
      <div className="login-container-right">
        <img src={cinemaImg} alt="A Movie Theater with Ceiling Lights" />
      </div>
    </div>
  );
}
