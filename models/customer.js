#!/usr/bin/env node
import mongoose from "mongoose";

// Define the customers schema
const customerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  address: {
    street: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

// Create the Customer model based on the schema.
const Customer = mongoose.model('Customer', customerSchema);

export default Customer;
