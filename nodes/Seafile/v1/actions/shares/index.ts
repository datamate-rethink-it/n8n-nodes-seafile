import * as internal from './internal.operation';
import * as list from './list.operation';
import * as create from './create.operation';
import * as remove from './remove.operation';

import type { INodeProperties } from 'n8n-workflow';

export { internal, list, create, remove };

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
				name: 'Create Download Link',
				value: 'create',
				description: 'Create a download link for a file or folder',
				action: 'Create a download link',
			},
			{
				name: 'Delete Download Link',
				value: 'remove',
				description: 'Delete a download link',
				action: 'Delete a download link',
			},
			{
				name: 'Get Internal Link',
				value: 'internal',
				description: 'Get an internal link for a file',
				action: 'Get an internal link',
			},
			{
				name: 'List Download Links',
				value: 'list',
				description: 'List all download links in a library',
				action: 'List download links',
			},
		],
		default: 'internal',
	},
	...internal.description,
	...list.description,
	...create.description,
	...remove.description,
];
