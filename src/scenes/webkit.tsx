import { Code, Img, Rect, lines, makeScene2D, word } from "@motion-canvas/2d";
import {
  Direction,
  slideTransition,
  waitFor,
  createRef,
  all,
  waitUntil,
  chain,
  DEFAULT,
  delay,
} from "@motion-canvas/core";

import config from "../config";
import webkitWriteIMG from "../../assets/webkit-write.png";
import opfsExtIMG from "../../assets/opfs-extension.png";
import psOPFSIMG from "../../assets/photoshop-opfs.png";

export default makeScene2D(function* (view) {
  view.fill("#101820");

  const webkitWriteRef = createRef<Img>();
  yield view.add(
    <Img
      src={webkitWriteIMG}
      width={0}
      ref={webkitWriteRef}
      {...config.shadow.primary}
      radius={20}
    ></Img>
  );

  yield* all(
    slideTransition(Direction.Bottom, 1.5),
    webkitWriteRef().width(1500, 2)
  );

  yield* waitUntil("hide blog");

  yield* all(webkitWriteRef().width(0, 1));
  webkitWriteRef().remove();

  const mainCodeRef = createRef<Code>();
  const workerCodeRef = createRef<Code>();
  const codeRectRef = createRef<Rect>();

  yield view.add(
    <Rect
      layout
      width={1700}
      justifyContent={"stretch"}
      alignItems={"center"}
      ref={codeRectRef}
    >
      <Code ref={mainCodeRef}></Code>
      {/* <Code code="const hello;" ref={workerCodeRef}></Code> */}
    </Rect>
  );

  yield* waitUntil("show new FSworker");

  yield* mainCodeRef().code.append(
    `\
const worker = new FsWorker();
`,
    1
  );

  yield* waitUntil("show postMessage");

  yield* mainCodeRef().code.append(
    `
worker.postMessage({}); // pass data to write
`,
    1.5
  );

  yield* waitUntil("show addEventListener");

  yield* mainCodeRef().code.append(
    `
worker.addEventListener("message", () => {
    // do stuff after writing
})`,
    2
  );

  yield* waitUntil("show worker code");

  codeRectRef().add(<Code ref={workerCodeRef}></Code>);

  yield* all(
    mainCodeRef().scale(0.5, 2),
    workerCodeRef().scale(0.5, 2),
    workerCodeRef().margin([0, 280, 0, 0], 2),
    workerCodeRef().code(
      `\
self.onmessage = async (event) => {

};

export {};`,
      2
    )
  );

  yield* waitUntil("adv-1 root handle");
  yield* workerCodeRef().code.insert(
    [1, 0],
    `\
    let root = await navigator.storage.getDirectory();
`,
    1
  );

  yield* waitUntil("adv-2 create sync access handle");
  yield* workerCodeRef().code.insert(
    [2, 0],
    `\
    let handle: FileSystemFileHandle; // dummy file handle

    const syncHandle = await handle.createSyncAccessHandle();
`,
    1
  );

  yield* waitUntil("adv-3 truncate");
  yield* workerCodeRef().code.insert(
    [6, 0],
    `\
    syncHandle.truncate(0);
`,
    1
  );

  yield* waitUntil("adv-4 write");
  yield* workerCodeRef().code.insert(
    [7, 0],
    `\
    syncHandle.write(content);
`,
    1
  );

  yield* waitUntil("adv-5 flush");
  yield* workerCodeRef().code.insert(
    [8, 0],
    `
    syncHandle.flush();
`,
    1
  );

  yield* waitUntil("adv-6 close");
  yield* workerCodeRef().code.insert(
    [10, 0],
    `\
    syncHandle.close();
`,
    1
  );

  yield* waitUntil("adv-7 inform");
  yield* workerCodeRef().code.insert(
    [11, 0],
    `
    self.postMessage(true);
`,
    1
  );

  yield* waitUntil("adv-n main");
  yield* mainCodeRef().code.insert(
    [2, 20],
    `
    mode: "write",
    path,
    content: content
`,
    2
  );

  yield* waitUntil("declare path const");

  yield* mainCodeRef().code.insert(
    [1, 0],
    `
const path = "downloads/file.pdf";
const content = "Hello, world!"
`,
    2
  );

  yield* workerCodeRef().code.insert(
    [1, 0],
    `\
    let { mode, path, content: src_content } = event.data;

`,
    2
  );

  yield* waitUntil("show recursive func");

  yield* workerCodeRef().code.prepend(
    `\
const getHandleFromPath: FileSystemFileHandle = async (
    base: FileSystemDirectoryHandle,
    path: string
) => {
    if (path.includes("/")) {
        let dirName = path.split("/")[0];
    
        return await getHandleFromPath(
            await base.getDirectoryHandle(dirName),
            path.slice(dirName.length + 1)
        );
    } else {
        return await base.getFileHandle(path, { create: true });
    }
};

`,
    5
  );

  yield* waitUntil("use recursive function");

  yield* workerCodeRef().code.replace(
    word(20, 36, 22),
    `\

        = await getHandleFromPath(root, path) // real file handle`,
    2
  );

  yield* waitUntil("show switch statement");
  yield* chain(
    workerCodeRef().code.remove(lines(0, 15), 1),
    workerCodeRef().code.replace(
      lines(7, 14),
      `\
    switch (mode) {
        case "write":
            const syncHandle = await handle.createSyncAccessHandle();

            syncHandle.truncate(0);
            syncHandle.write(content);
            syncHandle.flush();

            syncHandle.close();
            break;

        default:
            break;
    }

`,
      3
    )
  );

  yield* waitUntil("show basic type hinting");

  yield* workerCodeRef().code.replace(
    lines(0, 0),
    `\
self.onmessage = async (
    event: MessageEvent<{
        mode: string;
        path: string;
        content: string | Blob;
    }>
) => {  
`,
    5
  );

  yield* waitUntil("show array buffer conversion");
  yield* workerCodeRef().code.insert(
    [12, 0],
    `
    let content;

    // convert all types to array buffer
    if (typeof src_content == "string") {
        const textEncoder = new TextEncoder();
        content = textEncoder.encode(src_content);
    } else if (src_content instanceof Blob) {
        content = await src_content.arrayBuffer();
    }
`,
    5
  );

  yield* waitUntil("simple main thread modification");
  yield* all(
    mainCodeRef().code(
      `
const write = async (path: string, content: any) => {
  const worker = new FsWorker();

  const id = Math.random();

  worker.postMessage({
    mode: "write",
    path,
    content: content,
    id,
  });

  return new Promise<void>((resolve, reject) => {
    worker.addEventListener("message", (event) => {
      if (event.data == id) {
        resolve();
      }
    });
  });
}`,
      5
    ),
    mainCodeRef().margin([0, 200, 0, 0], 5),
    workerCodeRef().scale(0.4, 5)
  );

  yield* waitUntil("show worker final code");

  // const getHandleFromPath: FileSystemFileHandle = async (
  //   base: FileSystemDirectoryHandle,
  //   path: string
  // ) => {
  //   if (path.includes("/")) {
  //     let dirName = path.split("/")[0];

  //     return await getHandleFromPath(
  //       await base.getDirectoryHandle(dirName),
  //       path.slice(dirName.length + 1)
  //     );
  //   } else {
  //     return await base.getFileHandle(path, { create: true });
  //   }
  // };

  yield* all(
    workerCodeRef().code(
      `\
self.onmessage = async (
  event: MessageEvent<{
    mode: string;
    path: string;
    content: string | Blob;
    id: string;
  }>
) => {
  let { mode, path, content: src_content, id } = event.data;

  let root = await navigator.storage.getDirectory();
  let handle: FileSystemFileHandle = await getHandleFromPath(root, path);

  let content;

  if (typeof src_content == "string") {
    const textEncoder = new TextEncoder();
    content = textEncoder.encode(src_content);
  } else if (src_content instanceof Blob) {
    content = await src_content.arrayBuffer();
  }


  switch (mode) {
    case "write":
      const syncHandle =
          await handle.createSyncAccessHandle();

      syncHandle.truncate(0);
      syncHandle.write(content);
      syncHandle.flush();

      syncHandle.close();
      break;

    default:
      break;
  }

  self.postMessage(id);
};

export {};
      
`,
      2
    )
  );

  yield* workerCodeRef().scale(0.4, 5);

  const psOPFSRef = createRef<Img>();
  const opfsExtRef = createRef<Img>();

  yield view.add(
    <>
      <Img
        src={psOPFSIMG}
        radius={10}
        {...config.shadow.primary}
        ref={psOPFSRef}
      ></Img>
      <Img
        src={opfsExtIMG}
        radius={10}
        {...config.shadow.primary}
        ref={opfsExtRef}
      ></Img>
    </>
  );

  psOPFSRef().width(0);
  opfsExtRef().width(0);

  yield* waitUntil("show extension");

  yield* all(
    mainCodeRef().scale(0, 1),
    workerCodeRef().scale(0, 1),
    opfsExtRef().width(DEFAULT, 1),
    delay(
      2,
      all(
        psOPFSRef().width(DEFAULT, 1),
        opfsExtRef().position([500, 300], 1.25)
      )
    )
  );

  yield* waitUntil("hide ext");

  yield* all(psOPFSRef().scale(0, 1), opfsExtRef().scale(0, 1));

  yield* waitUntil("salutation");
});
