const createTaskAddForm = async (event) => {
    event.preventDefault();

    const tasklist = event.target.closest('.tasklist');
    tasklistIdValue = tasklist.dataset.tasklistId;

    const container = document.querySelector('#form-container');

    const formCard = document.createElement('div');
    formCard.classList.add('container', 'card', 'task');

    const cardHead = document.createElement('div');
    cardHead.classList.add('card-head');

    const cardHeadContent = document.createElement('header');
    cardHeadContent.textContent = 'Create a new task';

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    const taskForm = document.createElement('form');
    taskForm.setAttribute('id', 'taskAddForm');

    const descriptionLabel = document.createElement('label');
    descriptionLabel.classList.add('form-input')
    descriptionLabel.setAttribute('for', 'task-description');
    descriptionLabel.textContent = 'Task Description:';

    const descriptionInput = document.createElement('input');
    descriptionInput.setAttribute('id', 'task-description');
    descriptionInput.setAttribute('name', 'task-description');

    const tasklistId = document.createElement('input');
    tasklistId.setAttribute('type', 'hidden');
    tasklistId.setAttribute('id', 'tasklist-id');
    tasklistId.setAttribute('name', 'tasklist-id');
    tasklistId.setAttribute('value', `${tasklistIdValue}`);

    const formSubmit = document.createElement('button');
    formSubmit.setAttribute('type', 'submit');
    formSubmit.textContent = 'Submit';

    // Build Form
    taskForm.appendChild(descriptionLabel);
    taskForm.appendChild(descriptionInput);
    taskForm.appendChild(tasklistId);
    taskForm.appendChild(formSubmit);

    // Build Card
    formCard.appendChild(cardHead);
    cardHead.appendChild(cardHeadContent);
    formCard.appendChild(cardBody);
    cardBody.appendChild(taskForm);

    container.replaceChildren(formCard);


    document.querySelector('#taskAddForm').addEventListener('submit', taskAddHandler)
};

const createTaskEditorForm = async (event) => {
    event.preventDefault();

    const task = event.target.closest('.task-edit');
    taskIdValue = task.dataset.taskId;

    const container = document.querySelector('#form-container');

    const formCard = document.createElement('div');
    formCard.classList.add('container', 'card', 'task');

    const cardHead = document.createElement('div');
    cardHead.classList.add('card-head');

    const cardHeadContent = document.createElement('header');
    cardHeadContent.textContent = 'Edit task';

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    const taskForm = document.createElement('form');
    taskForm.setAttribute('id', 'taskEditorForm');

    const descriptionLabel = document.createElement('label');
    descriptionLabel.classList.add('form-input')
    descriptionLabel.setAttribute('for', 'task-description');
    descriptionLabel.textContent = 'Task Description:';

    const descriptionInput = document.createElement('input');
    descriptionInput.setAttribute('id', 'task-description');
    descriptionInput.setAttribute('name', 'task-description');

    const taskId = document.createElement('input');
    taskId.setAttribute('type', 'hidden');
    taskId.setAttribute('id', 'task-id');
    taskId.setAttribute('name', 'task-id');
    taskId.setAttribute('value', `${taskIdValue}`);

    const formSubmit = document.createElement('button');
    formSubmit.setAttribute('type', 'submit');
    formSubmit.textContent = 'Submit';

    // Build Form
    taskForm.appendChild(descriptionLabel);
    taskForm.appendChild(descriptionInput);
    taskForm.appendChild(taskId);
    taskForm.appendChild(formSubmit);

    // Build Card
    formCard.appendChild(cardHead);
    cardHead.appendChild(cardHeadContent);
    formCard.appendChild(cardBody);
    cardBody.appendChild(taskForm);

    container.replaceChildren(formCard);


    document.querySelector('#taskEditorForm').addEventListener('submit', taskEditHandler)
};

const taskAddHandler = async (event) => {
    event.preventDefault();

    const tasklist_id = document.querySelector('#tasklist-id').value.trim();
    const description = document.querySelector('#task-description').value.trim();

    if (tasklist_id && description) {
        const response = await fetch(`/api/tasks/`, {
            method: 'POST',
            body: JSON.stringify({ tasklist_id, description }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            location.reload();
        } else {
            alter('Task creation failed.')
        }
    }
};

const taskEditHandler = async (event) => {
    event.preventDefault();

    const id = document.querySelector('#task-id').value.trim();
    const description = document.querySelector('#task-description').value.trim();

    if (id && description) {
        const response = await fetch(`/api/tasks/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ id, description }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            location.reload();
        } else {
            alert('Task update failed.')
        }
    }
};

const taskDeleteHandler = async (event) => {
    event.preventDefault();

    const task = event.target.closest('.task-delete');

    const response = await fetch(`/api/tasks/${task.dataset.taskId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        const loc = document.location.pathname;
        const regex = `/api/tasks/.+`;
        const isTaskPage = loc.match(regex);
        if (isTaskPage) {
            document.location.replace('/');
        } else {
            location.reload();
        }
    } else {
        alert('Task delete failed.')
    }
};

document.querySelectorAll('.task-add').forEach(element => {
    element.addEventListener('click', createTaskAddForm);
});

document.querySelectorAll('.task-edit').forEach(element => {
    element.addEventListener('click', createTaskEditorForm);
});

document.querySelectorAll('.task-delete').forEach(element => {
    element.addEventListener('click', taskDeleteHandler);
});