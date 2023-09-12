import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <Pokemon.tsx />', () => {
  test('Teste se é renderizado um card com as informações de determinado Pokémon', () => {
    renderWithRouter(<App />);
    expect(screen.getByTestId('pokemon-name')).toHaveTextContent('Pikachu');
    expect(screen.getByTestId('pokemon-type')).toHaveTextContent('Electric');
    expect(screen.getByTestId('pokemon-weight')).toHaveTextContent('Average weight: 6.0 kg');

    const imgText = 'Pikachu sprite';
    const imgSRC = 'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png';
    expect(screen.getByRole('img')).toHaveAttribute('alt', imgText);
    expect(screen.getByRole('img')).toHaveAttribute('src', imgSRC);
  });
  test('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes desse Pokémon', async () => {
    const { user } = renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', { name: /More details/i });
    expect(detailsLink).toBeInTheDocument();
    expect(detailsLink).toHaveAttribute('href', '/pokemon/25');
    await user.click(detailsLink);
    expect(screen.getByText(/Summary/i)).toBeInTheDocument();
  });
  test('Teste se existe um ícone de estrela nos Pokémon favoritados', async () => {
    const { user } = renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', { name: /More details/i });
    await user.click(detailsLink);
    expect(window.location.pathname).toBe('/pokemon/25');
    expect(screen.getByText(/Summary/i)).toBeInTheDocument();
    const favPoke = screen.getByRole('checkbox', { name: /Pokémon favoritado?/i });
    await user.click(favPoke);
    const star = screen.getByAltText('Pikachu is marked as favorite');
    expect(star).toHaveAttribute('src', '/star-icon.png');
  });
});
