import React, { useState } from "react";
import Swal from "sweetalert2";

const DonationForm = ({setFormData1}) => {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
    },
    buttonsStyling: false
  })
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    upiId: "",
    address: "",
    phoneNumber: "",
    alternateNumber: "",
    pincode: "",
    lat:"",
    lon:""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    navigator.geolocation.getCurrentPosition(
      (success) => {
        setFormData({
          ...formData,
            lat: success.coords.latitude,
            lon: success.coords.longitude,
        });
      },
    );
    if(formData.lat==="" && formData.lon ===""){
      alert("Please allow location")
      return;
    }
    setFormData1(formData)
    if(formData.lat!=="" && formData.lon !==""){
      swalWithBootstrapButtons.fire(
        'Successful',
        'You claimed your rewards! Thank You.',
        'success'
      )
      return;
    }
  };

  return (
    <div className="form-container">
      <h2>Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Devid"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="xyz@email.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="upiId">UPI ID:</label>
          <input
            type="text"
            id="upiId"
            name="upiId"
            placeholder="9876543210@ybl or @paytm"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="tel"
            id="phoneNumber"
            placeholder="9876543210"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="alternateNumber">Alternate Number:</label>
          <input
            type="tel"
            id="alternateNumber"
            name="alternateNumber"
            placeholder="9876543210"
            value={formData.alternateNumber}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="pincode">Pincode:</label>
          <input
            type="text"
            id="pincode"
            name="pincode"
            placeholder="Area-pin-code 123456"
            value={formData.pincode}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Full Address:</label>
          <textarea
            className="address"
            type="text"
            id="address"
            name="address"
            placeholder="House No., House Address, Area Name, City,State. "
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default DonationForm;