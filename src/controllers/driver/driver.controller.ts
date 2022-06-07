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

export const deleteDriver = async (req: Request, res: Response) => {
  const driverId = parseInt(req.params.driverId);
  const result = await Driver.delete(driverId);
  res.send({ success: result });
};
