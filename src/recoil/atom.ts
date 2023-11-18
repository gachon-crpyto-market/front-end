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


