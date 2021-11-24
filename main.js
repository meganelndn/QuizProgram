const buttonShowQuiz = document.querySelector(".showQuiz");
const buttonShowTodo = document.querySelector(".showTodo");
const todoList = document.querySelector(".todoList");
const quiz = document.querySelector(".quiz");

buttonShowTodo.addEventListener("click", e => {
    todoList.classList.toggle("hide");
})
buttonShowQuiz.addEventListener("click", e => {
    quiz.classList.toggle("hide");
})


/******** TODO LIST ********/

const addForm = document.querySelector(".add");
const list = document.querySelector(".todos");
const search = document.querySelector(".search input");

const generateTemplate = todo => {
    let html = `
        <li class="list-group-item d-flex justify-content-between align-items-center">
            <span>${todo}</span>
            <i class="far fa-trash-alt delete"></i>
        </li>
    `;

    list.innerHTML += html;
}

addForm.addEventListener("submit", e => {
    e.preventDefault();

    const todo = addForm.add.value.trim(); // trim() removes any spaces before/after input
    
    if(todo.length){
        generateTemplate(todo);
        addForm.reset() // resets input field, clears it
    }
})

// delete todos 
list.addEventListener("click", e => {
    if(e.target.classList.contains("delete")){
        e.target.parentElement.remove();
    }
})
// filter todos
const filterTodos = term => {
    // remove todos that do not match search query
    Array.from(list.children)
        .filter((todo) => !todo.textContent.toLowerCase().includes(term))
        .forEach((todo) => todo.classList.add("filtered"))
    
    // keep todos that match search query
    Array.from(list.children)
        .filter((todo) => todo.textContent.toLowerCase().includes(term))
        .forEach((todo) => todo.classList.remove("filtered"))
}
// keyup event
search.addEventListener("keyup", () => {
    const term = search.value.trim().toLowerCase();
    filterTodos(term)
})



/******** QUIZ ********/

const correctAnswers = ["D", "C", "D", "A"];
const form = document.querySelector(".quiz-form");
const result = document.querySelector(".result");

form.addEventListener("submit", e => {
    e.preventDefault();

    let score = 0;
    const userAnswers = [form.q1.value, form.q2.value, form.q3.value, form.q4.value];

    // check answers
    userAnswers.forEach((answer, index) => {
        if(answer === correctAnswers[index]) {
            score += 25;
        }
    })
    
    // show result on page
    scrollTo(0,0); // scroll user to top when form submitted
    result.classList.remove("d-none");

    let output = 0;
    const timer = setInterval(() => {
        result.querySelector("span").textContent = `${output}%`;

        if(output === score) {
            clearInterval(timer);
        } else {
            output++;
        }
    }, 50);
});