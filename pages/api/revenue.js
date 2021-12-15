import { revenueThisWeek } from "./../../data";

export default function revenueHandler(req, res) {
  const revenue = revenueThisWeek;
  res.status(200).json(revenue);
}
