// BUDGET CONTROLLER
var budgetController = (function() {
    var Expense = function(id, description, value){
      this.id = id;
      this.description = description;
      this.value = value;
    };

    var Income = function(id, description, value){
      this.id = id;
      this.description = description;
      this.value = value;
    };  
    var data = {
      allitems : {
      exp : [],
      inc : []
      },
      total : {
        exp : 0,
        inc : 0
      }

    }

})();

// UI CONTROLLER
var UIController = (function() {
  var DOMStrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    inputBtn: ".add__btn"
  };

  return {
    getInput: function() {
      return {
        type: document.querySelector(DOMStrings.inputType).value,
        description: document.querySelector(DOMStrings.inputDescription).value,
        value: document.querySelector(DOMStrings.inputValue).value
      };
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
    document.querySelector(DOM.inputBtn).addEventListener("click", addItemCtrl);

    document.addEventListener("keypress", function(event) {
      if (event.keyCode === 13 || event.which === 13) {
        addItemCtrl();
      }
    });
  };

  
  var addItemCtrl = function() {
    // 1. Get the field input

    var input = UICtrl.getInput();
    console.log(input);

    // 2. Add the item t budget Controller
    // 3. Add the items to UI
    // 4. Calculate the budget
    // 5. Display the budget on UI
  };
  return{
      init : function(){
        console.log("Application is started..");
        setupEventListener();
        
      }
  };

})(budgetController, UIController);

controller.init();