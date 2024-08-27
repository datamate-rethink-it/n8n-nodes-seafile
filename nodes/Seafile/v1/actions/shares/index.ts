import * as smartlink from './smartlink.operation';
import * as list from './list.operation';
import * as create from './create.operation';
import * as remove from './remove.operation';

import type { INodeProperties } from 'n8n-workflow';

export { smartlink, list, create, remove };

export const descriptions: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['share'],
			},
		},
		options: [
			{
				name: 'Create Share Link',
				value: 'create',
				description: 'Create a share link for a file or folder',
				action: 'Create share link',
			},
			{
				name: 'Delete Share Link',
				value: 'remove',
				description: 'Delete a share link',
				action: 'Delete share link',
			},
			{
				name: 'Get Smart Link',
				value: 'smartlink',
				description: 'Get a smart link for a file',
				action: 'Get smart link',
			},
			{
				name: 'List Share Links',
				value: 'list',
				description: 'List all folder/file download share links in a library',
				action: 'List share links',
			},
		],
		default: 'smartlink',
	},
	...smartlink.description,
	...list.description,
	...create.description,
	...remove.description,
];
