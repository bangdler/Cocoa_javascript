const baseData = [1,2,3,4,5,6,100];

baseData.forEach((v,i) => {
    console.log("sync ", i);
});

baseData.forEach((v,i) => {
    console.log("sync 2", i);
});
