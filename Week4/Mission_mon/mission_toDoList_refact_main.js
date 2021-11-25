
// 문제
    // Classes 는 2개이상 만든다.(2개 만드는 것을 추천)

// 각 class 를 불러와 실행

import TodoViewManager from "./mission_toDoList_todoViewManager.js";
import TodoModelManager from "./mission_toDoList_todoModelManager.js";
import TodoController from "./mission_toDoList_todoController.js";

const bangView = new TodoViewManager();
const bangModel = new TodoModelManager('localKey');
const bangControl = new TodoController(bangModel, bangView);

bangControl.init()