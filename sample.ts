const data = [
  {
    id: '1',
    title: 'First folder',
    children: [
      {
        id: '3',
        title: 'First folder in parents',
        children: [],
      },
      {
        id: '4',
        parent_id: 1,
        title: 'Second folder in parents',
        children: [
          {
            id: '5',
            title: 'test',
            children: [],
          },
        ],
      },
    ],
  },
  {
    id: '2',
    title: 'Second folder',
    children: [],
  },
];

const getAncestors = (
  target: string,
  children: any[],
  ancestors = []
): string[] | undefined => {
  for (let node of children) {
    if (node.id === target) {
      return ancestors.concat(node.id);
    } else if (node.children) {
      const found = getAncestors(
        target,
        node.children,
        ancestors.concat(node.id)
      );
      if (found) {
        return found;
      }
    }
  }
  return undefined;
};

console.log(getAncestors('5', data));
