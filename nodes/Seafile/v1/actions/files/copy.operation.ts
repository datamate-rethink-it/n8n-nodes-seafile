import {
	type IDataObject,
	type INodeExecutionData,
	type INodeProperties,
	type IExecuteFunctions,
	IRequestOptions,
} from 'n8n-workflow';
import { updateDisplayOptions } from 'n8n-workflow';
import { fileResourceLocator, folderResourceLocator } from '../../helpers/descriptions';

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
		displayName: 'Target Library Name or ID',
		name: 'target_repo',
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
	folderResourceLocator({
		displayName: 'Target Path',
		name: 'target_path',
		description:
			'Provide the target path. Choose from the list, or specify the complete path using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>.',
	}, 'getTargetFoldersList'),
];

const displayOptions = {
	show: {
		resource: ['files'],
		operation: ['copy'],
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
	const target_repo = this.getNodeParameter('target_repo', index) as string;
	const target_path = this.getNodeParameter('target_path', index, '', { extractValue: true }) as string;

	const options: IRequestOptions = {
		method: 'POST',
		qs: {
			p: source_path,
		},
		body: {
			operation: 'copy',
			dst_repo: target_repo,
			dst_dir: target_path,
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
