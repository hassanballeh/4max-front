import { useState } from "react";

const Modal = ({ children, title }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">{title}</h2>
      {children}
    </div>
  </div>
);

const UsersDashboard = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Ahmed Ali",
      email: "ahmed.ali@example.com",
      joined_at: "2023-01-15T09:30:00Z",
    },
    {
      id: 2,
      name: "Fatima Zahra",
      email: "fatima.zahra@example.com",
      joined_at: "2023-02-20T14:00:00Z",
    },
    {
      id: 3,
      name: "Youssef Ibrahim",
      email: "youssef.ibrahim@example.com",
      joined_at: "2023-03-10T18:45:00Z",
    },
  ]);

  const [addingUser, setAddingUser] = useState(false);

  const [newUser, setNewUser] = useState({ name: "", email: "", password: "" });

  const handleAddUser = () => {
    setNewUser({ name: "", email: "", password: "" });
    setAddingUser(true);
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm(`Are you sure you want to delete this user?`)) {
      setUsers(users.filter((user) => user.id !== userId));
    }
  };

  const saveNewUser = () => {
    if (!newUser.name || !newUser.email || !newUser.password) {
      alert("Name and email and password are required.");
      return;
    }
    const finalNewUser = {
      ...newUser,
      id: new Date().getTime(),
      joined_at: new Date().toISOString(),
    };
    setUsers([...users, finalNewUser]);
    setAddingUser(false);
  };

  const cancelAction = () => {
    setAddingUser(false);
  };

  const handleFormChange = (e, userData, setUserData) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const renderUserForm = (userData, setUserData, onSave, title) => (
    <Modal title={title}>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={(e) => handleFormChange(e, userData, setUserData)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={(e) => handleFormChange(e, userData, setUserData)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            password
          </label>
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={(e) => handleFormChange(e, userData, setUserData)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div className="flex justify-end space-x-4 mt-6">
          <button
            onClick={cancelAction}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </Modal>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {addingUser &&
        renderUserForm(newUser, setNewUser, saveNewUser, "Add New User")}
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Users Management</h1>
          <button
            onClick={handleAddUser}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add User
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">
                      {user.name}
                    </h2>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
                  <div className="text-sm text-gray-600">
                    <p>
                      Joined: {new Date(user.joined_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UsersDashboard;
