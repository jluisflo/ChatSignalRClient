export class Message {
  constructor(author: string, message: string, avatar: string) {
    this.author = author;
    this.message = message;
    this.avatar = avatar;
  }
  author: string;
  message: string;
  avatar: string;
}
