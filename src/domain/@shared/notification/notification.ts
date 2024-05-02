export type NotificationErrorProps = {
  message: string;
  context: string;
};

export class Notification {
  private errors: NotificationErrorProps[] = [];

  addError(error: NotificationErrorProps) {
    this.errors.push(error);
  }

  messages(context?: string) {
    if (!context) {
      return this.errors.map((error) => error.message).join(', ');
    }
    return this.errors
      .filter((error) => error.context === context)
      .map((error) => `${error.context}: ${error.message}`)
      .join(', ');
  }

  hasErrors(context?: string) {
    if (!context) {
      return this.errors.length > 0;
    }
    return this.errors.some((error) => error.context === context);
  }

  getErrors() {
    return this.errors;
  }
}
