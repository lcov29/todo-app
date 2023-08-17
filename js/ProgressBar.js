class ProgressBar {


   #completedTasksBar;
   #openTasksBar;


   constructor() {
      this.#completedTasksBar = document.getElementById('progress-bar-completed-tasks');
      this.#openTasksBar = document.getElementById('progress-bar-open-tasks');
   }


   display(completedTasksAmount, openTasksAmount) {
      const totalTasksAmount = completedTasksAmount + openTasksAmount;
      this.#updateCompletedTasksBar(completedTasksAmount, totalTasksAmount);
      this.#updateOpenTasksBar(openTasksAmount, totalTasksAmount);
   }


   #updateCompletedTasksBar(completedTasksAmount, totalTasksAmount) {
      let message = '';

      const isBarCompletelyFilled = completedTasksAmount === totalTasksAmount;
      if (isBarCompletelyFilled) {
         message = 'All tasks completed 👍';
      }

      const isBarPartiallyFilled = completedTasksAmount > 0 && completedTasksAmount < totalTasksAmount;
      if (isBarPartiallyFilled) {
         message = completedTasksAmount;
      }

      const isBarEmpty = completedTasksAmount === 0;
      if (isBarEmpty) {
         message = '';
      }

      this.#completedTasksBar.textContent = message;
      this.#completedTasksBar.style = `width: ${100 * (completedTasksAmount / totalTasksAmount)}%;`;
   }


   #updateOpenTasksBar(openTasksAmount, totalTasksAmount) {
      let message = '';
      
      const isBarCompletelyFilled = openTasksAmount === totalTasksAmount;
      if (isBarCompletelyFilled) {
         message = `${openTasksAmount} tasks to complete`;
      }
      
      const isBarPartiallyFilled = openTasksAmount > 0 && openTasksAmount < totalTasksAmount;
      if (isBarPartiallyFilled) {
         message = openTasksAmount;
      }
      
      const isBarEmpty = openTasksAmount === 0;
      if (isBarEmpty) {
         message = '';
      }
      
      this.#openTasksBar.textContent = message;
      this.#openTasksBar.style = `width: ${100 * (openTasksAmount / totalTasksAmount)}%;`;
   }
   

}


export { ProgressBar };