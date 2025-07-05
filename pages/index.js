import { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    hostel: '',
    room: '',
    phone: '',
    delivery: 'Evening',
    products: {
      noodles: false,
      biscuits: false,
      coffee: false,
    }
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckbox = (product) => {
    setFormData({
      ...formData,
      products: {
        ...formData.products,
        [product]: !formData.products[product],
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, hostel, room, phone, delivery, products } = formData;

    const selectedProducts = Object.entries(products)
      .filter(([_, value]) => value)
      .map(([key]) => {
        if (key === 'noodles') return 'Noodles Pack';
        if (key === 'biscuits') return 'Biscuit or Chips';
        if (key === 'coffee') return 'Tea/Coffee Sachet';
        return key;
      })
      .join(', ');

    const message = `New Order from HostelServe:\nName: ${name}\nHostel: ${hostel}\nRoom: ${room}\nWhatsApp: ${phone}\nProducts: ${selectedProducts}\nDelivery Time: ${delivery}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = '919042419018';
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.location.href = whatsappURL;
  };

  return (
    <div style={{ maxWidth: 500, margin: '0 auto', padding: 20 }}>
      <h1 style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>
        HOSTELSERVE - Instant Snack Combo
      </h1>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Full Name" onChange={handleChange} style={{ width: '100%', padding: 8, marginTop: 10 }} />
        <input name="hostel" placeholder="Hostel/Block" onChange={handleChange} style={{ width: '100%', padding: 8, marginTop: 10 }} />
        <input name="room" placeholder="Room Number" onChange={handleChange} style={{ width: '100%', padding: 8, marginTop: 10 }} />
        <input name="phone" placeholder="WhatsApp Number" onChange={handleChange} style={{ width: '100%', padding: 8, marginTop: 10 }} />

        <div style={{ marginTop: 20 }}>
          <label><strong>Select Products:</strong></label><br />
          <label><input type="checkbox" checked={formData.products.noodles} onChange={() => handleCheckbox('noodles')} /> Noodles Pack</label><br />
          <label><input type="checkbox" checked={formData.products.biscuits} onChange={() => handleCheckbox('biscuits')} /> Biscuit or Chips</label><br />
          <label><input type="checkbox" checked={formData.products.coffee} onChange={() => handleCheckbox('coffee')} /> Tea/Coffee Sachet</label>
        </div>

        <div style={{ marginTop: 20 }}>
          <label><strong>Preferred Delivery Time</strong></label>
          <select name="delivery" value={formData.delivery} onChange={handleChange} style={{ width: '100%', padding: 8 }}>
            <option value="Morning">Morning (7–9 AM)</option>
            <option value="Evening">Evening (7–9 PM)</option>
          </select>
        </div>

        <button type="submit" style={{ width: '100%', padding: 10, marginTop: 20, backgroundColor: '#0070f3', color: 'white', border: 'none' }}>
          Place Order via WhatsApp
        </button>
      </form>
    </div>
  );
}

