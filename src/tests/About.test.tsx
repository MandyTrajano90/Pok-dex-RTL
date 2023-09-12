import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <About.tsx />', () => {
  test('Teste se a página contém as informações sobre a Pokédex', () => {
    renderWithRouter((<App />), { route: '/about' });
    expect(screen.getByText(/What does this app do?/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Pokédex/i)).toBeInTheDocument();
  });
  test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter((<App />), { route: '/about' });
    expect(screen.getByRole('heading', { name: /About Pokédex/i, level: 2 })).toBeInTheDocument();
  });
  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter((<App />), { route: '/about' });
    const firstP = 'This application simulates a Pokédex, a digital encyclopedia containing all Pokémon.';
    const secondP = 'One can filter Pokémon by type, and see more details for each one of them.';
    expect(screen.getByText(firstP)).toBeInTheDocument();
    expect(screen.getByText(secondP)).toBeInTheDocument();
  });
  test('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    renderWithRouter((<App />), { route: '/about' });
    const imgURL = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(screen.getByRole('img')).toHaveAttribute('src', imgURL);
  });
});
