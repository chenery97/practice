window.addEventListener("DOMContentLoaded", function () {
  // 获取文档所有的模拟数据
  var docData = goodData;
  // 定义套餐搭配对象，用于存放每个搭配产品和对应的价格
  var setObj = {};
  // 定义套餐数量，用于存放选择套餐搭配的数量
  var setCount = 0;

  // 初始化数据
  initPath();
  initImg();
  initProInfo();
  initProChoose();

  function initPath() {
    // 获取路径的数据
    var proPath = docData.path;
    // 获取路径元素
    var oPath = document.querySelector(".conProLeft nav");
    // 初始化路径
    proPath.forEach(function (item, index) {
      if (index === proPath.length - 1) {
        oPath.innerHTML += "<a>" + item.title + "</a>";
        return;
      }
      oPath.innerHTML +=
        '<a href="' + item.url + '">' + item.title + "</a>　/　";
    });
  }
  function initImg() {
    // 获取图片
    var imgSrc = docData.imgsrc;
    // 获取缩略图所在的父元素
    var oUl = document.querySelector(".conProImgUl ul");
    var oFrag = document.createDocumentFragment();
    // 初始化缩略图、产品小图、产品放大镜大图
    var oSmallImg = document.querySelector(".proSmallView img");
    var oBigImg = document.querySelector(".proBigView img");
    oSmallImg.src = imgSrc[0].s;
    oBigImg.src = imgSrc[0].b;
    imgSrc.forEach(function (item) {
      var newLi = document.createElement("li");
      var newImg = new Image();
      newImg.src = item.s;
      newLi.appendChild(newImg);
      oFrag.appendChild(newLi);
    });
    oUl.appendChild(oFrag);
  }
  function initProInfo() {
    var oProInfo = document.querySelector(".conProInfo");
    var proInfo = docData.goodsDetail;
    var str =
      "<h3>" +
      proInfo.title +
      "</h3> \
                <strong>" +
      proInfo.recommend +
      '</strong> \
                <div class="conProPrice"> \
                  <div> \
                    <p>价　　格<strong><sub>￥</sub><strong class="proPrice">' +
      proInfo.price +
      "</strong><sub>元</sub></strong></p> \
                  </div> \
                  <div> \
                    <p>促　　销</p> \
                    <p><span>" +
      proInfo.promoteSales.type +
      "</span>" +
      proInfo.promoteSales.content +
      "</p> \
                  </div> \
                </div> \
                <p>支　　持<strong>" +
      proInfo.support +
      "</strong></p> \
                <p>配 送 至<strong>" +
      proInfo.address +
      "</strong></p>";
    oProInfo.innerHTML = str;
  }
  function initProChoose() {
    // 获取form表单元素
    var oChooseForm = document.querySelector(".conProChoose");
    // 获取购物车所在元素，用于dl元素在此元素之前插入
    var oProCount = document.querySelector(".proCount");
    // 获取商品相关信息
    var crumbData = docData.goodsDetail.crumbData;
    // 定义一个碎片节点
    var oFrag = document.createDocumentFragment();
    // 遍历商品相关信息
    crumbData.forEach(function (item, index) {
      // 创建新dl、dt
      var newDl = document.createElement("dl");
      var newDt = document.createElement("dt");
      // 设置dt中的文本内容
      newDt.textContent = crumbData[index].title;
      // 把dt插入到dl中
      newDl.appendChild(newDt);
      // 获取商品相关信息的名称
      var crumbDataName = item.name;
      // 遍历商品各个信息中的类别信息
      crumbData[index].data.forEach(function (item, index) {
        // 创建新dd
        var newDd = document.createElement("dd");
        // 默认为第一个dd元素的label标签添加checked类名
        if (index === 0) {
          newDd.innerHTML =
            '<label class="checked"><input type="radio" name="' +
            crumbDataName +
            '" value="' +
            item.value +
            '">' +
            item.type +
            "</label>";
          newDl.appendChild(newDd);
          return;
        }
        newDd.innerHTML =
          '<label><input type="radio" name="' +
          crumbDataName +
          '" value="' +
          item.value +
          '">' +
          item.type +
          "</label>";
        // 将dd元素插入到dl元素中
        newDl.appendChild(newDd);
      });
      // 将dl元素插入到碎片节点元素中
      oFrag.appendChild(newDl);
    });
    // 在form元素中的购物车所在元素之前插入所有的dl元素
    oChooseForm.insertBefore(oFrag, oProCount);
  }

  // 放大镜功能
  magnify();
  function magnify() {
    var oProSmallView = document.querySelector(".proSmallView");
    var oMask = document.querySelector(".proSmallView .mask");
    var oProBigView = document.querySelector(".proBigView");
    var oBigImg = document.querySelector(".proBigView img");
    oProSmallView.onmousemove = function (e) {
      // 显示蒙版
      oMask.style.display = "block";
      oProBigView.style.display = "block";
      // 获取蒙版的宽高
      var maskWH = {
        width: oMask.offsetWidth,
        height: oMask.offsetHeight,
      };
      // 获取鼠标到窗口的位置
      var mouseLocation = {
        x: e.clientX,
        y: e.clientY,
      };
      // 获取小图区域到窗口的位置
      var smallViewLocation = {
        x: this.getBoundingClientRect().x,
        y: this.getBoundingClientRect().y,
      };
      // 获取蒙版位置
      var maskLocation = {
        x: mouseLocation.x - smallViewLocation.x - maskWH.width / 2,
        y: mouseLocation.y - smallViewLocation.y - maskWH.height / 2,
      };
      if (maskLocation.x <= 0) {
        maskLocation.x = 0;
      } else if (maskLocation.x >= oProSmallView.clientWidth - maskWH.width) {
        maskLocation.x = oProSmallView.clientWidth - maskWH.width;
      }
      if (maskLocation.y <= 0) {
        maskLocation.y = 0;
      } else if (maskLocation.y >= oProSmallView.clientHeight - maskWH.height) {
        maskLocation.y = oProSmallView.clientHeight - maskWH.height;
      }
      // 蒙版位置赋值
      oMask.style.left = maskLocation.x + "px";
      oMask.style.top = maskLocation.y + "px";

      // 获取大图能走的距离与小图能走的距离的比例
      var scale =
        (oBigImg.offsetWidth - oProBigView.clientWidth) /
        (oProSmallView.clientWidth - oMask.offsetWidth);
      // 大图位置
      var bigImgLocation = {
        x: maskLocation.x * scale,
        y: maskLocation.y * scale,
      };
      oBigImg.style.left = -bigImgLocation.x + "px";
      oBigImg.style.top = -bigImgLocation.y + "px";
    };
    oProSmallView.onmouseleave = function () {
      oMask.style.display = "none";
      oProBigView.style.display = "none";
    };
  }

  // 缩略图切换功能
  thumbnailMove();
  function thumbnailMove() {
    initImg();
    var oPrev = document.querySelector(".conProImgList .prev");
    var oNext = document.querySelector(".conProImgList .next");
    var oUl = document.querySelector(".conProImgList ul");
    var oUlLis = document.querySelectorAll(".conProImgList ul li");

    // 开始位置
    var startLocation = 0;
    // 每次走的张数
    var everyStep = 2;
    // 每次走的距离
    var everyLocation = oUlLis[0].offsetWidth * everyStep;
    // 页面能够显示的张数
    var viewLength = 5;
    // 全部能走的距离
    var allLocation = (oUlLis.length - viewLength) * oUlLis[0].offsetWidth;

    oPrev.onclick = function () {
      if (startLocation < everyLocation) {
        startLocation = 0;
      } else {
        startLocation -= everyLocation;
      }
      oUl.style.transform = "translateX(" + -startLocation + "px)";
    };
    oNext.onclick = function () {
      if (allLocation - startLocation < everyLocation) {
        startLocation = allLocation;
      } else {
        startLocation += everyLocation;
      }
      oUl.style.transform = "translateX(" + -startLocation + "px)";
    };
  }

  // 缩略图点击功能
  thumbnailClick();
  function thumbnailClick() {
    // 获取图片数据
    var imgSrc = goodData.imgsrc;
    var oSmallImg = document.querySelector(".proSmallView img");
    var oBigImg = document.querySelector(".proBigView img");
    var oListImgs = document.querySelectorAll(".conProImgUl ul li img");
    oListImgs.forEach(function (item, index) {
      item.onclick = function () {
        // 根据点击的缩略图改变展示的小图和放大镜的大图
        oSmallImg.src = this.src;
        oBigImg.src = imgSrc[index].b;
      };
    });
  }

  // 获取之前价格功能
  function getBeforePrice(obj, priceData) {
    var oIpt = obj.firstElementChild.firstElementChild;
    var iptName = oIpt.name;
    var iptValue = oIpt.value;
    var price;
    priceData.forEach(function (item) {
      // 当前点击的配置和数据中的配置 比较
      if (item.name !== iptName) {
        return;
      }
      // 确定配置名称后，遍历该配置中的数据
      item.data.forEach(function (item) {
        // 当前点击的配置所选择的数据和模拟数据中的数据 比较
        if (item.value !== iptValue) {
          return;
        }
        // 获取到价格
        price = item.changePrice;
      });
    });
    return price;
  }

  // 选择产品选购功能
  configClick();
  function configClick() {
    // 获取dl元素
    var oDls = document.querySelectorAll(".conProChoose dl");
    var oPrice = document.querySelector("strong.proPrice");
    var oChooseInsert = document.querySelector(".chooseInsert");
    // 获取当前产品的数量
    var oCountIpt = document.querySelector(".proCount .count");
    // 获取基础价格数据
    var basePrice = docData.goodsDetail.price;
    // 获取配置各项数据
    var priceData = docData.goodsDetail.crumbData;
    // 定义一个对象用来存放之前选择的各项配置的价格
    var beforePrice = {};
    var arr = new Array(oDls.length);
    arr.fill(false);
    // 选择相关配置并修改价格
    chooseConfig();
    function chooseConfig() {
      oDls.forEach(function (item, index) {
        // 获取每个dl元素中的dd元素
        var oDds = item.querySelectorAll("dd");
        oDds.forEach(function (item) {
          // 获取点击前各项配置选择的价格
          if (item.firstElementChild.className === "checked") {
            // 保存当前的item
            var _item = item;
            // 找到dt元素，用于判断是点击了那个配置选项
            var oDt = item.parentElement.firstElementChild;
            priceData.forEach(function (item) {
              if (
                item.title !== _item.parentNode.firstElementChild.textContent
              ) {
                return;
              }
              // 获取之前选择的配置的价格
              beforePrice[item.name] = getBeforePrice(_item, priceData);
            });
          }
          // 产品配置的点击事件
          item.onclick = function (e) {
            // 点击的时候触发了两次，过滤掉从input触发点击事件
            if (e.target.nodeName.toLowerCase() === "input") {
              return;
            }
            for (var i = 0; i < oDds.length; i++) {
              // 移除所有dd元素下的label标签的checked类名
              oDds[i].firstElementChild.classList.remove("checked");
            }

            // 获取当前dd标签中的input标签
            var oIpt = this.firstElementChild.firstElementChild;
            // 获取input中的name和value属性值
            var iptName = oIpt.name;
            var iptValue = oIpt.value;
            // 获取当前选择的产品数量
            var nowCount = +oCountIpt.value;

            // 给当前点击的元素下的label标签添加checked类名
            this.firstElementChild.classList.add("checked");
            // 保存点击的dd
            arr[index] = this;
            // 点击后把mark所在的元素的所有内容清空
            oChooseInsert.innerHTML = "";
            // 遍历数组，生成对应的mark元素，插入到oChooseInsert元素中
            arr.forEach(function (item, index) {
              if (!item) {
                return;
              }
              // 创建mark、a
              var oMark = document.createElement("mark");
              var oDele = document.createElement("a");
              oDele.textContent = "X";
              oDele.dataset.index = index;
              oMark.textContent = item.firstElementChild.textContent;
              oMark.appendChild(oDele);
              oChooseInsert.appendChild(oMark);
            });
            // 获取oDele，并绑定事件
            var oDeles = document.querySelectorAll("mark a");
            oDeles.forEach(function (item) {
              item.onclick = function () {
                // 删除mark标签
                this.parentNode.parentNode.removeChild(this.parentNode);
                // 删除数组中对应的项
                arr[item.dataset.index] = false;
                // 获取当前a元素对应下标的dl中的dd
                var oDlDds = oDls[item.dataset.index].querySelectorAll("dd");
                // 删除mark标签后，把默认样式设置到第一个dd上
                oDlDds.forEach(function (item) {
                  item.firstElementChild.classList.remove("checked");
                });
                oDlDds[0].firstElementChild.classList.add("checked");
                // 删除后重新计算价格
                oIpt = oDlDds[0].firstElementChild.firstElementChild;
                iptName = oIpt.name;
                iptValue = oIpt.value;
                nowCount = +oCountIpt.value;
                calcPrice();
              };
            });

            calcPrice();
            function calcPrice() {
              // 遍历配置各项数据
              priceData.forEach(function (item) {
                // 当前点击的配置和数据中的配置 比较
                if (item.name !== iptName) {
                  return;
                }
                var _item = item;
                // 确定配置名称后，遍历该配置中的数据
                item.data.forEach(function (item) {
                  // 当前点击的配置所选择的数据和模拟数据中的数据 比较
                  if (item.value !== iptValue) {
                    return;
                  }

                  // 最后的价格 = (当前的基础价格 - 之前配置的价格 + 现在配置的价格) * 当前选择的数量
                  var newPrice =
                    (basePrice - beforePrice[_item.name] + item.changePrice) *
                    nowCount;
                  // 把基础价格重新赋值
                  basePrice =
                    basePrice - beforePrice[_item.name] + item.changePrice;
                  // 把页面产品的价格重新赋值
                  oPrice.textContent = newPrice;
                  // 改变选择后，之前配置的价格重新赋值为现在选择的配置的价格
                  beforePrice[_item.name] = item.changePrice;
                  // 改变价格后调用套餐搭配的方法，实时更新套餐中的金额
                  setPrice();
                });
              });
            }
          };
        });
      });
    }

    // 根据产品数量改变金额功能
    countClick();
    function countClick() {
      // 给数量按钮绑定点击事件
      var oAdd = document.querySelector(".proCount .add");
      var oSubtract = document.querySelector(".proCount .subtract");
      var oCountIpt = document.querySelector(".proCount .count");
      var oPrice = document.querySelector("strong.proPrice");
      // 获取点击之前的数量
      var beforeCount = +oCountIpt.value;
      oAdd.onclick = function () {
        oCountIpt.value = +oCountIpt.value + 1;
        // 在之前的金额的基础上增加一倍
        oPrice.textContent = +oPrice.textContent + basePrice;
        // 重新把数量赋值
        beforeCount += 1;
        // 改变价格后调用套餐搭配的方法，实时更新套餐中的金额
        setPrice();
      };
      oSubtract.onclick = function () {
        // 每次点击在原来的数量上减1
        var nowCount = +oCountIpt.value - 1;
        // 判断数量最小为1
        if (nowCount < 1) {
          nowCount = 1;
          return;
        }
        oCountIpt.value = nowCount;
        // 在之前的金额的基础上减少一倍
        oPrice.textContent = +oPrice.textContent - basePrice;
        // 重新把数量赋值
        beforeCount -= 1;
        // 改变价格后调用套餐搭配的方法，实时更新套餐中的金额
        setPrice();
      };
      oCountIpt.onblur = function () {
        // 当输入框失去焦点时获取输入框的数量
        var nowCount = parseInt(this.value, 10);
        // 输入的数不能小于1,也不能为非法的数
        if (nowCount < 1 || Number.isNaN(nowCount)) {
          // 把当前的数量重新赋值
          nowCount = 1;
        }
        // 更改价格
        var lastCount = nowCount - beforeCount;
        oPrice.textContent = +oPrice.textContent + basePrice * lastCount;
        // 把之前的数量重新赋值成现在的数量
        beforeCount = nowCount;
        this.value = nowCount;
        // 改变价格后调用套餐搭配的方法，实时更新套餐中的金额
        setPrice();
      };
    }
  }

  // 选择搭配套餐价计算功能
  setPrice();
  function setPrice() {
    // 获取元素
    var oBase = document.querySelector(
      ".match .set ul li:first-child strong span"
    );
    var oSet = document.querySelector(".match .set div strong + strong span");
    var oCountIpt = document.querySelector(".proCount .count");
    var oProCount = document.querySelector(".match .set div p span");
    var oPrice = document.querySelector("strong.proPrice");
    var oLabels = document.querySelectorAll(".match .set ul li label");
    // 定义套餐的初始价格
    var setPrice = 0;

    // 遍历label元素
    oLabels.forEach(function (item, index) {
      // 给每个label元素下面的input元素绑定点击事件
      item.firstElementChild.onclick = function (e) {
        // 获取套餐搭配的价格
        var oSetPrice = oSet.textContent;
        // 给当前input元素扩展一个属性，保存当前元素的兄弟元素span中的价格
        this.price = this.parentNode.lastElementChild.textContent;
        // 给当前input元素扩展一个属性保存下标
        this._index = index;
        // 判断是否已经是选择的状态
        if (this.dataset.checked !== "true") {
          // 选中，根据选中的搭配的价格进行修改
          this.dataset.checked = "true";
          oSet.textContent = +oSetPrice + +this.price;
          oProCount.textContent = +oProCount.textContent + 1;
          setObj[this._index] = +this.price;
          setCount++;
          return;
        }
        // 取消选中，根据取消的搭配的价格进行修改
        this.dataset.checked = "false";
        oSet.textContent = +oSetPrice - +this.price;
        oProCount.textContent = +oProCount.textContent - 1;
        setObj[this._index] = 0;
        setCount--;
      };
    });
    // 遍历套餐对象中的搭配，将每项价格进行相加
    for (var key in setObj) {
      setPrice += setObj[key];
    }
    // 套餐搭配中的手机的价格根据上面产品配置的选择的价格获取
    oBase.textContent = oPrice.textContent;
    // 计算套餐的总价格
    oSet.textContent = +oBase.textContent + setPrice;
    // 计算已购数量
    oProCount.textContent = +oCountIpt.value + setCount;
  }

  // 侧边栏tab切换功能
  asideTab();
  function asideTab() {
    // 获取元素
    var oTitle = document.querySelectorAll(".title h3");
    var oCon = document.querySelectorAll(".con div");
    new Tab(oTitle, oCon);
    // 遍历title元素绑定点击事件
    /* oTitle.forEach(function (item, index) {
      item.onclick = function () {
        // 移出所有title元素的active类名
        for (var i = 0; i < oTitle.length; i++) {
          oTitle[i].classList.remove("active");
        }
        // 给当前点击的元素添加active类名
        item.classList.add("active");
        // 保存title元素的index，用于与oCon元素的index进行比较
        var _index = index;
        oCon.forEach(function (item, index) {
          // 不一样则去除该元素的show类名
          if (index !== _index) {
            item.classList.remove("show");
          } else {
            // 相同则添加上show类名
            item.classList.add("show");
          }
        });
      };
    }); */
  }

  // 商品详情tab切换
  infoConTab();
  function infoConTab () {
    var oTitles = document.querySelectorAll('.info .infoList li');
    var oCons = document.querySelectorAll('.info .infoCon div');
    new Tab(oTitles, oCons);
  }

  // tab切换面向对象
  function Tab(oTitles, oCons) {
    this.oTitles = oTitles;
    this.oCons = oCons;
    var _this = this;
    this.oTitles.forEach(function (item, index) {
      item.onclick = function () {
        // 实例化对象调用点击方法
        _this.click(this, index);
      };
    })
  }
  // 给实例化对象扩展一个点击方法
  Tab.prototype.click = function (obj, index) {
    // 遍历去除所有title元素的active类名
    this.oTitles.forEach(function (item) {
      item.classList.remove('active');
    })
    // 遍历去除所有con元素的show类名
    this.oCons.forEach(function (item) {
      item.classList.remove('show');
    })
    // 给当前点击的title元素添加active类名，并且给对应的con元素添加show类名
    obj.classList.add('active');
    this.oCons[index].classList.add('show');
  }

  // 侧边栏菜单
  menuClick();
  function menuClick() {
    // 获取元素
    var oMenu = document.querySelector('#aside .menu');
    var oAside = document.querySelector('#aside');
    // 设置开关
    var flag = false;
    oMenu.onclick = function () {
      // 每次点击进行取反
      flag = !flag;
      // 根据开关设置元素的位置
      if (flag) {
        oAside.style.right = "0px";
      } else {
        oAside.style.right = "-294px";
      }
    }
  }

  // 侧边栏回顶部
  backTop();
  function backTop() {
    // 获取元素
    var oBackTop = document.querySelector('#aside .backTop');
    var oHtml = document.documentElement;
    // 设置定时器
    var timer = null;
    // 绑定点击事件
    oBackTop.onclick = function (e) {
      console.log(e)
      var nowScroll = oHtml.scrollTop;
      clearInterval(timer);
      timer = setInterval(function () {
        nowScroll -= 10;
        if (nowScroll <= 0) {
          nowScroll = 0;
          clearInterval(timer);
        }
        oHtml.scrollTop = nowScroll;
        console.log(nowScroll, oHtml.scrollTop);
      })
    }
  }
});
