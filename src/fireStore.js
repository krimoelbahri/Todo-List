function saveProject(projectName) {
	// Add a new Project entry to the database.
	return firebase
		.firestore()
		.collection("Projects")
		.add({
			name: projectName,
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
		})
		.catch(function (error) {
			console.error("Error writing new Project to database", error);
		});
}
function saveTasks(name, description, date, priority, project) {
	// Add a new Project entry to the database.
	return firebase
		.firestore()
		.collection("Tasks")
		.add({
			name: name,
			description: description,
			date: date,
			priority: priority,
			project: project,
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
		})
		.catch(function (error) {
			console.error("Error writing new Project to database", error);
		});
}

export { saveProject, saveTasks };
