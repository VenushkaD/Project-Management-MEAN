export class User {
  constructor(
    public id: string | null,
    public name: string | null,
    public email: string,
    public password: string | null,
    public imageUrl: string | '',
    public token: string | null
  ) {}
}
