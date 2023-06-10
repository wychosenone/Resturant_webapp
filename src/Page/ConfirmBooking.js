import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Card, ListGroup, Button } from 'react-bootstrap';

function ConfirmBooking() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/bookingpage');
  };

  // If state is not available, navigate back to booking page
  if (!state) {
    navigate('/bookingpage');
    return null;
  }

  return (
    <Container className="mt-5 d-flex justify-content-center">
      <Card>
        <Card.Body className="text-center">
          <Card.Title className="mb-4">
            <h2>Confirmation</h2>
          </Card.Title>

          <Card.Subtitle className="mb-3">
            <h4>Your booking has been confirmed!</h4>
          </Card.Subtitle>

          <ListGroup variant="flush">
            <ListGroup.Item>
              <strong>Date: </strong>
              {state.selectedDate}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Time: </strong>
              {state.selectedTime}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Number of Guests: </strong>
              {state.selectedNumber}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Occasion: </strong>
              {state.selectedOccasion}
            </ListGroup.Item>
          </ListGroup>

          <Card.Text className="mt-3">
            Thank you for your reservation. We look forward to welcoming you on your selected date and time.
          </Card.Text>

          <Button variant="primary" onClick={handleBack}>
            Back to Booking
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default ConfirmBooking;
