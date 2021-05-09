var PersonCtrl = (function () {
    var personHtml = ['  <div class="ui center aligned content">',
        '      <div id="del_btn_%personNameModifier%" class="right floated meta">',
        '        <i class="delete icon"></i>',
        '      </div>',
        '      <div id="profile" class="ui label big" style="display: block; max-width: 50px; width: ; position: relative; left: 50%; transform: translateX(-50%); margin: 0;">%personNameFirstChar%</div>',
        '      <div class="ui header container">%personName%</div>',
        '      <div id="add_btn_%personNameModifier%" class="ui basic button">',
        '        <a id="add_btn_icon_color" ><i class="add icon"></i>Add</a>',
        '      </div>',
        '    </div>'].join("");
    var checkedIconHtml = '<i class="check green icon"></i>';
    var usedColor = [];


    function getRandomColor() {
        // var str = "#";
        // var lzp = ["0", "1", "1", "3", "3", "5", "5", "7", "7", "9", "a", "b", "c", "d", "e", "f"];
        // for (var i = 0; i < 6; i++) {
        //     var lut = parseInt(Math.random() * 10);
        //     str += lzp[lut];
        // }
        return ['#74C7E5', '#F5C371', '#606DA4', '#A2E0C1','#C54554','#7EB1BF','#93A1ED','#57B6DC','#87C7A7','#D18441','#D5A6D2','#FAD470','#4C53B4','#5E955F','#91D9F2','#C3403F','#3F414E','#8E97FD','#FEABD5','#5F65BF','#1E90FF','#00FF00',	'#FFA500','	#FF6347'][parseInt(Math.random() * 19)];

    }

    function getPersonColor() {
        var color = '';
        while (true) {
            color = getRandomColor();
            if (usedColor.indexOf(color) < 0) {
                usedColor.push(color);
                break;
            }
        }
        return color;
    }

    class Person {
        dataMap = new Map();
        constructor(name, info) {
            this.name = name;
            this.id = this.name.replace(/\s+/g, "");
            this.firstCharOfName = this.name.charAt(0).toUpperCase();
            this.deleteBtnId = "del_btn_" + name.replace(/\s+/g, "");
            this.addBtnId = "add_btn_" + name.replace(/\s+/g, "");
            this.color = getPersonColor();
            this.transformInfo(info);
        }
        transformInfo(info) {
            info.forEach(item => {
                this.dataMap.set(item.category, item[this.name]);
            });
        }
        addPersonCard() {
            var newHtml = personHtml;
            newHtml = newHtml.replaceAll('%personNameModifier%', this.name.replace(/\s+/g, ""));
            newHtml = newHtml.replace('%personNameFirstChar%', this.firstCharOfName);
            newHtml = newHtml.replace('%personName%', this.name);
            var personElement = document.createElement('div');
            personElement.className = "card";
            personElement.id = "card_" + this.id;
            personElement.innerHTML = newHtml;
            personElement.querySelector('#profile').style.backgroundColor = this.color;
            personElement.querySelector('#add_btn_icon_color').style.color = this.color;
            personElement.querySelector('#add_btn_' + this.id).style.boxShadow = "0 0 0 1px " + this.color;
            //box-shadow:
            var container = document.querySelector('#person-list');
            container.appendChild(personElement);
            this.registerAddListener();
            this.registerDeleteListener();
        }
        registerDeleteListener() {
            document.querySelector('#' + this.deleteBtnId).addEventListener('click', () => {
                // delete from selectedList & currentDataStore;
                StoreCtrl.removePerson(this.name);
                //remove card ui
                document.querySelector('#card_' + this.id).remove();
                // refresh chart
                // parse selected data list
                var chartsData = StoreCtrl.computeChartsData();
                // update chart UI
                ChartCtrl.updateChart(chartsData.categories, chartsData.series);
            });
        }
        registerAddListener() {
            document.querySelector('#' + this.addBtnId).addEventListener('click', () => {
                // add to selectedList;
                StoreCtrl.addSelectedPerson(this);
                // change card bottom icon
                document.querySelector('#' + this.addBtnId).innerHTML = checkedIconHtml;
                document.querySelector('#add_btn_' + this.id).style.boxShadow = "0 0 0 0 ";
            });
        }
    }
    return {
        createPerson: function (name, info) {
            var person = new Person(name, info);
            person.addPersonCard();
            return person;
        }
    };
})(StoreCtrl, ChartCtrl);
