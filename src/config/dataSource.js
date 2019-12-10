export const userProfile = {
  url: '/user/auth/me',
  method: 'GET',
};

export const userLogout = {
  url: '/user/auth/logout',
  method: 'GET',
};

export const userLogin = {
  url: '/user/auth/login',
  method: 'POST',
};

export const userRegister = {
  url: '/api/register',
  method: 'POST',
};

export const menu = {
  url: '/api/menu',
  method: 'GET',
};

export const permissionList = {
  url: '/permission',
  method: 'GET',
};

export const permissionCreate = {
  url: '/permission/create',
  method: 'POST',
};

export const assignRole = {
  url: '/permission/assign',
  method: 'POST',
};

export const roleList = {
  url: '/role',
  method: 'GET',
};

export const roleCreate = {
  url: '/role',
  method: 'POST',
};