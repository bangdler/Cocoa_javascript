import csvParser from "csv-parser";
import fs from 'fs';


// 빈 배열에 csv 를 읽어 dj_imgArr 빈 배열에 한 행씩 추가하고 완성된 배열을 json 형태의 data 로 변경, 별도 js 파일로 저장한다.
const dj_imgArr = [];

fs.createReadStream('../dataset/dj_imgs.csv')
    .on('error', () => {
        // handle error
    })
    .pipe(csvParser())
    .on('data', (data) =>
        dj_imgArr.push(data)
    )
    .on('end', () => {
        fs.writeFile ("../dataset/dj_img.js", JSON.stringify(dj_imgArr), function(err) {
                if (err) throw err;
                console.log('complete');
            }
        );
    });
