function getTodos() {
    var todos = new Array;
    var todos_str = localStorage.getItem('todo');
    if (todos_str !== null) {
        todos = JSON.parse(todos_str); 
    }
    return todos;
}
 
function add() {
    // append the date to the task.value when add is clicked...
    var taskMonth = document.getElementById("Months");
    var strMonth = taskMonth.options[taskMonth.selectedIndex].value;

    var taskDay = document.getElementById("numDays");
    var strDay = taskDay.options[taskDay.selectedIndex].value;

    var taskYear = document.getElementById("Year");
    var strYear = taskYear.options[taskYear.selectedIndex].value;

    var strDate = '<strong id="dueDate">' + strMonth + "/" + strDay + "/" + strYear + " :</strong> ";

    var task = document.getElementById('task').value;
    
    var taskDate = strDate + task; 
    var todos = getTodos();
    todos.push(taskDate);
    localStorage.setItem('todo', JSON.stringify(todos));
 
    show();
 
    return false;
}
 
function remove() {
    var id = this.getAttribute('id');
    var todos = getTodos();
    todos.splice(id, 1);
    localStorage.setItem('todo', JSON.stringify(todos));
 
    show();
 
    return false;
}

function getToday() { // getToday's date and return it 
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; // January is 0!
    var yyyy = today.getFullYear();

    if(dd < 10) {
        dd = '0'+ dd;
    }

    if(mm < 10) {
        mm = '0' + mm;
    }

    var todays_Date = [mm, dd, yyyy];

    return todays_Date;
}

function compareDate() {
    var today = getToday();
    for(var i=0; i<today.length; i++) { today[i] = +today[i]; } // Convert array of string into array of int

    /* 
        get the array todos, iterate through it, go into it's dueDate value and convert those into
        integers
    */
    
    var todos = get_todos();
    var todoDate = new Array();
    for(var i=0; i< todos.length; i++){
        var c = document.getElementsByTagName("STRONG")[i];
        var str = c.childNodes[0].nodeValue;
        var strSplit= str.replace('/','');
        todoDate.push(strSplit);
    }

    /*
    
        convert dates into an Array of Objects for easier sorting and we can associate each element of 
        a task's date with the indices of that object

    */

    var diffDate = new array();
    for(var i=0; i<todoDate.length; i++) { 
        todoDate[i] = +todoDate[i]; 
        diffDate.push(todoDate[i] - today[i]);
    } // Convert str to int and then push the calculation from todoDate and today

    /*
    todos.sort(function(today[1],dueDate[1]){return today[3] - dueDate[3]}); // Sort by year
    todos.sort(function(today[2],dueDate[2]){return today[1] - dueDate[1]}); // then by month
    todos.sort(function(today[2],dueDate[2]){return today[2] - dueDate[2]}); // then by day
    */
    return todos;
}

function show() {

    var today = getToday();

    // Get the ID of the dropdown boxes and and preselect the dates for today
    document.getElementById("Months").value = today[0];
    document.getElementById("numDays").value = today[1];
    document.getElementById("Year").value = today[2];

    // Todos
    var todos = getTodos();
    
    var html = '<ul>';
    for(var i=0; i<todos.length; i++) {
        html += '<li><input class="toggle" type="checkbox">' + todos[i] + 
                '<button class="remove" id="' + i  + '">x</button></li>';
    };
    html += '</ul>';
 
    document.getElementById('todos').innerHTML = html;
 
    var buttons = document.getElementsByClassName('remove');
    for (var i=0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', remove);
    };
}
 
document.getElementById('add').addEventListener('click', add);
/*
document.getElementById('weight+').addEventListener('click', function(e){
    var list = document.querySelector('ul');
    list.appendChild(list.firstElementChild);
});
*/
show();