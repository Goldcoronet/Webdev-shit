    document.addEventListener('DOMContentLoaded', () => {
        const taskInput = document.getElementById('task-input');
        const addTaskBtn = document.getElementById('add-task-btn');
        const taskList = document.getElementById('task-list');
        const emptyImage = document.querySelector('.empty-image');
        const todosContainer = document.querySelector('.todos-container');
        const progressBar= document.getElementById('progress');
        const progressNumbers = document.getElementById('numbers');
        const audio = document.getElementById('celebration-audio');
        const video = document.getElementById('celebration-video');

        let hasCelebrated = false;



        const toggleEmptyState = () => {
            emptyImage.style.display = taskList.children.length === 0 ? 'block' : 'none';
            todosContainer.style.width = taskList.children.length > 0 ? '100%' : '50%';
        };

        const updateProgress = (checkCompletion = true) => {
            const totalTasks = taskList.children.length;
            const completedTasks = taskList.querySelectorAll('.checkbox:checked').length;

            progressBar.style.width = totalTasks ? `${(completedTasks/totalTasks)*100}%`: '0%';
            progressNumbers.textContent =`${completedTasks} / ${totalTasks}`;

            if (checkCompletion && totalTasks > 0 && completedTasks === totalTasks && !hasCelebrated) {
                Confetti();
                audio.currentTime = 0;
                audio.play();

                video.style.display = 'block';   // 👈 Show video
                video.currentTime = 0;
                video.playbackRate = 12 / 7;  // ≈ 1.714x speed
                video.play();                    // 👈 Play it
                hasCelebrated = true;
            }
            if (totalTasks === 0) {
            hasCelebrated = false;
            video.pause();
            video.style.display = 'none';
            audio.pause();
            audio.currentTime = 0;
            }

        if (completedTasks < totalTasks && totalTasks > 0) {
                hasCelebrated = false;
                video.style.display = 'none';
                video.pause();
                audio.pause();
                audio.currentTime = 0;
            }

        };

        const saveTaskToLocalStorage = () => {
                const tasks = Array.from(taskList.querySelectorAll('li')).map(li=>({
                    text: li.querySelector('span').textContent,
                    completed: li.querySelector('.checkbox').checked
                }));
                localStorage.setItem('tasks', JSON.stringify(tasks));
        };

        const loadTasksFromLocalStroage =  () => {
            const savedTasks = JSON.parse(localStorage.getItem('tasks'))||[];
            savedTasks.forEach(({text , completed})=> addTask(text,completed, false));
            toggleEmptyState();
            updateProgress();
        }

        const addTask = (text = '', completed = false, checkCompletion= true, event = null) => {
            if (event) event.preventDefault(); // Prevent form reload on submit

            const taskText = text || taskInput.value.trim();
            if (!taskText) return;

            const li = document.createElement('li');
            li.innerHTML = `
                <input type="checkbox" class="checkbox" ${completed ? 'checked' : ''} />
                <span>${taskText}</span>
                <div class="task-buttons">
                    <button class="edit-btn"><i class="fa-solid fa-pen"></i></button>
                    <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
                </div>
            `;

            const checkbox = li.querySelector('.checkbox');
            const editBtn = li.querySelector('.edit-btn');

            if (completed) {
                li.classList.add('completed');
                editBtn.disabled = true;
                editBtn.style.opacity = '0.5';
                editBtn.style.pointerEvents = 'none';
            }

            checkbox.addEventListener('change', () => {
                const isChecked = checkbox.checked;
                li.classList.toggle('completed', isChecked);
                editBtn.disabled = isChecked;
                editBtn.style.opacity = isChecked ? '0.5' : '1';
                editBtn.style.pointerEvents = isChecked ? 'none' : 'auto';
                updateProgress();
                saveTaskToLocalStorage();
            });

            editBtn.addEventListener('click', () => {
                if (!checkbox.checked) {
                    taskInput.value = li.querySelector('span').textContent;
                    li.remove();
                    toggleEmptyState();
                    updateProgress(false);
                    saveTaskToLocalStorage();
                }
            });

            li.querySelector('.delete-btn').addEventListener('click', () => {
                li.remove();
                toggleEmptyState();
                updateProgress();
                saveTaskToLocalStorage();
            });

            taskList.appendChild(li);
            taskInput.value = '';
            toggleEmptyState();
            updateProgress(checkCompletion);
            saveTaskToLocalStorage();
        };

        addTaskBtn.addEventListener('click', (e) => addTask('', false, true, e));

        taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
            addTask('', false, true, e);
        }
        });

        loadTasksFromLocalStroage();
    });

    const Confetti = ()=> {
        const end = Date.now() + 15 * 1000;

    // go Buckeyes!
        const colors = ["#bb0000", "#ffffff"];

        (function frame() {
        confetti({
            particleCount: 2,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: colors,
        });

        confetti({
            particleCount: 2,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: colors,
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
        })();
    };
