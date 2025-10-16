(() => {
  // ---------- DOM ELEMENTS ----------
  const form = document.getElementById("contactForm");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");
  const formStatus = document.getElementById("formStatus");
  const footerYear = document.getElementById("currentyear");
  const lastModified = document.getElementById("lastModified");

  // ---------- CONSTANTS ----------
  const STORAGE_KEY = "growNaijaMessages";
  let messages = [];

  // ---------- UTILITIES ----------
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const showStatus = (text, isError = false) => {
    formStatus.textContent = `${text}`;
    formStatus.style.color = isError ? "crimson" : "green";
  };

  const clearStatus = () => {
    setTimeout(() => {
      formStatus.textContent = "";
    }, 4000);
  };

  // ---------- LOCAL STORAGE ----------
  const saveToStorage = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  };

  const loadFromStorage = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        messages = JSON.parse(saved);
        if (!Array.isArray(messages)) messages = [];
      } catch {
        messages = [];
      }
    }
  };

  // ---------- RENDER MESSAGES ----------
  const renderMessages = () => {
    // Remove existing list if any
    const existingList = document.querySelector(".saved-messages");
    if (existingList) existingList.remove();

    const section = document.createElement("section");
    section.classList.add("saved-messages");

    const heading = document.createElement("h3");
    heading.textContent = "Previous Messages";
    section.appendChild(heading);

    if (messages.length === 0) {
      const empty = document.createElement("p");
      empty.textContent = "No saved messages yet.";
      section.appendChild(empty);
    } else {
      const list = document.createElement("ul");

      messages.forEach((msg) => {
        const li = document.createElement("li");
        li.innerHTML = `
          <strong>${msg.name}</strong> (${msg.email})<br>
          <em>${msg.message}</em><br>
          <small>Sent: ${new Date(msg.date).toLocaleString()}</small>
        `;
        // Delete button for each entry
        const delBtn = document.createElement("button");
        delBtn.textContent = "Delete";
        delBtn.style.marginLeft = "0.5rem";
        delBtn.addEventListener("click", () => {
          deleteMessage(msg.id);
        });
        li.appendChild(delBtn);
        list.appendChild(li);
      });
      section.appendChild(list);
    }

    // Clear-all button
    if (messages.length > 0) {
      const clearAllBtn = document.createElement("button");
      clearAllBtn.textContent = "Clear All";
      clearAllBtn.addEventListener("click", clearAllMessages);
      clearAllBtn.style.marginTop = "0.5rem";
      section.appendChild(clearAllBtn);
    }

    // Append after form
    form.insertAdjacentElement("afterend", section);
  };

  // ---------- MESSAGE HANDLING ----------
  const addMessage = (name, email, message) => {
    if (!name || !email || !message) {
      showStatus(`Please fill in all fields.`, true);
      clearStatus();
      return false;
    }

    if (!isValidEmail(email)) {
      showStatus(`Please enter a valid email address.`, true);
      clearStatus();
      return false;
    }

    // Prevent duplicate messages from same email (conditional branching)
    const exists = messages.some((m) => m.email === email && m.message === message);
    if (exists) {
      showStatus(`You've already submitted this message.`, true);
      clearStatus();
      return false;
    }

    const newMsg = {
      id: Date.now().toString(),
      name,
      email,
      message,
      date: new Date().toISOString(),
    };

    messages.push(newMsg);
    saveToStorage();
    renderMessages();
    showStatus(`Thanks, ${name}! Your message has been saved.`);
    clearStatus();
    return true;
  };

  const deleteMessage = (id) => {
    messages = messages.filter((m) => m.id !== id);
    saveToStorage();
    renderMessages();
    showStatus(`Message deleted.`);
    clearStatus();
  };

  const clearAllMessages = () => {
    if (confirm(`Are you sure you want to delete all messages?`)) {
      messages = [];
      saveToStorage();
      renderMessages();
      showStatus(`All messages cleared.`);
      clearStatus();
    }
  };

  // ---------- FORM SUBMISSION ----------
  const handleSubmit = (event) => {
    event.preventDefault();
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const msg = messageInput.value.trim();

    const success = addMessage(name, email, msg);
    if (success) {
      form.reset();
    }
  };

  // ---------- FOOTER DYNAMICS ----------
  const updateFooter = () => {
    const year = new Date().getFullYear();
    footerYear.textContent = `${year}`;
    lastModified.textContent = `Last modified: ${document.lastModified}`;
  };

  // ---------- INIT ----------
  const init = () => {
    loadFromStorage();
    renderMessages();
    updateFooter();
    form.addEventListener("submit", handleSubmit);
  };

  document.addEventListener("DOMContentLoaded", init);
})();

// Get the current year and display it in the footer
const currentYear = new Date().getFullYear();
document.getElementById("currentyear").textContent = currentYear;

// Get the last modified date and display it in the footer
const lastModified = document.lastModified;
document.getElementById("lastModified").textContent = "Last Modification: " + lastModified;
