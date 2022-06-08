import { Request, Response } from 'express';

// Models imports
import Address from '../../models/Address';

export const getAddress = async (req: Request, res: Response) => {
  const address = await Address.findOne('id', parseInt(req.params.addressId));
  res.send(address);
};

export const createAddress = async (req: Request, res: Response) => {
  const { name, coords, available } = req.body;
  const success = await Address.create(name, coords, available);

  res.send({ success: success });
};

export const editAddress = async (req: Request, res: Response) => {
  const addressId = parseInt(req.params.addressId);
  const result = await Address.edit(
    addressId,
    req.body.name,
    req.body.available
  );
  res.send({ success: result });
};

export const deleteAddress = async (req: Request, res: Response) => {
  const addressId = parseInt(req.params.addressId);
  const result = await Address.delete(addressId);
  res.send({ success: result });
};

export const getAddresses = async (req: Request, res: Response) => {
  const addresses = await Address.fetchAll();
  res.send(addresses);
};

export const getAddressesCount = async (req: Request, res: Response) => {
  const addressesCount = await Address.count('all');

  res.send({ addressesCount });
};
