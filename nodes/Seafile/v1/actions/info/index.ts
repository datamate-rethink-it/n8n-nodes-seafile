import * as account from './account.operation';
import * as server from './server.operation';

import type { INodeProperties } from 'n8n-workflow';

export { account, server };

export const descriptions: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['info'],
			},
		},
		options: [
			{
				name: 'Account Info',
				value: 'account',
				description: 'Get the account details',
				action: 'Get account details',
			},
			{
				name: 'Server Info',
				value: 'server',
				description: 'Get the server details',
				action: 'Get server details',
			},
		],
		default: 'account',
	},
	...account.description,
	...server.description,
];
