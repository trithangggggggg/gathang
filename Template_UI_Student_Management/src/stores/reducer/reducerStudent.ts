import type { Action, Student } from "../../utils/types";

const initialState: Student[] = [
  {
    id: "1",
    name: "Nguyen Tri Thang top 1 florentino",
    age: 19,
    gender: "Nam",
    birthday: "02/02/2006",
    hometown: "Hai Duong",
    address: "Chi linh",
  },
  {
    id: "2",
    name: "Nguyen Tuan Minh",
    age: 18,
    gender: "Nam",
    birthday: "02/02/2006",
    hometown: "Lao Cai",
    address: "Sapa",
  },
  {
    id: "3",
    name: "Nguyen van Anh",
    age: 18,
    gender: "Nam",
    birthday: "02/02/2006",
    hometown: "Ha Noi",
    address: "",
  },
  {
    id: "4",
    name: "Nguyen Tri Thang",
    age: 18,
    gender: "Nam",
    birthday: "02/02/2006",
    hometown: "Hai Duong",
    address: "Chi linh",
  },
];

export const reducerStudent = (state = initialState, action: Action) => {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload];
    case "EDIT":
      return state.map((student: Student) =>
        student.id === action.payload.id ? action.payload : student
      );
    case "DELETE":
      return state.filter(
        (student: Student) => student.id !== action.payload.id
      );
    default:
      return state;
  }
};
