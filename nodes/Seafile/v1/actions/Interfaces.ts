import type { AllEntities, Entity } from 'n8n-workflow';

type SeafileMap = {
	files: 'get' | 'remove' | 'upload' | 'download' | 'move' | 'rename' | 'copy' | 'lock' | 'unlock';
	search: 'search';
	info: 'account' | 'server';
	folders: 'create' | 'remove' | 'list';
};

export type Seafile = AllEntities<SeafileMap>;

export type SeafileFiles = Entity<SeafileMap, 'files'>;
export type SeafileSearch = Entity<SeafileMap, 'search'>;
export type SeafileInfo = Entity<SeafileMap, 'info'>;

//export type SeafileSearchProperties = PropertiesOf<SeafileSearch>;
