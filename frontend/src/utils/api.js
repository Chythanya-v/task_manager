
export const fetchTasks = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(`/api/tasks`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    return response.json();
};

export const fetchTask = async (id) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`/api/tasks/${id}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    return response.json();
};

export const createTask = async (task) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`/api/tasks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(task)
    });
    return response.json();
};

export const updateTask = async (id, task) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`/api/tasks/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(task)
    });
    return response.json();
};

export const deleteTask = async (id) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
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