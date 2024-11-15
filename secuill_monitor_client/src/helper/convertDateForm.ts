// import { format, toDate } from "date-fns";

export const cFormatDateTime = (dateNow:string|number|Date):string =>{
    const getNewDate = new Date();
    const hh = getNewDate.getHours().toString();
    const mm = getNewDate.getMinutes().toString();
    const frmDate = cFormatDate(dateNow) + 
              " " + 
              hh.padStart(2, "0") + ":" +
              mm.padStart(2, "0")
    return frmDate;
}

export const cFormatDate = (dateNow:string|number|Date):string =>{
    const d = new Date(dateNow);
    let month: string = '' + (d.getMonth() + 1);
    let day: string = '' + d.getDate();
    const year: number = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
    return [year, month, day].join('-');
}

// export const concatDateAndTime = (utcYear:number,utcMonth:number,utcDate:number,utcHour:number,utcMin:number,utcSec:number):Date =>{
//     return DatecFormatDateTime([utcYear,utcMonth + 1,utcDate].join('-') + ' ' + [utcHour, utcMin,utcSec].join(':')); // eg "2020-5-24 11:31:59Z" 
// }
