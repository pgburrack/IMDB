export const BOOSTRAP_ROLES = [
  'primary',
  'success',
  'info',
  'warning',
  'danger',
  'default'
];

function bootstrapClassNameFactory (prefix) {
  return (role) => {
    return prefix.concat(BOOSTRAP_ROLES.indexOf(role) !== -1 ? role : 'default');
  };
}

export const getBootstrapBtnClass = (() => {
  return bootstrapClassNameFactory('btn-');
})();

export const getBootstrapPanelClass = (() => {
  return bootstrapClassNameFactory('panel-');
})();
