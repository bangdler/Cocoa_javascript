
import {dj_data} from "../dataset/dj_mag.js"
import {dj_image} from "../dataset/dj_img.js";
import {DataManager} from "./dataManager.js"
import {ViewManager} from "./viewManager.js"
import {Controller} from "./controller.js"

let dj_magArr = dj_data;
let dj_imgArr = dj_image;

//dj_magArr 예시
const example = [  {
    id: '95',
    Year: '2008',
    Rank: '6',
    DJ: 'Ferry Corsten',
    Change: 'Up 2'
},
    { id: '96', Year: '2009', Rank: '6', DJ: 'Deadmau5', Change: 'Up 5' },
    { id: '98', Year: '2011', Rank: '7', DJ: 'bangtae', Change: 'Up 33' },
    { id: '98', Year: '2009', Rank: '7', DJ: 'ozumi', Change: 'Up 33' },
    { id: '98', Year: '2011', Rank: '10', DJ: 'Avicii', Change: 'Up 33' },
    { id: '98', Year: '2016', Rank: '12', DJ: 'Avicii', Change: 'Up 33' }
]


const djData = new DataManager(dj_magArr, dj_imgArr);
const djView = new ViewManager();
const djControl = new Controller(djData, djView);
djControl.init()
