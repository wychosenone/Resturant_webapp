import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Import the necessary matcher

import BookingForm from '../Component/BookingForm';

test('renders the "Choose date" label correctly', () => {
  render(
    <BookingForm
      timeSlots={[]}
      availableTimes=""
      setAvailableTimes={() => {}}
      selectedDate=""
      setSelectedDate={() => {}}
      selectedOccasion=""
      setSelectedOccasion={() => {}}
      selectedNumber=""
      setSelectedNumber={() => {}}
      handleSubmit={() => {}}
      occasion={[]}
    />
  );

  const labelElement = screen.getByLabelText('Choose date');
  expect(labelElement).toBeInTheDocument();
});
