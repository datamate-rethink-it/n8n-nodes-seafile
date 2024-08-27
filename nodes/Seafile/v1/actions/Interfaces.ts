import type { AllEntities, Entity } from 'n8n-workflow';

type SeafileMap = {
	files: 'get' | 'remove' | 'upload' | 'download' | 'move' | 'rename' | 'copy' | 'lock' | 'unlock';
	search: 'search';
	info: 'account' | 'server' | 'file_activity';
	folders: 'create' | 'remove' | 'list';
	share: 'internal' | 'create' | 'remove' | 'list';
	tags: 'add' | 'remove' | 'list_tags' | 'list_tagged';
};

export type Seafile = AllEntities<SeafileMap>;

export type SeafileFiles = Entity<SeafileMap, 'files'>;
export type SeafileSearch = Entity<SeafileMap, 'search'>;
export type SeafileInfo = Entity<SeafileMap, 'info'>;
export type SeafileFolders = Entity<SeafileMap, 'folders'>;
export type SeafileShare = Entity<SeafileMap, 'share'>;
export type SeafileTags = Entity<SeafileMap, 'tags'>;
