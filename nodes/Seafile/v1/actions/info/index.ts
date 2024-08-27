import * as account from './account.operation';
import * as server from './server.operation';
import * as file_activity from './file_activity.operation';

import type { INodeProperties } from 'n8n-workflow';

export { account, server, file_activity };

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
				name: 'File Activity',
				value: 'file_activity',
				description: 'Get all file activity of the user',
				action: 'Get all file activity of the user',
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
	...file_activity.description,
];
