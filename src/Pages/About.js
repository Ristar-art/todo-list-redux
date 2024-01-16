export const About = () =>{
    const containerStyle = {
        maxWidth: "800px",
        margin: "0 auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        marginTop:"200px",
        
      };
    
      const headingStyle = {
        borderBottom: "2px solid #333",
        paddingBottom: "10px",
        marginBottom: "20px",
        
      };
    
      const listStyle = {
        marginBottom: "20px",
      };
    
      const contactStyle = {
        marginTop: "20px",
      };
    
      return (
        <div style={containerStyle}>
        
          <h1 style={headingStyle}>About Our To-Do List App</h1>
          <p>
            Welcome to our To-Do List application – a simple yet powerful tool
            designed to help you organize your tasks, set priorities, and manage
            your time efficiently.
          </p>
    
          <h2 style={headingStyle}>Our Mission</h2>
          <p>
            At the heart of our mission is the belief that a well-organized to-do
            list is a cornerstone for personal productivity and peace of mind. We
            understand the challenges of juggling multiple responsibilities, and
            our app aims to simplify your daily life by providing an intuitive
            platform for task management.
          </p>
    
          <h2 style={headingStyle}>Key Features</h2>
          <ul style={listStyle}>
            <li>Task Prioritization: Easily categorize your tasks into different priority levels – High, Medium, or Low.</li>
            <li>Time Management: Stay on top of your schedule by assigning a specific time to each task.</li>
            <li>User-Friendly Interface: Our user-friendly interface is designed with simplicity in mind.</li>
            <li>Real-Time Updates: Collaborate seamlessly with our real-time update feature.</li>
          </ul>
    
          <h2 style={headingStyle}>How to Get Started</h2>
          <ol style={listStyle}>
            <li>Create an Account: Sign up for a personalized account to unlock the full potential of our to-do list app.</li>
            <li>Add Your First Task: Start by adding your tasks to the list.</li>
            <li>Stay Organized: Use our intuitive interface to edit, update, or delete tasks.</li>
            <li>Collaborate (if needed): If you're working on projects with others, take advantage of the collaboration features.</li>
          </ol>
    
          <h2 style={headingStyle}>Contact Us</h2>
          <p style={contactStyle}>
            Have questions, feedback, or suggestions? We'd love to hear from you! Reach out to our support team via{" "}
            <a href="mailto:support@exampletodolist.com">support@exampletodolist.com</a> or visit our{" "}
            <a href="#faq">FAQ page</a> for commonly asked questions.
          </p>
    
          <p>
            Thank you for choosing our To-Do List app to enhance your productivity journey. Here's to a more organized and fulfilling life!
          </p>
    
          <p>Happy Tasking!</p>
        </div>
      );
    };