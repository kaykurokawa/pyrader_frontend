export const add = (item) => {
    console.log("adding", item)
    return{
        type: 'add',
        item
    };
}