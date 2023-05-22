export function isLeapYears(year) {
  let res = false;
  if (year % 400 === 0) {
    res = true;
  } else if (year % 100 === 0) {
    res = true;
  } else if (year % 4 === 0) {
    res = true;
  } else res = false;
  return res;
}
