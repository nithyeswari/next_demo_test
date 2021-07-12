import React from "react";
import { fireEvent, render, screen } from '@testing-library/react'
import Home from "../../pages/index";
import Profiles from "../../components/profiles"
import ProfileData from "../../types/profileData"
import renderer from 'react-test-renderer';
import Profile from "../../components/profile"
beforeAll(() => { });
afterAll(() => { });
beforeEach(() => { });
afterEach(() => { });


describe('Tesing Profiles', () => { 
  beforeAll(() => { });
  afterAll(() => { });
  beforeEach(() => { });
  afterEach(() => { });
  test('Homepage rendered with welcome and search profile link', () => {
    render(<Home />);
    const Welcome = screen.getByText(/Welcome/);
    expect(Welcome).toBeInTheDocument();
    const Search = screen.getByText(/Search profiles/);
    expect(Search).toBeInTheDocument();
  });

  test('Profiles component renders with No data found message for empty data', async () => {
    const { getByText } = render(<Profiles data={null} name={null} />);
    expect(getByText(/No records found.../)).toBeTruthy();
  });
  test('Profiles component renders No data found message for data with 2 entries', async () => {
    const { getByText } = render(<Profiles data={[{}, {}]} name={null} />);
    expect(getByText(/No records found.../)).toBeTruthy();
  });

  test('Profiles component renders 1 profiles for data with 1 entries', async () => {  
    const { getByText } = render(<Profiles data={[{ name: 'testuser' }]} name={null} />);
    expect(getByText(/testuser/)).toBeTruthy();
  })
  test('Profiles component search test displays only estUser', async () => {
 
    const { getByText } = render(<Profiles data={[{ name: 'testuser' }, { name: 'demo' }]} name={'test'} />);
    expect(getByText(/testuser/)).toBeTruthy();
    expect(screen.queryByText(/demo/)).not.toBeInTheDocument();
  });
});
describe('Testing Profile', () => {
  test('Profile component with empty address should display Address not found!', async () => {
    const { getByText } = render(<Profile data={{ name: 'testuser' }} name={null} />);
    expect(getByText(/Address not found!/)).toBeTruthy();
  })
  test('Profile component should match snapshot generated', async () => { 
    const  component = renderer.create(<Profile data={{ name: 'testuser'}} />); 
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })

});

 //Testing components directly by calling function ..Profile({ name: 'testuser'});

