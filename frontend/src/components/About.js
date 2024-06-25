import React from 'react';

const About = () => {
  // Assuming you have a user object or name stored somewhere (e.g., in context or local storage)
  const user = {
    name: 'User' // Replace with actual user name if available
  };

  return (
    <div className="container mt-4">
      <h2>About iNotebook</h2>
      <p>
        Hello {user.name || 'friend'}, welcome to iNotebook! This is a simple and intuitive web application designed to help you organize your thoughts and tasks with ease.
      </p>
      <p>
        iNotebook allows you to:
      </p>
      <ul>
        <li>Create, edit, and delete notes</li>
        <li>Organize notes using tags</li>
        <li>Keep track of important ideas, tasks, or reminders</li>
        <li>Access your notes securely with user authentication</li>
      </ul>
      <p>
        Whether you're a student, professional, or anyone looking to streamline their note-taking process, iNotebook is here to simplify your life.
      </p>
      <p>
        Built with React.js and utilizing context API for state management, iNotebook demonstrates basic CRUD (Create, Read, Update, Delete) operations with a user-friendly interface.
      </p>
      <p>
        Start organizing your thoughts and ideas with iNotebook today and experience the convenience firsthand!
      </p>
    </div>
  );
};

export default About;