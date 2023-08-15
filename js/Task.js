class Task {
   

   #id;
   #priority;
   #title;
   #description;
   #done;
   #taskHtmlContainer;


   constructor(props) {
      const { id, priority, title, description, done } = props;
      this.#id = id;
      this.#priority = priority;
      this.#title = title;
      this.#description = description;
      this.#done = done;
      this.#taskHtmlContainer = this.#generateHtmlContainer();
   }


   get id() {
      return this.#id;
   }


   get json() {
      return {
         id: this.#id,
         priority: this.#priority,
         title: this.#title,
         description: this.#description,
         done: this.#done
      };
   }


   generateHtml(saveFn, deleteFn) {
      const container = this.#generateHtmlContainer();
      container.appendChild(this.#generateHtmlCheckbox(saveFn));
      container.appendChild(this.#generateHtmlTaskText());
      container.appendChild(this.#generateHtmlTaskDeleteButton(deleteFn));
      return container;
   }


   #generateHtmlContainer() {
      const element = document.createElement('section');
      element.classList.add('task');
      return element;
   }


   #generateHtmlCheckbox(saveFn) {
      const element = document.createElement('input');
      element.setAttribute('type', 'checkbox');
      element.addEventListener('change', (e) => { 
         this.#done = e.target.checked;
         saveFn(); 
      });

      if (this.#done) {
         element.setAttribute('checked', '');
      }

      return element;
   }


   #generateHtmlTaskText() {
      if (this.#description !== '') {
         const summary = document.createElement('summary');
         summary.textContent = this.#title;

         const element = document.createElement('details');
         element.textContent = this.#description;
         element.appendChild(summary);

         return element;
      }
   
      const element = document.createElement('p');
      element.textContent = this.#title;
      return element;
   }


   #generateHtmlTaskDeleteButton(deleteFn) {
      const element = document.createElement('button');
      element.textContent = 'X';
      element.setAttribute('type', 'button');
      element.addEventListener('click', () => {
         this.#taskHtmlContainer.remove();
         deleteFn(this.#id);
      });
      return element;
   }


}


export { Task };
