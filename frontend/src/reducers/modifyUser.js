const modifyUser = (
    state = { error: '', data: {} },
    action
) => {
    switch (action.type) {
        case 'CREATE_USER':
            return {
                data: action.userData
            };
        case 'UPDATE_USER':
            return {
                data: action.updatedData
            };
        case 'GET_USER':
            return {
                data: action.currentData
            };
        case 'Fail':
            return {
                ...state,
                error: action.error
            };
        default:
            return state;
    }
};

export default modifyUser;