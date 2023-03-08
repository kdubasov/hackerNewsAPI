export const getDate = (milsec:number) => {

    if (!milsec) return;

    // * 1000 because its unix timestamp
    const dateNoRedact = new Date(milsec * 1000);

    const date = dateNoRedact.toLocaleDateString();
    const time = dateNoRedact.toLocaleTimeString();

    return time + ' ' + date;
}