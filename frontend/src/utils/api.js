
export const fetchTasks = async () => {
    const response = await fetch(`/tasks`);
    return response.json();
};

export const createTask = async (task) => {
    const response = await fetch(`/tasks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(task)
    });
    return response.json();
};

export const updateTask = async (id, task) => {
    const response = await fetch(`/tasks/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(task)
    });
    return response.json();
};

export const deleteTask = async (id) => {
    const response = await fetch(`/tasks/${id}`, {
        method: "DELETE"
    });
    return response.json();
};

export const signup = async (email, password) => {
    const response = await fetch(`/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    });
    return response.json();
};

export const login = async (email, password) => {
    const response = await fetch(`/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    });
    return response.json();
};