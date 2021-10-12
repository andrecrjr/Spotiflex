import { getPublicAuth } from '../../helper';

export default async function handler(req, res) {
  res.status(200).json(await getPublicAuth());
}
