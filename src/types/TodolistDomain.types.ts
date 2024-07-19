import {TodolistType} from "../App";
import {FilterValues} from "./filterValues.type";

export type TodolistDomain = TodolistType & {filter: FilterValues}
