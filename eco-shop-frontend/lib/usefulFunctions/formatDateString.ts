export function formatDateString(dateString: string) {
  const months = [
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec",
  ];

  // Parse the input date string
  const date = new Date(dateString);

  // Extract the components of the date
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  // Format the time
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  // Construct the formatted date string
  return `${day}-${month}-${year}, ${hours}:${minutes}:${seconds}`;
}
