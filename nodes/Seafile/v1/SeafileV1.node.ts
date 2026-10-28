import type {
	IExecuteFunctions,
	INodeType,
	INodeTypeDescription,
	INodeTypeBaseDescription,
} from 'n8n-workflow';

import { versionDescription } from './actions/Seafile.node';
import { loadOptions, listSearch } from './methods';
import { router } from './actions/router';

export class SeafileV1 implements INodeType {
	description: INodeTypeDescription;

	constructor(baseDescription: INodeTypeBaseDescription) {
		this.description = {
			...baseDescription,
			...versionDescription,
		};
	}

	methods = { loadOptions, listSearch };

	async execute(this: IExecuteFunctions) {
		return router.call(this);
	}
}
