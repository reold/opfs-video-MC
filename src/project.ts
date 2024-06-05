import { makeProject } from "@motion-canvas/core";

import { Code, LezerHighlighter } from "@motion-canvas/2d";
import { parser } from "@lezer/javascript";

import fuguIntroScene from "./scenes/fuguIntro?scene";
import opfsScene from "./scenes/opfs?scene";
import webkitScene from "./scenes/webkit?scene";

import audio from "../audio/primary.mp3";

Code.defaultHighlighter = new LezerHighlighter(
  parser.configure({ dialect: "ts" })
);

export default makeProject({
  audio: audio,
  scenes: [fuguIntroScene, opfsScene, webkitScene],
});
