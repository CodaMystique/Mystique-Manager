function isValidDate(inputDate) {
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  const parsedInputDate = new Date(inputDate);
  parsedInputDate.setHours(0, 0, 0, 0);
  return parsedInputDate >= currentDate;
}

export default isValidDate;
