import Main from "../Component/Main";
function BookingPage(){
   return (
      <div className="container mt-4">
      <div className="row justify-content-center mx-auto">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Make a Reservation</h2>
              <Main />
            </div>
          </div>
        </div>
      </div>
    </div>

   )

}
export default BookingPage;