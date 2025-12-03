/**
 * BACKEND FIX: User Model - Remove Address Reference
 * 
 * This file contains the corrected User model that embeds addresses
 * instead of referencing a separate Address model.
 * 
 * INSTRUCTIONS:
 * 1. Copy this entire file content
 * 2. Replace your backend/models/User.js with this code
 * 3. Restart your backend server
 * 4. Test the /api/auth/me endpoint
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 6,
    select: false // Don't return password by default
  },
  phone: {
    type: String,
    trim: true
  },
  avatar: {
    type: String,
    default: '/assets/images/faces/default-avatar.png'
  },
  dateOfBirth: {
    type: Date
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  verificationToken: String,
  verificationTokenExpire: Date,
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  
  // Embed addresses directly (no separate Address model needed)
  addresses: [{
    name: {
      type: String,
      trim: true
    },
    phone: {
      type: String,
      trim: true
    },
    address: {
      type: String,
      trim: true
    },
    city: {
      type: String,
      trim: true
    },
    state: {
      type: String,
      trim: true
    },
    country: {
      type: String,
      default: 'Nigeria',
      trim: true
    },
    zipCode: {
      type: String,
      trim: true
    },
    isDefault: {
      type: Boolean,
      default: false
    }
  }]
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  // Only hash password if it's modified
  if (!this.isModified('password')) {
    return next();
  }
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Remove sensitive data from JSON output
userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  delete user.verificationToken;
  delete user.verificationTokenExpire;
  delete user.resetPasswordToken;
  delete user.resetPasswordExpire;
  delete user.__v;
  return user;
};

// Create indexes
userSchema.index({ email: 1 });

module.exports = mongoose.model('User', userSchema);
