// NPM packages imports
import { Request, Response } from 'express';

// Models imports
import Driver from '../../models/Driver';
/* -------------------------------------------------------------------------- */

export const getAllDrivers = async (req: Request, res: Response) => {
  const drivers = await Driver.findAll();
  res.send(drivers);
};

export const getDriversCount = async (req: Request, res: Response) => {
  const driversCount = await Driver.count('all');

  res.send({ driversCount });
};
