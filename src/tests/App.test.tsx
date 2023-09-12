import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <App.tsx />', () => {
  test('Teste se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);

    const home = screen.getByRole('link', { name: /home/i });
    const about = screen.getByRole('link', { name: /about/i });
    const favorite = screen.getByRole('link', { name: /favorite/i });

    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favorite).toBeInTheDocument();
  });

  test('Teste se a aplicação é redirecionada para a página inicial, na URL /, ao clicar no link Home da barra de navegação', async () => {
    const { user } = renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: /home/i });
    await user.click(home);
    expect(screen.getByRole('button', { name: /Próximo Pokémon/i })).toBeInTheDocument();
  });

  test('Teste se a aplicação é redirecionada para a página de About, na URL /about, ao clicar no link About da barra de navegação', async () => {
    const { user } = renderWithRouter(<App />);
    const about = screen.getByRole('link', { name: /about/i });
    await user.click(about);
    expect(screen.getByRole('heading', { name: /About Pokédex/i })).toBeInTheDocument();
  });

  test('Teste se a aplicação é redirecionada para a página de Pokémon Favoritados, na URL /favorites, ao clicar no link Favorite Pokémon da barra de navegação', async () => {
    const { user } = renderWithRouter(<App />);
    const favorite = screen.getByRole('link', { name: /favorite/i });
    await user.click(favorite);
    expect(screen.getByRole('heading', { name: /Favorite Pokémon/i })).toBeInTheDocument();
  });

  test('Teste se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida', () => {
    renderWithRouter((<App />), { route: '/something-else' });
    expect(screen.getByRole('heading', { name: /Page requested not found/i })).toBeInTheDocument();
  });
});
