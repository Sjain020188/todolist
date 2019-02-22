class Project
{
    constructor(name,desc)
    {
        this.name=name;
        this.desc=desc;
    }
}

class todo
{
    constructor(name,desc,dueDate,priority,project,done)
    {
        this.name=name;
        this.desc=desc;
        this.duedate=dueDate;
        this.priority=priority;
        this.project=project;
        this.done=done;
    }
}

function displayTodos()
{
    let counter=0;
    Projects.forEach(project=>{
        displayNewProject(project,counter);
    //    addPrj_TodoDropdwn(project,counter);
        counter++;
    });
    counter=0;
    todos.forEach(todo=>displaynewtodo(todo,counter++));
}

function displaynewtodo(todo,i)
{
    console.log(todo);
    const projects = document.querySelectorAll("#project_container li")
    console.log(todo.project);
    console.log(projects);
    projects.forEach(project=>{
        if(project.innerHTML.indexOf(todo.project)>-1)
        {
            console.log("condition true");
            const li = document.createElement('li');
            const label = document.createElement('label');
            var checkbox = document.createElement('input');
            checkbox.type = "checkbox";
            checkbox.value = 1;
            checkbox.name = "todo[]";
            if(todo.done==true)
            {
                console.log("mark true");
                checkbox.checked=true;
            }
            label.innerText=todo.name;
            checkbox.dataset.index=i;
            label.dataset.index=i;
            li.dataset.index=i;
            li.appendChild(checkbox);
            li.appendChild(label);
            project.lastElementChild.appendChild(li);
            checkbox.addEventListener("click",e=>markToDoDone(e.target.dataset.index));
        }
    })
}

function markToDoDone(index)
{
    console.log(index);
    todos[index].done = !todos[index].done;
    localStorage.setItem("TODO",JSON.stringify(todos));
}

function showModal()
{
    const modal = document.querySelector(".modal");
    modal.style.display="block";
   
    const close = document.querySelector(".close");
    close.addEventListener("click",(e)=>modal.style.display="none");
}

function setModalProjectContent()
{
    const modalcontent=document.querySelector(".modalForm");
    modalcontent.innerHTML=`
    <div class="col-sm-4">
                <h3>Project</h3>
                <div class="table-container">
                    <div class="table-row">
                        <div class="table-cell">
                            Name:
                        </div>
                        <div class="table-cell prj_name_input">
                            <input type="text" id="prj_name">
                        </div>
                    </div>
                    <div class="table-row ">
                        <div class="table-cell">
                            Description:
                        </div>
                        <div class="table-cell prj_desc_input">
                            <input type="text" id="prj_desc">
                        </div>
                    </div>
                    <div class="table-row">
                        <div class="table-cell">
                            <input class="projectBtn" type="button">
                        </div>
                    </div>
                </div>
              </div>
    `
}

function setModalToDoContent()
{
    const modalcontent=document.querySelector(".modalForm");
    modalcontent.innerHTML=`
    <h3>Add To-do</h3> 
    <div class="table-container">
            <div class="table-row">
                <div class="table-cell">
                    Title:
                </div>
                <div class="table-cell">
                    <input id="todo_name" type="text">
                </div>
            </div>
            <div class="table-row">
                <div class="table-cell">
                    Description:
                </div>
                <div class="table-cell">
                    <input id="todo_desc" type="text">
                </div>
            </div>
            <div class="table-row">
                <div class="table-cell">
                    Due Date:
                </div>
                <div class="table-cell">
                    <input id="todo_duedate" type="date">
                </div>
            </div>
            <div class="table-row">
                <div class="table-cell">
                     Priority:
                </div>
                <div id="todo_prio">
                        <select name="todo_prio">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select>
                 </div>
            </div>
            <div class="table-row">
                <div class="table-cell">
                    Project:
                </div>
                <div class="table-cell">
                    <span name="todo_project"></span>
                </div>
            </div>
            <div class="table-row">
                <div class="table-cell">
                    <input id="add_todo" type="button" value="Add to-Do">
                </div>
            </div>
        </div>`
}

function editProject(e)
{
    const targetIndex=e.target.parentNode.dataset.index;
    console.log(e);
    showModal();
    setModalProjectContent();
    const prjNameInput = document.getElementById("prj_name");
    const prjDescInput = document.getElementById("prj_desc");
    const prjEdtBtn = document.querySelector(".projectBtn");
 //   prjNameInput.type="text";
 //   prjDescInput.type="text";
 //   prjNameInput.id="prj_name";
 //   prjDescInput.id="prj_desc";
    prjNameInput.value=Projects[targetIndex].name;
    prjDescInput.value=Projects[targetIndex].desc;
    prjEdtBtn.id="edit_prj";
    prjEdtBtn.value="Edit project";
  //  document.querySelector(".prj_name_input").appendChild(prjNameInput);
  //  document.querySelector(".prj_desc_input").appendChild(prjDescInput);
    const edit = document.querySelector("#edit_prj");
    edit.addEventListener("click",(event)=>{
        Projects[targetIndex].name = document.querySelector(".modal #prj_name").value;
        Projects[targetIndex].desc = document.querySelector(".modal #prj_desc").value;
        localStorage.setItem('PROJECT',JSON.stringify(Projects));
        todos.forEach(todo=>{
            if(todo.project.indexOf(e.target.innerText)>-1)
                todo.project=document.querySelector(".modal #prj_name").value;
        })
        localStorage.setItem("TODO",JSON.stringify(todos));
        e.target.innerText=document.querySelector(".modal #prj_name").value;
     //   document.querySelector(`[name='todo_project'] option[data-index='${targetIndex}']`).innerText = document.querySelector(".modal #prj_name").value;
     document.querySelector(".modal").style.display="none";
    })

}

function deleteProject(e)
{
    const targetIndex = parseInt(e.target.parentNode.dataset.index);
    console.log(e.target.nextSibling.childNodes);
    e.target.parentNode.parentNode.removeChild(e.target.parentNode.parentNode.childNodes[targetIndex+1]);
    Projects.splice(targetIndex,1);
    localStorage.setItem('PROJECT',JSON.stringify(Projects));
    let filterted = _.remove(todos,function(todo)
    {
        return (todo.project.indexOf(e.target.previousSibling.innerText)>-1)
    })
    console.log(filterted);
    localStorage.setItem("TODO",JSON.stringify(todos));
    document.querySelector("#project_container").innerHTML="";
    document.querySelector("[name='todo_project']").innerHTML="";
    displayTodos();

}

function addPrj_TodoDropdwn(item,i)
{
    const op = document.createElement('option');
    const projectOps = document.querySelector("[name='todo_project']");
    op.dataset.index=i;
    op.innerText=item.name;
    projectOps.appendChild(op);
}

function displayNewProject(item,i)
{
        const li = document.createElement('li');
        const span = document.createElement('span');
        const delSpan = document.createElement('span');
       const projectContainer = document.querySelector("#project_container");
        span.innerText=item.name;
        li.dataset.index=i;
        li.appendChild(span);
       delSpan.classList.add("glyphicon");
       delSpan.classList.add("glyphicon-minus-sign");
       li.appendChild(delSpan);
        projectContainer.appendChild(li);  
        const ul = document.createElement('ul');
       ul.innerHTML="<li class='add_new'><span class='glyphicon glyphicon-plus'></span>Add New</li>"
        li.appendChild(ul);
        span.addEventListener ("click",(e)=>editProject(e));
        delSpan.addEventListener("click",(e)=>deleteProject(e));
        const addNewIcons= document.querySelectorAll('.add_new')
        addNewIcons.forEach(addNewIcon=>addNewIcon.addEventListener("click",(e)=>newToDo(e)));
}

function newToDo(e)
{
    showModal();
    console.log(e.target.parentNode.parentNode.dataset.index);
    setModalToDoContent();
        console.log(e);
        document.querySelector("[name='todo_project']").innerText=Projects[e.target.parentNode.parentNode.dataset.index].name;
        let add_todo=document.querySelector("#add_todo");
    add_todo.addEventListener("click",(e)=>{
        document.querySelector(".modal").style.display="none";
        addTodo()});
 
}

function addProject()
{


    let name = document.querySelector("#prj_name").value;
    let desc = document.querySelector("#prj_desc").value;
    if(name=="")
        alert("Please enter project Name");
    else
    {
    Projects.push(new Project(name,desc));
    localStorage.setItem('PROJECT',JSON.stringify(Projects));
    document.querySelector("#prj_name").value="";
    document.querySelector("#prj_desc").value="";
    displayNewProject(Projects[Projects.length-1],Projects.length-1);
 //   addPrj_TodoDropdwn(Projects[Projects.length-1],Projects.length-1);
    }
    
}

function addTodo()
{

    let name = document.querySelector("#todo_name").value;
    let desc = document.querySelector("#todo_desc").value;
    let dueDate = document.querySelector("#todo_duedate").value;
    let prio = document.querySelector("[name='todo_prio']").value;
    let project = document.querySelector("[name='todo_project']").textContent;
    if(name=="" || dueDate=="" || project=="")
        alert("Please add to-do title,due date and project");
    else
    {
    todos.push(new todo(name,desc,dueDate,prio,project,false));
    localStorage.setItem("TODO",JSON.stringify(todos));
    document.querySelector("#todo_name").value="";
    document.querySelector("#todo_desc").value="";
    document.querySelector("#todo_duedate").value="";
    document.querySelector("[name='todo_prio']").value="";
    document.querySelector("[name='todo_project']").value="";
    displaynewtodo(todos[todos.length-1],todos.length-1);
    }


}

function AddNewProject()
{
    showModal();
    setModalProjectContent();
    const prjAddBtn = document.querySelector(".projectBtn");
    prjAddBtn.id="add_prj";
    prjAddBtn.value="Add Project";
    let add_prj=document.querySelector("#add_prj");
    console.log(add_prj);
    add_prj.addEventListener("click",(e)=>{
        document.querySelector(".modal").style.display="none";
        addProject();
        
    });
}



let Projects = JSON.parse(localStorage.getItem('PROJECT')) || [];
let todos = JSON.parse(localStorage.getItem('TODO')) || [];
displayTodos();
let addProjectBtn=document.querySelector(".addPrjbtn");
addProjectBtn.addEventListener("click",(e)=>AddNewProject());
    







