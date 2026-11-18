import * as migration_20261116_080737_initial from './20261116_080737_initial';
import * as migration_20261118_103818_add_updated_by from './20261118_103818_add_updated_by';
import * as migration_20261118_105928_restore_media_object_key from './20261118_105928_restore_media_object_key';

export const migrations = [
  {
    up: migration_20261116_080737_initial.up,
    down: migration_20261116_080737_initial.down,
    name: '20261116_080737_initial',
  },
  {
    up: migration_20261118_103818_add_updated_by.up,
    down: migration_20261118_103818_add_updated_by.down,
    name: '20261118_103818_add_updated_by',
  },
  {
    up: migration_20261118_105928_restore_media_object_key.up,
    down: migration_20261118_105928_restore_media_object_key.down,
    name: '20261118_105928_restore_media_object_key'
  },
];
