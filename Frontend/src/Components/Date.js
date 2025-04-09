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


