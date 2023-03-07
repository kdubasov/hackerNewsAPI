export const getStoryId = (path:string) => {
    return path.split("/").pop();
}