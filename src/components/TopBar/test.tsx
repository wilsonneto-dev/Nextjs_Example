import { screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helpers'
import TopBar from '.'

describe('<TopBar />', () => {
  it('should render the heading', () => {
    renderWithTheme(<TopBar />)

    const wrapper = screen.getByRole('banner')

    expect(wrapper).toBeInTheDocument()
  })
})
