// const domain = "http://192.168.8.174:8080";
const domain = "http://localhost:8080";

// Header Template Api's
export const GET_ALL_HEADER = `${domain}/header/show/60`;
export const UPDATE_HEADER = `${domain}/header/edit/60`;

// Footer Template Api's
export const GET_ALL_FOOTER = `${domain}/footer/show/60`;
export const UPDATE_FOOTER = `${domain}/footer/edit/60`;

// Letter Template Api's

export const GET_ALL_LETTER_TEMPLATES = `${domain}/correspondence/listAll`;
export const CREATE_A_LETTER_TEMPLATE = `${domain}/createCorrespondence/`;
export const DELETE_A_LETTER_TEMPLATE = `${domain}/correspondence/delete/`;
export const UPDATE_LETTER_TEMPLATE = `${domain}/correspondence/edit/`;
export const GET_SINGLE_LETTER_TEMPLATE = `${domain}/correspondence/show/700`;

