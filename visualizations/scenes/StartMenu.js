import { Container, Graphics } from "pixi.js";
import { v4 as uuid4 } from "uuid";
import { Manager } from "../manager";
import { NewNode } from "./NewNode";
import { RootNode } from "./RootNode";
import { ContextMenu } from "./ContextMenu";
import { ConnectionLayer } from "./ConnectionLayer";

export class StartMenu extends Container {
  constructor() {
    super();
    this.screenWidth = Manager.width;
    this.screenHeight = Manager.height;
    this.x = this.screenWidth / 2;
    this.y = 30;
    this.eventMode = "static";
    this.curMousePos = { x: 0, y: 0 };
    this.isMoving = false;
    this.selectionIndicator = new Graphics();
    this.activeMenu = null;
    this.grabPos = { x: null, y: null };
    this.on("pointerup", this.onDragEnd, this);
    this.on("pointerupoutside", this.onDragEnd, this);

    this.on("pointerdown", this.onScreenDragStart, this);
    this.on("pointermove", this.dragScreen, this);
    this.jsonData = Manager.jsonData;
    const rootData = Object.values(this.jsonData)[0];
    this.addRoot(rootData);
    this.connectionLayer = new ConnectionLayer();

    const rootChildren = rootData["ray"]["children"];

    //Populate Children
    this.recursivePopulateChildren(
      rootChildren,
      this.children[0].width / 2,
      this.screenHeight - 70,
      0,
    );

    //Rearrange Children
    this.rearrangeNodes();
    this.dragTarget = null;
    const temp = this.children[0];
    this.removeChild(temp);
    this.addChild(temp);

    this.bg = new Graphics()
      .rect(0, 0, this.screenWidth, this.screenHeight)
      .fill(0xeeeeee);
    this.bg.alpha = 0.000001;
    this.bg.x = -this.x;
    this.bg.y = -this.y;
    this.addChildAt(this.bg, 0);
    this.addChildAt(this.connectionLayer, 0);
  }

  onDragEnd() {
    this.isMoving = false;
    this.isChildActive = false;
    if (this.dragTarget) {
      this.off("pointermove", this.onDragMove, this);
      this.dragTarget.alpha = 1;
      this.grabPos.x = null;
      this.grabPos.y = null;

      // WATCH OUT for this being commented out
      // this.dragTarget = null;
      //
    }
  }

  onDragStart(event, target) {
    if (this.dragTarget) {
      this.selectionIndicator.clear();
      this.removeChild(this.activeMenu);
      this.activeMenu = null;
    }

    // STATE MANAGEMENT
    Manager.toggleNodeEditor({
      nodeID: target.label,
    });

    this.grabPos.x = (event.global.x - this.x) / this.scale.x - target.x;
    this.grabPos.y = (event.global.y - this.y) / this.scale.y - target.y;

    this.isChildActive = true;
    target.alpha = 0.5;
    this.dragTarget = target;
    this.on("pointermove", this.onDragMove, this);

    target.selectionIndicator = this.selectionIndicator;
    this.selectionIndicator
      .rect(0, 0, target.width, target.height)
      .stroke({ width: 1, color: 0xb2a2e2 });
    this.selectionIndicator
      .roundRect(-5, -5, 10, 10, 3)
      .fill(0xffffff)
      .stroke({ width: 1, color: 0xf176b8 })
      .roundRect(target.width - 5, -5, 10, 10, 3)
      .fill(0xffffff)
      .stroke({ width: 1, color: 0xf176b8 })
      .roundRect(-5, target.height - 5, 10, 10, 3)
      .fill(0xffffff)
      .stroke({ width: 1, color: 0xf176b8 })
      .roundRect(target.width - 5, target.height - 5, 10, 10, 3)
      .fill(0xffffff)
      .stroke({ width: 1, color: 0xf176b8 });
    this.activeMenu = new ContextMenu(
      target,
      this.addNode.bind(this),
      this.removeNode.bind(this),
    );
    this.activeMenu.scale.x = 1 / this.scale.x;
    this.activeMenu.scale.y = 1 / this.scale.y;
    this.selectionIndicator.x = target.x;
    this.selectionIndicator.y = target.y;
    this.activeMenu.x = Math.min(
      Math.max(
        target.x + target.width / 2 - this.activeMenu.width / 2,
        -this.x / this.scale.x,
      ),
      this.x / this.scale.x - this.activeMenu.width,
    );
    this.activeMenu.y = Math.max(
      target.y - (this.activeMenu.height + 5),
      -this.y / this.scale.y,
    );
    this.addChild(this.activeMenu);
    this.removeChild(this.selectionIndicator);
    this.addChild(this.selectionIndicator);
  }

  onDragMove(event) {
    event.stopPropagation();

    if (this.dragTarget) {
      this.dragTarget.x =
        (event.global.x - this.x) / this.scale.x - this.grabPos.x;
      this.dragTarget.y =
        (event.global.y - this.y) / this.scale.y - this.grabPos.y;
      this.selectionIndicator.x = this.dragTarget.x;
      this.selectionIndicator.y = this.dragTarget.y;
      this.activeMenu.x = Math.min(
        Math.max(
          this.dragTarget.x +
            this.dragTarget.width / 2 -
            this.activeMenu.width / 2,
          -this.x / this.scale.x,
        ),
        this.x / this.scale.x - this.activeMenu.width,
      );
      this.activeMenu.y = Math.max(
        this.dragTarget.y - (this.activeMenu.height + 5),
        -this.y / this.scale.y,
      );

      let line = this.dragTarget.line;
      let rayID = this.dragTarget.label;
      if (this.jsonData[rayID]["ray"]["parent"] !== null) {
        let parentID = this.jsonData[rayID]["ray"]["parent"];
        let lineColor =
          this.jsonData[rayID]["ray-viz"].mindmap.connectionRendering.lineColor;

        if (parentID) {
          const parentNode = this.getChildByLabel(parentID);
          this.drawLine(
            {
              x: this.dragTarget.x + this.dragTarget.width / 2,
              y: this.dragTarget.y + this.dragTarget.height / 2,
            },
            {
              x: parentNode.x + parentNode.width / 2,
              y: parentNode.y + parentNode.height / 2,
            },
            line,
            4,
            lineColor,
          );
        }
      }

      // const rootChildren = Object.values(this.jsonData)[0].ray.connections;
      const rootChildren = this.jsonData[rayID]["ray"]["children"];
      this.redrawConnections(this.dragTarget, rootChildren);
    }
  }

  drawLine(from, to, line, width, color) {
    line.clear();
    line.moveTo(from.x, from.y);
    line.quadraticCurveTo(to.x, from.y, to.x, to.y);
    line.stroke({ width: 2, color: color });
    return line;
  }

  addRoot(rootData) {
    this.rootNode = new RootNode(rootData);
    // const height = this.rootNode.height;
    this.rootNode.x = -this.rootNode.width / 2;
    this.rootNode.y = this.screenHeight / 2 - this.rootNode.height / 2;
    this.rootNode.width;
    this.addChild(this.rootNode);

    this.rootNode.on("pointerdown", (event) => {
      this.onDragStart(event, this.rootNode);
    });
  }

  addNode(parentNode) {
    const newID = uuid4();
    const parentID = parentNode.label;
    const time = String(new Date());
    const parentBgColor =
      Manager.jsonData[parentID]["ray-viz"].mindmap.rayRendering.bgColor;
    const color = parentNode.isRoot
      ? ["#905BE6", "#00A85F", "#F76526", "#4452EE"][
          Math.trunc(Math.random() * 4)
        ]
      : parentBgColor;
    const opacity = Math.max(
      Manager.jsonData[parentID]["ray-viz"].mindmap.rayRendering.opacity - 0.2,
      0.1,
    );
    const newConnection = newID;
    const newNode = {
      ray: {
        rayID: newID,
        type: "content",
        content: {
          title: "A new Node!",
          description: "A new node",
          source: {
            type: "youtube",
            url: "https://source-url.com",
            timestamp: "2024-06-25T10:30:00Z",
          },
          image: "https://source-url.com",
        },
        metadata: {
          createdAt: time,
          updatedAt: time,
          version: 1,
          tags: ["tag1", "tag2"],
        },
        parent: parentID,
        children: [],
      },
      "ray-viz": {
        mindmap: {
          rayRendering: {
            rayId: newID,
            bgColor: color,
            fontColor: parentNode.isRoot ? "#FFFFFF" : "#000000",
            opacity: parentNode.isRoot ? 1 : opacity,
          },
          connectionRendering: {
            lineColor: color,
            lineWidth: 4,
            from: parentID,
          },
        },
      },
    };
    // REDUX CODE HERE
    Manager.addNodeData({
      parentID: parentID,
      newID: newID,
      newConnection: newID,
      newNode: {
        ray: {
          rayID: newID,
          type: "concept",
          content: {
            title: "A new Node!",
            description: "A new node",
            source: {
              type: "youtube",
              url: "https://source-url.com",
              timestamp: "2024-06-25T10:30:00Z",
            },
            image: "https://source-url.com",
          },
          metadata: {
            createdAt: time,
            updatedAt: time,
            version: 1,
            tags: ["tag1", "tag2"],
          },
          parent: parentID,
          children: [],
        },
        "ray-viz": {
          mindmap: {
            rayRendering: {
              rayId: newID,
              bgColor: color,
              fontColor: parentNode.isRoot ? "#FFFFFF" : "#000000",
              opacity: parentNode.isRoot ? 1 : opacity,
            },
            connectionRendering: {
              lineColor: color,
              lineWidth: 4,
              from: parentID,
            },
          },
        },
      },
    });

    Manager.jsonData[newID] = newNode;

    const children = Manager.jsonData[parentID]["ray"]["children"];
    Manager.jsonData[parentID]["ray"]["children"].push(newConnection);
    const side = Math.sign(parentNode.x);

    const lastChildID = children[children.length - 1];
    const lastChild = this.getChildByLabel(lastChildID);
    let rayID = parentNode.label;
    let x = lastChild
      ? lastChild.x
      : parentNode.x + (parentNode.width + 10) * side;
    let y = lastChild ? lastChild.y + lastChild.height + 5 : parentNode.y;
    let titleData = Manager.jsonData[newID].ray.content.title;
    let lineColor =
      Manager.jsonData[newID]["ray-viz"].mindmap.connectionRendering.lineColor;
    let bgColor =
      Manager.jsonData[newID]["ray-viz"].mindmap.rayRendering.bgColor;
    let bgAlpha =
      Manager.jsonData[newID]["ray-viz"].mindmap.rayRendering.opacity;
    let fontColor =
      Manager.jsonData[newID]["ray-viz"].mindmap.rayRendering.fontColor;
    //Title

    let line = new Graphics();
    let childNode = new NewNode(
      titleData,
      bgColor,
      bgAlpha,
      fontColor,
      newID,
      line,
      this.rearrangeNodes.bind(this),
    );
    childNode.x = x;
    childNode.y = y;
    this.addChild(childNode);
    let lineWidth =
      this.jsonData[parentNode.label]["ray-viz"].mindmap.connectionRendering
        .lineWidth;
    let connectedRay = this.jsonData[parentNode.label]["ray"]["parent"];
    // let lineColor =
    //   this.jsonData[rayID]["ray-viz"].mindmap.connectionRendering.lineColor;
    line.label = "line";

    const connectedRayContainer = parentNode;
    this.drawLine(
      {
        x: childNode.x + childNode.width / 2,
        y: childNode.y + childNode.height / 2,
      },
      {
        x: connectedRayContainer.x + connectedRayContainer.width / 2,
        y: connectedRayContainer.y + connectedRayContainer.height / 2,
      },
      line,
      lineWidth,
      lineColor,
    );
    this.connectionLayer.addChild(line);
    childNode.on("pointerdown", (event) => {
      this.onDragStart(event, childNode);
    });
    this.removeChild(childNode);
    this.addChild(childNode);
  }

  removeNode(oldID, hasParent = true) {
    if (this.dragTarget) {
      this.selectionIndicator.clear();
      this.removeChild(this.activeMenu);
      this.activeMenu = null;
    }

    const connections = Manager.jsonData[oldID]["ray"]["children"];
    const node = this.getChildByLabel(oldID);
    const parentID = Manager.jsonData[oldID]["ray"]["parent"];
    let idx = -1;
    if (hasParent && !node.isRoot) {
      const parentConnections = Manager.jsonData[parentID]["ray"]["children"];

      for (let i = 0; i < parentConnections.length; i++) {
        if (parentConnections[i] === oldID) {
          parentConnections.splice(i, 1);
          idx = i;
          break;
        }
      }
    }
    delete Manager.jsonData[oldID];
    Manager.removeNodeData({
      oldID: oldID,
      parentID: parentID,
      connectionIdx: idx,
    });

    this.removeChild(node);

    if (node) this.connectionLayer.removeChild(node.line);
    for (let i = 0; i < connections.length; i++) {
      if (connections[i] === null) continue;
      const childID = connections[i];
      const childNode = this.getChildByLabel(childID);
      this.removeChild(childNode);
      if (childNode) this.connectionLayer.removeChild(childNode.line);
      this.removeNode(childID, false);
    }
  }

  recursivePopulateChildren(
    connections,
    totalWidth,
    totalHeight,
    depth = 0,
    side = -1,
  ) {
    for (let i = 0; i < connections.length; i++) {
      if (depth === 0) {
        side = i < connections.length / 2 ? (side = -1) : 1;
      }
      if (connections[i] /*isn't null*/) {
        let rayID = connections[i];
        let height = (totalHeight / connections.length) * (depth === 0 ? 2 : 1);
        let width = totalWidth;

        let titleData = this.jsonData[rayID].ray.content.title;

        let lineColor =
          this.jsonData[rayID]["ray-viz"].mindmap.connectionRendering.lineColor;
        let bgColor =
          this.jsonData[rayID]["ray-viz"].mindmap.rayRendering.bgColor;
        let bgAlpha =
          this.jsonData[rayID]["ray-viz"].mindmap.rayRendering.opacity;
        let fontColor =
          this.jsonData[rayID]["ray-viz"].mindmap.rayRendering.fontColor;
        //Title
        let line = new Graphics();
        let newNode = new NewNode(
          titleData,
          bgColor,
          bgAlpha,
          fontColor,
          rayID,
          line,
          this.rearrangeNodes.bind(this),
        );
        newNode.side = side;
        newNode.x = (width + newNode.width / 2 + 20) * side - newNode.width / 2;
        newNode.y =
          depth === 0
            ? i < connections.length / 2
              ? height * i
              : height * (i - connections.length / 2)
            : height * i;
        this.addChild(newNode);
        let lineWidth =
          this.jsonData[rayID]["ray-viz"].mindmap.connectionRendering.lineWidth;
        let connectedRay = this.jsonData[rayID]["ray"]["parent"];
        const parentNode = this.getChildByLabel(connectedRay);
        line.label = "line";

        this.drawLine(
          {
            x: newNode.x + newNode.width / 2,
            y: newNode.y + newNode.height / 2,
          },
          {
            x: parentNode.x + parentNode.width / 2,
            y: parentNode.y + parentNode.height / 2,
          },
          line,
          lineWidth,
          lineColor,
        );
        this.connectionLayer.addChild(line);
        newNode.on("pointerdown", (event) => {
          this.onDragStart(event, newNode);
        });

        this.recursivePopulateChildren(
          this.jsonData[rayID]["ray"]["children"],
          totalWidth + newNode.width + 10,
          height,
          depth + 1,
          side,
        );
      }
      // this.removeChild(newNode);
      // this.addChild(newNode);
    }
  }

  redrawConnections(parentNode, connections) {
    for (let i = 0; i < connections.length; i++) {
      if (connections[i] === null) continue;
      let childID = this.jsonData[parentNode.label]["ray"]["children"][i];
      let line = this.getChildByLabel(childID).line;
      let lineColor =
        this.jsonData[childID]["ray-viz"].mindmap.connectionRendering.lineColor;
      const childNode = this.getChildByLabel(childID);

      this.drawLine(
        {
          x: childNode.x + childNode.width / 2,
          y: childNode.y + childNode.height / 2,
        },
        {
          x: parentNode.x + parentNode.width / 2,
          y: parentNode.y + parentNode.height / 2,
        },
        line,
        4,
        lineColor,
      );
      this.redrawConnections(
        childNode,
        this.jsonData[childID]["ray"]["children"],
      );
    }
  }

  determineHeight(node) {
    const connections = this.jsonData[node.label]["ray"]["children"];
    let accum = 0;
    for (let i = 0; i < connections.length; i++) {
      if (connections[i] === null) continue;
      node.height;
      const childNode = this.getChildByLabel(connections[i]);
      accum += this.determineHeight(childNode);
    }

    node.necessaryHeight = Math.max(node.height, accum);
    return node.necessaryHeight;
  }

  setPosition(node, accum) {
    const connections = this.jsonData[node.label]["ray"]["children"];
    for (let i = 0; i < connections.length; i++) {
      if (connections[i] === null) continue;
      const childNode = this.getChildByLabel(connections[i]);

      //   totalWidth + newNode.width + 10,
      // newNode.x = (width + newNode.width / 2 + 20) * side - newNode.width / 2;
      childNode.y =
        accum + childNode.necessaryHeight / 2 - childNode.height / 2;
      this.setPosition(childNode, accum);
      accum += childNode.necessaryHeight + 5;
    }
  }

  rearrangeNodes() {
    const rootChildren =
      Manager.jsonData[this.rootNode.label]["ray"]["children"];

    let accum = 0;

    this.determineHeight(this.rootNode);

    for (let i = 0; i < rootChildren.length / 2; i++) {
      const node = this.getChildByLabel(rootChildren[i]);
      node.y = accum + node.necessaryHeight / 2 - node.height / 2;
      this.setPosition(node, accum);
      accum += node.necessaryHeight + 30;
    }

    accum = 0;
    for (
      let i = Math.ceil(rootChildren.length / 2);
      i < rootChildren.length;
      i++
    ) {
      const node = this.getChildByLabel(rootChildren[i]);
      node.y = accum + node.necessaryHeight / 2 - node.height / 2;
      this.setPosition(node, accum);
      accum += node.necessaryHeight + 30;
    }
    this.redrawConnections(this.rootNode, rootChildren);
  }

  onScreenDragStart(event) {
    if (this.isChildActive) return;
    Manager.toggleNodeEditor({ isOpen: false });
    if (this.dragTarget) {
      this.selectionIndicator.clear();
      this.removeChild(this.activeMenu);
      this.dragTarget = null;
      this.activeMenu = null;
    }
    this.isMoving = true;
    this.curMousePos.x = event.global.x;
    this.curMousePos.y = event.global.y;
  }

  dragScreen(event) {
    if (this.isMoving) {
      const pos = event.global;
      this.x += pos.x - this.curMousePos.x;
      this.y += pos.y - this.curMousePos.y;
      this.curMousePos.x = event.global.x;
      this.curMousePos.y = event.global.y;
      this.bg.x = -this.x * this.bg.scale.x;
      this.bg.y = -this.y * this.bg.scale.y;
    }
  }

  transitionIn() {
    Manager.app.stage.addChild(Manager.currentScene);
  }

  transitionOut() {
    Manager.app.stage.removeChild(Manager.currentScene);
  }

  resize(newWidth, newHeight) {
    this.screenWidth = newWidth;
    this.screenHeight = newHeight;
  }

  update(deltaTime) {
    // Update logic goes here
  }
}
