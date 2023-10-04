#!/usr/bin/env node
import Customer from "../models/customer";

class CustomerController {
  static createNew(req, res) {
    const { firstName } = req.body;
    const { lastName } = req.body;
    const { phoneNumber } = req.body;
    const { street } = req.body;
    const { city } = req.body;
    const { postalCode } = req.body;
    const { state } = req.body;
    const { country } = req.body;
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Missing email'});
    }

    if (!firstName) {
      return res.status(400).json({ error: 'Missing firstName'});
    }

    if (!lastName) {
      return res.status(400).json({ error: 'Missing lastName'});
    }

    return Customer
      .findOne({ email: email, phoneNumber: phoneNumber, firstName: firstName})
      .then((customer) => {

        if (customer !== null) {
          return res.status(400).json({ error: 'Account Already exists' })
        }

        const new_customer = new Customer({
          firstName: firstName,
          lastName: lastName,
          email: email,
          phoneNumber: phoneNumber || '',
          address: {
            city: city || '',
            street: street || '',
            country: country || '',
            state: state || '',
            postalCode: postalCode || ''
          }
        });

        return new_customer.save()
        .then((detail) => {
          return res.status(201).json({
              customer: {
                id: detail._id,
                firstName: detail.firstName,
                lastName: detail.lastName,
                email: detail.email,
                firstName: detail.firstName
              }
            })
        })
        .catch((error) => {
          console.log(error)
          return res.status(401).json({error: `Unable to save the record: ${error}`});
        });
      })
      .catch((err) => res.status(500).json({error: err}))
  }

  static getAll(req, res) {
    return Customer.find()
      .then((customer) => {

        if (!customer) return res.status(404).json({ error: 'No Customer records' });

        return res.status(201).json({customers: customer})
      })
      .catch((err) => {
        throw err
      });
    // return res.status(200).json({ msg: 'Working' });
  }

  static getOne(req, res) {
    const { email, firstName, lastName } = req.body;

    if (!email) return res.status(400).json({ error: 'Missing email' });

    if (!firstName) return res.status(400).json({ error: 'Missing first name' });

    if (!lastName) return res.status(400).json({ error: 'Missing last name' });

    return Customer.findOne({
      email: email,
      firstName: firstName,
      lastName: lastName
    })
      .then((customer) => {
        if (!customer) return res.status(404).json({ error: 'No Customer Found' });

        return res.status(200).json(customer);
      })
      .catch((err) => res.status(500).json(err));
  }
}

export default CustomerController;