const prevBtns = document.querySelectorAll(".btn-prev");
const nextBtns = document.querySelectorAll(".btn-next");
const progress = document.getElementById("progress");
const formSteps = document.querySelectorAll(".form-step");
const progressSteps = document.querySelectorAll(".progress-step");

let name = document.getElementById("name");
let email = document.getElementById("email");
let phone = document.getElementById("phone");
let depart = document.getElementById("depart");
let finish = document.getElementById("finish");
let date = document.getElementById("date");
let choice1 = document.getElementById("c1");
let choice2 = document.getElementById("c2");
let choice3 = document.getElementById("c3");
let choice4 = document.getElementById("c4");

// Next & Prev buttons

let formStepsNum = 0;


nextBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    formStepsNum++;
    updateFormSteps();
    updateProgressbar();
  });
});

prevBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    formStepsNum--;
    updateFormSteps();
    updateProgressbar();
  });
});

function updateFormSteps() {
  formSteps.forEach((formStep) => {
    formStep.classList.contains("form-step-active") &&
      formStep.classList.remove("form-step-active");
  });

  formSteps[formStepsNum].classList.add("form-step-active");
}

function updateProgressbar() {
  progressSteps.forEach((progressStep, idx) => {
    if (idx < formStepsNum + 1) {
      progressStep.classList.add("progress-step-active");
    } else {
      progressStep.classList.remove("progress-step-active");
    }
  });

  const progressActive = document.querySelectorAll(".progress-step-active");

  progress.style.width =
    ((progressActive.length - 1) / (progressSteps.length - 1)) * 100 + "%";
}

// dev selector

(function () {
    selectItems = document.querySelectorAll('.selectable');
    selectItems.forEach(function(el) {
      el.addEventListener('click', handleClick, false);
    });
    
    function handleClick(e) {
      e.target.classList.toggle('is-selected');
    }
})();
  
  
(function () {
    var dragbox = document.createElement('div');
    var isDragCancelled = false;
    var startX, startY
    var selectItems;
    
    document.body.appendChild(dragbox);
    
    document.addEventListener('selectstart', function (e) {
      e.preventDefault();
    });
    
    document.addEventListener('mousedown', function (e) {
      isDragCancelled = false;
      startX = e.pageX;
      startY = e.pageY;
      
      selectItems = document.querySelectorAll('.selectable');
      
      selectItems = Array.prototype.map.call(selectItems, function(element) {
        return {
          element: element,
          isSelected: element.classList.contains('is-selected')
        };
      });
      
      document.addEventListener('mouseup', handleMouseUp);
        setTimeout(function () {
          if (isDragCancelled) {
            return;
          }
          
          document.addEventListener('mousemove', handleMouseMove);
        }, 100);
      });
    
    function handleMouseMove(e) {
      var x = e.pageX;
      var y = e.pageY;
      var top = Math.min(startY, y);
      var left = Math.min(startX, x);
      var width = Math.abs(startX - x);
      var height = Math.abs(startY - y);
      
      dragbox.setAttribute('style',
        'position: absolute;' +
        'border: 1px solid rgba(166, 193, 255, .8);' +
        'background: rgba(166, 193, 255, .3);' +
        'left:' + left + 'px;' + 'top:' + top + 'px;' +
        'width:' + width + 'px;' + 'height:' + height + 'px;'
      );
      
      selectItems.forEach(function (selectItem) {
        var el = selectItem.element;
        
        if (
          el.offsetLeft >= left
          && el.offsetTop >= top
          && el.offsetLeft + el.offsetWidth <= left + width
          && el.offsetTop + el.offsetHeight <= top + height
        ) {
          selectItem.isSelected
          ? el.classList.remove('is-selected')
          : el.classList.add('is-selected');
        } else {
          selectItem.isSelected
          ? el.classList.add('is-selected')
          : el.classList.remove('is-selected');
        }
      });
    }
    
    function handleMouseUp() {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      isDragCancelled = true;
      dragbox.style.display = 'none';
      selectItems = [];
    }
  })();