import { MFP_WEEK, MFP_MEALS } from '../actions/types';

const INITIAL_STATE = {
    mfpWeek: '',
    mfpMeals: ''
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case MFP_WEEK:
            return { ...state,  mfpWeek: action.payload }
        case MFP_MEALS:
            return { ...state,  mfpMeals: action.payload }
        default:
            return state;
    }
}