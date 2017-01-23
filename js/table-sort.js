function TableSort(idName,data,bodyData,headData) {
    this.data = data;
    this.bodyData = bodyData;
    this.headData = headData;
    this.idName = idName;
    this.table = null;
    this.head = null;
    this.ths = null;
    this.body = null;
    this.trs = null;
}

//数据绑定
TableSort.prototype.bind = function() {
    var frg = document.createDocumentFragment();
    var oTable = document.createElement("table");
    var oThead = document.createElement("thead");
    var headTr = document.createElement("tr");
    var oBody = document.createElement("tbody");
    for(var item in this.headData){//创建表格的头部
        var oTh = document.createElement("th");
        if(this.headData[item]!==1){
            oTh.className = "cursor";
        }
        oTh.innerHTML = item;
        headTr.appendChild(oTh);
    }
    oThead.appendChild(headTr);
    oTable.appendChild(oThead);
    var data = this.jsonParse(this.data);
    for(var i=0; i<data.length; i++){//创建表格的行和列
        var cur = data[i];
        var oTr = document.createElement("tr");
        for(var k=0; k<this.bodyData.length; k++){
            var oTd = document.createElement("td");
            oTd.innerHTML = cur[this.bodyData[k]];
            oTr.appendChild(oTd);
        }
        frg.appendChild(oTr);
    }
    oBody.appendChild(frg);
    frg = null;
    oTable.appendChild(oBody);
    document.getElementById(this.idName).appendChild(oTable);
    this.table = oTable;
    this.head = oThead;
    this.ths = this.head.rows[0].cells;
    this.body = this.table.tBodies[0];
    this.trs = this.body.rows;
};

//隔行变色
TableSort.prototype.changeBg = function() {
    for(var i=0; i<this.trs.length; i++){
        this.trs[i].className = i%2 === 1 ? "bg" : "";
    }
};

//排序
TableSort.prototype.sort = function(n,example) {
    var _this = this;
    var ary = example.listToArray(example.trs);
    for(var j=0; j<example.ths.length; j++){
        if(example.ths[j]!==this){
            example.ths[j].flag = -1;
        }
    }
    _this.flag *= -1;
    ary.sort(function(a,b) {
        var curInn = a.cells[n].innerHTML, nexInn = b.cells[n].innerHTML;
        var curInnNum = parseFloat(a.cells[n].innerHTML), nexInnNum = parseFloat(b.cells[n].innerHTML);
        if (isNaN(curInnNum) || isNaN(nexInnNum)) {
            return (curInn.localeCompare(nexInn)) * _this.flag;
        }
        return (curInnNum - nexInnNum) * _this.flag;
    });
    var frg = document.createDocumentFragment();
    for (var i = 0,len3=ary.length; i<len3; i++) {
        frg.appendChild(ary[i]);
    }
    example.body.appendChild(frg);
    frg = null;
    example.changeBg();
};

//类数组转化为数组
TableSort.prototype.listToArray = function(likeArray) {
    var ary = [];
    try {
        ary = Array.prototype.slice.call(likeArray);
    } catch (e) {
        for (var i = 0; i < likeArray.length; i++) {
            ary[ary.length] = likeArray[i];
        }
    }
    return ary;
};
TableSort.prototype.jsonParse = function (str) {
    return "JSON" in window ? JSON.parse(str) : eval("(" + str + ")");
};

//点击排序
TableSort.prototype.clickSort = function() {
    var example = this;
    for (var i = 0; i < this.ths.length; i++) {
        var curTh = this.ths[i];
        if (curTh.className === "cursor") {
            curTh.index = i;
            curTh.flag = -1;
            curTh.onclick = function () {
                example.sort.call(this, this.index,example);
            }
        }
    }
};