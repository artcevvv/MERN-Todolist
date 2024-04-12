"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.addTodo = exports.updateTodo = exports.getTodos = void 0;
const Todo_1 = __importDefault(require("../../models/Todo"));
const getTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield Todo_1.default.find();
        res.status(200).json({ todos });
    }
    catch (err) {
        throw err;
    }
});
exports.getTodos = getTodos;
const addTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const todo = new Todo_1.default({
            name: body.name,
            description: body.description,
            status: body.status,
        });
        const newTodo = yield todo.save();
        const allTodos = yield Todo_1.default.find();
        res
            .status(201)
            .json({ message: "Todo Added",
            todo: newTodo,
            todos: allTodos,
        });
    }
    catch (err) {
        throw err;
    }
});
exports.addTodo = addTodo;
const updateTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { params: { id }, body, } = req;
        const updateTodo = yield Todo_1.default.findByIdAndUpdate({ _id: id }, body);
        const allTodos = yield Todo_1.default.find();
        res.status(200).json({
            message: "Todo Updated",
            todo: updateTodo,
            todos: allTodos,
        });
    }
    catch (err) {
        throw err;
    }
});
exports.updateTodo = updateTodo;
const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedTodo = yield Todo_1.default.findByIdAndDelete(req.params.id);
        const allTodos = yield Todo_1.default.find();
        res.status(200).json({
            message: "Todo Removed",
            todo: deletedTodo,
            todos: allTodos
        });
    }
    catch (err) {
        throw err;
    }
});
exports.deleteTodo = deleteTodo;
