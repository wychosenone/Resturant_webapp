import { render, screen, fireEvent } from '@testing-library/react';
import BookingForm from '../Component/BookingForm';

test('JavaScript validation functions work correctly', () => {
  render(<BookingForm />);
  
  // Select elements
  const dateInput = screen.getByLabelText('Choose date');
  const timeSelect = screen.getByLabelText('Choose time');
  const guestsInput = screen.getByLabelText('Number of guests');
  const occasionSelect = screen.getByLabelText('Occasion');
  
  // Fill in valid values
  fireEvent.change(dateInput, { target: { value: '2023-06-10' } });
  fireEvent.change(timeSelect, { target: { value: '17:00' } });
  fireEvent.change(guestsInput, { target: { value: '5' } });
  fireEvent.change(occasionSelect, { target: { value: 'Birthday' } });
  
  // Validate form
  fireEvent.submit(screen.getByRole('form'));
  
  // Assert no error messages
  expect(screen.queryByText('Please select a date.')).toBeNull();
  expect(screen.queryByText('Please select a time.')).toBeNull();
  expect(screen.queryByText('Please enter the number of guests.')).toBeNull();
  expect(screen.queryByText('Please select an occasion.')).toBeNull();
  
  // Fill in invalid values
  fireEvent.change(dateInput, { target: { value: '' } });
  fireEvent.change(timeSelect, { target: { value: '' } });
  fireEvent.change(guestsInput, { target: { value: '0' } });
  fireEvent.change(occasionSelect, { target: { value: '' } });
  
  // Validate form
  fireEvent.submit(screen.getByRole('form'));
  
  // Assert error messages
  expect(screen.getByText('Please select a date.')).toBeInTheDocument();
  expect(screen.getByText('Please select a time.')).toBeInTheDocument();
  expect(screen.getByText('Please enter the number of guests.')).toBeInTheDocument();
  expect(screen.getByText('Please select an occasion.')).toBeInTheDocument();
});
