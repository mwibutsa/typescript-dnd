/// <reference path="base-component.ts" />
/// <reference path="../decorators/autobind.ts" />
namespace App {
  export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    constructor() {
      super("project-input", "app", true, "user-input");

      this.titleInputElement = <HTMLInputElement>(
        this.element.querySelector("#title")
      );

      this.descriptionInputElement = <HTMLInputElement>(
        this.element.querySelector("#description")
      );

      this.peopleInputElement = <HTMLInputElement>(
        this.element.querySelector("#people")
      );
      this.configure();
    }
    @AutoBind
    private gatherUserInput(): [string, string, number] | void {
      const enteredTitle = this.titleInputElement.value;
      const enteredDescription = this.descriptionInputElement.value;
      const enteredPeople = this.peopleInputElement.value;

      const titleValidateAble: ValidateAble = {
        value: enteredTitle,
        required: true,
      };
      const descriptionValidateAble: ValidateAble = {
        value: enteredDescription,
        required: true,
        minLength: 5,
      };
      const peopleValidateAble: ValidateAble = {
        value: +enteredPeople,
        required: true,
        min: 1,
        max: 5,
      };

      if (
        !validate(titleValidateAble) ||
        !validate(descriptionValidateAble) ||
        !validate(peopleValidateAble)
      ) {
        alert("Invalid input, please try again");
      } else {
        return [enteredTitle, enteredDescription, +enteredPeople];
      }
    }
    renderContent() {}
    configure() {
      this.element.addEventListener("submit", this.submitHandler);
    }

    private clearInputs() {
      this.titleInputElement.value = "";
      this.descriptionInputElement.value = "";
      this.peopleInputElement.value = "";
    }

    @AutoBind
    private submitHandler(event: Event) {
      event.preventDefault();
      const userInput = this.gatherUserInput();

      if (Array.isArray(userInput)) {
        const [title, description, people] = userInput;
        projectState.addProject(title, description, people);
        this.clearInputs();
      }
    }
  }
}
