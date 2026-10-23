interface Filesystem {
  getSize(): number
  printStructure(): void
  delete(): void
}

class FileNode implements Filesystem {
  private readonly name: string;
  private readonly size: number;

  constructor(name: string, size: number) {
    this.name = name;
    this.size = size;
  }

  getSize(): number {
    return this.size;
  }

  printStructure(): void {
      console.log(this.name + " (" + this.size + " KB)");
  }

  delete(): void {
      console.log("Deleting file: " + this.name);
  }
}

class FolderNode implements Filesystem {
    private readonly name: string;
    private readonly children: Filesystem[] = [];

    constructor(name: string) {
        this.name = name;
    }

    addItem(item: Filesystem): void {
        this.children.push(item);
    }

    removeItem(item: Filesystem): void {
        const index = this.children.indexOf(item);
        if (index !== -1) {
            this.children.splice(index, 1);
        }
    }

    getSize(): number {
        let total = 0;
        for (const item of this.children) {
            total += item.getSize();
        }
        return total;
    }

    printStructure(): void {
        console.log(this.name + "/");
        for (const item of this.children) {
            item.printStructure();
        }
    }

    delete(): void {
        for (const item of this.children) {
            item.delete();
        }
        console.log("Deleting folder: " + this.name);
    }
}

//------------------------------

const file1: Filesystem = new FileNode("readme.txt", 5);
const file2: Filesystem = new FileNode("photo.jpg", 1500);
const file3: Filesystem = new FileNode("data.csv", 300);

const documents = new FolderNode("Documents");
documents.addItem(file1);
documents.addItem(file3);

const pictures = new FolderNode("Pictures");
pictures.addItem(file2);

const home = new FolderNode("Home");
home.addItem(documents);
home.addItem(pictures);

console.log("---- File Structure ----");
home.printStructure();

console.log("\nTotal Size: " + home.getSize() + " KB");

console.log("\n---- Deleting All ----");
home.delete();
