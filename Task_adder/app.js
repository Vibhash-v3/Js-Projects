//Creating variables
const form = document.querySelector('.form');
const input = document.querySelector('.add_task');
const task_list = document.querySelector('.collection');//ul
const filter = document.querySelector('.filter');//filter input
const clear = document.querySelector('.btn2');//clear Button



//function for all eventListeren
loadEventListener();

function loadEventListener(){

	//dom load event
	document.addEventListener('DOMContentLoaded',loadTask);

	//for submiting the task to the list
	form.addEventListener('submit',addTask);

	//deleting the task
	task_list.addEventListener('click', del_task);

	//clear task list
	clear.addEventListener('click',clear_list);

	//filter
	filter.addEventListener('keyup',filter_task);
}


//load content in DOM----------------------------------(6)

function loadTask(){
	let tasks;
	if(localStorage.getItem('tasks') === null){
		tasks = [];
	}else{
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}
	tasks.forEach(function(task){
		//create li element
		const li = document.createElement('li');
		//add Class
		li.className = 'collection-item';
		//create text node and append it
		li.appendChild(document.createTextNode(task));
		//create new Link
		const link = document.createElement('a');
		//add class
		link.className = 'delete-item cross secondary-content';
		//add icon
		link.innerHTML = '<i class = "fa fa-remove icon"></i>';
		//append link to li
		li.appendChild(link);
		//append li to ul
		task_list.appendChild(li);
	});
}

//adding task----------------------------------------(1)

function addTask(e){
	if(input.value === ''){
		alert('Field should not be empty');
	} else {
		//create li element
		const li = document.createElement('li');
		//add Class
		li.className = 'collection-item';
		//create text node and append it
		li.appendChild(document.createTextNode(input.value));
		//create new Link
		const link = document.createElement('a');
		//add class
		link.className = 'delete-item cross secondary-content';
		//add icon
		link.innerHTML = '<i class = "fa fa-remove icon"></i>';
		//append link to li
		li.appendChild(link);
		//append li to ul
		task_list.appendChild(li);
		
		store(input.value);//to store task in local Storage

		//clear Input
		input.value = '';


		e.preventDefault();
	}
}


//storing the task in local storage---------------------------------------(5)

function store(task){
	let tasks;
	if(localStorage.getItem('tasks') === null){
		tasks = [];
	}else{
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}
	tasks.push(task);
	localStorage.setItem('tasks',JSON.stringify(tasks));
}



//delete icon---------------Remove task---------------------------------(2)

function del_task(e){
	if(e.target.parentElement.classList.contains('delete-item')){
		if(confirm("Confirm the deletion?")){
			e.target.parentElement.parentElement.remove();

			/*removing from local storage*/
			remove_task(e.target.parentElement.parentElement);
		}
	}
}


//for removing from the local storage-----------------------------------(7)
function remove_task(taskItem){
	let tasks;
	if(localStorage.getItem('tasks') === null){
		tasks = [];
	}else{
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}

	tasks.forEach(function(task,index){
		if(taskItem.textContent === task){
			tasks.splice(index,1);
		}
	});
	localStorage.setItem('tasks',JSON.stringify(tasks));
}


//clear button---------------------------------------------------(3)

function clear_list(){
	// task_list.innerHTML = '';//one way of doing it

	while(task_list.firstChild){
		task_list.removeChild(task_list.firstChild);
	}

	clearFromLocal();
}

//clearing the local Storage----------------------------------(8)
function clearFromLocal(){
	localStorage.clear();
}




//filteration-------------------------------------------------------(4)

function filter_task(e){
	const text = e.target.value.toLowerCase();
	
	document.querySelectorAll('.collection-item').forEach(function(task){
		const item = task.firstChild.textContent;
		if(item.toLowerCase().indexOf(text) != -1){
			task.style.display = 'block';
		}else{
			task.style.display = 'none';
		}
	})
}