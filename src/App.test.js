import { render, screen } from '@testing-library/react';
import App from './App';
import { useData, useUserState }from './utilities/firebase.js';

jest.mock('./utilities/firebase.js');
const mdata = {
  "users":{"displayName":"Alex"},
  "Locations":{},
};
const muser = {"users": {"name":"Alex"},
                "user": {"displayName":"Alex"},};

test('renders learn react link', async () => {
  useData.mockReturnValue([mdata, false, null]);
  useUserState.mockReturnValue(null);
  render(<App />);
  const linkElement = await screen.findByText(/Sign in/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders learn react link', async () => {
  useData.mockReturnValue([mdata, false, null]);
  useUserState.mockReturnValue(muser);
  render(<App />);
  const linkElement = await screen.findByText("Unlock");
  expect(linkElement).toBeInTheDocument();
});



it('shows Sign Out if logged in', async () => {
  useData.mockReturnValue([mdata, false, null]);
  useUserState.mockReturnValue(muser);
  render(<App />);
  const button = screen.queryByText(/Sign Out/i);
  expect(button).toBeInTheDocument();
});


it('shows if user photo is accessible', async () => {
  useData.mockReturnValue([mdata, false, null]);
  useUserState.mockReturnValue(muser);
  render(<App />);
  const button = screen.getByAltText("userphoto");
  expect(button).toBeInTheDocument();
});