// array kosong untuk menampung data todos
const todos = [];

//mendefinisikan Custom Event dengan nama 'render-todo'
const RENDER_EVENT = 'render-todo';

// listener yang akan menjalankan kode yang ada didalamnya ketika event DOMContentLoaded dibangkitkan
document.addEventListener('DOMContentLoaded', function(){
    // mempersiapkan elemen form untuk menangani event submit, di mana aksi tersebut dibungkus dan dijalankan oleh fungsi addTodo(), untuk menambahkan todo baru.
    const submitForm = document.getElementById('form');
    submitForm.addEventListener('submit', function (event){
        // method preventDefault(), untuk menyimpan data dalam memory
        event.preventDefault();
        addTodo();
    });

    function addTodo() {

        // mendapatkan inputan dari input text title
        const textTodo = document.getElementById('title').value;
        console.log(textTodo);

        // mendapatkan inputan dari input date
        const timeStamp = document.getElementById('date').value;
        console.log(timeStamp);

        // generate is secara otomatis dari function generateId
        const generatedID = generateId();
        console.log(generateId);
        
        //helper generateTodoObject() untuk membuat object baru
        const todoObject = generateTodoObject(generatedID, textTodo, timeStamp, false);

        // simpan pada array todos menggunakan metode push().
        todos.push(todoObject);


        document.dispatchEvent(new Event(RENDER_EVENT));

    }

    // function untuk generateID
    function generateId() {
        return +new Date();
    }

    // function untuk generate todo object ke dalam memory
    function generateTodoObject(id, task, timeStamp, isCompleted) {
        return {
          id,
          task,
          timeStamp,
          isCompleted
        }
    }


    
});

function makeTodo(todoObject){
    // membuat text title dengan style h2
    const textTitle = document.createElement('h2');
    // menyematkan konten berupa teks
    textTitle.innerText = todoObject.task;

    // membuat text timestamp dengan style p
    const textTimestamp = document.createElement('p');
    // menyematkan konten berupa nilai timestamp
    textTimestamp.innerText = todoObject.timeStamp;

    // membuat element div
    const textContainer = document.createElement('div');
    // menambahkan text dengan class inner
    textContainer.classList.add('inner');
    // memasukkan text title dan textTimestamp
    textContainer.append(textTitle, textTimestamp);

    // membuat elemen div
    const container = document.createElement('div');
    // nambah class item dan shadow
    container.classList.add('item', 'shadow');
    // memasukan kedua text yaitu text title dan text timestamp kedalam class container
    container.append(textContainer);
    // lalu set attributnya id
    container.setAttribute('id', `todo-${todoObject.id}`);

    if (todoObject.isCompleted) {
        const undoButton = document.createElement('button');
        undoButton.classList.add('undo-button');
     
        undoButton.addEventListener('click', function () {
          undoTaskFromCompleted(todoObject.id);
        });
     
        const trashButton = document.createElement('button');
        trashButton.classList.add('trash-button');
     
        trashButton.addEventListener('click', function () {
          removeTaskFromCompleted(todoObject.id);
        });
     
        container.append(undoButton, trashButton);
      } else {
        const checkButton = document.createElement('button');
        checkButton.classList.add('check-button');
        
        checkButton.addEventListener('click', function () {
          addTaskToCompleted(todoObject.id);
        });
        
        container.append(checkButton);
      }

    // return containernya
    return container;
}

// menjadikan isCompleted nya menjadi true
function addTaskToCompleted (todoId) {
    const todoTarget = findTodo(todoId);
   
    if (todoTarget == null) return;
   
    todoTarget.isCompleted = true;
    document.dispatchEvent(new Event(RENDER_EVENT));
}

// hilangkan todo nya dari list yang akan dilakukan
function findTodo(todoId) {
    for (const todoItem of todos) {
      if (todoItem.id === todoId) {
        return todoItem;
      }
    }
    return null;
}

// fungsi untuk menghapus dari container yang sudah dikerjakan
function removeTaskFromCompleted(todoId) {
    const todoTarget = findTodoIndex(todoId);
   
    if (todoTarget === -1) return;
   
    todos.splice(todoTarget, 1);
    document.dispatchEvent(new Event(RENDER_EVENT));
}

// menjadikan isCompleted nya menjadi false
function undoTaskFromCompleted(todoId) {
    const todoTarget = findTodo(todoId);
   
    if (todoTarget == null) return;
   
    todoTarget.isCompleted = false;
    document.dispatchEvent(new Event(RENDER_EVENT));
}

// fungsi untuk menghapus todos
function findTodoIndex(todoId) {
    for (const index in todos) {
      if (todos[index].id === todoId) {
        return index;
      }
    }
   
    return -1;
}

// event untuk menampilkan todos di console yang telah diinput kedalam memory
document.addEventListener(RENDER_EVENT, function () {
    console.log(todos);
    // membersihkan kontainer yang akan diisi agar tidak terjadi duplikasi data
    const uncompletedTODOList = document.getElementById('todos');
    uncompletedTODOList.innerHTML = '';

    // membersihkan kontainer yang akan diisi agar tidak terjadi duplikasi data
    const completedTODOList = document.getElementById('completed-todos');
    completedTODOList.innerHTML = '';

    // iterasi data yang dibuat oleh make todos dan render ke todoElement
    for (const todoItem of todos) {
        const todoElement = makeTodo(todoItem);
        // isi penampung yang kosong tadi
        if (!todoItem.isCompleted) {
            uncompletedTODOList.append(todoElement);
          }
        else
          completedTODOList.append(todoElement);
    }
});