
function Menu() {
  const menuItems = [
    { id: 1, name: 'Item 1', price: '$10', photo: 'item1.jpg' },
    { id: 2, name: 'Item 2', price: '$12', photo: 'item2.jpg' },
    { id: 3, name: 'Item 3', price: '$8', photo: 'item3.jpg' },
    { id: 4, name: 'Item 4', price: '$15', photo: 'item4.jpg' },
    { id: 5, name: 'Item 5', price: '$9', photo: 'item5.jpg' },
  ];

  return (
    <div>
      <h2 className="text-center mb-4">Menu</h2>
      <div className="row">
        {menuItems.map(item => (
          <div key={item.id} className="col-md-6 col-lg-4 mb-4">
            <div className="card">
              <img src={item.photo} alt={item.name} className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">{item.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;