import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <NotFound.tsx />', () => {
  test('Teste se a página contém um heading h2 com o texto Page requested not found', () => {
    renderWithRouter((<App />), { route: '*' });
    expect(screen.getByRole('heading', { name: /Page requested not found/i })).toBeInTheDocument();
    const textIMG = "Clefairy pushing buttons randomly with text I have no idea what i'm doing";
    const srcIMG = '/404.gif';
    expect(screen.getByRole('img')).toHaveAttribute('src', srcIMG);
    expect(screen.getByRole('img')).toHaveAttribute('alt', textIMG);
  });
});
