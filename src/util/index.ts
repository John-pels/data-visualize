import { IRates } from "../@types";

export const getMarketPositionPriceAndDay = (
  data: Array<IRates>,
  key: string
) => {
  let newRates: Array<{ day: string; price: number }> = [];
  data.forEach((rate) => {
    let newItem = { day: rate.day, price: rate[key] };
    newRates.push(newItem);
  });
  return newRates;
};

export const getAllMarketPrices = (
  data: Array<{ day: string; price: number }>
) => {
  let allPrices: Array<number> = [];
  data.forEach((rate) => {
    allPrices.push(rate.price);
  });
  return allPrices;
};

export const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const marketPositionCheckboxAttributes = [
  { name: "high", value: "high", label: "Market High" },
  { name: "mean", value: "mean", label: "Market Average" },
  { name: "low", value: "low", label: "Market Low" },
];
