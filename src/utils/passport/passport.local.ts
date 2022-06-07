// NPM package imports
import passportLocal from 'passport-local';
import bcrypt from 'bcryptjs';

// Models imports
import Admin from '../../models/Admin';

// Interfaces imports
import { IPostgresAdmin } from 'src/interfaces/interface.db';

import { isObjectEmpty } from '../utils';
/* -------------------------------------------------------------------------- */

const LocalStrategy = passportLocal.Strategy;

const localAuth = new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  async function (username, password, done) {
    try {
      let admin: IPostgresAdmin & { role?: string } = await Admin.findOne(
        'email',
        username
      );

      // Check if the returned user or admin object is empty
      if (isObjectEmpty(admin)) {
        // Email doesn't match any database entry in either users or admins table

        return done(null, false);
      } else {
        // Email matched a database entry

        if (!isObjectEmpty(admin)) {
          // Email matches an admin
          // Compare provided password with stored password

          if (admin.password_changed) {
            // if admin has changed the initial password then the password value
            // is a hash. Use bcrypt

            const match = await bcrypt.compare(password, admin.password); // true/false

            if (!match) {
              return done(null, false);
            }
          } else {
            // if admin has not changed the initial password then the password value
            // is simple text. Compare strings
            const match = password === admin.password; // true/false

            if (!match) {
              return done(null, false);
            }
          }

          // Add user role before serialization
          admin['role'] = 'admin';
          return done(null, admin);
        }
      }
    } catch (error) {
      return done(error);
    }
  }
);

export default localAuth;
