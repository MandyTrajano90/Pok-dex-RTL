import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <FavoritePokemon.tsx />', () => {
  test('É exibida na tela a mensagem No favorite pokemon found caso a pessoa não tenha Pokémon favorito', () => {
    renderWithRouter(<App />, { route: '/favorites' });
    expect(screen.getByText('No favorite Pokémon found')).toBeInTheDocument();
  });
  test('Apenas são exibidos os Pokémon favoritados', async () => {
    const { user } = renderWithRouter(<App />);
    await user.click(screen.getByRole('link', { name: /more details/i }));
    await user.click(screen.getByText(/pokémon favoritado\?/i));
    await user.click(screen.getByRole('link', { name: /favorite pokémon/i }));
    expect(screen.getByTestId(/pokemon-name/i)).toBeInTheDocument();
  });
});
