// utils/utils.ts

const formatDate = (date: Date) => {
    let month, day, year, hour, min;

    year = date.getFullYear();
    month = (date.getMonth() + 1 <= 9) ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1); 
    day = (date.getDate() <= 9) ? '0' + date.getDate() : date.getDate();

    hour = (date.getHours() <= 9) ? '0' + date.getHours() : date.getHours();
    min = (date.getMinutes() <= 9) ? '0' + date.getMinutes() : date.getMinutes();

    return `${year}-${month}-${day} ${hour}:${min}:00`;
};

export { formatDate };
