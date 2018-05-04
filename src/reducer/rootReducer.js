export default(state = [], payload) => {
    switch(payload){
        case 'add':
        return[...state, payload.item];
        default:
            return state;
    }
}