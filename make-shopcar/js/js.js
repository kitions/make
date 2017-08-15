var booksAll = [
    {
        id: 1,
        icon: 'jieyou.jpg',
        name: '解忧杂货店',
        author: '东野圭吾',
        date: '2014-05-01',
        price: 27.30,
        comments: 475618,
        ele: 27.30,
        isSelected: true,
        count: 1

    },
    {
        id: 2,
        icon: 'renjian.jpg',
        name: '人间失格',
        author: '（日）太宰治',
        date: '2015-08-01',
        price: 17.30,
        comments: 32286,
        count: 1,
        isSelected: true,
        ele: 17.30

    },
    {
        id: 3,
        icon: 'xianyi.jpg',
        name: '嫌疑人X的献身',
        author: '东野圭吾',
        date: '2014-06-01',
        price: 27.90,
        comments: 128514,
        count: 1,
        isSelected: true,
        ele: 27.90

    }
];

window.onload = function () {
    //检测本地是否为空，若为空，将json送到本地
    if (localStorage.getItem('data') === null) {
        updateData(JSON.stringify(booksAll));
    }

    //更新本地商品
    function updateData(books) {
        localStorage.setItem('data', books);
    }

    var bookShow = document.querySelector('.imgbook');

    function showBooks() {
        var books = JSON.parse(localStorage.getItem('data'));
        bookShow.innerHTML = "";
        for (var i = 0; i < books.length; i++) {
            var chk = books[i].isSelected ? '<input type="checkbox"  id="danxuan-'+books[i].id +'" checked>' : '<input type="checkbox" id="danxuan-'+books[i].id +'">';
            bookShow.innerHTML = bookShow.innerHTML
                + '<div class="bookconment-container " id="con-' + books[i].id + '" >'
                + '<div class="col-md-1">' +chk+ '</div>'
                + '<div class="col-md-7">'
                + '<div class="icon"><img src="images/' + books[i].icon + '" >' + '</div>'
                + '<div class="name">' + books[i].name + '   作者：' + books[i].author + '  出版日期' + books[i].date + '</div>'

                + '</div>'
                + '<div class="col-md-2">'
                + '<div class="price">' + '¥' + books[i].price + '</div>'
                + '</div>'
                + '<div class="col-md-2" >' + '<a href="#" id="delete-' + books[i].id + '">' + '删除' + '</a></div>'
                + '</div>'
                + '</div>'
        }
    }


    //全选，业务逻辑：点击全选，勾所有书的勾，保存数据，计算总价
    document.querySelector('#checkAll').onclick = checkAll;
        function checkAll() {
        var chki = document.querySelectorAll('input[type="checkbox"]')
        var flag = false;
        if(this.checked){
            flag = true;
        }else{
            flag = false;
        }
        for(var z in chki){
            chki[z].checked=flag;
        }
        var books = JSON.parse(localStorage.getItem('data'));
        for (var j in  books) {
                books[j].isSelected = flag;

            updateData(JSON.stringify(books));
            showBooks();
            calculate();
        }
    }


    //显示购物车
    showBooks(booksAll);
    calculate();
    //计算总价
    function calculate() {
        var books = JSON.parse(localStorage.getItem('data'));
        var price = 0;
        for(var i = 0 ; i<books.length ; i++){
            if(books[i].isSelected){
                price = price + parseFloat(books[i].price);
            }
        }
        document.getElementById('totalPrice').innerHTML = price.toFixed(2);
    }



    //点击按钮获得值
    document.body.onclick = function (ev) {

        if (ev.target.nodeName.toLowerCase() == 'input' && ev.target.getAttribute('type') == 'checkbox') {
            // var checkboxAll = ev.target.getAttribute('id');
            var checkId = ev.target.getAttribute('id').split('-')[1];  //获取ID
            var flag = false;
            if (ev.target.checked) {
                flag = true;

            } else {
                flag = false;
                ev.target.removeAttribute('checked');

            }


            var books = JSON.parse(localStorage.getItem('data'));
            for (var j in  books) {
                if (books[j].id == checkId) {
                    books[j].isSelected = flag;

                }
                updateData(JSON.stringify(books));

            }

        }
        //计算总价
        // function calculate() {
        //     var books = JSON.parse(localStorage.getItem('data'));
        //     var price = 0;
        //     for (var i = 0; i < books.length; i++) {
        //         if (books[i].isSelected) {
        //             // price = price + parseFloat(books[i].ele);//小计相加等于总数
        //             price += parseFloat(books[i].price) * parseInt(books[i].count);
        //         }
        //     }
        //     document.getElementById('totalPrice').innerHTML = '总价：￥ ' + price.toFixed(2);
        //
        // }
        calculate();


        //删除   可以前台用romove，后端用splice
        document.querySelector('#allbooks').onclick = function (ev) {
            if (ev.target.nodeName.toLowerCase() == 'a') {
                var books = JSON.parse(localStorage.getItem('data'));
                var deltype = ev.target.getAttribute('id').split('-')[0];
                var delid = ev.target.getAttribute('id').split('-')[1];
                if (deltype.toLowerCase() == 'delete') {
                    for (var i in books) {
                        if (books[i].id == delid) {
                            break;
                        }
                    }
                    var newarr = [];
                    for (var j in books) {
                        if (j != i) {
                            newarr.push(books[j]);
                        }
                    }
                    var newb = JSON.stringify(newarr);
                    localStorage.setItem('data', newb);
                    showBooks();
                    calculate();
                }

            }
        }

    }
};


/**
 * Created by kition on 2017/3/23.
 */
