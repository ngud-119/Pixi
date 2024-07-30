import { Assets, Container, Graphics, Sprite, Text, Texture } from "pixi.js";
import { v4 as uuid } from "uuid";
import { Manager } from "../manager";


export class NewNode extends Container {
  constructor(
    titleData,
    bgColor,
    bgAlpha,
    fontColor,
    rayID,
    line,
    rearrangeChildren,
  ) {
    super();
    this.label = rayID;
    this.titleData = titleData;
    this.fontColor = fontColor;
    this.bgColor = bgColor;
    this.bgAlpha = bgAlpha;
    this.rearrangeChildren = rearrangeChildren;
    this.text = this.createText(this.titleData, this.fontColor);
    this.box = new Graphics();
    const imageID = Manager.jsonData[rayID]["ray"]["content"]["image"];

    const cachedTexture = Assets.get(imageID);
    this.image = new Sprite();

    this.addChild(this.text, this.image);

    this.createBox(this.bgColor, this.bgAlpha);

    this.addChildAt(this.box, 0);
    this.line = line;
    this.eventMode = "static";
    this.cursor = "pointer";

    this.text.x = this.width / 2 - this.text.width / 2;
    this.text.y = this.height / 2 - this.text.height / 2;
    // make connections invisible underneath node
    this.solidBg = new Graphics()
      .roundRect(0, 0, this.width, this.height, 8)
      .fill(0xeeeeee);
    this.addChildAt(this.solidBg, 0);
    this.solidBg.alpha = 5;

    this.addImage(cachedTexture); //adding image requires all other children to be already added, thus leaving it for last
  }

  createBox(bgColor, bgAlpha) {
    this.box
      .clear()
      .roundRect(
        0,
        0,
        Math.max(this.image.width, this.text.width) + 20,
        this.image.height +
          this.text.height +
          (this.image.texture.label === "EMPTY" ? 20 : 40),
        8,
      )
      .fill(bgColor);

    this.box.alpha = bgAlpha;
    this.box.label = "box";

    if (this.solidBg) {
      this.solidBg
        .clear()
        .roundRect(0, 0, this.width, this.height, 8)
        .fill(0xeeeeee);

      this.removeChild(this.solidBg);
      this.addChildAt(this.solidBg, 0);
    }
  }

  createText(titleData, fontColor) {
    let title = new Text({
      text: titleData,
      style: {
        fill: fontColor,
        fontSize: 14,
        wordWrap: true,
        wordWrapWidth: 340,
        align: "center",
      },
    });
    title.label = "text";
    return title;
  }

  addImage(texture, imageId) {
    if (!texture) return;
    if (imageId) {
      console.log('***************')
      Manager.editNodeData({ id: this.label, image: imageId }); // otherwise imageID already exists
      console.log(Manager.jsonData, '----- json data -----')

    }
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

      this.rearrangeChildren();
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
    if (hasImage) {
      this.image.x = this.width / 2 - this.image.width / 2;
      this.image.y = 10;
          }
  
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
