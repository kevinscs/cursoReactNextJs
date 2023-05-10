import { render, screen } from '@testing-library/react';
import { PostCard } from '.';
import { postCardPropsMock } from './mock';

const props = postCardPropsMock;

describe('<PostCard />', () => {
    it('Should render PostCard correctly', () => {
        render(<PostCard {...props} />);

       expect(screen.getByRole('img', { name: 'Titulo 1' }))
       .toHaveAttribute('src', 'img/img.png');
       expect(screen.getByRole('heading', { name: 'Titulo 1 1' })).toBeInTheDocument();
       expect(screen.getByText('Corpo 1')).toBeInTheDocument();
    });
    it('Should match snapshot', () => {
        const { container } = render(<PostCard {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    })
});
