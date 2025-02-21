import { createContext, useContext, useState, useEffect } from "react";
import { fetchMessages, addMessage, updateMessage, deleteMessage } from "../api/messagesApi";

const NotificationContext = createContext();

export const NotificationProvider = ({ children, user }) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    setIsLoading(true);
    try {
      const data = await fetchMessages();
      setMessages(data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addNewMessage = async (formData) => {
    if (user.role !== "admin") return alert("Only admin can add messages");

    const response = await addMessage(formData, user.role);
    if (response.ok) {
      loadMessages();
      alert("Message added successfully");
    } else {
      alert("Error adding message");
    }
  };

  const updateExistingMessage = async (id, formData) => {
    if (user.role !== "admin") return alert("Only admin can update messages");

    const response = await updateMessage(id, formData, user.role);
    if (response.ok) {
      loadMessages();
      alert("Message updated successfully");
    } else {
      alert("Error updating message");
    }
  };

  const removeMessage = async (id) => {
    if (user.role !== "admin") return alert("Only admin can delete messages");

    const response = await deleteMessage(id, user.role);
    if (response.ok) {
      loadMessages();
      alert("Message deleted successfully");
    } else {
      alert("Error deleting message");
    }
  };

  return (
    <NotificationContext.Provider value={{ messages, addNewMessage, updateExistingMessage, removeMessage, isLoading }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);
