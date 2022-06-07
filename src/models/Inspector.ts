import { IPostgresInspector } from '../interfaces/interface.db';
import db from '../db/db.config';
import { IInspector } from '../interfaces/interface.main';

export default class Inspector {
  static async findOne(
    col: string,
    value: string | number
  ): Promise<IPostgresInspector> {
    switch (col) {
      case 'email':
        try {
          const result = await db.query(
            'SELECT * FROM inspectors WHERE email=$1',
            [value]
          );

          if (result.rowCount === 0) {
            return {} as IPostgresInspector; // email does not exist
          }

          const row: IPostgresInspector = result.rows[0];
          return row;
        } catch (error) {
          console.log(error);
        }

        break;

      case 'id':
        try {
          const result = await db.query(
            'SELECT * FROM inspectors WHERE id=$1',
            [value]
          );

          if (result.rowCount === 0) {
            return {} as IPostgresInspector; // user id does not exist
          }

          const row: IPostgresInspector = result.rows[0];
          return row;
        } catch (error) {
          console.log(error);
        }

        break;

      default:
        break;
    }
  }

  static async create(data: {
    firstName: string;
    lastName: string;
    displayName: string;
    email: string;
    password: string;
  }): Promise<boolean> {
    const sql = `
    INSERT INTO inspectors(
      first_name, last_name, display_name, email, password, password_changed
    ) 
    VALUES($1, $2, $3, $4, $5, $6)
    `;

    try {
      const result = await db.query(sql, [
        data.firstName,
        data.lastName,
        data.displayName,
        data.email,
        data.password,
        false,
      ]);

      if (result.rowCount > 0) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async edit(
    inspectorId: number,
    data: {
      firstName: string;
      lastName: string;
      displayName: string;
      email: string;
    }
  ): Promise<boolean> {
    const sql = `
    UPDATE inspectors
    SET first_name=$1, last_name=$2, display_name=$3, email=$4
    WHERE id=$5
    `;

    try {
      const result = await db.query(sql, [
        data.firstName,
        data.lastName,
        data.displayName,
        data.email,
        inspectorId,
      ]);

      if (result.rowCount > 0) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async delete(inspectorId: number): Promise<boolean> {
    try {
      const result = await db.query(
        `
      DELETE FROM inspectors WHERE id = $1
      `,
        [inspectorId]
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

  static async findAll(): Promise<IInspector[]> {
    try {
      const result = await db.query('SELECT * FROM inspectors');

      if (result.rowCount === 0) {
        return [] as IInspector[];
      }

      const rows: IPostgresInspector[] = result.rows;

      let data: IInspector[] = [];

      rows.forEach((row) => {
        data.push({
          id: row.id,
          firstName: row.first_name,
          lastName: row.last_name,
          displayName: row.display_name,
          email: row.email,
          passwordChanged: row.password_changed,
        });
      });

      return data;
    } catch (error) {
      console.log(error);
    }
  }

  static async updatePassword(inspectorId: number, password: string) {
    try {
      const result = await db.query(
        `
      UPDATE 
        inspectors 
      SET 
        password = $1
      WHERE 
        id = $2
      `,
        [password, inspectorId]
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
        SELECT COUNT(*) FROM inspectors
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
