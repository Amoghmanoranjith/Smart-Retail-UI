export interface RoleDTO {
  role: 'STOREMANAGER' | 'WAREHOUSEOPERATOR' | 'ADMIN';
  status: 'NOT_ASSIGNED' | 'PENDING' | 'ACTIVE' | 'INACTIVE';
}
