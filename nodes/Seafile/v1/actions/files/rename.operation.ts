import {
	type IDataObject,
	type INodeExecutionData,
	type INodeProperties,
	type IExecuteFunctions,
	IRequestOptions,
} from 'n8n-workflow';
import { updateDisplayOptions } from 'n8n-workflow';
import { fileResourceLocator } from '../../helpers/descriptions';

import * as path from 'path';

export const properties: INodeProperties[] = [
	{
		displayName: 'Source Library Name or ID',
		name: 'repo',
		type: 'options',
		placeholder: 'Select a Library',
		required: true,
		typeOptions: {
			loadOptionsMethod: 'getRepos',
		},
		default: '',
		description:
			'The name of SeaTable library to access. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>.',
	},
	fileResourceLocator({
		displayName: 'File Path',
		name: 'file_path',
		description:
			'Provide the file name with complete path. Choose from the list, or specify the complete path using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>.',
	}),
	{
		displayName: 'New File Name',
		name: 'new_name',
		type: 'string',
		default: '',
		required: true,
		hint: 'The new name of the file (without any paths)',
	},
];

const displayOptions = {
	show: {
		resource: ['files'],
		operation: ['rename'],
	},
};

export const description = updateDisplayOptions(displayOptions, properties);

export async function execute(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const credentials = await this.getCredentials('seafileApi');
	const baseURL = credentials?.domain;

	// get parameters
	const source_repo = this.getNodeParameter('repo', index) as string;
	const source_path = this.getNodeParameter('file_path', index, '', { extractValue: true }) as string;
	const new_name = path.basename(this.getNodeParameter('new_name', index) as string);

	const options: IRequestOptions = {
		method: 'POST',
		qs: {
			p: source_path,
		},
		body: {
			operation: 'rename',
			newname: new_name,
		},
		uri: `${baseURL}/api/v2.1/repos/${source_repo}/file/` as string,
		json: true,
	};

	const responseData = await this.helpers.requestWithAuthentication.call(
		this,
		'seafileApi',
		options,
	);

	return this.helpers.returnJsonArray(responseData as IDataObject[]);
}
