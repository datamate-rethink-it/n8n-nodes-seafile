import type { INodeTypeDescription } from 'n8n-workflow';

import * as files from './files';
import * as info from './info';
import * as search from './search';
import * as folders from './folders';
import * as share from './shares';

export const versionDescription: INodeTypeDescription = {
	displayName: 'Seafile',
	name: 'seafile',
	icon: 'file:seafile.svg',
	group: ['output'],
	version: 1,
	subtitle: '={{$parameter["resource"] + ": " + $parameter["operation"]}}',
	description: 'Interact with the Seafile API.',
	defaults: {
		name: 'Seafile Api',
	},
	inputs: ['main'],
	outputs: ['main'],
	credentials: [
		{
			name: 'seafileApi',
			required: true,
		},
	],
	properties: [
		{
			displayName: 'Resource',
			name: 'resource',
			type: 'options',
			noDataExpression: true,
			options: [
				{
					name: 'File',
					value: 'files',
				},
				{
					name: 'Folder',
					value: 'folders',
				},
				{
					name: 'Info',
					value: 'info',
				},
				{
					name: 'Search',
					value: 'search',
				},
				{
					name: 'Share',
					value: 'share',
				},
			],
			default: 'files',
		},
		...files.descriptions,
		...folders.descriptions,
		...info.descriptions,
		...search.descriptions,
		...share.descriptions,
	],
};
