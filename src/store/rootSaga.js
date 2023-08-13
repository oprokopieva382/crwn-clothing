import {all, call} from "redux-saga/effects"
import { categoriesSaga } from "./categories/category.saga"
import { userSaga } from "./userReducer/user.saga"

export function* rootSaga() {
    yield all([call(categoriesSaga), call(userSaga)])
}