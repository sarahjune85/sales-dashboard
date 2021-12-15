import { orders } from "./../../data";

export default function orderHandler(req, res) {
  const states = Object.values(orders);
  res.status(200).json(states);
}
