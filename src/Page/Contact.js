import React from 'react';

function ContactPage() {
  const handleSubmit = (e) => {
    e.preventDefault();


    const name = e.target.elements.name.value;
    const email = e.target.elements.email.value;
    const message = e.target.elements.message.value;


    const formData = {
      name,
      email,
      message
    };

    const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    contacts.push(formData);
    localStorage.setItem('contacts', JSON.stringify(contacts));

    e.target.reset();
    alert('your contact has been submitted')
  };

  return (
    <div className="container">
      <h2 className="text-center mt-4 mb-4">Contact Us</h2>
      <div className="row justify-content-center mx-auto">
        <div className="col-md-6">
          <form onSubmit={handleSubmit} className="mb-4">
            <div className="form-group mb-4">
              <label htmlFor="name" className="mb-2">Name</label>
              <input type="text" className="form-control" id="name" placeholder="Enter your name" required />
            </div>
            <div className="form-group mb-4">
              <label htmlFor="email" className="mb-2">Email</label>
              <input type="email" className="form-control" id="email" placeholder="Enter your email" required />
            </div>
            <div className="form-group mb-4">
              <label htmlFor="message" className="mb-2">Message</label>
              <textarea className="form-control" id="message" rows="5" placeholder="Enter your message" required></textarea>
            </div>
            <div className='text-center'>
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
