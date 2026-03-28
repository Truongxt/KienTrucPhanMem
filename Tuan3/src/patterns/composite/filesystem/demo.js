/*
Composite Pattern: File system tree structure

FolderComposite (root)
  + documents
    - report.pdf
    - notes.txt
  + images
    - logo.png
    - banner.jpg
  - readme.md

Each FolderComposite can contain FileLeaf or FolderComposite.
FileLeaf is a leaf node and cannot contain children.
*/
const FileLeaf = require("./FileLeaf");
const FolderComposite = require("./FolderComposite");

function runCompositeFileSystemDemo() {
  const root = new FolderComposite("root");
  const docs = new FolderComposite("documents");
  const images = new FolderComposite("images");

  docs.add(new FileLeaf("report.pdf", 1200));
  docs.add(new FileLeaf("notes.txt", 8));

  images.add(new FileLeaf("logo.png", 240));
  images.add(new FileLeaf("banner.jpg", 680));

  root.add(docs);
  root.add(images);
  root.add(new FileLeaf("readme.md", 3));

  root.show();
}

module.exports = { runCompositeFileSystemDemo };
