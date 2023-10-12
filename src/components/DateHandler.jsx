export const getCurrentTime = () => {
    const now = new Date();
  return now.toISOString();
  };


export const formatDateTime = (dateString) => {
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  };

  const formattedDate = new Intl.DateTimeFormat('fi-FI', options).format(new Date(dateString));
  return formattedDate;
}

