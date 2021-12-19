export interface Usuarios {
    name: string;
    email: string;
    password: string;
    phone: Phone;
}

export interface Phone {
    number: string;
    citycode: string;
    contrycode: string;
}
