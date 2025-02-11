/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
type TodoListFooter_user$ref = any;
type TodoList_user$ref = any;
export type TodoApp_user$ref = any;
export type TodoApp_user = {
    readonly id: string;
    readonly userId: string;
    readonly totalCount: number;
    readonly completedCount: number;
    readonly " $fragmentRefs": TodoListFooter_user$ref & TodoList_user$ref;
    readonly " $refType": TodoApp_user$ref;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "TodoApp_user",
  "type": "User",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "id",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "userId",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "totalCount",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "completedCount",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "FragmentSpread",
      "name": "TodoListFooter_user",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "TodoList_user",
      "args": null
    }
  ]
};
(node as any).hash = 'ecccdb5a17f0428603f76e1bbaa8ea9d';
export default node;
