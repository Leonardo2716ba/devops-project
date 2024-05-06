document.getElementById('searchForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const personId = document.getElementById('personId').value.trim();

    try {
        const response = await fetch(`/search?id=${personId}`);
        const data = await response.json();

        if (data.exists) {
            document.getElementById('result').textContent = `Person with ID ${personId} exists in the database.`;
        } else {
            document.getElementById('result').textContent = `Person with ID ${personId} does not exist in the database.`;
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('result').textContent = 'An error occurred. Please try again later.';
    }
});
