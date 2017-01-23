这个插件实现了动态生成表格，隔行变色，表格排序。   
点击表格的头部的每一列实现针对这一列内容的排序。   
使用方法：   
1、把js文件夹下的table-sort.js文件引入到页面中。   
2、创建一个TableSort的实例，并传相应的数据

```javascript
    var tableSort = new TableSort(
                        //最外层盒子的id
                        "box",
                        //通过ajax获取的数据
                        message,
                        //message中每个td要绑定数据的属性名
                        ["name", "class", "score", "ranking"],
                        //属性名是表头每一列的名称，属性值对应的是0或1,0代表这一列需要排序，1代表这一列不需要排序
                        {"姓名": 0, "班级": 1, "总分数": 0, "排名": 0}
                );
                //执行动态生成表格
                tableSort.bind();
                //执行隔行变色
                tableSort.changeBg();
                //执行点击排序
                tableSort.clickSort();
```
