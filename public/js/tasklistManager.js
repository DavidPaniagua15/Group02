const createTasklistAddForm = async (event) => {
    event.preventDefault();

    const owner = event.target.closest('.tasklist');
    ownerIdValue = owner.dataset.ownerId;

    const container = document.querySelector('#form-container');

    const formCard = document.createElement('div');
    formCard.classList.add('container', 'card', 'tasklist');

    const cardHead = document.createElement('div');
    cardHead.classList.add('card-head');

    const cardHeadContent = document.createElement('header');
    cardHeadContent.textContent = 'Create a new task';

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    const tasklistForm = document.createElement('form');
    tasklistForm.setAttribute('id', 'tasklistAddForm');

    const nameLabel = document.createElement('label');
    nameLabel.classList.add('form-input')
    nameLabel.setAttribute('for', 'tasklist-name');
    nameLabel.textContent = 'Tasklist Name:';

    const nameInput = document.createElement('input');
    nameInput.setAttribute('id', 'tasklist-name');
    nameInput.setAttribute('name', 'tasklist-name');

    const ownerId = document.createElement('input');
    ownerId.setAttribute('type', 'hidden');
    ownerId.setAttribute('id', 'owner-id');
    ownerId.setAttribute('name', 'owner-id');
    ownerId.setAttribute('value', `${ownerIdValue}`);

    const formSubmit = document.createElement('button');
    formSubmit.setAttribute('type', 'submit');
    formSubmit.textContent = 'Submit';

    // Build Form
    tasklistForm.appendChild(nameLabel);
    tasklistForm.appendChild(nameInput);
    tasklistForm.appendChild(ownerId);
    tasklistForm.appendChild(formSubmit);

    // Build Card
    formCard.appendChild(cardHead);
    cardHead.appendChild(cardHeadContent);
    formCard.appendChild(cardBody);
    cardBody.appendChild(tasklistForm);

    container.replaceChildren(formCard);


    document.querySelector('#tasklistAddForm').addEventListener('submit', tasklistAddHandler)
};

const createTasklistEditorForm = async (event) => {
    event.preventDefault();

    const tasklist = event.target.closest('.tasklist-edit');
    tasklistIdValue = tasklist.dataset.tasklistId;

    const container = document.querySelector('#form-container');

    const formCard = document.createElement('div');
    formCard.classList.add('container', 'card', 'tasklist');

    const cardHead = document.createElement('div');
    cardHead.classList.add('card-head');

    const cardHeadContent = document.createElement('header');
    cardHeadContent.textContent = 'Edit Tasklist';

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    const tasklistForm = document.createElement('form');
    tasklistForm.setAttribute('id', 'tasklistEditorForm');

    const nameLabel = document.createElement('label');
    nameLabel.classList.add('form-input')
    nameLabel.setAttribute('for', 'tasklist-name');
    nameLabel.textContent = 'Tasklist Name:';

    const nameInput = document.createElement('input');
    nameInput.setAttribute('id', 'tasklist-name');
    nameInput.setAttribute('name', 'tasklist-name');

    const tasklistId = document.createElement('input');
    tasklistId.setAttribute('type', 'hidden');
    tasklistId.setAttribute('id', 'tasklist-id');
    tasklistId.setAttribute('name', 'tasklist-id');
    tasklistId.setAttribute('value', `${tasklistIdValue}`);

    const formSubmit = document.createElement('button');
    formSubmit.setAttribute('type', 'submit');
    formSubmit.textContent = 'Submit';

    // Build Form
    tasklistForm.appendChild(nameLabel);
    tasklistForm.appendChild(nameInput);
    tasklistForm.appendChild(tasklistId);
    tasklistForm.appendChild(formSubmit);

    // Build Card
    formCard.appendChild(cardHead);
    cardHead.appendChild(cardHeadContent);
    formCard.appendChild(cardBody);
    cardBody.appendChild(tasklistForm);

    container.replaceChildren(formCard);


    document.querySelector('#tasklistEditorForm').addEventListener('submit', tasklistEditHandler)
};

const tasklistAddHandler = async (event) => {
    event.preventDefault();

    const owner_id = document.querySelector('#owner-id').value.trim();
    const name = document.querySelector('#tasklist-name').value.trim();

    if (owner_id && name) {
        const response = await fetch(`/api/tasklists/`, {
            method: 'POST',
            body: JSON.stringify({ owner_id, name }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            location.reload();
        } else {
            alert('Tasklist creation failed.')
        }
    }
};

const tasklistEditHandler = async (event) => {
    event.preventDefault();

    const id = document.querySelector('#tasklist-id').value.trim();
    const name = document.querySelector('#tasklist-name').value.trim();

    if (id && name) {
        const response = await fetch(`/api/tasklists/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ id, name }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            location.reload();
        } else {
            alert('Tasklist update failed.')
        }
    }
};

const tasklistDeleteHandler = async (event) => {
    event.preventDefault();

    const tasklist = event.target.closest('.tasklist-delete');

    const response = await fetch(`/api/tasklists/${tasklist.dataset.tasklistId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        const loc = document.location.pathname;
        const regex = `/api/tasklists/.+`;
        const isTasklistPage = loc.match(regex);
        if (isTasklistPage) {
            document.location.replace('/');
        } else {
            location.reload();
        }
    } else {
        alert('Tasklist delete failed.')
    }
};

document.querySelectorAll('.tasklist-add').forEach(element => {
    element.addEventListener('click', createTasklistAddForm);
});

document.querySelectorAll('.tasklist-edit').forEach(element => {
    element.addEventListener('click', createTasklistEditorForm);
});

document.querySelectorAll('.tasklist-delete').forEach(element => {
    element.addEventListener('click', tasklistDeleteHandler);
});