// BUDGET CONTROLLER
var budgetController = (function() {
  var Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };
  var data = {
    allItems: {
      exp: [],
      inc: []
    },
    total: {
      exp: 0,
      inc: 0
    }
  };

  return {
    addItem: function(type, des, val) {
      var newItem, ID;
      //Create New ID
      if (data.allItems[type].lenght > 0) {
        ID = data.allItems[type][data.allItems[type].lenght - 1].id + 1;
      } else {
        ID = 0;
      }

      // Create new ITems based on 'inc' or 'exp'
      if (type === "exp") {
        newItem = new Expense(ID, des, val);
      } else if (type === "inc") {
        newItem = new Expense(ID, des, val);
      }
      //Push into our data Structure
      data.allItems[type].push(newItem);

      //Retrun the new Element
      return newItem;
    },
    testing: function() {
      console.log(data);
    }
  };
})();

// UI CONTROLLER
var UIController = (function() {
  var DOMStrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    inputBtn: ".add__btn",
    incomeContainer: ".income__list",
    expensesContainer: ".expenses__list" 
  };

  return {
    getInput: function() {
      return {
        type: document.querySelector(DOMStrings.inputType).value,
        description: document.querySelector(DOMStrings.inputDescription).value,
        value: (document.querySelector(DOMStrings.inputValue)).value
      };
    },

    addListItem: function(obj, type) {
      var html, newHtml, element;
            // Create HTML string with placeholder text
            
            if (type === 'inc') {
                element = DOMStrings.incomeContainer;
                
                html = '<div class="item clearfix" id="inc-%id%"> <div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === 'exp') {
                element = DOMStrings.expensesContainer;
                
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            
            // Replace the placeholder text with some actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);
            
            // Insert the HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
      
    },
    clearFields: function(){
      var fields, fieldsArr;

     fields = document.querySelectorAll(DOMStrings.inputDescription + ' , ' + DOMStrings.inputValue);
     fieldsArr = Array.prototype.slice.call(fields);

     fieldsArr.forEach(function(current, index, Array){
       current.value = "";

     });
     fieldsArr[0].focus();
    },

    getDOMString: function() {
      return DOMStrings;
    }
  };
})();

// GLOBAL APP CONTROLLER
var controller = (function(budgetCtrl, UICtrl) {
 

  var setupEventListener = function() {
    var DOM = UICtrl.getDOMString();
    document.querySelector(DOM.inputBtn).addEventListener("click", ctrlAddItem);

    document.addEventListener("keypress", function(event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });
  };

  var ctrlAddItem = function() {
    var newItem, input;
    // 1. Get the field input

    input = UICtrl.getInput();
    console.log(input);

    // 2. Add the item t budget Controller
    newItem = budgetCtrl.addItem(input.type, input.description, input.value);

    // 3. Add the items to UI
    UICtrl.addListItem(newItem , input.type);

    //4. clear the fields
    UICtrl.clearFields();
    
    // 4. Calculate the budget
    // 5. Display the budget on UI
  };
  return {
    init: function() {
      console.log("Application is started..");
      setupEventListener();
    }
  };
})(budgetController, UIController);

controller.init();
