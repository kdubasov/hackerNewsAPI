export const getDate = (milsec:number) => {

    if (!milsec) return;

    const dateNoRedact = new Date(milsec);

    const date = dateNoRedact.toLocaleDateString();
    const time = dateNoRedact.toLocaleTimeString();

    return time + ' ' + date;
}