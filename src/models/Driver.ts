// Interfaces imports
import { IPostgresDriver } from 'src/interfaces/interface.db';
import { IDriver } from 'src/interfaces/interface.main';

import db from '../db/db.config';
/* -------------------------------------------------------------------------- */

export default class Driver {
  static async findOne(
    col: string,
    value: string | number
  ): Promise<IPostgresDriver> {
    switch (col) {
      case 'email':
        try {
          const result = await db.query(
            'SELECT * FROM drivers WHERE email=$1',
            [value]
          );

          if (result.rowCount === 0) {
            return {} as IPostgresDriver; // email does not exist
          }

          const row: IPostgresDriver = result.rows[0];
          return row;
        } catch (error) {
          console.log(error);
        }

        break;

      case 'id':
        try {
          const result = await db.query('SELECT * FROM drivers WHERE id=$1', [
            value,
          ]);

          if (result.rowCount === 0) {
            return {} as IPostgresDriver; // user id does not exist
          }

          const row: IPostgresDriver = result.rows[0];
          return row;
        } catch (error) {
          console.log(error);
        }

        break;

      default:
        break;
    }
  }

  static async findAll(): Promise<IDriver[]> {
    try {
      const result = await db.query('SELECT * FROM drivers');

      if (result.rowCount === 0) {
        return [] as IDriver[];
      }

      const rows: IPostgresDriver[] = result.rows;

      let data: IDriver[] = [];

      rows.forEach((row) => {
        data.push({
          id: row.id,
          firstName: row.first_name,
          lastName: row.last_name,
          displayName: row.display_name,
          email: row.email,
          registeredOn: row.registered_on,
          registeredWith: row.registered_with,
          accumulatedTime: row.accumulated_time,
        });
      });

      return data;
    } catch (error) {
      console.log(error);
    }
  }

  static async count(type: 'all'): Promise<number> {
    switch (type) {
      case 'all':
        try {
          const result = await db.query(`
          SELECT COUNT(*) FROM drivers
          `);

          return result.rows[0].count;
        } catch (error) {
          throw error;
        }

      default:
        break;
    }
  }

  static async delete(driverId: number): Promise<boolean> {
    try {
      const result = await db.query(
        `
      DELETE FROM drivers WHERE id = $1
      `,
        [driverId]
      );

      if (result.rowCount > 0) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  }
}
