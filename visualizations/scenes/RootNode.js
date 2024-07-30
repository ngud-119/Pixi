import { Graduate, Londrina_Solid } from "next/font/google";
import { Container, Graphics, Sprite, Text } from "pixi.js";
import { root } from "postcss";

export class RootNode extends Container {
  constructor(rootData) {
    super();
    const title = rootData.ray.content.description;
    const description = rootData.ray.content.description;
    const image = rootData.ray.content.image;
    const fontColor = rootData["ray-viz"].mindmap.rayRendering.fontColor;
    this.bgColor = rootData["ray-viz"].mindmap.rayRendering.bgColor;
    this.bgAlpha = rootData["ray-viz"].mindmap.rayRendering.opacity;
    this.isRoot = true;

    const descriptionText = new Text({
      text: description,
      style: { fill: fontColor },
    });
    this.image = Sprite.from(image);
    this.text = new Text({
      text: title,
      style: {
        fill: fontColor,
        fontSize: 20,
        wordWrap: true,
        wordWrapWidth: this.image.width + 20,
        align: "center",
      },
    });
    //Background initialization
    let backgroundHeight = this.image.height + this.text.height + 30;
    let backgroundWidth = this.text.width + 20;
    this.background = new Graphics()
      .roundRect(0, 0, backgroundWidth, backgroundHeight, 8)
      .fill(this.bgColor);

    //Putting together
    this.addChild(this.background, this.image, this.text);

    this.label = rootData.ray.rayID;
    this.eventMode = "static";
    //Add this to the app.stage
    //this position
    // this.x = -node.width / 2;
    //Image position
    this.image.x = this.width / 2 - this.image.width / 2;
    this.image.y = 10;
    //Title position
    this.text.x = this.width / 2 - this.text.width / 2;
    this.text.y = this.image.height + 20;

    this.solidBg = new Graphics()
      .roundRect(0, 0, this.width, this.height, 8)
      .fill(0xeeeeee);
    this.addChildAt(this.solidBg, 0);
    this.solidBg.alpha = 2;
  }

  createBox() {
    this.background
      .clear()
      .roundRect(
        0,
        0,
        this.text.width + 20,
        this.image.height + this.text.height + 30,
        8,
      )
      .fill(this.bgColor);

    this.background.alpha = this.bgAlpha;
    this.background.label = "box";

    if (this.solidBg) {
      this.solidBg
        .clear()
        .roundRect(0, 0, this.width, this.height, 8)
        .fill(0xeeeeee);

      this.removeChild(this.solidBg);
      this.addChildAt(this.solidBg, 0);
    }
  }

  addImage(texture) {
    if (!texture) return;
    this.image.scale.x = 1;
    this.image.scale.y = 1;
    this.image.texture = texture;
    const SCALE = Math.max(this.text.width + 20, 200) / this.image.width;
    this.image.scale.x = SCALE;
    this.image.scale.y = SCALE;

    this.createBox(this.bgColor, this.bgAlpha);
    this.text.x = this.width / 2 - this.text.width / 2;
    this.text.y = this.image.y + this.image.height + 20;
    this.image.x = this.width / 2 - this.image.width / 2;
    this.image.y = 10;

    if (this.selectionIndicator) {
      this.selectionIndicator
        .clear()
        .rect(0, 0, this.width, this.height)
        .stroke({ width: 1, color: 0xb2a2e2 });
      this.selectionIndicator
        .roundRect(-5, -5, 10, 10, 3)
        .fill(0xffffff)
        .stroke({ width: 1, color: 0xf176b8 })
        .roundRect(this.width - 5, -5, 10, 10, 3)
        .fill(0xffffff)
        .stroke({ width: 1, color: 0xf176b8 })
        .roundRect(-5, this.height - 5, 10, 10, 3)
        .fill(0xffffff)
        .stroke({ width: 1, color: 0xf176b8 })
        .roundRect(this.width - 5, this.height - 5, 10, 10, 3)
        .fill(0xffffff)
        .stroke({ width: 1, color: 0xf176b8 });
    }
  }

  changeText(text) {
    const hasImage = !(this.image.texture.label === "EMPTY");
    this.text.text = text;

    if (hasImage) {
      this.image.scale.x = 1;
      this.image.scale.y = 1;
      let SCALE = Math.max(this.text.width + 20, 200) / this.image.width;
      this.image.scale.x = SCALE;
      this.image.scale.y = SCALE;
    }
    this.createBox(this.bgColor, this.bgAlpha);
    this.text.x = this.width / 2 - this.text.width / 2;
    this.text.y = hasImage
      ? this.image.y + this.image.height + 20
      : this.height / 2 - this.text.height / 2;
    this.image.x = this.width / 2 - this.image.width / 2;
    this.image.y = 10;

    if (this.selectionIndicator) {
      this.selectionIndicator
        .clear()
        .rect(0, 0, this.width, this.height)
        .stroke({ width: 1, color: 0xb2a2e2 });
      this.selectionIndicator
        .roundRect(-5, -5, 10, 10, 3)
        .fill(0xffffff)
        .stroke({ width: 1, color: 0xf176b8 })
        .roundRect(this.width - 5, -5, 10, 10, 3)
        .fill(0xffffff)
        .stroke({ width: 1, color: 0xf176b8 })
        .roundRect(-5, this.height - 5, 10, 10, 3)
        .fill(0xffffff)
        .stroke({ width: 1, color: 0xf176b8 })
        .roundRect(this.width - 5, this.height - 5, 10, 10, 3)
        .fill(0xffffff)
        .stroke({ width: 1, color: 0xf176b8 });
    }
  }
}
