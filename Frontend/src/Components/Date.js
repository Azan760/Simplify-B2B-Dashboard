export const useDate = () => {

    const currentDate = new Date();
    const dueDate = new Date(currentDate);
    dueDate.setDate(currentDate.getDate() + 14); 

    // Format the date as dd/mm/yyyy
    const formatDate = (date) => date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    const formattedDate = formatDate(currentDate);
    const formattedDueDate = formatDate(dueDate);

    // Convert dd/mm/yyyy to yyyy-mm-dd
    const formatForInput = (dateStr) => {
        const [day, month, year] = dateStr.split('/');
        return `${year}-${month}-${day}`;
    };

    const formattedDateForInput = formatForInput(formattedDate);
    const formattedDueDateForInput = formatForInput(formattedDueDate);

  

    return [formattedDate, formattedDateForInput, formattedDueDateForInput];
};


export const formatDate = (isDate) => {
    const date = new Date(isDate);
    return date.toLocaleDateString("en-GB").replace(/\//g, "/");
  };


  // src/hooks/useFormattedDate.js

export const FormattedDate = (dateString) => {
  if (!dateString) return "";

  const date = new Date(dateString);

  const options = {
    day: "2-digit",
    month: "short", // "Jan", "Feb", etc.
    year: "numeric"
  };

  return date.toLocaleDateString("en-GB", options); // Output: "11 May 2025"
};


export const convertToInputDateFormat = (isoString) => {
  
  if (!isoString) return "";

  const date = new Date(isoString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`; // e.g., "2025-06-01"
};




