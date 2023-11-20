import { de } from '@faker-js/faker';
import { atom } from 'recoil';

export interface IShoppingMall {
    id: number;
    contents: string;
    price: number;
}

export interface IUser {
    idx: number;
    id: number;
    pw: string;
    name: string;
    age: number;
}

export const currentUser = atom<IUser>({
    key: 'currentUser',
    default: {
        idx: 0,
        id: 0,
        pw: '',
        name: '',
        age: 0,
    },
});


export const loggedInUserIdState = atom({
    key: 'loggedInUserIdState',
    default: 0, // 기본 값은 로그인되지 않은 상태로 설정
});

export const loggedInUserNameState = atom({
    key: 'loggedInUserNameState',
    default: '', // 기본 값은 로그인되지 않은 상태로 설정
});



