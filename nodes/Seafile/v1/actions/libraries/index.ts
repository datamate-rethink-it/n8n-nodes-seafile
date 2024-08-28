import * as create from './create.operation';
import * as list from './list.operation';
import * as get from './get.operation';
import * as remove from './remove.operation';

import type { INodeProperties } from 'n8n-workflow';

export { create, list, get, remove };

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
				name: 'Create a Library',
				value: 'create',
				action: 'Create a library',
			},
			{
				name: 'Delete a Library',
				value: 'remove',
				action: 'Delete a library',
			},
			{
				name: 'Get Library Details',
				value: 'get',
				action: 'Get library details',
			},
			{
				name: 'List Libraries',
				value: 'list',
				action: 'Get all libraries the user has access to',
			},
		],
		default: 'list',
	},
	...create.description,
	...list.description,
	...get.description,
	...remove.description,
];
