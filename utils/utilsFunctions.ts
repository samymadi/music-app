export const convertToMinute = (seconds:number):string=>{
    const temp = seconds/60;
    const truncValue = Math.trunc(temp)

    return `${truncValue} min ${  Math.trunc((temp-truncValue)*60) } sec`;
}