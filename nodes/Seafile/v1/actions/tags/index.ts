import * as add from './add.operation';
import * as remove from './remove.operation';
import * as list_tags from './list_tags.operation';
import * as list_tagged from './list_tagged.operation';

import type { INodeProperties } from 'n8n-workflow';

export { add, remove, list_tags, list_tagged };

export const descriptions: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['tags'],
			},
		},
		options: [
			{
				name: 'Add a Tag',
				value: 'add',
				description: 'Add a tag to a file',
				action: 'Add a tag to a file',
			},
			{
				name: 'Delete a Tag',
				value: 'remove',
				description: 'Delete a tag from a file',
				action: 'Delete a tag from a file',
			},
			{
				name: 'List Tags of a File',
				value: 'list_tags',
				description: 'List all tags of a file',
				action: 'List all tags of a file',
			},
			{
				name: 'List Tagged Files',
				value: 'list_tagged',
				description: 'List all files that have a specific tag',
				action: 'List all tagged files',
			},
		],
		default: 'list_tagged',
	},
	...add.description,
	...remove.description,
	...list_tags.description,
	...list_tagged.description,
];
