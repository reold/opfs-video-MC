import { makeScene2D } from "@motion-canvas/2d";
import { DEFAULT, createRef, useDuration } from "@motion-canvas/core";

import { all, delay, waitFor, waitUntil } from "@motion-canvas/core";
import { Img, Txt, Rect, Path, Code } from "@motion-canvas/2d";

import config from "../config";
import ProjectFuguIMG from "../../assets/project-fugu.png";
import FuguDemosIMG from "../../assets/fugu-demos.png";
import pwaMemeIMG from "../../assets/pwa-meme.png";
import fuguApiIMG from "../../assets/fugu-apis.png";
import opfsIsolationIMG from "../../assets/opfs-isolation.png";
import urlOriginIMG from "../../assets/url-origin.svg";
import photoshopOPFSIMG from "../../assets/photoshop-opfs.png";
import firefoxQuotaIMG from "../../assets/firefox-quota.png";
import chromeQuotaIMG from "../../assets/chrome-quota.png";
import opfsImplementationIMG from "../../assets/opfs-implementation.png";

export default makeScene2D(function* (view) {
  const imgRef = createRef<Img>();
  const headingRef = createRef<Txt>();
  const demoRef = createRef<Img>();
  const memeRef = createRef<Img>();
  const fuguApiRef = createRef<Img>();
  const pointerRef = createRef<Txt>();
  const OPFSTextRef = createRef<Txt>();
  const OPFSCaptionRef = createRef<Txt>();
  const jsLogoRef = createRef<Path>();
  const OPFSHeadingRef = createRef<Path>();
  const opfsCodeRef = createRef<Code>();
  const opfsIsolationRef = createRef<Img>();

  yield view.add(
    <>
      <Rect layout direction={"column"} alignItems={"center"} opacity={1}>
        <Img src={ProjectFuguIMG} ref={imgRef} {...config.shadow.primary}></Img>
        <Txt
          fill={"#fff"}
          {...config.shadow.primary}
          fontWeight={900}
          fontSize={90}
          ref={headingRef}
          marginBottom={20}
          letterSpacing={-5}
        ></Txt>
        <Img
          radius={20}
          {...config.shadow.primary}
          src={FuguDemosIMG}
          ref={demoRef}
        ></Img>
        <Img
          src={pwaMemeIMG}
          radius={20}
          ref={memeRef}
          {...config.shadow.primary}
        ></Img>
      </Rect>
      <Img
        src={fuguApiIMG}
        radius={20}
        ref={fuguApiRef}
        y={-3000}
        {...config.shadow.primary}
      ></Img>
      <Rect
        layout
        direction={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        ref={OPFSHeadingRef}
        x={2}
        y={93}
        rowGap={50}
      >
        <Txt
          {...config.shadow.primary}
          fontSize={30}
          fontWeight={900}
          ref={OPFSTextRef}
        >
          Origin Private File System
        </Txt>
        <Txt
          {...config.shadow.primary}
          fontSize={50}
          fill={"gray"}
          fontWeight={900}
          ref={OPFSCaptionRef}
          textAlign={"start"}
        >
          comes as part of the
        </Txt>
        <Img
          src={opfsIsolationIMG}
          ref={opfsIsolationRef}
          width={0}
          {...config.shadow.primary}
          radius={20}
        ></Img>
      </Rect>

      <Path
        data={
          "M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"
        }
        ref={jsLogoRef}
        lineWidth={1}
        stroke={"white"}
        scale={0}
        start={0}
        end={0}
      ></Path>
      <Code
        ref={opfsCodeRef}
        fontSize={50}
        y={60}
        {...config.shadow.primary}
        shadowOffset={[0, 5]}
      ></Code>
      <Txt
        {...config.shadow.primary}
        fontSize={250}
        ref={pointerRef}
        zIndex={1000}
      >
        👉
      </Txt>
    </>
  );

  imgRef().opacity(0);
  headingRef().scale(0);
  demoRef().width(0);
  memeRef().width(0);
  fuguApiRef().width(500);
  pointerRef().y(-675);
  pointerRef().x(-400);

  pointerRef().rotation(-145);

  OPFSHeadingRef().opacity(0);
  OPFSCaptionRef().opacity(0);

  yield* all(
    imgRef().opacity(1, 2),
    delay(
      1.5,
      all(headingRef().scale(1, 1), headingRef().text("PROJECT FUGU", 1))
    )
  );

  yield* waitUntil("hide fugu");

  yield* all(
    demoRef().width(1000, 2),
    delay(1, all(imgRef().width(0, 1), headingRef().fontSize(0, 1)))
  );

  yield* waitUntil("hide demo");

  yield* all(demoRef().width(0, 1), delay(0.2, memeRef().width(1000, 1)));
  yield* waitUntil("hide meme");

  yield* all(
    memeRef().width(0, 1),
    fuguApiRef().y(50, 5),
    delay(
      2.5,
      all(
        pointerRef().x(-400, 2.5),
        pointerRef().y(90, 2.5),
        pointerRef().rotation(0, 2)
      )
    )
  );

  OPFSHeadingRef().position([-54, 117]);

  yield* all(OPFSHeadingRef().opacity(1, 0.2));
  yield* all(
    pointerRef().x(-1100, 1.5),
    fuguApiRef().y(58000, 2),
    OPFSTextRef().scale(4, 2),
    OPFSHeadingRef().x(-50, 1.5),
    OPFSHeadingRef().y(0, 1.5),
    OPFSTextRef().fontWeight(900, 0.2),
    delay(0.4, OPFSTextRef().fill("#fff", 0.2))
  );

  yield* all(
    OPFSCaptionRef().opacity(1, 0.2),
    OPFSCaptionRef().text("File System API", 2)
  );

  yield* waitUntil("hide heading");

  yield* all(
    OPFSTextRef().text("File System API", 3),
    OPFSHeadingRef().y(-300, 2),
    OPFSTextRef().scale(3, 2.5),
    delay(1, OPFSCaptionRef().opacity(0, 1.5)),
    opfsCodeRef().code(
      `\
// sample code only

// read file
const [fileHandle] = await window.showOpenFilePicker();
const file = await fileHandle.getFile();
`,
      2
    )
  );

  yield* opfsCodeRef().code(
    `\
// sample code only

// save file
const newHandle = await window.showSaveFilePicker();

const writableStream = await newHandle.createWritable();
await writableStream.write(data);
await writableStream.close();
`,
    2
  );

  yield* waitUntil("hide file system api");
  yield* all(
    OPFSHeadingRef().gap(0, 1),
    OPFSTextRef().text("OPFS", 2),
    OPFSHeadingRef().y(0, 1.5),
    opfsCodeRef().code("", 1.5)
  );

  yield* waitUntil("reveal full-form");
  yield* all(OPFSTextRef().text("Origin Private File System", 1));

  yield* waitUntil("show isolation");

  yield* all(
    opfsIsolationRef().width(1000, 2),
    OPFSHeadingRef().gap(0, 2),
    OPFSTextRef().fontSize(20, 1.5)
  );

  yield* waitUntil("show pointer");

  yield* all(
    opfsIsolationRef().margin([0, 0, 0, 1000], 1),
    pointerRef().x(0, 1),
    pointerRef().y(-75, 0.2),
    OPFSTextRef().opacity(0, 1)
  );

  const pointerTxtRef = createRef<Txt>();

  yield view.add(
    <>
      <Txt
        ref={pointerTxtRef}
        fill="white"
        {...config.shadow.primary}
        x={-550}
        y={-100}
        fontSize={60}
        fontWeight={900}
      ></Txt>
    </>
  );

  yield* pointerTxtRef().text("user's file system", 1);

  yield* waitUntil("switch to opfs");

  yield* all(
    pointerTxtRef().text("", 0.5),
    pointerRef().y(400, 1),
    pointerRef().x(-100, 0.2),
    delay(
      1,
      all(
        pointerTxtRef().y(375, 0),
        pointerTxtRef().text("isolated file system\nprivate to each origin", 1)
      )
    )
  );

  const urlOriginRef = createRef<Img>();

  yield view.add(
    <>
      <Img
        src={urlOriginIMG}
        width={0}
        fill={"rgba(255, 255, 255, 1)"}
        x={-395}
        radius={20}
        ref={urlOriginRef}
      ></Img>
    </>
  );

  yield* waitUntil("show origin definition");

  yield* all(
    urlOriginRef().width(1000, 1),
    urlOriginRef().x(-382.5, 1),
    opfsIsolationRef().width(750, 1),
    opfsIsolationRef().margin([0, 0, 0, 1100], 1),
    pointerRef().position([-750, -250], 1),
    pointerRef().rotation(90, 1)
  );

  yield* waitUntil("show origin diff");

  yield* all(
    opfsIsolationRef().scale(0, 1),
    pointerTxtRef().fontWeight(0, 0.1),
    pointerTxtRef().text(
      "google.com != docs.google.com != github.com\ngoogle.com == google.com/hello",
      5
    ),
    pointerTxtRef().x(0, 1)
  );

  yield* waitUntil("show ps opfs");

  const psOPFSRef = createRef<Img>();

  yield view.add(
    <>
      <Img
        src={photoshopOPFSIMG}
        {...config.shadow.primary}
        radius={20}
        x={750}
        width={0}
        ref={psOPFSRef}
      ></Img>
    </>
  );

  yield* all(
    psOPFSRef().width(DEFAULT, 1),
    urlOriginRef().x(-1600, 2),
    psOPFSRef().x(0, 2),
    pointerTxtRef().text("", 1),
    pointerRef().x(-1100, 2)
  );

  yield* waitUntil("show sqlite");

  pointerRef().position([-150, -700]);

  yield* all(
    psOPFSRef().position([-1530, 0], 1),
    opfsIsolationRef().margin([0, 0, 0, 0], 1),
    delay(
      0.5,
      all(pointerRef().scale(1.2, 1), pointerRef().position([-150, 0], 1))
    ),
    opfsIsolationRef().scale(1, 1)
  );

  yield* waitUntil("opfs internal imple");

  const opfsImpleRef = createRef<Img>();

  yield view.add(
    <>
      <Img
        src={opfsImplementationIMG}
        ref={opfsImpleRef}
        {...config.shadow.primary}
        radius={20}
        zIndex={opfsIsolationRef().zIndex() - 1}
      ></Img>
    </>
  );

  yield* all(
    opfsIsolationRef().margin([1700, 0, 0, 0], 1),
    pointerRef().position([1200, 0], 1),
    pointerRef().rotation(180, 1),
    delay(0.2, all(opfsImpleRef().scale(2.5, 2), opfsImpleRef().y(-250, 3)))
  );

  yield* waitUntil("opfs quota limit");

  const firefoxQuotaRef = createRef<Img>();
  const chromeQuotaRef = createRef<Img>();

  yield view.add(
    <>
      <Img
        src={firefoxQuotaIMG}
        ref={firefoxQuotaRef}
        zIndex={opfsImpleRef().zIndex() - 1}
        {...config.shadow.primary}
        radius={20}
      ></Img>
      <Img
        src={chromeQuotaIMG}
        ref={chromeQuotaRef}
        zIndex={opfsImpleRef().zIndex() - 2}
        {...config.shadow.primary}
        radius={20}
      ></Img>
    </>
  );

  yield* all(
    opfsImpleRef().position([0, -1100], 1.5),
    delay(
      0.5,
      all(
        firefoxQuotaRef().position([0, 225], 2),
        firefoxQuotaRef().scale(2, 2),
        chromeQuotaRef().position([0, -225], 2),
        chromeQuotaRef().scale(2, 2)
      )
    )
  );

  yield* waitUntil("end");
});
