# Bandler's study note
## Day 1 (2021-11-01)

Mission 1
1. 원의 경우 반지름(또는 원의 갯수), 사각형의 경우 높이와 너비, 사다리꼴의 경우 윗변 아랫변 높이가 필요함.
   - 도형 따라 1~3개 인자가 input 으로 들어올 때, a, b, c 지정 후 인자가 필요 없는 경우를 대비하여 기본값을 1로 지정하였음. (a = a || 1)
2. 이 경우 d, e 등 추가 인자가 들어올 경우 error가 발생할 수 있으므로 ...params 를 통해 여러 인자를 받을 수 있도록 수정하여 list 형식으로 받음.
3. getCircle 함수 안에 2개 인자(높이, 갯수)가 있으나 두번째 인자가 input 되지 않는 경우가 있으므로 기본값 지정이 필요함. (b = params[1] || 1) 
4. getCircle 함수 안에 return을 적지 않아 결과값으로 undefined 나옴.
5. for 문을 활용한 sum 구하기
   var sum_area = 0;
   var iters = params[1] || 1;
   for (var i = 0; i < iters; i++) {
       sum_area = sum_area + getCircle(radius + i)
   }
   
