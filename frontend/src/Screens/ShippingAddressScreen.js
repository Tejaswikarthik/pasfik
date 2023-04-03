import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import CheckoutSteps from '../components/CheckoutSteps';

export default function ShippingAddressScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    userInfo,
    cart: { shippingAddress },
  } = state;
  const [fullName, setFullName] = useState(shippingAddress.fullName || '');
  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [phonenumber, setPhonenumber] = useState(
    shippingAddress.phonenumber || ''
  );

  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ''
  );
  useEffect(() => {
    if (!userInfo) {
      navigate('/signin?redirect=/shipping');
    }
  }, [userInfo, navigate]);
  const [country, setCountry] = useState(shippingAddress.country || '');
  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: {
        fullName,
        phonenumber,
        address,
        city,
        postalCode,
        country,
      },
    });
    localStorage.setItem(
      'shippingAddress',
      JSON.stringify({
        fullName,
        phonenumber,
        address,
        city,
        postalCode,
        country,
      })
    );
    navigate('/payment');
  };
  return (
    <div className="ship">
    <Form onSubmit={submitHandler}>
      <h2>Shipping Address</h2>
      <Form.Group controlId="fullName">
        <Form.Label>Full Name</Form.Label>
        <Form.Control
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="phoneNumber">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control
          type="tel"
          value={phonenumber}
          onChange={(e) => setPhonenumber(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="address">
        <Form.Label>Address</Form.Label>
        <Form.Control
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="city">
        <Form.Label>City</Form.Label>
        <Form.Control
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="postalCode">
        <Form.Label>Postal Code</Form.Label>
        <Form.Control
          type="text"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="country">
        <Form.Label>Country</Form.Label>
        <Form.Control
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        />
      </Form.Group>
      <Button type="submit">Submit</Button>
    </Form>
    </div>
  );
}
