import React from 'react';
import { render,fireEvent } from '@testing-library/react';
import LoginPage from './login-page';
import Dashboard from './dashboard';
import { BrowserRouter } from 'react-router-dom';
import 'jest-localstorage-mock';




test('check if error message on login without filling any field  works', async () => {
  const { findByText, getByText } = render(
    <BrowserRouter>
      <LoginPage/>
  </BrowserRouter>);
   
   fireEvent.click(getByText('Sign in'))

   const modal = await getByText("Please type your email in the required field")
   expect(modal).toBeInTheDocument();

  //Checks if user receives an error message on failed login
});

test('check if error message without password works', async () => {
  const { findByText, getByText,getByLabelText } = render(
    <BrowserRouter>
      <LoginPage/>
  </BrowserRouter>);
  fireEvent.change(getByLabelText(/email/i), { target: { value: 'kwaku.kwayisi@gmail.com' } })
//   fireEvent.change(getByLabelText(/password/i), { target: { value: 'kwaku.boohene1' } })
   
   fireEvent.click(getByText('Sign in'))

   const modal = await getByText("Please type your password in the required field")
   expect(modal).toBeInTheDocument();

  //Checks if user receives an error message on failed login
});

test('check if  works', async () => {
    global.window = { location: { pathname: null } };
  var { findByText, getByText,getByLabelText } = render(
    <BrowserRouter>
      <LoginPage/>

  </BrowserRouter>);
  fireEvent.change(getByLabelText(/email/i), { target: { value: 'kwaku.kwayisi@gmail.com' } })
  fireEvent.change(getByLabelText(/password/i), { target: { value: 'kwaku.boohene1' } })
   
   fireEvent.click(getByText('Sign in'));


});
