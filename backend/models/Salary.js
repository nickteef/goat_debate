// Salary model
import mongoose from 'mongoose';

const salarySchema = mongoose.Schema(
    {
      player: { type: String, required: true },
      season: { type: String, required: true },
      team: { type: String },
      salary: { type: Number },
    },
    {
      timestamps: true,
    }
  );
  
  const Salary = mongoose.model('Salary', salarySchema, 'salaries');
  export default Salary;