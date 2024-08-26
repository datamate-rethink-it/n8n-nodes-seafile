import * as search from './search.operation';
import * as search_full from './search_full.operation';

import type { INodeProperties } from 'n8n-workflow';

export { search, search_full };

export const descriptions: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['search'],
			},
		},
		options: [
			{
				name: 'File Search',
				value: 'search',
				description: 'Search for a file in a specific library by file name',
				action: 'Search a file',
			},
			{
				name: 'Full-Text Search',
				value: 'search_full',
				description: 'Search a file in the library',
				action: 'Run a full text search',
			},
		],
		default: 'search',
	},
	...search.description,
	...search_full.description,
];
