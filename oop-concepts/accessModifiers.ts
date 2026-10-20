class User {
  private name: string;
  private email: string;
  private role: string;

  constructor(name: string, email: string, role: string) {
    this.name = name;
    this.email = email;
    this.role = role
  }

  public getName(): string {
    return this.name
  }

  public getEmail(): string {
    return this.email
  }

  public getRole(): string {
    return this.role
  }

  protected sendSMS() {
    console.log('User is notified');
  }

  public udpateEmail(email: string) {
    this.email = email;
    this.store();
  }

  private store() {
    console.log('store in db');
  } 
}

class AdminUser extends User {
  constructor(name: string, email: string, role: string) {
    super(name, email, role)
  }

  public alertUser(message: string): void {
    console.log(`Sending alert: ${message}`);
    
    // ✅ ALLOWED: Child class can call protected methods
    this.sendSMS(); 
  }
}

const admin = new AdminUser("Alice", "alice@corp.com", "admin");
// ✅ ALLOWED: Calling PUBLIC methods
console.log('UserName:', admin.getName());
admin.alertUser("System reboot at midnight");