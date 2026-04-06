const form = document.getElementById('itemForm');
const input = document.getElementById('itemInput');
const list = document.getElementById('itemList');

// Fetch items from server
async function fetchItems() {
  const res = await fetch('/items');
  const items = await res.json();
  list.innerHTML = '';

  items.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item.name;

    // Update button
    const updateBtn = document.createElement('button');
    updateBtn.textContent = 'Update';
    updateBtn.className = 'update';
    updateBtn.onclick = async () => {
      const newName = prompt('Enter new name:', item.name);
      if (newName) {
        await fetch(`/items/${item.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: newName })
        });
        fetchItems();
      }
    };

    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete';
    deleteBtn.onclick = async () => {
      await fetch(`/items/${item.id}`, { method: 'DELETE' });
      fetchItems();
    };

    // Append buttons next to item
    li.appendChild(updateBtn);
    li.appendChild(deleteBtn);
    list.appendChild(li);
  });
}

// Handle form submission
form.onsubmit = async (e) => {
  e.preventDefault();
  await fetch('/items', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: input.value })
  });
  input.value = '';
  fetchItems();
};

// Initial load
fetchItems();