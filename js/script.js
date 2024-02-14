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

// event untuk menampilkan todos di console yang telah diinput kedalam memory
document.addEventListener(RENDER_EVENT, function () {
    console.log(todos);
});