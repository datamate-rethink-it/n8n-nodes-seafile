import * as create from './create.operation';
import * as list from './list.operation';

import type { INodeProperties } from 'n8n-workflow';

export { create, list };

export const descriptions: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['libraries'],
			},
		},
		options: [
			{
				name: 'Create Library',
				value: 'create',
				description: 'Create a library',
				action: 'Create a library',
			},
			{
				name: 'List Libraries',
				value: 'list',
				description: 'Get all libraries',
				action: 'Get all libraries the user has access to',
			},
		],
		default: 'list',
	},
	...create.description,
	...list.description,
];
