export class resUser {
    public idToken: string;
    public email: string;
    public refreshToken: string;
    public expiresIn: string;
    public localId: string;
    public registered?: string;
  
    constructor(idToken: string, email: string, refreshToken: string, expiresIn: string, localId: string,registered:string) {
      this.idToken = idToken;
      this.email = email;
      this.refreshToken = refreshToken;
      this.expiresIn = expiresIn;
      this.localId = localId;
      this.registered = registered;
    }
  }
  export class ActiveUser {
    constructor(public email: string, public id: string, private _token: string, private _tokenexpirationdate: Date) {
      // Fill in constructor logic here if needed
    }
  
    get token(): string | null {
      if (this._tokenexpirationdate && this._tokenexpirationdate < new Date()) {
        return null ;
      } else {
        return this._token;
      }
    }
  }