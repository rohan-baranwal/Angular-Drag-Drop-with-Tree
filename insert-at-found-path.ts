interface FoodNode {
  name: string;
  id: string;
  children?: FoodNode[];
}
const TREE_DATA: FoodNode[] = [
  {
    name: 'Fruit',
    id: 'id-Fruit',
    children: [
      {
        name: 'Apple',
        id: 'id-Apple',
      },
      {
        name: 'Banana',
        id: 'id-Banana',
      },
      {
        name: 'Froot',
        id: 'id-Froot',
      },
    ],
  },
  {
    name: 'Vegetables',
    id: 'id-Vegetables',
    children: [
      {
        name: 'Green',
        id: 'id-Green',
        children: [
          {
            name: 'Broccoli',
            id: 'id-Broccoli',
          },
          {
            name: 'Brussels',
            id: 'id-Brussels'
          },
        ],
      },
      {
        name: 'Orange',
        id: 'id-Orange',
        children: [
          {
            name: 'Pumpkins',
            id: 'id-Pumpkins',
          },
          {
            name: 'Carrots',
            id: 'id-Carrots'
          },
        ],
      },
    ],
  },
];
const TREE_DATA2: FoodNode[] = [
  {
    name: 'Levi',
    id: 'id-Levi',
    children: [
      {
        name: 'Armin',
        id: 'id-Armin',
      },
      {
        name: 'Mikasa',
        id: 'id-Mikasa',
      },
      {
        name: 'Connie',
        id: 'id-Connie',
      },
    ],
  },
  {
    name: 'AIOT',
    id: 'id-AIOT',
    children: [
      {
        name: 'Geeba',
        id: 'id-Geeba',
        children: [
          {
            name: 'Nomba',
            id: 'id-Nomba',
          },
          {
            name: 'Lucy',
            id: 'id-Lucy',
          },
        ],
      },
      {
        name: 'Gabbs',
        id: 'id-Gabbs',
        children: [
          {
            name: 'Sasha',
            id: 'id-Sasha',
          },
          {
            name: 'Eren',
            id: 'id-Eren',
          },
        ],
      },
    ],
  },
];

const getPath = (data: FoodNode[], nodeId: string, res: string[] = []): string[] | undefined => {
  for (let node of data) {
    if (node.id === nodeId) {
      return res.concat(node.id);
    } else if (node.children) {
      const found = getPath(node.children, nodeId, res.concat(node.id));
      if (found) {
        return found;
      }
    }
  }
  return undefined;
}

const insertAtPath = (pathToInsert: string[], data: FoodNode[]) => {
  const foundNode = data.find(e => e.id === pathToInsert[0]);
  console.log('data inside -> ', data, pathToInsert, foundNode);
  if (pathToInsert.length && foundNode) {
    pathToInsert.shift();
    if (!foundNode['children']) {
      foundNode['children'] = [];
    }
    insertAtPath(pathToInsert, foundNode.children);
  } else if (pathToInsert.length === 0 && !foundNode) {
    data.push(
      {
        name: 'Sasha',
        id: 'id-Sasha',
      }
    );
  }
}

const testMethod = (): void => {
  const path = getPath(TREE_DATA, 'id-Brussels');
  console.log("data before -> ", TREE_DATA, path);
  if (path && path.length > 0) {
    insertAtPath(path, TREE_DATA);
  }
  console.log("data after -> ", TREE_DATA, path);
}
testMethod();