export const fetchMessages = async () => {
  const response = await fetch("http://localhost:8000/api/messages");
  return response.json();
};

export const addMessage = async (formData, token) => {
  const response = await fetch("http://localhost:8000/api/messages/add", {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const updateMessage = async (id, formData, token) => {
  const response = await fetch(`http://localhost:8000/api/messages/${id}`, {
    method: "PUT",
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const deleteMessage = async (id, token) => {
  const response = await fetch(`http://localhost:8000/api/messages/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};
