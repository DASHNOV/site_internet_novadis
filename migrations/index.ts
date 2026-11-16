import * as migration_20261116_080737_initial from './20261116_080737_initial';

export const migrations = [
  {
    up: migration_20261116_080737_initial.up,
    down: migration_20261116_080737_initial.down,
    name: '20261116_080737_initial'
  },
];
