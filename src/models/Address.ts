import db from '../db/db.config';

// Interfaces imports
import { IPostgresAddress } from 'src/interfaces/interface.db';
import format from 'pg-format';

export default class Address {
  static async fetchAll(): Promise<IPostgresAddress[]> {
    try {
      const result = await db.query('SELECT * FROM addresses ORDER BY id ASC');

      return result.rows;
    } catch (error) {
      console.log(error);
    }
  }

  static async findOne(
    col: string,
    value: string | number
  ): Promise<IPostgresAddress> {
    switch (col) {
      case 'id':
        try {
          const result = await db.query('SELECT * FROM addresses WHERE id=$1', [
            value,
          ]);

          if (result.rowCount === 0) {
            return {} as IPostgresAddress; // user id does not exist
          }

          const row: IPostgresAddress = result.rows[0];
          return row;
        } catch (error) {
          console.log(error);
        }

        break;

      default:
        break;
    }
  }

  static async create(
    name: string,
    coords: [number, number],
    available: number
  ): Promise<boolean> {
    try {
      const sql = format(
        `
      INSERT INTO 
      addresses(name, available, occupied, position) 
      VALUES
      (%L, ARRAY [%L]::numeric[])
      `,
        [name, available, 0],
        [coords[0], coords[1]]
      );

      const result = await db.query(sql);

      if (result.rowCount > 0) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw error;
    }
  }

  static async edit(
    addressId: number,
    name: string,
    available: number
  ): Promise<boolean> {
    const sql = `
    UPDATE addresses
    SET name=$1, available=$2
    WHERE id=$3
    `;

    try {
      const result = await db.query(sql, [name, available, addressId]);

      if (result.rowCount > 0) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async delete(addressId: number): Promise<boolean> {
    try {
      const result = await db.query(
        `
      DELETE FROM addresses WHERE id = $1
      `,
        [addressId]
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

  static async count(type: 'all'): Promise<number> {
    switch (type) {
      case 'all':
        try {
          const result = await db.query(`
        SELECT COUNT(*) FROM addresses
        `);

          return result.rows[0].count;
        } catch (error) {
          throw error;
        }

      default:
        break;
    }
  }
}
