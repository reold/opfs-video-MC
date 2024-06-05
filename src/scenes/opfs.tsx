import {
  CODE,
  Code,
  View2D,
  lines,
  makeScene2D,
  Rect,
  Txt,
  word,
  Node,
  RectProps,
} from "@motion-canvas/2d";
import config from "../config";

import {
  createRef,
  Direction,
  slideTransition,
  waitUntil,
  waitFor,
  all,
  delay,
  DEFAULT,
} from "@motion-canvas/core";

export default makeScene2D(function* (view) {
  view.fill("#1b1b1b");

  yield* slideTransition(Direction.Top, 1);

  const codeRef = createRef<Code>();

  yield view.add(<Code ref={codeRef}></Code>);

  yield* codeRef().code.append(
    `\
// just like any file system
`,
    1
  );

  yield* codeRef().code.append(
    `\
// the OPFS also has a root directory
`,
    1
  );

  yield* all(
    showFS(view, { name: "root", children: [] }, 2.5, { y: -300 }),

    codeRef().code.append(
      CODE`
// it can be accessed using the
// navigator's storage manager
`,
      2.5
    )
  );

  yield* waitUntil("get root");

  yield* codeRef().code.append(
    `
// like this
`,
    2
  );

  yield* codeRef().code.append(
    `\
const root = await navigator.storage.getDirectory();
`,
    3
  );

  yield* codeRef().code.remove(lines(0, 6), 1);
  yield* codeRef().code.prepend(
    `
// get OPFS root directory handle
`,
    1
  );

  yield* showFS(view, { name: "root (empty)", children: [] }, 4, { y: -300 });

  yield* waitUntil("get file");

  yield* codeRef().code.append(
    `
// get a file in the root directory
const helloFile = await root.getFileHandle("hello.txt");
`,
    2
  );

  yield* waitUntil("create=true");

  yield* all(
    showFS(
      view,
      {
        name: "root",
        children: [{ name: "hello.txt", children: [] }],
      },
      4,
      { y: -300 }
    ),
    codeRef().scale(0.78, 2),
    delay(0.5, codeRef().code.insert([5, 54], ", {create: true}", 2))
  );

  yield* waitUntil("get downloads/file.pdf");

  yield* showFS(
    view,
    {
      name: "root",
      children: [
        { name: "downloads", children: [{ name: "file.pdf", children: [] }] },
      ],
    },
    8,
    { y: -300 }
  );

  yield* waitUntil("get folder");

  yield* codeRef().code.append(
    `
// get a folder in the root directory
const downloadsFolder = await root.getDirectoryHandle("downloads");
`,
    2
  );

  yield* all(codeRef().scale(0.67, 2));

  yield* waitUntil("get file.pdf");

  yield* all(
    codeRef().code.append(
      `
// get a file inside of this folder
const fileHandle = await downloadsFolder.getFileHandle("file.pdf");
`,
      2
    )
  );

  yield* waitUntil("get file.pdf readable");

  yield* all(
    codeRef().code.append(
      `
// reading the file
const readableFile = await fileHandle.getFile();
`,
      2
    ),
    delay(
      1,

      codeRef().code.remove(lines(4, 8), 1)
    )
  );

  yield* waitUntil("readable properties");

  yield* all(
    codeRef().code.append(
      `
console.log(readableFile.name) // file.pdf
console.log(readableFile.size) // size in bytes
console.log(readableFile.type) // type of file
console.log(await readableFile.text()) // text content in file
`,
      2
    )
  );

  yield* waitUntil("show other methods");

  yield* all(
    codeRef().code.replace(word(14, 31, 4), "stream", 1),
    codeRef().code.replace(word(14, 38, 24), "", 1)
  );
  yield* waitFor(0.5);
  yield* codeRef().code.replace(word(14, 31, 6), "arrayBuffer", 1);

  yield* waitUntil("create writable");

  yield* codeRef().code.append(
    `
// write a string to the file
const writableFile = await fileHandle.createWritable();
`,
    2
  );

  yield* waitUntil("write to writable");

  yield* codeRef().code.append(
    `
await writableFile.write("Hello, world!");
`,
    2
  );

  yield* waitUntil("close writable");
  yield* codeRef().code.append(
    `\
await writableFile.close();
`,
    2
  );

  yield* waitUntil("deletion file");

  yield* codeRef().code.append(
    `
// delete a file from folder
await downloadsFolder.removeEntry("file.pdf");
`,
    2
  );

  yield* waitUntil("show removed fs");

  yield* showFS(
    view,
    {
      name: "root",
      children: [{ name: "downloads (empty)", children: [] }],
    },
    3,
    { y: -300 }
  );

  yield* waitUntil("nuke folder");

  yield* all(
    codeRef().code.append(
      `
// nuke a directory
await downloadsFolder.remove({ recursive: true });`,
      2
    ),
    codeRef().y(-100, 2)
  );

  yield* waitUntil("show file handle remove");

  yield* all(
    codeRef().code.replace(word(26, 6, 15), "fileHandle", 2),
    codeRef().code.replace(word(26, 29, 19), "", 2)
  );

  yield* waitUntil("show awaits");

  for (let range of codeRef().findAllRanges("await").slice()) {
    console.log(range);
    yield* codeRef().selection(range, 0.25);
  }

  yield* waitFor(0.5);

  yield* all(
    codeRef().selection(DEFAULT, 1),
    codeRef().scale(0.6, 1),
    codeRef().y(0, 1)
  );

  yield* waitUntil("in async func ");
  yield* all(
    codeRef().code(
      `\
const handleOpfs = async () => {
  // get OPFS root directory handle
  const root = await navigator.storage.getDirectory();

  // get a folder in the root directory
  const downloadsFolder = await root.getDirectoryHandle("downloads");

  // get a file inside of this folder
  const fileHandle = await downloadsFolder.getFileHandle("file.pdf");

  // reading the file
  const readableFile = await fileHandle.getFile();

  console.log(readableFile.name) // file.pdf
  console.log(readableFile.size) // size in bytes
  console.log(readableFile.type) // type of file
  console.log(await readableFile.text()) // text content in file

  // write a string to the file
  const writableFile = await fileHandle.createWritable();

  await writableFile.write("Hello, world!");
  await writableFile.close();

  // delete a file from folder
  await downloadsFolder.removeEntry("file.pdf");

  // nuke a directory
  await downloadsFolder.remove({ recursive: true });
}`,
      2
    )
  );

  yield* waitUntil("end opfs");
});

function* showFS(
  view: View2D,
  struct: { name: string; children: { name: string; children: [] }[] },
  duration: number = 2,
  rectProps: RectProps = {}
) {
  let children: Node[] = [];

  const getChildren = (
    parent: { name: string; children: { name: string; children: [] }[] },
    depth: number
  ) => {
    parent.children.forEach((child) => {
      console.log("child", child, "depth", depth);
      children = [
        ...children,
        <Txt fill="white" marginLeft={50 * depth}>
          ↪ {child.name}
        </Txt>,
      ];
      if (child.children && child.children.length > 0) {
        getChildren(child, depth + 1);
      }
    });
  };

  getChildren(struct, 1);
  const rectRef = createRef<Rect>();

  yield view.add(
    <Rect
      {...rectProps}
      fill="rgba(0, 0, 0, 0.5)"
      layout
      direction={"column"}
      alignItems={"start"}
      padding={20}
      radius={20}
      {...config.shadow.primary}
      shadowBlur={50}
      ref={rectRef}
    >
      <Txt fill="white" fontWeight={900}>
        - {struct.name}
      </Txt>
      {...children}
    </Rect>
  );

  rectRef().scale(0);
  yield* rectRef().scale(1, 1);

  yield* waitFor(duration);

  yield* rectRef().scale(0, 1);
  rectRef().remove();
}
