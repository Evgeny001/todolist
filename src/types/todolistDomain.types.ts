import {Todolists} from "./todolist.types";
import {FilterValues} from "./filterValues.type";


export type TodolistDomain = Todolists & {filter: FilterValues}
