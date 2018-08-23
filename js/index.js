const data = []; // 原本的data数据
let newData = []; // 加上虚拟item的数据
let itemNum = 4; // 一页显示的条数
let num = data.length % itemNum; // 记录data除以出现item数目的余数
for (let i = 1; i<= 17; i++){
  data.push(`这是第${i}段li`);
}

let addData = num > itemNum/2 ? data.slice(0,num + itemNum) : data.slice(0,itemNum * 2);
console.log(addData);
newData = data.concat(addData);
window.onload = function () {
  let list = document.getElementById("list");
  let time = 5000; // 循环时间
  //生成ul节点下的li
  let generateList = function (listData) {
    listData.length && listData.forEach((item) => {
      let listItem = document.createElement("li");
      listItem.innerHTML = `<span>${item}</span>`
      list.appendChild(listItem);
    });
  }
  // 滚动
  let scroll = function () {
    let top = parseInt(list.style.top);
    if (parseInt(list.style.top) < -41 * (data.length)) { // 判断原数据（不包括伪造的数据）是否全部偏移容器
      // debugger;
      list.style.transition = "";
      list.style.top = parseInt(list.style.top) - (-41 * (data.length)) + "px";
      setTimeout(scroll, 0); // 把top复位的时候立马把scroll函数插入队列中，等待上面的复位执行完之后执行一次，去除中断的时间
      // setTimeout(scroll, 100); // 如果出现过渡效果没清除掉的情况，把时间设为100ms试试
    }else{
      list.style.transition = "all 2s";
      list.style.top = top - 164 + "px";
    }
  }
  generateList(newData);
  // 设置定时器执行滚动
  let timer = setInterval(scroll, time);
  // 鼠标上移时不自动滚动
  list.onmouseover = function () {
    clearInterval(timer);
  }
  // 鼠标离开后又恢复自动滚动
  list.onmouseleave = function () {
    timer = setInterval(scroll, time);
  }
};