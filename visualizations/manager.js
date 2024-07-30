import { Application, Assets, Graphics, Texture, Ticker } from "pixi.js";
import { manifest } from "./assets/assets";
import { StartMenu } from "./scenes/StartMenu";
export class Manager {
  constructor() {}
  static currentScene;
  static x;
  static y;

  // With getters but not setters, these variables become read-only
  static get width() {
    return Manager.parent.offsetWidth;
  }
  static get height() {
    return Manager.parent.offsetHeight;
  }

  static async initialize(
    width,
    height,
    background,
    el,
    parentEl,
    jsonData,
    storeFunctions,
  ) {
    // store our width and height
    Manager._width = width;
    Manager._height = height;
    Manager.el = el;
    Manager.parent = parentEl;
    // console.log(Manager.jsonData);
    // Create our pixi app
    Manager.app = new Application();
    await Manager.app.init({
      canvas: Manager.el,
      resizeTo: Manager.parent, // This line here handles the actual resize!
      // resolution: window.devicePixelRatio || 1,
      autoDensity: true,
      antialias: true,
      backgroundColor: background,
    });
    Manager.addNodeData = storeFunctions[0];
    Manager.removeNodeData = storeFunctions[1];
    Manager.editNodeData = storeFunctions[2];
    Manager.toggleNodeEditor = storeFunctions[3];

    Ticker.shared.add(Manager.update);
    window.addEventListener("resize", Manager.resize);
    globalThis.__PIXI_APP__ = Manager.app;

    Manager.app.stage.eventMode = "static";
  }

  static zoom(event) {
    const SCALE = Math.max(this.scale.x - event.deltaY / 1000, 0.1);
    this.scale.x = SCALE;
    this.scale.y = SCALE;
    this.bg.scale.x = 1 / SCALE;
    this.bg.scale.y = 1 / SCALE;
    // this.bg.width = Manager.width;
    // this.bg.height = Manager.height;
    this.bg.x = -this.x * this.bg.scale.x;
    this.bg.y = -this.y * this.bg.scale.y;
    if (this.activeMenu) {
      this.activeMenu.scale.x = 1 / SCALE;
      this.activeMenu.scale.y = 1 / SCALE;
      this.activeMenu.x =
        this.dragTarget.x +
        this.dragTarget.width / 2 -
        this.activeMenu.width / 2;
      this.activeMenu.y = Math.max(
        this.dragTarget.y - (this.activeMenu.height + 5),
        -this.y / this.scale.y,
      );
    }
  }

  static zoomIn() {
    this.scale.x += 0.1;
    this.scale.y += 0.1;
  }

  static zoomOut() {
    this.scale.x -= 0.1;
    this.scale.y -= 0.1;
  }

  static resize() {
    if (Manager.currentScene) {
      Manager.currentScene.resize(Manager.width, Manager.height);
    }
  }

  static changeScene(newScene) {
    if (Manager.currentScene != undefined) Manager.currentScene.transitionOut();
    Manager.currentScene = newScene;
    Manager.currentScene.transitionIn();
  }

  static update(deltaTime) {
    // Group.shared.update(); For your tweens
    if (Manager.currentScene != undefined) {
      Manager.currentScene.update(deltaTime);
    }
  }

  static async initializeLoader() {
    await Assets.init({ manifest });
    const bundleIds = manifest.bundles.map((bundle) => bundle.name);
    await Assets.loadBundle(bundleIds);

    let data = {};
    const cache = localStorage["persist:root"];

    if (cache) {
      const localData = JSON.parse(cache);
      for (let ID in localData) {
        data[ID] = JSON.parse(localData[ID]);
      }
      Manager.jsonData = data;
    } else {
      Manager.jsonData = await Assets.load("jsonData");
    }
    for (let nodeID in Manager.jsonData) {
      if (nodeID.length !== 36) continue;
      const imageID = Manager.jsonData[nodeID]["ray"]["content"]["image"];
      if (Manager.jsonData[nodeID]["ray"]["content"]["image"][0] === "i") {
        let tekr = await Assets.add({
          alias: imageID,
          src: localStorage[imageID],
        });
        await Assets.load(imageID);
        // let textar = Assets.get(localStorage[imageID]);
      }
    }

    Manager.bg = new Graphics()
      .rect(0, 0, Manager.width, Manager.height)
      .fill(0xeeeeee);
    Manager.bg.alpha = 0.000001;
    Manager.app.stage.addChildAt(this.bg, 0);

    Manager.changeScene(new StartMenu());
    Manager.app.stage.on("wheel", Manager.zoom, Manager.currentScene);
  }
}
