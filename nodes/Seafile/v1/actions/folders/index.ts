import * as create from './create.operation';
import * as remove from './remove.operation';

import type { INodeProperties } from 'n8n-workflow';

export { create, remove };

export const descriptions: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['folders'],
			},
		},
		options: [
			{
				name: 'Create Folder',
				value: 'create',
				description: 'Create a folder in a library',
				action: 'Create a folder',
			},
			{
				name: 'Delete Folder',
				value: 'remove',
				description: 'Delete a folder in a library',
				action: 'Delete a folder',
			},
		],
		default: 'create',
	},
	...create.description,
	...remove.description,
];
