// Salaries routes
import express from 'express';
import Salary from '../models/Salary.js';

const salaryRoutes = express.Router();

// Get all salaries
salaryRoutes.get('/', async (req, res) => {
  try {
    const salaries = await Salary.find({});
    res.json(salaries);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching salaries', error });
  }
});

// Add new salary
salaryRoutes.post('/', async (req, res) => {
  try {
    const newSalary = new Salary(req.body);
    const savedSalary = await newSalary.save();
    res.status(201).json(savedSalary);
  } catch (error) {
    res.status(400).json({ message: 'Error adding salary', error });
  }
});

export default salaryRoutes;