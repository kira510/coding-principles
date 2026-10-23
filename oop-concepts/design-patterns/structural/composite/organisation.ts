interface OrgMember {
  getSalary(): number;
  getHeadCount(): number;
  printHierarchy(indent: string): void;
}

class Employee implements OrgMember {
  private readonly name: string;
  private readonly title: string;
  private salary: number;

  constructor(name: string, title: string, salary: number) {
    this.name = name;
    this.title = title;
    this.salary = salary;
  }

  getSalary(): number {
    return this.salary;
  }

  getHeadCount(): number {
    return 1;
  }

  printHierarchy(indent: string): void {
    console.log(`${indent}- ${this.name} (${this.title}, $${this.salary})`);
  }
}

class Manager implements OrgMember {
  private readonly name: string;
  private readonly title: string;
  private salary: number;
  private members: OrgMember[] = [];

  constructor(name: string, title: string, salary: number) {
    this.name = name;
    this.title = title;
    this.salary = salary;
  }

  addMember(member: OrgMember): void {
    this.members.push(member);
  }

  removeMember(member: OrgMember): void {
    const index = this.members.indexOf(member);
    if (index !== -1) this.members.splice(index, 1);
  }

  getSalary(): number {
    return this.salary;
  }

  getHeadCount(): number {
    return 1;
  }

  printHierarchy(indent: string): void {
    console.log(`${indent}- ${this.name} (${this.title}, $${this.salary})`);
    for (const member of this.members) member.printHierarchy(indent + "  ");
  }
}


//-------------------------
const dev1 = new Employee("Alice", "Senior Engineer", 120000);
const dev2 = new Employee("Bob", "Engineer", 95000);
const dev3 = new Employee("Charlie", "Engineer", 90000);
const designer = new Employee("Diana", "Designer", 100000);

const techLead = new Manager("Eve", "Tech Lead", 140000);
techLead.addMember(dev1);
techLead.addMember(dev2);

const vpEng = new Manager("Frank", "VP Engineering", 200000);
vpEng.addMember(techLead);
vpEng.addMember(dev3);

const vpProduct = new Manager("Grace", "VP Product", 190000);
vpProduct.addMember(designer);

const ceo = new Manager("Hank", "CEO", 300000);
ceo.addMember(vpEng);
ceo.addMember(vpProduct);