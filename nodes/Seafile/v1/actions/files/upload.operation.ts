import {
	type IDataObject,
	type INodeExecutionData,
	type INodeProperties,
	type IExecuteFunctions,
	IRequestOptions,
} from 'n8n-workflow';
import { updateDisplayOptions } from 'n8n-workflow';

import * as path from 'path';

export const properties: INodeProperties[] = [
	{
		displayName: 'Library Name or ID',
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
	{
		displayName: 'File Path',
		name: 'target_path',
		type: 'string',
		placeholder: '/invoices/2024/invoice.pdf',
		default: '',
		required: true,
		description:
			'The file path of the file to upload. Has to contain the full path. The parent folder does not has to exist.',
	},
	{
		displayName: 'Overwrite Existing',
		name: 'overwrite',
		type: 'boolean',
		default: false,
		description:
			'Whether force that an existing file is overwritten. Otherwise the filename is extended with an number in brackets like `invoice (1).pdf`.',
	},
	{
		displayName: 'Binary File',
		name: 'binaryData',
		type: 'boolean',
		default: false,
		description: 'Whether the data to upload should be taken from binary field',
	},
	{
		displayName: 'File Content',
		name: 'fileContent',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['file'],
				operation: ['upload'],
				binaryData: [false],
			},
		},
		placeholder: '',
		hint: 'The text content of the file to upload',
	},
	{
		displayName: 'Input Binary Field',
		name: 'binaryPropertyName',
		type: 'string',
		default: 'data',
		required: true,
		placeholder: '',
		hint: 'The name of the input binary field containing the file to be uploaded',
		displayOptions: {
			show: {
				resource: ['file'],
				operation: ['upload'],
				binaryData: [true],
			},
		},
	},
];

const displayOptions = {
	show: {
		resource: ['files'],
		operation: ['upload'],
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
	const repo = this.getNodeParameter('repo', index) as string;
	const target_path = this.getNodeParameter('target_path', index) as string;
	const replace = this.getNodeParameter('overwrite', index) as boolean;
	const file_name = path.basename(target_path);
	const relative_path = path.dirname(target_path).replace(/^\/|\/$/g, '');

	// get upload-link
	const getUploadLinkOptions: IRequestOptions = {
		method: 'GET',
		qs: {
			p: '/',
		},
		body: {},
		uri: `${baseURL}/api2/repos/${repo}/upload-link/`,
		json: true,
	};
	const uploadLinkData = await this.helpers.requestWithAuthentication.call(
		this,
		'seafileApi',
		getUploadLinkOptions,
	);

	let options: IRequestOptions = {
		method: 'POST',
		uri: uploadLinkData,
		qs: {
			'ret-json': 1,
		},
		formData: {},
		json: true,
	};

	let overwrite = {};
	if (replace == true) {
		overwrite = { replace: 1 };
	}

	let rpath = {};
	if (relative_path && relative_path != '.') {
		rpath = { relative_path: relative_path };
	}

	// Binary Data
	if (this.getNodeParameter('binaryData', index) as boolean) {
		const binaryPropertyName = this.getNodeParameter('binaryPropertyName', index);
		const fileBufferData = await this.helpers.getBinaryDataBuffer(index, binaryPropertyName);
		const binaryData = this.helpers.assertBinaryData(index, binaryPropertyName);
		options.formData = {
			file: {
				value: fileBufferData,
				options: {
					filename: file_name,
					contentType: binaryData.mimeType,
				},
			},
			parent_dir: '/',
			...overwrite,
			...rpath,
		};
	}
	// string input
	else {
		const binaryData = Buffer.from(this.getNodeParameter('fileContent', index) as string, 'utf8');
		options.formData = {
			file: {
				value: binaryData,
				options: {
					filename: file_name,
					contentType: 'text/plain',
				},
			},
			parent_dir: '/',
			...overwrite,
			...rpath,
		};
	}

	// DEBUG:
	//console.log(options);

	const responseData = await this.helpers.requestWithAuthentication.call(
		this,
		'seafileApi',
		options,
	);

	return this.helpers.returnJsonArray(responseData as IDataObject[]);
}
