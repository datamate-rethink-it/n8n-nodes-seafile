import type { IDisplayOptions, INodeProperties, INodePropertyMode } from 'n8n-workflow';

type ResourceLocatorOverrides = {
	displayName: string;
	name: string;
	description?: string;
	hint?: string;
	required?: boolean;
	placeholder?: string;
	displayOptions?: IDisplayOptions;
};

const pathHint =
	'Pick from the list to browse lazily one folder at a time - type a path like ' +
	'`/invoices/2024/` to drill deeper - or switch to <b>By Path</b> to enter it directly.';

function byPathMode(placeholder: string): INodePropertyMode {
	// eslint-disable-next-line n8n-nodes-base/node-param-default-missing
	return {
		displayName: 'By Path',
		name: 'path',
		type: 'string',
		placeholder,
	};
}

/**
 * Resource locator for a file. The list mode loads folder contents lazily
 * (one level per search), so the whole library tree is never fetched up front.
 */
export function fileResourceLocator(overrides: ResourceLocatorOverrides): INodeProperties {
	return {
		displayName: overrides.displayName,
		name: overrides.name,
		type: 'resourceLocator',
		default: { mode: 'list', value: '' },
		required: overrides.required ?? true,
		modes: [
			{
				displayName: 'From List',
				name: 'list',
				type: 'list',
				placeholder: 'Select a file…',
				typeOptions: {
					searchListMethod: 'getFilesList',
					searchable: true,
					searchFilterRequired: false,
				},
			},
			byPathMode(overrides.placeholder ?? '/invoices/2024/invoice.pdf'),
		],
		description: overrides.description,
		hint: overrides.hint ?? pathHint,
		...(overrides.displayOptions ? { displayOptions: overrides.displayOptions } : {}),
	};
}

/**
 * Resource locator for a folder. `searchMethod` selects which library the list
 * mode browses - `getFoldersList` reads the `repo` parameter, while
 * `getTargetFoldersList` reads `target_repo` (used by move/copy).
 */
export function folderResourceLocator(
	overrides: ResourceLocatorOverrides,
	searchMethod: 'getFoldersList' | 'getTargetFoldersList' = 'getFoldersList',
): INodeProperties {
	return {
		displayName: overrides.displayName,
		name: overrides.name,
		type: 'resourceLocator',
		default: { mode: 'list', value: '/' },
		required: overrides.required ?? true,
		modes: [
			{
				displayName: 'From List',
				name: 'list',
				type: 'list',
				placeholder: 'Select a folder…',
				typeOptions: {
					searchListMethod: searchMethod,
					searchable: true,
					searchFilterRequired: false,
				},
			},
			byPathMode(overrides.placeholder ?? '/invoices/2024/'),
		],
		description: overrides.description,
		hint: overrides.hint ?? pathHint,
		...(overrides.displayOptions ? { displayOptions: overrides.displayOptions } : {}),
	};
}
