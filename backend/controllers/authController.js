import bcrypt from 'bcryptjs';
//import { DonorPatient, BloodBank } from '../models/authController.js';
import BloodBank from '../models/bank.js';
import DonorPatient from '../models/user.js';

export const registerUser = async (req, res) => {
  try {
    const { role } = req.body;

    if (!role) {
      return res.status(400).json({ message: "Role is required" });
    }

    if (role === 'donor' || role === 'patient') {
      const { name, email, password, confirmPassword,contactNumber, userId, bloodGroup } = req.body;

      // Check if passwords match
      if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
      }

      const existingUser = await DonorPatient.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email already exists" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new donor/patient
      const newUser = new DonorPatient({
        name,
        email,
        password: hashedPassword,
        contactNumber, 
        userId,
        role,
        bloodGroup,
      });

      await newUser.save();
      console.log(newUser);
      return res.status(201).json({ message: "Donor/Patient registered successfully" });

    } else if (role === 'bloodbank') {
      const { bankName, email, password, license, bankAddress } = req.body;

      // // Check if passwords match
      // if (password !== bankConfirmPassword) {
      //   return res.status(400).json({ message: "Passwords do not match" });
      // }

         // Validate that email is not null or undefined

         console.log(password)
         console.log(req.body)
         if (!email) {
          return res.status(400).json({ message: "Email is required" });
        }

      const existingBank = await BloodBank.findOne({ email });
      if (existingBank) {
        return res.status(400).json({ message: "Email already exists" });
      }

     
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log(hashedPassword)

      // Create new blood bank
      const newBank = new BloodBank({
        bankName,
        email,
        password: hashedPassword,
        role,
        license,
        bankAddress,
        contactNumber, 
        userId,
      });

      await newBank.save();
      console.log(newBank)
      return res.status(201).json({ message: "Blood Bank registered successfully" });
    } else {
      return res.status(400).json({ message: "Invalid role" });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    console.log(email,role,password)
    if (!email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let user;

    if (role === 'donor' || role === 'patient') {
      user = await DonorPatient.findOne({ email });
    } else if (role === 'bloodbank') {
      user = await BloodBank.findOne({ email }); // ensure this is correct
    } else {
      return res.status(400).json({ message: "Invalid role" });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log(user.password)

    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Does password match? ', isMatch);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // On success, return user data and role
    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        role: user.role,
        email: user.email,
        userId: user.userId
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
