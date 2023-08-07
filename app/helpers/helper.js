function formatDateToDmy(dateString) {
  const date = new Date(dateString);
  const day = date.getUTCDate().toString().padStart(2, "0");
  const month = (date.getUTCMonth() + 1).toString();
  const year = date.getUTCFullYear().toString();

  const monthMappings = {
    1: "Jan",
    2: "Feb",
    3: "Mar",
    4: "Apr",
    5: "May",
    6: "Jun",
    7: "Jul",
    8: "Agu",
    9: "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dec",
  };

  const customMonth = monthMappings[month];

  return `${day}-${customMonth}-${year}`;
}

export default {
  formatDateToDmy,
};
