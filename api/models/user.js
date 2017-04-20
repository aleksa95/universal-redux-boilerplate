import mongoose from 'mongoose';
import { Schema } from 'mongoose';
import bcrypt from 'bcrypt-nodejs';
import CONSTS from '../data/Constants';
import ERROR_TYPES from '../errorHandler/errorTypes';

const UserSchema = new Schema({
    local: {
      email: {
        type: String,
        lowercase: true,
        unique: true
      },
      password: String,
    },
    facebook         : {
      id           : String,
      token        : String,
      email        : String,
      name         : String
    },
    twitter          : {
      id           : String,
      token        : String,
      displayName  : String,
      username     : String
    },
    role: {
      type: String,
      enum: [CONSTS.ROLES.USER, CONSTS.ROLES.USER],
      default: CONSTS.ROLES.USER
    },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date }
  },
  {
    timestamps: true
  });

/**
 * Checks if given password is a match with the encrypted password in the database
 * @param candidatePassword
 * @param cb
 */
UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.local.password, function(err, isMatch) {
    if (err) { return cb(err); }

    cb(null, isMatch);
  });
};

UserSchema.pre('save', function(next) {
  const user = this,
        SALT_FACTOR = 5;

  if (!user.isModified('local.password')) return next(null, user);

  bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
    if (err) return next(err, null, ERROR_TYPES.USER.PRE_SAVE.GEN_SALT);

    bcrypt.hash(user.local.password, salt, null, function(err, hash) {
      if (err) return next(err, null, ERROR_TYPES.USER.PRE_SAVE.HASH_PASSWORD);

      user.local.password = hash;

      next(null, user);
    });
  });
});

module.exports = mongoose.model('User', UserSchema);
