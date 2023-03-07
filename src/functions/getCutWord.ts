export const getCutWord = (word:string, length:number) => {
    if (!word) return;

    if (word.length > length){
        return word.slice(0,length) + "..."
    }else{
        return word
    }
}