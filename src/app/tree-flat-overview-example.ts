import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component } from '@angular/core';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface FoodNode {
  name: string;
  id: string;
  children?: FoodNode[];
}
function uu(): string {
  var result, i, j;
  result = '';
  for (j = 0; j < 32; j++) {
    if (j == 8 || j == 12 || j == 16 || j == 20) result = result + '-';
    i = Math.floor(Math.random() * 16)
      .toString(16)
      .toUpperCase();
    result = result + i;
  }
  return result;
}
const TREE_DATA: FoodNode[] = [
  {
    name: 'Fruit',
    id: uu(),
    children: [
      {
        name: 'Apple',
        id: uu(),
      },
      {
        name: 'Banana',
        id: uu(),
      },
      {
        name: 'Fruit loops',
        id: uu(),
      },
    ],
  },
  {
    name: 'Vegetables',
    id: uu(),
    children: [
      {
        name: 'Green',
        id: uu(),
        children: [
          {
            name: 'Broccoli',
            id: uu(),
          },
          { name: 'Brussels sprouts', id: uu() },
        ],
      },
      {
        name: 'Orange',
        id: uu(),
        children: [
          {
            name: 'Pumpkins',
            id: uu(),
          },
          { name: 'Carrots', id: uu() },
        ],
      },
    ],
  },
];
const TREE_DATA2: FoodNode[] = [
  {
    name: 'Levi',
    id: uu(),
    children: [
      {
        name: 'Armin',
        id: uu(),
      },
      {
        name: 'Mikasa',
        id: uu(),
      },
      {
        name: 'Connie',
        id: uu(),
      },
    ],
  },
  {
    name: 'AIOT',
    id: uu(),
    children: [
      {
        name: 'Geeba',
        id: uu(),
        children: [
          {
            name: 'Nomba',
            id: uu(),
          },
          {
            name: 'Lucy',
            id: uu(),
          },
        ],
      },
      {
        name: 'Gabbs',
        id: uu(),
        children: [
          {
            name: 'Sasha',
            id: uu(),
          },
          {
            name: 'Eren',
            id: uu(),
          },
        ],
      },
    ],
  },
];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
  id: string;
}

/**
 * @title Tree with flat nodes
 */
@Component({
  selector: 'tree-flat-overview-example',
  templateUrl: 'tree-flat-overview-example.html',
  styleUrls: ['tree-flat-overview-example.css'],
})
export class TreeFlatOverviewExample {
  currentEnteredId: string;
  draggingData: ExampleFlatNode | null;
  dragging: boolean = false;
  pathOfDrop: string[] = [];

  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
      id: node.id,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    (node) => node.level,
    (node) => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  dataSource2 = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {
    this.dataSource.data = TREE_DATA;
    this.dataSource2.data = TREE_DATA2;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
  public dropList1(event: any) {
    console.log(`drop1 -> `, event);
  }
  public dropList2(event: any) {
    console.log(`drop2 -> `, event);
  }
  public mouseDownFunction(node: any) {
    console.log('Mouse Down -> ', node);
  }
  public mouseUpFunction(node: any) {
    console.log('Mouse Up -> ', node);
  }
  public mouseEnterFunction(e: any, node: any) {
    this.currentEnteredId = this.dragging ? node.id : null;
    document.getElementById;
    // console.log('Entered -> ', node, this.currentEnteredId);
  }
  public mouseOutFunction(node: any) {
    console.log('Outed -> ', node);
  }
  public dragStarted(started: any, node: any) {
    this.dragging = true;
    this.draggingData = node;
    console.log('Drag started -> ', started, node);
  }
  public dragReleased(released: any, node: any) {
    this.dragging = false;
    this.pathOfDrop = [];
    const droppedLocation = this.treeControl.dataNodes.find(
      (n) => n.id === this.currentEnteredId
    );
    console.log(
      'Drag released -> ',
      this.getPath(this.dataSource.data, this.currentEnteredId),
      this.dataSource.data,
      this.dataSource2.data,
      this.currentEnteredId
    );
    this.draggingData = null;
  }
  public dragMoved(moved: any, node: any) {
    console.log('Drag moved -> ', moved, node);
  }
  public dragExited(exited: any, node: any) {
    console.log('Drag exited -> ', exited, node);
  }
  public dragEntered(entered: any, node: any) {
    console.log('Drag entered -> ', entered, node);
  }
  public dragEnded(ended: any, node: any) {
    console.log('Drag ended -> ', ended, node);
  }
  public dragDropped(dropped: any, node: any) {
    console.log('Drag dropped -> ', dropped, node);
  }

  public getHighlightClass(node: ExampleFlatNode): string {
    if (this.dragging && node.id === this.currentEnteredId) {
      return 'highlight-entered';
    }
    return '';
  }

  // getPath(object: FoodNode, search: string): string[] {
  //   if (object.id === search) return [object.name];
  //   else if ((object.children) || Array.isArray(object)) {
  //       let children = object.children;
  //       for (let child of children) {
  //           let result = this.getPath(child, search);
  //           if (result) {
  //               if (object.id )result.unshift(object.name);
  //               return result;
  //           }
  //       }
  //   }
  // }

  getPath(data: FoodNode[], nodeId: string, res: string[] = []): string[] | undefined {
    for (let node of data) {
      if (node.id === nodeId) {
        return res.concat(node.id);
      } else if (node.children) {
        const found = this.getPath(node.children, nodeId, res.concat(node.id));
        if (found) {
          return found;
        }
      }
    }
    return undefined;

    // data.forEach((node) => {
    //   if (node.id === nodeId) {
    //     this.pathOfDrop.push(node.id);
    //   } else if (node.children) {
    //     let found = this.getPath(node.children, nodeId);
    //     if (found.length) {
    //       this.pathOfDrop.push(node.id);
    //       // return this.pathOfDrop;
    //     }
    //   }
    // });
    // return this.pathOfDrop;
  }

  // const getAncestors = (target, children, ancestors = []) => {
  //   for (let node of children) {
  //     if (node.id === target) {
  //       return ancestors.concat(node.id);
  //     }
  //     const found = getAncestors(target, node.children, ancestors.concat(node.id));
  //     if (found) {
  //       return found;
  //     }
  //   }
  //   return undefined;
  // };
  /*
  cdkDragStarted
  cdkDragReleased
  cdkDragMoved
  cdkDragExited
  cdkDragEntered
  cdkDragEnded
  cdkDragDropped

      (mousedown)="mouseDownFunction(node)"
      (mouseup)="mouseUpFunction(node)"
      (mouseenter)="mouseEnterFunction(node)"
      (mouseout)="mouseOutFunction(node)"

  (cdkDragStarted)="dragStarted($event,node)"
  (cdkDragReleased)="dragReleased($event,node)"
  (cdkDragMoved)="dragMoved($event,node)"
  (cdkDragExited)="dragExited($event,node)"
  (cdkDragEntered)="dragEntered($event,node)"
  (cdkDragEnded)="dragEnded($event,node)"
  (cdkDragDropped)="dragDropped($event,node)"
  */
}
